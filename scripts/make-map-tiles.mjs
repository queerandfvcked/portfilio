// Builds lightweight previews and Deep Zoom (DZI) tile pyramids for the huge
// Plata QR scenario maps, so the viewer only downloads what is on screen.
//
// Run manually, never in the build:
//   node scripts/make-map-tiles.mjs map3-lifecycle
//   node scripts/make-map-tiles.mjs map1-create map2-main-path
//
// - sources are read from assets-src/plata-qr-maps/<name>.png when present,
//   otherwise from public/assets/plata-qr/<name>.webp (originals are never touched)
// - preview -> public/assets/plata-qr/previews/<name>-preview.webp
// - tiles   -> public/assets/plata-qr/tiles/<name>/<name>.dzi + <name>_files/

import sharp from 'sharp'
import { access, mkdir, readdir, stat } from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const PNG_DIR = path.join(ROOT, 'assets-src', 'plata-qr-maps')
const PUBLIC_DIR = path.join(ROOT, 'public', 'assets', 'plata-qr')
const PREVIEW_DIR = path.join(PUBLIC_DIR, 'previews')
const TILES_DIR = path.join(PUBLIC_DIR, 'tiles')

const PREVIEW_LONG_SIDE = 2000
const PREVIEW_QUALITY = 85
const TILE_SIZE = 512
const TILE_OVERLAP = 1
const TILE_QUALITY = 85
const MAX_TILES_WARNING = 1500

const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`

const exists = async (file) => {
  try {
    await access(file)
    return true
  } catch {
    return false
  }
}

const dirSize = async (dir) => {
  let bytes = 0
  let files = 0
  const entries = await readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      const nested = await dirSize(full)
      bytes += nested.bytes
      files += nested.files
    } else {
      bytes += (await stat(full)).size
      files += 1
    }
  }

  return { bytes, files }
}

const names = process.argv.slice(2).filter((arg) => !arg.startsWith('-'))

if (names.length === 0) {
  console.error('Usage: node scripts/make-map-tiles.mjs <map-name> [map-name ...]')
  process.exit(1)
}

await mkdir(PREVIEW_DIR, { recursive: true })

for (const name of names) {
  const png = path.join(PNG_DIR, `${name}.png`)
  const webp = path.join(PUBLIC_DIR, `${name}.webp`)
  const source = (await exists(png)) ? png : webp

  if (!(await exists(source))) {
    console.log(`skip ${name}: no source at ${path.relative(ROOT, png)} or ${path.relative(ROOT, webp)}`)
    continue
  }

  const meta = await sharp(source, { limitInputPixels: false }).metadata()
  const longSide = Math.max(meta.width, meta.height)
  const landscape = meta.width >= meta.height

  const previewPath = path.join(PREVIEW_DIR, `${name}-preview.webp`)
  const previewInfo = await sharp(source, { limitInputPixels: false, sequentialRead: true })
    .resize(
      landscape
        ? { width: PREVIEW_LONG_SIDE, withoutEnlargement: true }
        : { height: PREVIEW_LONG_SIDE, withoutEnlargement: true }
    )
    .webp({ quality: PREVIEW_QUALITY, effort: 5 })
    .toFile(previewPath)

  const mapTilesDir = path.join(TILES_DIR, name)
  await mkdir(mapTilesDir, { recursive: true })

  // The encoder MUST be selected before tile(): calling .webp() after it
  // replaces the Deep Zoom output with a single flat image.
  // sharp appends ".dzi" itself, so the output path is passed as <name>.dz;
  // the result is <name>.dzi plus a <name>_files/ pyramid next to it.
  const dziPath = path.join(mapTilesDir, `${name}.dzi`)
  await sharp(source, { limitInputPixels: false, sequentialRead: true })
    .webp({ quality: TILE_QUALITY, effort: 4 })
    .tile({ size: TILE_SIZE, overlap: TILE_OVERLAP, layout: 'dz' })
    .toFile(path.join(mapTilesDir, `${name}.dz`))

  const tiles = await dirSize(mapTilesDir)

  console.log(
    `${name}: ${meta.width}x${meta.height}\n` +
      `  source  ${path.relative(ROOT, source)} (${mb((await stat(source)).size)})\n` +
      `  preview ${path.relative(ROOT, previewPath)} ${previewInfo.width}x${previewInfo.height} (${mb(previewInfo.size)})\n` +
      `  tiles   ${path.relative(ROOT, mapTilesDir)}: ${tiles.files} files, ${mb(tiles.bytes)}` +
      ` (tile ${TILE_SIZE}px, overlap ${TILE_OVERLAP})`
  )

  if (tiles.files > MAX_TILES_WARNING) {
    console.log(`  ! more than ${MAX_TILES_WARNING} files for one map: consider tile size 1024`)
  }
}
