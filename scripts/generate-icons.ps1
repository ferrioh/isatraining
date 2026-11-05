Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$outDir = Join-Path $root "public\icons"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$brand = [System.Drawing.ColorTranslator]::FromHtml("#b5055b")
$background = [System.Drawing.ColorTranslator]::FromHtml("#fef7ff")

$fontFamily = "Futura-Bold"
try {
  $probe = New-Object System.Drawing.Font($fontFamily, 20)
  $probe.Dispose()
} catch {
  $fontFamily = "Montserrat"
}

function New-IsaIcon {
  param(
    [int]$Size,
    [string]$FileName
  )

  $bitmap = New-Object System.Drawing.Bitmap($Size, $Size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $graphics.Clear($background)

  $font = New-Object System.Drawing.Font($fontFamily, [single]($Size * 0.42), [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $brush = New-Object System.Drawing.SolidBrush($brand)
  $format = New-Object System.Drawing.StringFormat
  $format.Alignment = [System.Drawing.StringAlignment]::Center
  $format.LineAlignment = [System.Drawing.StringAlignment]::Center

  $text = "isa"
  $measured = $graphics.MeasureString($text, $font)
  $targetWidth = $Size * 0.58
  if ($measured.Width -gt 0) {
    $scale = $targetWidth / $measured.Width
    $font.Dispose()
    $font = New-Object System.Drawing.Font($fontFamily, [single]($Size * 0.42 * $scale), [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    $measured = $graphics.MeasureString($text, $font)
  }

  $x = ($Size - $measured.Width) / 2
  $y = ($Size - $measured.Height) / 2 + ($Size * 0.015)
  $graphics.DrawString($text, $font, $brush, [single]$x, [single]$y)

  $path = Join-Path $outDir $FileName
  $bitmap.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)

  $brush.Dispose()
  $format.Dispose()
  $font.Dispose()
  $graphics.Dispose()
  $bitmap.Dispose()
}

function New-IsaWordmark {
  param([string]$FileName)

  $font = New-Object System.Drawing.Font($fontFamily, 320, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $probe = New-Object System.Drawing.Bitmap(8, 8)
  $probeGraphics = [System.Drawing.Graphics]::FromImage($probe)
  $measured = $probeGraphics.MeasureString("isa", $font)
  $probeGraphics.Dispose()
  $probe.Dispose()

  $pad = 28
  $width = [int][Math]::Ceiling($measured.Width + $pad * 2)
  $height = [int][Math]::Ceiling($measured.Height + $pad * 2)

  $bitmap = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $graphics.Clear([System.Drawing.Color]::Transparent)

  $brush = New-Object System.Drawing.SolidBrush($brand)
  $graphics.DrawString("isa", $font, $brush, [single]$pad, [single]$pad)

  $path = Join-Path $outDir $FileName
  $bitmap.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)

  $brush.Dispose()
  $graphics.Dispose()
  $font.Dispose()
  $bitmap.Dispose()
}

New-IsaIcon -Size 32 -FileName "favicon-32.png"
New-IsaIcon -Size 64 -FileName "favicon-64.png"
New-IsaIcon -Size 180 -FileName "apple-touch-icon.png"
New-IsaIcon -Size 192 -FileName "icon-192.png"
New-IsaIcon -Size 512 -FileName "icon-512.png"
New-IsaWordmark -FileName "isa-wordmark.png"

Write-Output "Iconos generados con la fuente '$fontFamily' en $outDir"
Get-ChildItem $outDir | Select-Object Name, Length | Format-Table -AutoSize
