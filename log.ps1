$MODDABLE = "C:\Projects\moddable"
$BIN = "$MODDABLE\build\bin\win\release"
$LOG_FILE = "$PSScriptRoot\xsbug.log"
$PORT = "COM8"
$BAUD = "1500000"

Write-Host "=== xsbug-log: $LOG_FILE ==="
Write-Host "Press Ctrl+C to stop`n"

# Kill old processes holding COM8
taskkill /f /im serial2xsbug.exe 2>$null
taskkill /f /im xsbug.exe 2>$null
Start-Sleep -Seconds 1

$env:XSBUG_PROJECT = $PSScriptRoot
$env:XSBUG_LOG_PORT = "5002"
$env:XSBUG_PORT = "5002"
$env:XSBUG_HOST = "localhost"

pushd "$MODDABLE\tools\xsbug-log"
node xsbug-log start /B "$BIN\serial2xsbug" $PORT $BAUD 8N1 2>&1 | Tee-Object -FilePath $LOG_FILE
popd
