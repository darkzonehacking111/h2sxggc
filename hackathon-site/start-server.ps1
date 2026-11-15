param(
    [int]$port = 5000
)

$root = $PSScriptRoot
if (-not $root) { $root = "c:\Users\Amita\Desktop\h2S x GGC\hackathon-site" }

$endpoint = [System.Net.IPEndPoint]::new([System.Net.IPAddress]::Loopback, $port)
$tcpListener = [System.Net.Sockets.TcpListener]::new($endpoint)

try {
    $tcpListener.Start()
    Write-Host "==========================================================" -ForegroundColor Cyan
    Write-Host "  HACKATHON 2027 LOCALHOST SERVER ACTIVE                  " -ForegroundColor Green
    Write-Host "  Port:          $port                                    " -ForegroundColor White
    Write-Host "  Main Website:  http://localhost:$port/index.html        " -ForegroundColor Yellow
    Write-Host "  Admin Portal:  http://localhost:$port/admin             " -ForegroundColor Yellow
    Write-Host "  Mentor Portal: http://localhost:$port/mentor            " -ForegroundColor Yellow
    Write-Host "  Theme Reveal:  http://localhost:$port/theme-reveal      " -ForegroundColor Yellow
    Write-Host "  Standings:     http://localhost:$port/standings         " -ForegroundColor Yellow
    Write-Host "==========================================================" -ForegroundColor Cyan
}
catch {
    $port = 5001
    $endpoint = [System.Net.IPEndPoint]::new([System.Net.IPAddress]::Loopback, $port)
    $tcpListener = [System.Net.Sockets.TcpListener]::new($endpoint)
    $tcpListener.Start()
    Write-Host "Port 5000 was busy. Server started on http://localhost:$port/" -ForegroundColor Yellow
}

$mimeTypes = @{
    ".html"  = "text/html; charset=utf-8"
    ".htm"   = "text/html; charset=utf-8"
    ".css"   = "text/css; charset=utf-8"
    ".js"    = "application/javascript; charset=utf-8"
    ".json"  = "application/json; charset=utf-8"
    ".png"   = "image/png"
    ".jpg"   = "image/jpeg"
    ".jpeg"  = "image/jpeg"
    ".gif"   = "image/gif"
    ".svg"   = "image/svg+xml"
    ".ico"   = "image/x-icon"
    ".mp4"   = "video/mp4"
    ".woff"  = "font/woff"
    ".woff2" = "font/woff2"
    ".ttf"   = "font/ttf"
}

# Auto-open browser
Start-Process "http://localhost:$port/index.html" -ErrorAction SilentlyContinue

try {
    while ($true) {
        $client = $tcpListener.AcceptTcpClient()
        $stream = $client.GetStream()
        $reader = [System.IO.StreamReader]::new($stream, [System.Text.Encoding]::ASCII)

        $requestLine = $reader.ReadLine()
        if ([string]::IsNullOrWhiteSpace($requestLine)) {
            $client.Close()
            continue
        }

        # Read remaining headers
        while (![string]::IsNullOrEmpty($reader.ReadLine())) {}

        $tokens = $requestLine.Split(' ')
        $rawPath = if ($tokens.Length -gt 1) { $tokens[1] } else { "/" }
        $urlPath = $rawPath.Split('?')[0].TrimStart('/')
        if ([string]::IsNullOrEmpty($urlPath) -or $urlPath -eq "/") {
            $urlPath = "index.html"
        }

        # Clean Route Normalization
        $cleanRoute = $urlPath.ToLower().TrimEnd('/')
        if ($cleanRoute -eq "admin") {
            $urlPath = "admin.html"
        }
        elseif ($cleanRoute -eq "mentor") {
            $urlPath = "mentor.html"
        }
        elseif ($cleanRoute -eq "portal" -or $cleanRoute -eq "login") {
            $urlPath = "portal.html"
        }
        elseif ($cleanRoute -eq "theme-reveal" -or $cleanRoute -eq "theme" -or $cleanRoute -eq "themereveal" -or $cleanRoute -eq "standings" -or $cleanRoute -eq "leaderboard") {
            $urlPath = "index.html"
        }

        $localPath = Join-Path $root $urlPath
        $fullPath = [System.IO.Path]::GetFullPath($localPath)
        if (-not (Test-Path $fullPath -PathType Leaf) -and (Test-Path "$fullPath.html" -PathType Leaf)) {
            $fullPath = "$fullPath.html"
        }
        $rootFullPath = [System.IO.Path]::GetFullPath($root)

        $writer = [System.IO.BinaryWriter]::new($stream)

        if ($fullPath.StartsWith($rootFullPath) -and (Test-Path $fullPath -PathType Leaf)) {
            $ext = [System.IO.Path]::GetExtension($fullPath).ToLower()
            $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
            $bytes = [System.IO.File]::ReadAllBytes($fullPath)

            $header = "HTTP/1.1 200 OK`r`nContent-Type: $mime`r`nContent-Length: $($bytes.Length)`r`nAccess-Control-Allow-Origin: *`r`nConnection: close`r`n`r`n"
            $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
            $writer.Write($headerBytes)
            $writer.Write($bytes)
        }
        else {
            $body = "404 Not Found: $urlPath"
            $bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($body)
            $header = "HTTP/1.1 404 Not Found`r`nContent-Type: text/plain; charset=utf-8`r`nContent-Length: $($bodyBytes.Length)`r`nConnection: close`r`n`r`n"
            $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
            $writer.Write($headerBytes)
            $writer.Write($bodyBytes)
        }

        $writer.Flush()
        $client.Close()
    }
}
finally {
    $tcpListener.Stop()
}
