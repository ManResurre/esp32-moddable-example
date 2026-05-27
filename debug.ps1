$MODDABLE = "C:\Projects\moddable"
$BIN = "$MODDABLE\build\bin\win\release"

Write-Host "=== Starting xsbug & serial2xsbug ==="

Start-Process "$BIN\xsbug.exe"

Start-Sleep -Seconds 1

$serial2xsbug = Start-Process -NoNewWindow -FilePath "$BIN\serial2xsbug.exe" -ArgumentList "COM8 1500000 8N1" -PassThru

Write-Host "xsbug and serial2xsbug started."
Write-Host "Now run build.ps1 to build and flash."
Write-Host "`nWhen xsbug shows 'file not found':"
Write-Host "  Click 'Locate...' -> C:\Projects\test-project\main.ts"
Write-Host "  (one time only, xsbug remembers the mapping)"
Write-Host "`nPress Ctrl+C to stop."

$serial2xsbug.WaitForExit()
