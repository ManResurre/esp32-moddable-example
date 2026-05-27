# ESP32 Moddable Servo Control

Управление сервоприводом (SG90) через веб-интерфейс с ESP32 (Moddable SDK).

## Требования

- Windows 10/11, Visual Studio 2022 Community
- ESP-IDF v6.0
- Moddable SDK
- Node.js v24+ (для Vite dev-сервера и OTA-сервера)
- Python 3.13

## Быстрый старт

### Сборка прошивки

```powershell
.\build.ps1
```

Сборка:
1. Vite собирает `web/src/*.ts` → `web/dist/bundle.js` + `bundle.css`
2. Инлайнит CSS/JS в `web/esp.html`
3. `mcconfig` компилирует Moddable-проект в `xs_esp32.bin`

### Прошивка

```powershell
.\flash.bat
```

Или OTA:
```powershell
node --experimental-strip-types ota-server.ts
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
- **Canvas-индикатор** — визуальная обратная связь

### Локальная разработка UI

```powershell
npm run dev
```

Vite-сервер с HMR на `http://localhost:5173` — для отладки UI без прошивки ESP32.

## Структура проекта

```
├── main.ts              # ESP32 firmware (серво, HTTP, OTA)
├── manifest.json         # Moddable manifest
├── build.ps1             # Скрипт сборки (Vite → Inline CSS/JS → mcconfig)
├── flash.bat             # esptool write-flash
├── debug.ps1             # xsbug + serial2xsbug
├── log.ps1               # Мониторинг логов
├── ota-server.ts         # OTA HTTP-сервер (Node.js)
├── tsconfig.json         # TS config для ESP32-кода
└── web/
    ├── index.html          # Vite entry point (разработка, открывается на localhost:5173)
    ├── esp.template.html   # Шаблон для сборки прошивки → esp.html
    ├── style.css          # Стили
    ├── vite.config.ts     # Vite config
    ├── package.json       # Зависимости UI
    ├── eslint.config.js   # ESLint flat config
    └── src/
        ├── main.ts                # Entry point
        ├── servo-control.ts       # Кастомный элемент <servo-panel>
        └── accelerometer.ts       # Акселерометр (DeviceOrientation)
```

## Пин-аут

| Компонент | Пин ESP32 | Примечание |
|-----------|-----------|------------|
| Сервопривод (SG90) | GPIO25 | Signal, VCC→5V, GND→GND |
| LED | GPIO2 | Индикатор питания |
| FLASH Button | GPIO0 | OTA-обновление |

## API

| Метод | Путь | Описание |
|-------|------|----------|
| GET | `/` | HTML-страница управления |
| POST | `/api/angle` | Установка угла (`angle=N`) |
| GET | `/api/status` | Текущий угол (`{"angle": 90}`) |
