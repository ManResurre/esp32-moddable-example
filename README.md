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
2. Инлайнит JS в `web/esp.html`
3. `mcconfig` компилирует Moddable-проект в `xs_esp32.bin`

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

### Локальная разработка UI

```powershell
npm run dev
```

Vite-сервер с HMR на `http://localhost:5173` — для отладки UI без прошивки ESP32.

## Структура проекта

```
├── main.ts              # ESP32 firmware (серво, HTTP, OTA)
├── manifest.json         # Moddable manifest
├── package.json          # Корневые скрипты: dev, build, lint, ota
├── build.ps1             # Скрипт сборки (Vite → Inline JS → mcconfig)
├── flash.bat             # esptool write-flash
├── debug.ps1             # xsbug + serial2xsbug
├── log.ps1               # Мониторинг логов
├── ota-server.ts         # OTA HTTP-сервер (Node.js)
├── tsconfig.json         # TS config для ESP32-кода
└── web/
    ├── index.html          # Vite entry point (разработка, открывается на localhost:5173)
    ├── esp.template.html   # Шаблон для сборки прошивки → esp.html
    ├── vite.config.ts     # Vite config
    ├── package.json       # Зависимости UI (FAST + Fluent)
    ├── eslint.config.js   # ESLint flat config
    └── src/
        ├── main.ts                # Entry point, регистрация Fluent-компонентов
        ├── fast-registry.ts       # provideFASTDesignSystem + компоненты
        ├── accelerometer.ts       # Акселерометр (DeviceOrientation)
        └── servo-panel/
            ├── servo-panel.ts         # FASTElement <servo-panel>
            ├── servo-panel.template.ts # HTML-шаблон (fast-slider, fast-card, fluent-badge)
            └── servo-panel.styles.ts   # CSS (shadow DOM)
```

## Пин-аут

| Компонент | Пин ESP32 | Примечание |
|-----------|-----------|------------|
| Сервопривод (SG90) | GPIO25 | Signal, VCC→5V, GND→GND |
| LED | GPIO2 | Индикатор питания |
| FLASH Button | GPIO0 | OTA-обновление |

## Использование flash

NodeMCU (ESP32) — 4 MB flash. Текущая прошивка занимает ~1 MB, свободно ~3 MB.

| Компонент | Размер |
|-----------|--------|
| bootloader + nvs + phy | ~96 KB |
| xs_esp32.bin | ~1 MB |
| Свободно | ~3 MB |

## API

| Метод | Путь | Описание |
|-------|------|----------|
| GET | `/` | HTML-страница управления |
| POST | `/api/angle` | Установка угла (`angle=N`) |
| GET | `/api/status` | Текущий угол (`{"angle": 90}`) |
