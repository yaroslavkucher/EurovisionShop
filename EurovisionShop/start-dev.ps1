Write-Host ""
Write-Host "Starting Docker Compose..." -ForegroundColor Cyan
Write-Host ""

docker compose up -d --build

$healthUrl = "http://localhost:8080/health"

Write-Host ""
Write-Host "Waiting for backend..." -ForegroundColor Yellow
Write-Host ""

while ($true)
{
    try
    {
        $response = Invoke-WebRequest `
            -Uri $healthUrl `
            -UseBasicParsing `
            -TimeoutSec 2

        if ($response.StatusCode -eq 200)
        {
            Write-Host ""
            Write-Host "Backend is ready!" -ForegroundColor Green
            break
        }
    }
    catch
    {
        Write-Host "Backend not ready yet..."
    }

    Start-Sleep -Seconds 2
}

Write-Host ""
Write-Host "Starting Angular..." -ForegroundColor Cyan
Write-Host ""

Start-Process powershell `
    -ArgumentList "cd EurovisionShop.Client; npm start"

Start-Sleep -Seconds 10

Start-Process "http://localhost:4200"