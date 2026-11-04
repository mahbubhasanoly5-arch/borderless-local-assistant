$ErrorActionPreference = 'Stop'
$taskWebSource = Join-Path (Split-Path $PSScriptRoot -Parent) 'src/main/resources/web'
$taskAssets = Join-Path $PSScriptRoot 'android/app/src/main/assets'
New-Item -ItemType Directory -Path $taskAssets -Force | Out-Null
Copy-Item -LiteralPath $taskWebSource -Destination $taskAssets -Recurse -Force
$taskScriptPath = Join-Path $taskAssets 'web/script.js'
$taskScript = [System.IO.File]::ReadAllText($taskScriptPath)
$taskGuard = "if(!['localhost','127.0.0.1','::1'].includes(location.hostname))return;"
if (-not $taskScript.Contains($taskGuard)) { throw 'Website rules guard changed; review the Android adaptation before building.' }
$taskScript = $taskScript.Replace($taskGuard, "if(!['localhost','127.0.0.1','::1','appassets.androidplatform.net'].includes(location.hostname))return;")
[System.IO.File]::WriteAllText($taskScriptPath, $taskScript, (New-Object System.Text.UTF8Encoding($false)))
Write-Host 'Website HTML, CSS, JavaScript and country/city directory bundled for Android.'
