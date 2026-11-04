param([int]$Port = 8080)
$ErrorActionPreference = 'Stop'
$taskRoot = Split-Path $PSScriptRoot -Parent
$taskBase = "http://localhost:$Port/"
$taskJava = Join-Path $env:ProgramFiles 'Java/jdk-26/bin/java.exe'
if (-not (Test-Path -LiteralPath $taskJava)) { $taskJava = (Get-Command java -ErrorAction Stop).Source }
$taskCompiler = Join-Path (Split-Path $taskJava -Parent) 'javac.exe'
if (-not (Test-Path -LiteralPath $taskCompiler)) { $taskCompiler = (Get-Command javac -ErrorAction Stop).Source }
$taskJdbc = Join-Path $env:USERPROFILE '.m2/repository/com/mysql/mysql-connector-j/8.4.0/mysql-connector-j-8.4.0.jar'
if (-not (Test-Path -LiteralPath $taskJdbc)) { throw 'MySQL JDBC driver was not found in the existing Maven cache.' }
$taskClasses = Join-Path $taskRoot 'work/mobile-server-classes'
New-Item -ItemType Directory -Path $taskClasses -Force | Out-Null
try {
    $taskCities = @(Invoke-RestMethod "${taskBase}api/cities" -TimeoutSec 8)
} catch {
    Write-Host 'Starting the existing Java server with your local database settings...'
    $taskSources = @(Get-ChildItem -LiteralPath (Join-Path $taskRoot 'src/main/java') -Filter '*.java' -Recurse | ForEach-Object FullName)
    & $taskCompiler --release 21 -encoding UTF-8 -d $taskClasses @taskSources
    if ($LASTEXITCODE -ne 0) { throw 'Java compilation failed.' }
    Copy-Item -LiteralPath (Join-Path $taskRoot 'src/main/resources/web') -Destination $taskClasses -Recurse -Force
    $taskClassPath = "$taskClasses;$taskJdbc"
    $taskJavaArguments = "-Dserver.port=$Port -cp `"$taskClassPath`" com.borderlesslocalassistant.WebServer"
    Start-Process -FilePath $taskJava -ArgumentList $taskJavaArguments -WorkingDirectory $taskRoot -WindowStyle Hidden -RedirectStandardOutput (Join-Path $taskRoot 'work/mobile-server.out.log') -RedirectStandardError (Join-Path $taskRoot 'work/mobile-server.err.log') | Out-Null
    $taskCities = $null
    for ($taskAttempt = 0; $taskAttempt -lt 15; $taskAttempt++) {
        Start-Sleep -Seconds 1
        try {
            $taskCities = @(Invoke-RestMethod "${taskBase}api/cities" -TimeoutSec 3)
            break
        } catch { }
    }
    if ($null -eq $taskCities) { throw 'The database API is not ready. Keep MySQL running; credentials stay in your existing local.properties.' }
}
if ($taskCities.Count -eq 0 -or $null -eq $taskCities[0].cityId) { throw 'The server returned no usable database cities.' }
$taskRuleCount = 0
$taskTransitCount = 0
foreach ($taskCity in $taskCities) {
    $taskOverview = Invoke-RestMethod "${taskBase}api/cities/$($taskCity.cityId)?language=bn" -TimeoutSec 10
    $taskRuleCount += @($taskOverview.rules).Count
    $taskTransitCount += @($taskOverview.transitGuides).Count
}
Write-Host "Database API verified: $($taskCities.Count) cities, $taskRuleCount Bangla rules, $taskTransitCount transit entries."
Write-Host 'Existing database data was only read.'
Write-Host "Local browser URL: $taskBase"
