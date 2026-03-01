[CmdletBinding()]
param(
    [string]$MystranRef = "",
    [string]$BenchmarkRef = "",
    [switch]$Update
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$sourcesDir = Join-Path $repoRoot "sources"
$toolsDir = Join-Path $repoRoot "tools"
$distDir = Join-Path $repoRoot "dist"

foreach ($dir in @($sourcesDir, $toolsDir, $distDir)) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
}

function Invoke-Git {
    param(
        [Parameter(Mandatory = $true)]
        [string[]]$GitArguments,
        [Parameter(Mandatory = $true)]
        [string]$WorkingDirectory
    )

    Push-Location $WorkingDirectory
    try {
        Write-Host ">> git -c http.sslBackend=openssl $($GitArguments -join ' ')"
        & git -c http.sslBackend=openssl @GitArguments
        if ($LASTEXITCODE -ne 0) {
            throw "Git command failed in $WorkingDirectory"
        }
    }
    finally {
        Pop-Location
    }
}

function Resolve-RepositoryRef {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Name,
        [Parameter(Mandatory = $true)]
        [string]$Url,
        [string]$RequestedRef
    )

    if (-not [string]::IsNullOrWhiteSpace($RequestedRef)) {
        return $RequestedRef.Trim()
    }

    $defaultRef = $null
    try {
        $symrefOutput = & git -c http.sslBackend=openssl ls-remote --symref $Url HEAD 2>$null
        if ($LASTEXITCODE -eq 0) {
            $headLine = $symrefOutput | Select-Object -First 1
            if ($headLine) {
                $match = [Regex]::Match($headLine, "ref:\s+refs/heads/([^\s]+)\s+HEAD")
                if ($match.Success) {
                    $defaultRef = $match.Groups[1].Value
                }
            }
        }
    }
    catch {
        # Fall through to candidate probing.
    }

    if (-not [string]::IsNullOrWhiteSpace($defaultRef)) {
        return $defaultRef
    }

    foreach ($candidate in @("main", "master")) {
        try {
            $probe = & git -c http.sslBackend=openssl ls-remote --heads $Url $candidate 2>$null
            if (($LASTEXITCODE -eq 0) -and (-not [string]::IsNullOrWhiteSpace(($probe | Out-String)))) {
                return $candidate
            }
        }
        catch {
            # Keep trying candidates.
        }
    }

    throw "Could not resolve branch ref for '$Name' ($Url). Specify -$($Name)Ref explicitly."
}

function Sync-Repository {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Name,
        [Parameter(Mandatory = $true)]
        [string]$Url,
        [Parameter(Mandatory = $true)]
        [string]$Ref
    )

    $repoDir = Join-Path $sourcesDir $Name
    $gitDir = Join-Path $repoDir ".git"

    if (-not (Test-Path $gitDir)) {
        Invoke-Git -WorkingDirectory $sourcesDir -GitArguments @(
            "clone",
            "--depth", "1",
            "--branch", $Ref,
            $Url,
            $Name
        )
        return
    }

    if (-not $Update) {
        Write-Host ">> $Name already exists, skipping update (use -Update to refresh)."
        return
    }

    Invoke-Git -WorkingDirectory $repoDir -GitArguments @("fetch", "origin", $Ref, "--depth", "1")
    Invoke-Git -WorkingDirectory $repoDir -GitArguments @("checkout", $Ref)
    Invoke-Git -WorkingDirectory $repoDir -GitArguments @("pull", "--ff-only", "origin", $Ref)

    $currentRef = (& git -C $repoDir rev-parse --abbrev-ref HEAD).Trim()
    if (($currentRef -ne $Ref) -and ($currentRef -ne "HEAD")) {
        throw "Expected branch '$Ref' in $repoDir, got '$currentRef'."
    }
}

$mystranUrl = "https://github.com/MYSTRANsolver/MYSTRAN.git"
$benchmarkUrl = "https://github.com/MYSTRANsolver/MYSTRAN_Benchmark.git"

$resolvedMystranRef = Resolve-RepositoryRef -Name "Mystran" -Url $mystranUrl -RequestedRef $MystranRef
$resolvedBenchmarkRef = Resolve-RepositoryRef -Name "Benchmark" -Url $benchmarkUrl -RequestedRef $BenchmarkRef

Sync-Repository -Name "MYSTRAN" -Url $mystranUrl -Ref $resolvedMystranRef
Sync-Repository -Name "MYSTRAN_Benchmark" -Url $benchmarkUrl -Ref $resolvedBenchmarkRef

$mystranDir = Join-Path $sourcesDir "MYSTRAN"
if ($env:OS -eq "Windows_NT") {
    Write-Host ">> Skipping host-side submodule setup on Windows; Docker build will initialize submodules."
}
else {
    try {
        Invoke-Git -WorkingDirectory $mystranDir -GitArguments @("submodule", "sync", "--recursive")
        Invoke-Git -WorkingDirectory $mystranDir -GitArguments @("submodule", "update", "--init", "--recursive", "--depth", "1")
    }
    catch {
        Write-Warning "Submodule setup from PowerShell failed. The Docker build script will retry submodule initialization inside the container."
    }
}

Write-Host ""
Write-Host "Dependencies are ready:"
Write-Host " - sources/MYSTRAN"
Write-Host " - sources/MYSTRAN_Benchmark"
Write-Host " - MYSTRAN ref: $resolvedMystranRef"
Write-Host " - MYSTRAN_Benchmark ref: $resolvedBenchmarkRef"
