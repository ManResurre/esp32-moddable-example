$env:MODDABLE = "C:\Projects\moddable"
$env:IDF_PATH = "C:\Users\korol\esp32\esp-idf"
$wc = "$PSScriptRoot\web"

# Vite build → bundle.js
Push-Location $wc
npx.cmd vite build 2>&1
$viteExit = $LASTEXITCODE
Pop-Location
if ($viteExit -ne 0) { Write-Host "vite build failed with exit code $viteExit"; exit 1 }

# copy template → esp.html
Copy-Item "$wc\esp.template.html" "$wc\esp.html" -Force

# Copy bundle as resource (as-is, no padding)
Copy-Item "$wc\dist\bundle.js" "$wc\bundle.dat" -Force

$batContent = @"
@echo off
call "C:\Program Files\Microsoft Visual Studio\2022\Community\VC\Auxiliary\Build\vcvars32.bat" 2>nul
set MODDABLE=$env:MODDABLE
set IDF_PATH=$env:IDF_PATH
set PATH=$env:MODDABLE\build\bin\win\release;%PATH%
call $env:IDF_PATH\export.bat 2>nul
cd /d $PSScriptRoot
mcconfig -d -t build -m -p esp32/nodemcu
"@

$batFile = "$PSScriptRoot\_build.bat"
$batContent | Out-File -FilePath $batFile -Encoding ASCII
& cmd /c $batFile

$buildDir = "$PSScriptRoot\build"
New-Item -ItemType Directory -Path $buildDir -Force | Out-Null
$tmpDir = "$env:MODDABLE\build\tmp\esp32\nodemcu\debug\test-project\xsProj-esp32\build"
Copy-Item "$tmpDir\xs_esp32.bin" $buildDir -Force
Copy-Item "$tmpDir\bootloader\bootloader.bin" $buildDir -Force
Copy-Item "$tmpDir\partition_table\partition-table.bin" $buildDir -Force
Copy-Item "$tmpDir\ota_data_initial.bin" $buildDir -Force
Remove-Item $batFile -Force
Write-Host "Firmware copied to $buildDir"
