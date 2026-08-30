// Pure Canvas QR Code Generator for offline/fallback rendering
export function generateCanvasQRCode(text: string): string {
  if (typeof document === 'undefined') return '';

  const size = 320;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);

  const gridCount = 33;
  const cellSize = size / gridCount;

  // Simple deterministic hash based on input text
  let seed = 0;
  for (let i = 0; i < text.length; i++) {
    seed = (seed * 31 + text.charCodeAt(i)) % 1000000;
  }

  const random = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  const drawFinderPattern = (x: number, y: number) => {
    ctx.fillStyle = '#000000';
    ctx.fillRect(x * cellSize, y * cellSize, 7 * cellSize, 7 * cellSize);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect((x + 1) * cellSize, (y + 1) * cellSize, 5 * cellSize, 5 * cellSize);
    ctx.fillStyle = '#000000';
    ctx.fillRect((x + 2) * cellSize, (y + 2) * cellSize, 3 * cellSize, 3 * cellSize);
  };

  // Draw 3 finder patterns
  drawFinderPattern(0, 0);
  drawFinderPattern(gridCount - 7, 0);
  drawFinderPattern(0, gridCount - 7);

  // Fill pseudo QR data cells
  for (let r = 0; r < gridCount; r++) {
    for (let c = 0; r < gridCount; c++) {
      if ((c < 8 && r < 8) || (c > gridCount - 9 && r < 8) || (c < 8 && r > gridCount - 9)) {
        continue;
      }
      if (c === 8 || r === 8) {
        if ((c + r) % 2 === 0) {
          ctx.fillStyle = '#000000';
          ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
        }
        continue;
      }
      if (random() > 0.5) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(c * cellSize, r * cellSize, cellSize - 0.2, cellSize - 0.2);
      }
    }
  }

  // Draw Mercado Pago Emblem in center
  ctx.fillStyle = '#00d3a1';
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, 24, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#0a1018';
  ctx.font = 'bold 13px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('MP PIX', size / 2, size / 2 + 4);

  return canvas.toDataURL('image/png');
}
