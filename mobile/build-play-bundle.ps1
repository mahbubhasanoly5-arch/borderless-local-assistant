param([string]$FlutterSdk = (Join-Path $env:USERPROFILE 'Documents/Codex/toolchains/flutter'))
$ErrorActionPreference = 'Stop'
$taskFlutter = Join-Path $FlutterSdk 'bin/flutter.bat'
if (-not (Test-Path -LiteralPath $taskFlutter)) { throw 'Flutter SDK was not found.' }
$taskKeytool = Join-Path $env:ProgramFiles 'Java/jdk-26/bin/keytool.exe'
if (-not (Test-Path -LiteralPath $taskKeytool)) { $taskKeytool = (Get-Command keytool -ErrorAction Stop).Source }
$taskSigningDir = Join-Path $PSScriptRoot '.signing'
New-Item -ItemType Directory -Path $taskSigningDir -Force | Out-Null
$taskKeystore = Join-Path $taskSigningDir 'borderless-upload.p12'
Write-Host 'Keep the signing password private. Enter it only here, never in chat.'
if (-not (Test-Path -LiteralPath $taskKeystore)) { Write-Host 'Creating your first upload key. Use at least 12 characters and keep a secure backup of the key and password.' }
$taskSecret = Read-Host 'Upload key password' -AsSecureString
$taskPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($taskSecret)
$taskEnvNames = @('BORDERLESS_UPLOAD_KEYSTORE','BORDERLESS_UPLOAD_KEY_ALIAS','BORDERLESS_UPLOAD_STORE_PASSWORD','BORDERLESS_UPLOAD_KEY_PASSWORD')
$taskOldEnvironment = @{}
foreach ($taskName in $taskEnvNames) { $taskOldEnvironment[$taskName] = [Environment]::GetEnvironmentVariable($taskName, 'Process') }
Push-Location $PSScriptRoot
try {
    $taskPassword = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($taskPointer)
    if ($taskPassword.Length -lt 12) { throw 'Use an upload-key password of at least 12 characters.' }
    $env:BORDERLESS_UPLOAD_KEYSTORE = $taskKeystore
    $env:BORDERLESS_UPLOAD_KEY_ALIAS = 'upload'
    $env:BORDERLESS_UPLOAD_STORE_PASSWORD = $taskPassword
    $env:BORDERLESS_UPLOAD_KEY_PASSWORD = $taskPassword
    if (-not (Test-Path -LiteralPath $taskKeystore)) {
        & $taskKeytool -genkeypair -keystore $taskKeystore -storetype PKCS12 -alias upload -keyalg RSA -keysize 2048 -validity 10000 -dname 'CN=Borderless Local Upload' -storepass:env BORDERLESS_UPLOAD_STORE_PASSWORD -keypass:env BORDERLESS_UPLOAD_KEY_PASSWORD
        if ($LASTEXITCODE -ne 0) { throw 'Upload key generation failed.' }
    }
    & $taskKeytool -list -keystore $taskKeystore -alias upload -storepass:env BORDERLESS_UPLOAD_STORE_PASSWORD
    if ($LASTEXITCODE -ne 0) { throw 'The upload key password could not be verified.' }
    & (Join-Path $PSScriptRoot 'sync-website.ps1')
    & $taskFlutter pub get
    if ($LASTEXITCODE -ne 0) { throw 'Dependency setup failed.' }
    & $taskFlutter analyze
    if ($LASTEXITCODE -ne 0) { throw 'Analysis failed.' }
    & $taskFlutter test --reporter expanded
    if ($LASTEXITCODE -ne 0) { throw 'Tests failed.' }
    & $taskFlutter build appbundle --release
    if ($LASTEXITCODE -ne 0) { throw 'Release bundle build failed.' }
    Write-Host "Signed Play bundle ready: $(Join-Path $PSScriptRoot 'build/app/outputs/bundle/release/app-release.aab')"
} finally {
    foreach ($taskName in $taskEnvNames) { [Environment]::SetEnvironmentVariable($taskName, $taskOldEnvironment[$taskName], 'Process') }
    $taskPassword = $null
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($taskPointer)
    $taskSecret.Dispose()
    Pop-Location
}
