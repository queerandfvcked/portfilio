// Converts the three Plata QR scenario maps from PNG to WebP for the site.
//
// Run: node scripts/optimize-plata-maps.mjs
//
// - sources live in assets-src/plata-qr-maps/*.png and are never modified
// - outputs overwrite only the three matching files in public/assets/plata-qr
// - no resizing, except a proportional downscale when the long side exceeds
//   16000px (WebP's own limit is 16383)
// - files are processed one by one to keep memory usage low on large maps

import sharp from 'sharp'
import { access, mkdir, stat } from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const SRC = path.join(ROOT, 'assets-src', 'plata-qr-maps')
const OUT = path.join(ROOT, 'public', 'assets', 'plata-qr')

const MAX_SIDE = 16000
const QUALITY = 78

const FILES = ['map1-create', 'map2-main-path', 'map3-lifecycle']

const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`

const exists = async (file) => {
  try {
    await access(file)
    return true
  } catch {
    return false
  }
}

await mkdir(OUT, { recursive: true })

let total = 0

for (const name of FILES) {
  const input = path.join(SRC, `${name}.png`)
  const output = path.join(OUT, `${name}.webp`)

  if (!(await exists(input))) {
    console.log(`skip ${name}: no source at ${path.relative(ROOT, input)}`)
    continue
  }

  const meta = await sharp(input, { limitInputPixels: false }).metadata()
  const longSide = Math.max(meta.width, meta.height)

  let pipeline = sharp(input, { limitInputPixels: false })
  let outWidth = meta.width
  let outHeight = meta.height
  let resized = false

  if (longSide > MAX_SIDE) {
    const scale = MAX_SIDE / longSide
    outWidth = Math.round(meta.width * scale)
    outHeight = Math.round(meta.height * scale)
    resized = true

    pipeline =
      meta.width >= meta.height
        ? pipeline.resize({ width: MAX_SIDE })
        : pipeline.resize({ height: MAX_SIDE })
  }

  const info = await pipeline
    .webp({ quality: QUALITY, effort: 5, smartSubsample: true })
    .toFile(output)

  const before = await stat(input)
  total += info.size

  console.log(
    `${name}.webp  ${meta.width}x${meta.height} (${mb(before.size)})` +
      ` -> ${info.width}x${info.height} (${mb(info.size)})` +
      (resized ? `  resized from long side ${longSide} to ${MAX_SIDE}` : '  no resize')
  )
}

console.log(`\nTotal: ${mb(total)}`)
