import sharp from 'sharp'
import { mkdir, rm, stat } from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const SRC = path.join(ROOT, 'assets-src', 'case-main')
const OUT = path.join(ROOT, 'public', 'assets', 'case-main')

// Transparent mockups keep alpha and ship WebP + AVIF.
// Opaque card covers also get a JPEG fallback.
const JOBS = [
  { src: 'zhabka desktop.png', out: 'zhabka-desktop', alpha: true, widths: [800, 1200, 1600, 2000] },
  { src: 'zhabka mobile.png', out: 'zhabka-mobile', alpha: true, widths: [800, 1200] },
  { src: 'keepl desktop.png', out: 'keepl-desktop', alpha: true, widths: [800, 1200, 1600, 2000] },
  { src: 'keepl mob.png', out: 'keepl-mobile', alpha: true, widths: [800, 1200, 1600] },
  { src: 'fintech.png', out: 'fintech', alpha: false, widths: [700, 1000, 1400, 2000] },
  { src: 'hired.png', out: 'hired', alpha: false, widths: [700, 1000, 1400, 2000] }
]

const kb = (bytes) => `${Math.round(bytes / 1024)} kB`

await rm(OUT, { recursive: true, force: true })
await mkdir(OUT, { recursive: true })

let total = 0

for (const job of JOBS) {
  const input = path.join(SRC, job.src)
  const meta = await sharp(input).metadata()

  for (const width of job.widths) {
    if (width > meta.width) continue

    const pipeline = sharp(input).resize({ width, withoutEnlargement: true })
    const base = path.join(OUT, `${job.out}-${width}`)

    const avif = await pipeline.clone().avif({ quality: 52, effort: 5 }).toFile(`${base}.avif`)
    const webp = await pipeline.clone().webp({ quality: 74, effort: 5, alphaQuality: 90 }).toFile(`${base}.webp`)

    total += avif.size + webp.size
    let line = `  ${job.out}-${width}.avif ${kb(avif.size)}  .webp ${kb(webp.size)}`

    if (!job.alpha) {
      const jpeg = await pipeline.clone().jpeg({ quality: 80, mozjpeg: true }).toFile(`${base}.jpg`)
      total += jpeg.size
      line += `  .jpg ${kb(jpeg.size)}`
    }

    console.log(line)
  }
}

console.log(`\nTotal: ${(total / 1024 / 1024).toFixed(2)} MB`)
