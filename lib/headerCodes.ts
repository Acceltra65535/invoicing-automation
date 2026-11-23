/**
 * Deterministic temporary/invalid 2D barcode vector paths following:
 * 1. JIS X 0510 (ISO/IEC 18004) Version 1 (21x21) QR Code structure
 *    (three 7x7 finder patterns, separators, timing patterns, dark module, and dummy payload modules).
 * 2. PDF417 (ISO/IEC 15438) stacked 2D barcode structure
 *    (17-module start pattern 81111113, 14 stacked rows of 17-module 4-bar/4-space codewords,
 *    and 18-module stop pattern 711311121).
 */

const buildJisX0510QrPath = (): string => {
  const size = 21;
  const grid: number[][] = Array.from({ length: size }, () =>
    Array(size).fill(0)
  );
  const reserved: boolean[][] = Array.from({ length: size }, () =>
    Array(size).fill(false)
  );

  const placeFinder = (ox: number, oy: number) => {
    for (let dy = -1; dy <= 7; dy++) {
      for (let dx = -1; dx <= 7; dx++) {
        const x = ox + dx;
        const y = oy + dy;
        if (x < 0 || x >= size || y < 0 || y >= size) continue;
        reserved[y][x] = true;
        const inOuter = dx >= 0 && dx <= 6 && dy >= 0 && dy <= 6;
        const onBorder = dx === 0 || dx === 6 || dy === 0 || dy === 6;
        const inInner = dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4;
        grid[y][x] = inOuter && (onBorder || inInner) ? 1 : 0;
      }
    }
  };

  placeFinder(0, 0);
  placeFinder(size - 7, 0);
  placeFinder(0, size - 7);

  // Timing patterns (row 6 and col 6)
  for (let i = 8; i < size - 8; i++) {
    reserved[6][i] = true;
    reserved[i][6] = true;
    grid[6][i] = i % 2 === 0 ? 1 : 0;
    grid[i][6] = i % 2 === 0 ? 1 : 0;
  }

  // Dark module per JIS X 0510
  reserved[13][8] = true;
  grid[13][8] = 1;

  // Deterministic invalid/temporary modules for remaining cells
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (reserved[y][x]) continue;
      const hash = ((x * 37 + y * 73 + x * y * 19 + 11) ^ (x + y * 5)) & 0xff;
      grid[y][x] = hash % 3 !== 0 ? 1 : 0;
    }
  }

  const cmds: string[] = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (grid[y][x] === 1) {
        cmds.push(`M${x} ${y}h1v1h-1z`);
      }
    }
  }
  return cmds.join("");
};

const buildPdf417Path = (): string => {
  const rows = 14;
  const rowHeight = 2;
  const totalHeight = rows * rowHeight;
  const cmds: string[] = [];

  const appendRuns = (runs: number[], xStart: number, y: number, h: number): number => {
    let x = xStart;
    for (let i = 0; i < runs.length; i++) {
      const w = runs[i];
      if (i % 2 === 0) {
        cmds.push(`M${x} ${y}h${w}v${h}h-${w}z`);
      }
      x += w;
    }
    return x;
  };

  // PDF417 Start Pattern: 81111113 (17 modules)
  const startPattern = [8, 1, 1, 1, 1, 1, 1, 3];
  // PDF417 Stop Pattern: 711311121 (18 modules)
  const stopPattern = [7, 1, 1, 3, 1, 1, 1, 2, 1];

  // Valid 17-module (4-bar, 4-space) dummy codeword patterns
  const dummyCodewords: number[][] = [
    [3, 1, 2, 2, 1, 3, 3, 2],
    [2, 2, 3, 1, 2, 2, 2, 3],
    [4, 1, 1, 2, 3, 1, 2, 3],
    [1, 3, 2, 1, 4, 2, 2, 2],
    [2, 1, 4, 2, 1, 2, 3, 2],
    [3, 2, 1, 3, 2, 1, 2, 3],
    [1, 2, 3, 2, 2, 3, 1, 3],
    [2, 3, 1, 1, 3, 2, 3, 2],
  ];

  // Full-height start pattern at x=0
  appendRuns(startPattern, 0, 0, totalHeight);

  // 3 columns of 17-module stacked codewords (x = 17..68)
  for (let r = 0; r < rows; r++) {
    let x = 17;
    const y = r * rowHeight;
    for (let c = 0; c < 3; c++) {
      const cw = dummyCodewords[(r * 3 + c * 5 + r) % dummyCodewords.length];
      x = appendRuns(cw, x, y, rowHeight);
    }
  }

  // Full-height stop pattern at x=68 (68 + 18 = 86 total width)
  appendRuns(stopPattern, 68, 0, totalHeight);

  return cmds.join("");
};

export const JIS_X_0510_QR_VIEWBOX = "0 0 21 21";
export const JIS_X_0510_QR_PATH = buildJisX0510QrPath();

export const PDF417_VIEWBOX = "0 0 86 28";
export const PDF417_PATH = buildPdf417Path();
