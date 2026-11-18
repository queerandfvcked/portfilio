import sharp from 'sharp'
import { mkdir, rm, stat } from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const SRC = path.join(ROOT, 'assets-src', 'case-main')
const OUT = path.join(ROOT, 'public', 'assets', 'case-main')

// Transparent mockups keep alpha and ship WebP.
// Opaque card covers also get a JPEG fallback.
// `compose` jobs build a 16:10 card cover from two mockups instead of a source file.
const JOBS = [
  { src: 'zhabka desktop.png', out: 'zhabka-desktop', alpha: true, widths: [800, 1200, 1600, 2000] },
  { src: 'zhabka mobile.png', out: 'zhabka-mobile', alpha: true, widths: [800, 1200] },
  { src: 'keepl desktop.png', out: 'keepl-desktop', alpha: true, widths: [800, 1200, 1600, 2000] },
  { src: 'keepl mob.png', out: 'keepl-mobile', alpha: true, widths: [800, 1200, 1600] },
  { src: 'fintech.png', out: 'fintech', alpha: false, widths: [700, 1000, 1400, 2000] },
  { src: 'hired.png', out: 'hired', alpha: false, widths: [700, 1000, 1400, 2000] },
  { src: 'plata-qr-atm.png', out: 'plata-atm', alpha: true, widths: [800] },
  { src: 'plata-qr-phone.png', out: 'plata-phone', alpha: true, widths: [800, 1200, 1600, 2000] },
  { compose: 'plata-cover', out: 'plata-cover', alpha: true, widths: [800, 1200, 1600] }
]

// 16:10 canvas for compact case cards; layers are mockups trimmed to their content.
const COVER = { width: 2000, height: 1250 }
const COVER_LAYERS = {
  'plata-cover': [
    { src: 'plata-qr-phone.png', height: 0.72, left: 0.08, top: 0.22 },
    { src: 'plata-qr-atm.png', height: 0.96, left: 0.6, top: 0.03 }
  ]
}

const buildCover = async (name) => {
  const layers = []

  for (const layer of COVER_LAYERS[name]) {
    const { data, info } = await sharp(path.join(SRC, layer.src))
      .trim({ threshold: 12 })
      .toBuffer({ resolveWithObject: true })
    const height = Math.round(COVER.height * layer.height)
    const width = Math.round(height * (info.width / info.height))

    layers.push({
      input: await sharp(data).resize({ height }).png().toBuffer(),
      left: Math.round(COVER.width * layer.left),
      top: Math.round(COVER.height * layer.top)
    })
  }

  return sharp({
    create: {
      width: COVER.width,
      height: COVER.height,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite(layers)
    .png()
    .toBuffer()
}

const kb = (bytes) => `${Math.round(bytes / 1024)} kB`

await rm(OUT, { recursive: true, force: true })
await mkdir(OUT, { recursive: true })

let total = 0

for (const job of JOBS) {
  const input = job.compose ? await buildCover(job.compose) : path.join(SRC, job.src)
  const meta = await sharp(input).metadata()

  for (const width of job.widths) {
    if (width > meta.width) continue

    const pipeline = sharp(input).resize({ width, withoutEnlargement: true })
    const base = path.join(OUT, `${job.out}-${width}`)

    const webp = await pipeline.clone().webp({ quality: 74, effort: 5, alphaQuality: 90 }).toFile(`${base}.webp`)

    total += webp.size
    let line = `  ${job.out}-${width}.webp ${kb(webp.size)}`

    if (!job.alpha) {
      const jpeg = await pipeline.clone().jpeg({ quality: 80, mozjpeg: true }).toFile(`${base}.jpg`)
      total += jpeg.size
      line += `  .jpg ${kb(jpeg.size)}`
    }

    console.log(line)
  }
}

console.log(`\nTotal: ${(total / 1024 / 1024).toFixed(2)} MB`)
