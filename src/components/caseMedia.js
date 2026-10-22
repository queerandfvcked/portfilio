// Intrinsic metadata for the optimised case images.
// `widths` mirrors the sizes produced by scripts/optimize-cases.mjs.
export const CASE_IMAGES = {
  'zhabka-desktop': {
    width: 2400,
    height: 1449,
    alpha: true,
    widths: [800, 1200, 1600, 2000]
  },
  'zhabka-mobile': {
    width: 1543,
    height: 2454,
    alpha: true,
    widths: [800, 1200]
  },
  'keepl-desktop': {
    width: 2187,
    height: 2323,
    alpha: true,
    widths: [800, 1200, 1600, 2000]
  },
  'keepl-mobile': {
    width: 1800,
    height: 3680,
    alpha: true,
    widths: [800, 1200, 1600]
  },
  fintech: {
    width: 2400,
    height: 1800,
    alpha: false,
    widths: [700, 1000, 1400, 2000]
  },
  hired: {
    width: 2400,
    height: 1800,
    alpha: false,
    widths: [700, 1000, 1400, 2000]
  }
}

export const CASE_MEDIA = {
  zhabka: { laptop: 'zhabka-desktop', phone: 'zhabka-mobile', cover: 'zhabka-desktop' },
  'keepl-app': { laptop: 'keepl-desktop', phone: 'keepl-mobile', cover: 'keepl-desktop' },
  'add-transition': { cover: 'fintech' },
  'hired-app': { cover: 'hired' }
}
