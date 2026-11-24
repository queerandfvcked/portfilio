/* Maps that are too large to decode on a phone. The stage still shows a light
   preview, and a click opens a tiled viewer that only downloads what is on
   screen. Keys stay the original image paths, because that is what every block
   passes to openImageModal. */
export const TILED_MAPS = {
  '/assets/plata-qr/map3-lifecycle.webp': {
    dzi: '/assets/plata-qr/tiles/map3-lifecycle/map3-lifecycle.dzi',
    preview: '/assets/plata-qr/previews/map3-lifecycle-preview.webp'
  },
  '/assets/plata-qr/map1-create.webp': {
    dzi: '/assets/plata-qr/tiles/map1-create/map1-create.dzi',
    preview: '/assets/plata-qr/previews/map1-create-preview.webp'
  },
  '/assets/plata-qr/map2-main-path.webp': {
    dzi: '/assets/plata-qr/tiles/map2-main-path/map2-main-path.dzi',
    preview: '/assets/plata-qr/previews/map2-main-path-preview.webp'
  }
}
