param([string]$FlutterSdk, [string]$ApiBaseUrl = '')
$ErrorActionPreference = 'Stop'
if (-not $FlutterSdk) {
    $taskSdkCandidate = Join-Path $env:USERPROFILE 'Documents/Codex/toolchains/flutter'
    if (Test-Path -LiteralPath (Join-Path $taskSdkCandidate 'bin/flutter.bat')) {
        $FlutterSdk = $taskSdkCandidate
    } elseif ($env:FLUTTER_ROOT) {
        $FlutterSdk = $env:FLUTTER_ROOT
    } else {
        throw 'Pass -FlutterSdk with your Flutter SDK directory.'
    }
}
$taskFlutter = Join-Path $FlutterSdk 'bin/flutter.bat'
if (-not (Test-Path -LiteralPath $taskFlutter)) { throw 'Flutter SDK not found.' }
$taskBundledGit = Join-Path $env:USERPROFILE '.cache/codex-runtimes/codex-primary-runtime/dependencies/native/git/cmd'
if (Test-Path -LiteralPath $taskBundledGit) { $env:PATH = "$taskBundledGit;$env:PATH" }
$env:PATH = "$(Join-Path $FlutterSdk 'bin');$env:PATH"
function Invoke-Flutter {
    & $taskFlutter @args | Tee-Object -FilePath (Join-Path $PSScriptRoot 'build/flutter-command-output.log') -Append
    if ($LASTEXITCODE -ne 0) { throw "Flutter step failed: $args" }
}
Push-Location $PSScriptRoot
try {
    New-Item -ItemType Directory -Path (Join-Path $PSScriptRoot 'build') -Force | Out-Null
    & (Join-Path $PSScriptRoot 'sync-website.ps1')
    # Doctor reports unrelated desktop toolchains too. Required Android checks
    # are performed by the APK build; do not gate it on desktop warnings.
    Write-Host 'Preparing Android app dependencies...'
    Invoke-Flutter pub get
    Write-Host 'Checking Android app code...'
    Invoke-Flutter analyze
    Write-Host 'Running app checks...'
    Invoke-Flutter test --reporter expanded
    Write-Host 'Building Android APK (the first build can take several minutes)...'
    if ($ApiBaseUrl) {
        Invoke-Flutter build apk --debug "--dart-define=API_BASE_URL=$ApiBaseUrl"
    } else {
        Invoke-Flutter build apk --debug
    }
    Write-Host "APK ready: $(Join-Path $PSScriptRoot 'build/app/outputs/flutter-apk/app-debug.apk')"
} finally { Pop-Location }
