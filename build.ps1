$env:MODDABLE = "C:\Projects\moddable"
$env:IDF_PATH = "C:\Users\korol\esp32\esp-idf"
$wc = "$PSScriptRoot\web"

# Vite build → bundle.js + bundle.css
Push-Location $wc
npx.cmd vite build 2>&1
$viteExit = $LASTEXITCODE
Pop-Location
if ($viteExit -ne 0) { Write-Host "vite build failed with exit code $viteExit"; exit 1 }

# inline bundle into template → minified index.html (ESP32 resource)
$tpl   = Get-Content "$wc\index.template.html" -Raw
$bundle= Get-Content "$wc\dist\bundle.js" -Raw
$css   = Get-Content "$wc\dist\bundle.css" -Raw

$html = $tpl.Replace('<link rel="stylesheet" href="style.css">', "<style>$css</style>")
$html = $html.Replace('<script src="bundle.js"></script>', "<script>$bundle</script>")

"$html" | Set-Content "$wc\index.full.html" -NoNewline
& npx.cmd html-minifier-terser "$wc\index.full.html" --collapse-whitespace --remove-comments --minify-css -o "$wc\index.html" 2>$null
Remove-Item "$wc\index.full.html" -Force

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
