// Grain generator for imq_svg_grain_01_normal & imq_svg_grain_01_vertical_normal
// Replicates Illustrator Effect > Texture > Grain

interface GrainConfig {
  seed: number;
  viewBoxWidth: number;
  viewBoxHeight: number;
  cellSize?: number;
  density?: number;
  contrast?: number;
  targetElements?: number;
}

interface VerticalGrainConfig {
  seed: number;
  viewBoxWidth: number;
  viewBoxHeight: number;
  columnSpacing?: number;
  density?: number;
  contrast?: number;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  targetElements?: number;
}

export interface GrainRect {
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
}

export interface GrainResult {
  rects: GrainRect[];
  filterId: string;
  slope: number;
  intercept: number;
}

function mulberry32(seed: number): () => number {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function contrastBiasedOpacity(rand: number, contrast: number): number {
  const minOpacity = 0.03;
  const maxOpacity = 0.03 + contrast * 0.45;
  const exponent = 1 - contrast * 0.6;
  const biased = Math.pow(rand, exponent);
  return minOpacity + biased * (maxOpacity - minOpacity);
}

export function generateGrainData(config: GrainConfig): GrainResult {
  const {
    seed,
    viewBoxWidth,
    viewBoxHeight,
    cellSize = 2,
    density = 0.41,
    contrast = 0.71,
    targetElements,
  } = config;

  const rand = mulberry32(seed);
  const cols = Math.floor(viewBoxWidth / cellSize);
  const rows = Math.floor(viewBoxHeight / cellSize);
  const totalCells = cols * rows;

  const indices: number[] = [];
  for (let i = 0; i < totalCells; i++) {
    if (rand() < density) indices.push(i);
  }
  const selected = targetElements ? indices.slice(0, targetElements) : indices;

  const slope = 1 + contrast;
  const intercept = -(slope - 1) / 2;

  const rects: GrainRect[] = selected.map((idx) => {
    const col = idx % cols;
    const row = Math.floor(idx / cols);
    const x = col * cellSize;
    const y = row * cellSize;
    const opacity = contrastBiasedOpacity(rand(), contrast);
    const sizeJitter = cellSize + (rand() - 0.5);
    const size = Math.max(0.5, Math.min(cellSize + 1, sizeJitter));
    return {
      x: parseFloat(x.toFixed(1)),
      y: parseFloat(y.toFixed(1)),
      width: parseFloat(size.toFixed(1)),
      height: parseFloat(size.toFixed(1)),
      opacity: parseFloat(opacity.toFixed(3)),
    };
  });

  return {
    rects,
    filterId: `grain-contrast-${seed}`,
    slope: parseFloat(slope.toFixed(2)),
    intercept: parseFloat(intercept.toFixed(3)),
  };
}

export function generateVerticalGrainData(
  config: VerticalGrainConfig
): GrainResult {
  const {
    seed,
    viewBoxWidth,
    viewBoxHeight,
    columnSpacing = 0.5,
    density = 0.41,
    contrast = 0.7,
    minWidth = 0.3,
    maxWidth = 1.0,
    minHeight = 3.0,
    maxHeight = 8.0,
    targetElements,
  } = config;

  const rand = mulberry32(seed);
  const cols = Math.floor(viewBoxWidth / columnSpacing);
  const slope = 1 + contrast;
  const intercept = -(slope - 1) / 2;
  const maxElements =
    targetElements ?? Math.round(cols * (viewBoxHeight / 2) * density);
  let count = 0;
  const rects: GrainRect[] = [];

  for (let col = 0; col < cols && count < maxElements; col++) {
    const baseX = col * columnSpacing;
    let y = rand() * 2;

    while (y < viewBoxHeight && count < maxElements) {
      if (rand() < density) {
        const w = minWidth + rand() * (maxWidth - minWidth);
        const h = minHeight + rand() * (maxHeight - minHeight);
        const x = baseX + (rand() - 0.5) * columnSpacing * 0.3;
        const opacity = contrastBiasedOpacity(rand(), contrast);
        const clampedY = Math.min(y, viewBoxHeight - h);
        const clampedX = Math.max(0, Math.min(x, viewBoxWidth - w));

        rects.push({
          x: parseFloat(clampedX.toFixed(2)),
          y: parseFloat(clampedY.toFixed(2)),
          width: parseFloat(w.toFixed(2)),
          height: parseFloat(h.toFixed(2)),
          opacity: parseFloat(opacity.toFixed(3)),
        });
        count++;
      }
      y += minHeight * 0.5 + rand() * minHeight;
    }
  }

  return {
    rects,
    filterId: `vgrain-contrast-${seed}`,
    slope: parseFloat(slope.toFixed(2)),
    intercept: parseFloat(intercept.toFixed(3)),
  };
}
