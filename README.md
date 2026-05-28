# ESP32 Moddable Servo Control

Управление сервоприводом (SG90) через веб-интерфейс с ESP32 (Moddable SDK).

## Требования

- Windows 10/11, Visual Studio 2022 Community
- ESP-IDF v6.0
- Moddable SDK (`C:\Projects\moddable` — путь задан в `build.ps1`)
- Node.js v24+ (для Vite dev-сервера и OTA-сервера)
- Python 3.13

## Быстрый старт

### Сборка прошивки

```powershell
.\build.ps1
```

Сборка:
1. Vite собирает `web/src/*.ts` → `web/dist/bundle.js`
2. Копирует `bundle.js` → `bundle.dat` (ресурс), `esp.template.html` → `esp.html` (ресурс)
3. `mcconfig` компилирует Moddable-проект в `xs_esp32.bin`

> Бандл отдаётся одним чанком (`/b/0`) через streaming (`responseFragment`) — разбивается на куски размером с буфер сокета.

### Прошивка

```powershell
.\flash.bat
```

Или OTA:
```powershell
npm run ota
```
Нажмите FLASH (GPIO0) на ESP32 — прошивка загрузится по Wi-Fi.

### Логи

```powershell
.\log.ps1
```

## Веб-интерфейс

После подключения к Wi-Fi ESP32 доступен по IP (выводится в лог):

```
http://192.168.xxx.xxx/
```

- **Слайдер** — ручное управление углом серво (0–180°)
- **Акселерометр** — управление наклоном телефона (γ: -90…90 → 0…180°)
- **Canvas-индикатор** — визуальная обратная связь (Retina/DPR-aware)
- **Без внешних UI-библиотек** — нативный `<input type="range">`, shadow DOM

### Локальная разработка UI

```powershell
npm run dev
```

Vite-сервер с HMR на `http://localhost:5173`. Запросы `/api/*` и `/b/*` проксируются на ESP32 (IP из `web/.env` → `ESP_IP=192.168.xxx.xxx`).

## Сглаживание (firmware)

В `main.ts` используется двухэтапный алгоритм, тик каждые 20 мс:

**1. EMA-фильтр** (α = 0.5)
```
filteredTarget = filteredTarget * 0.5 + rawTarget * 0.5
```
Убирает дребезг акселерометра — резкие скачки входного сигнала.

**2. Лимитер скорости** (MAX_SPEED = 5°/тик = 250°/с)
```
если |targetAngle - currentAngle| ≤ 5 → snap
иначе → currentAngle += sign(diff) * 5
```
Защищает сервопривод от рывков и механических перегрузок.

На клиенте (`servo-panel.ts`) сглаживания нет — угол отправляется раз в 50 мс как есть. Дубликаты исключены через `_angle === lastSent`.

## Структура проекта

```
├── main.ts              # ESP32 firmware (серво, HTTP, OTA, streaming)
├── manifest.json         # Moddable manifest
├── package.json          # Корневые скрипты: dev, build, lint, ota
├── build.ps1             # Vite → bundle.dat (ресурс) → mcconfig
├── flash.bat             # esptool write-flash
├── debug.ps1             # xsbug + serial2xsbug
├── log.ps1               # Мониторинг логов
├── ota-server.ts         # OTA HTTP-сервер (Node.js)
├── tsconfig.json         # TS config для ESP32-кода
└── web/
    ├── .env                # ESP_IP для dev-прокси
    ├── index.html          # Vite entry point (dev, localhost:5173)
    ├── esp.template.html   # Шаблон для сборки прошивки → esp.html
    ├── vite.config.ts      # Vite config + proxy на ESP32
    ├── package.json        # Зависимости UI (только Vite + ESLint)
    ├── eslint.config.js    # ESLint flat config
    └── src/
        ├── main.ts                # Entry point, импорт <servo-panel>
        ├── accelerometer.ts       # Акселерометр (DeviceOrientation)
        └── servo-panel/
            ├── servo-panel.ts         # HTMLElement <servo-panel>
            ├── servo-panel.template.ts # HTML-шаблон (нативные элементы)
            └── servo-panel.styles.ts   # CSS (shadow DOM, кастомный слайдер)
```

## Пин-аут

| Компонент | Пин ESP32 | Примечание |
|-----------|-----------|------------|
| Сервопривод (SG90) | GPIO25 | Signal, VCC→5V, GND→GND |
| LED | GPIO2 | Индикатор питания |
| FLASH Button | GPIO0 | OTA-обновление |

## Использование flash

NodeMCU (ESP32) — 4 MB flash. OTA-раздел: **1984 KB**.

| Компонент | Размер |
|-----------|--------|
| xs_esp32.bin (прошивка) | ~1036 KB |
| Web-ресурсы (bundle.js 9.16 KB + esp.html) | ~10 KB |
| Свободно в OTA-разделе | **~948 KB (48%)** |

> После удаления Fluent UI (`@fluentui/web-components`, `@microsoft/fast-components`) размер бандла уменьшился с ~490 KB до ~9 KB.

## API

| Метод | Путь | Описание |
|-------|------|----------|
| GET | `/` | HTML-страница управления |
| GET | `/b/0` | JS-бандл (один чанк, streaming) |
| POST | `/api/angle` | Установка угла (`angle=N`) |
| GET | `/api/status` | Текущий угол (`{"angle": 90}`) |
