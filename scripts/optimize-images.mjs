// Converts the case study screenshots in public/assets from PNG/JPEG to WebP.
//
// Why: the exported PNGs are 3000-5800px wide and 1-5 MB each. WebP at q92 is
// visually indistinguishable in practice (PSNR 42-48 dB on these files) and
// roughly 10x smaller, which matters for both first paint and repo size.
//
// - images wider than MAX_WIDTH are downscaled first (5000px+ exports are
//   unnecessary even for a lightbox on a 4K screen)
// - alpha is preserved with a high alpha quality
// - the original .png/.jpg is deleted once the .webp exists
// - public/assets/case-main is skipped: those files are produced with their
//   own responsive widths by scripts/optimize-cases.mjs
//
// After running this, update any /assets/...png|jpg references to .webp:
//   rg -l "/assets/.*\.(png|jpe?g)" src
// The originals stay in git history: `git checkout -- public/assets`.

import sharp from 'sharp'
import { readdir, stat, writeFile, rename, unlink } from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const ASSETS = path.join(ROOT, 'public', 'assets')
const MAX_WIDTH = 2880
const QUALITY = 92
const SKIP_DIRS = ['case-main']
const EXTENSIONS = /\.(png|jpe?g)$/i

const kb = (bytes) => Math.round(bytes / 1024)

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((entry) => {
      if (entry.isDirectory()) {
        if (SKIP_DIRS.includes(entry.name)) return []
        return walk(path.join(dir, entry.name))
      }
      return Promise.resolve(path.join(dir, entry.name))
    })
  )
  return files.flat()
}

let before = 0
let after = 0

const files = (await walk(ASSETS)).filter((file) => EXTENSIONS.test(file))

for (const file of files) {
  const input = await stat(file)
  const meta = await sharp(file).metadata()
  const output = file.replace(EXTENSIONS, '.webp')

  const buffer = await sharp(file)
    .resize({ width: Math.min(meta.width, MAX_WIDTH), withoutEnlargement: true })
    .webp({ quality: QUALITY, alphaQuality: 95, effort: 6 })
    .toBuffer()

  // Temp file + rename so an interrupted run never leaves a half-written asset.
  const temp = `${output}.tmp`
  await writeFile(temp, buffer)
  await rename(temp, output).catch(async (error) => {
    await unlink(temp).catch(() => {})
    throw error
  })
  await unlink(file)

  before += input.size
  after += buffer.length
  const width = Math.min(meta.width, MAX_WIDTH)
  console.log(
    `  ${String(kb(input.size)).padStart(5)} -> ${String(kb(buffer.length)).padStart(4)} kB  ` +
      `${path.relative(ASSETS, output)} (${meta.width === width ? `${width}px` : `${meta.width} -> ${width}px`})`
  )
}

console.log(
  `\n${files.length} files: ${(before / 1024 / 1024).toFixed(1)} MB -> ${(after / 1024 / 1024).toFixed(1)} MB ` +
    `(-${(100 - (after / before) * 100).toFixed(0)}%)`
)
