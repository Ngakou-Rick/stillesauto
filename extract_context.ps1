# --- Configuration ---

$DefaultProjectPath = "."
$ProjectPath = if ($args[0]) { Resolve-Path $args[0] } else { Resolve-Path $DefaultProjectPath }
$OutputFileName = "project_context.txt"
$OutputFile = Join-Path $ProjectPath $OutputFileName

# Dossiers à ignorer
$ExcludeDirs = @(
    ".*", "__pycache__", "venv", ".venv", "env", "node_modules", 
    "staticfiles", "static_root", "media", "migrations", "htmlcov", 
    ".pytest_cache", ".next", "out", "build", "dist"
)

# Fichiers à ignorer
$ExcludeFiles = @(
    "*.pyc", "*.pyo", "*.pyd", "*.db", "*.sqlite3*", ".env*", 
    "*.log", "package-lock.json", "yarn.lock", "pnpm-lock.yaml", 
    "*.png", "*.jpg", "*.jpeg", "*.svg", "*.ico", "*.pdf", 
    "*.webp", $OutputFileName
)

# --- Initialisation ---

Write-Host "Génération du contexte dans : $OutputFile" -ForegroundColor Cyan

# Création/Vidage du fichier de sortie
$Header = @"
===============================================
Project Context Generated On: $(Get-Date)
Root Path: $($ProjectPath.Path)
===============================================
"@
$Header | Out-File -FilePath $OutputFile -Encoding utf8

# --- Logique de parcours ---

# Récupérer tous les fichiers récursivement
$Files = Get-ChildItem -Path $ProjectPath -File -Recurse | Where-Object {
    $item = $_
    $relativeDir = $item.FullName.Replace($ProjectPath.Path, "")
    
    # Vérifier si le fichier est dans un dossier exclu
    $inExcludedDir = $false
    foreach ($dir in $ExcludeDirs) {
        if ($relativeDir -like "*\$dir\*") { $inExcludedDir = $true; break }
    }

    # Vérifier si le nom du fichier est exclu
    $isExcludedFile = $false
    foreach ($pattern in $ExcludeFiles) {
        if ($item.Name -like $pattern) { $isExcludedFile = $true; break }
    }

    -not $inExcludedDir -and -not $isExcludedFile
}

foreach ($File in $Files) {
    $RelativePath = $File.FullName.Replace($ProjectPath.Path, "").TrimStart("\")
    Write-Host "Traitement de : $RelativePath" -ForegroundColor Gray

    # Entête de fichier
    Add-Content -Path $OutputFile -Value "`n// FILE: $RelativePath"
    Add-Content -Path $OutputFile -Value "-----------------------------------------------"

    try {
        # Lire le contenu (en ignorant les fichiers binaires par extension)
        $Content = Get-Content -Path $File.FullName -Raw -ErrorAction Stop
        Add-Content -Path $OutputFile -Value $Content
    }
    catch {
        Add-Content -Path $OutputFile -Value "[Erreur ou fichier binaire : Contenu omis]"
    }

    Add-Content -Path $OutputFile -Value "`n// END OF FILE: $RelativePath"
}

Write-Host "`nTerminé ! Le fichier $OutputFileName a été généré." -ForegroundColor Green