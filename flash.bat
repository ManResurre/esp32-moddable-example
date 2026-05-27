@echo off
C:\Users\korol\.espressif\python_env\idf6.0_py3.13_env\Scripts\python.exe -m esptool --chip esp32 -p COM8 -b 115200 write-flash --no-compress ^
  0x1000 "%~dp0build\bootloader.bin" ^
  0x8000 "%~dp0build\partition-table.bin" ^
  0x10000 "%~dp0build\xs_esp32.bin" ^
  0x3fe000 "%~dp0build\ota_data_initial.bin"
