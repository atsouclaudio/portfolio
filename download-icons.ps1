
$icons = @('python','javascript','java','html5','css3','c','csharp','mysql','postgresql','mariadb','git','github','vscode','docker','redis','nginx','tailwindcss','reactnative','flutter','django','fastapi','dotnetcore')
foreach ($ic in $icons) {
    $url = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/$ic/$ic-original.svg"
    $out = "c:\Users\hp\Documents\PortofolioA\icons\$ic-original.svg"
    Invoke-WebRequest -Uri $url -OutFile $out
}
Write-Host "Done!"