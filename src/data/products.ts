import type { Product } from '@/types'

export const PRODUCTS: Product[] = [
  {
    id:       'anora-caru',
    name:     'Anora — Cāru',
    tagline:  'A radiant floral bouquet lifted by sun-drenched citrus',
    size:     'Eau de Parfum · 30ml',
    price:    499,
    image:    'https://res.cloudinary.com/dtips5xbg/image/upload/f_auto,q_auto/anora-1_afkq6k',
    notes:    ['MUSK', 'नीलफलम्', 'Floral'],
    category: 'Intense · Sweet · Refreshing',
  },
  {
    id:       'anora-soma',
    name:     'Anora — Somā',
    tagline:  'A blooming floral journey through spring gardens at dawn',
    size:     'Eau de Parfum · 30ml',
    price:    499,
    image:    'https://res.cloudinary.com/dtips5xbg/image/upload/f_auto,q_auto/v1781629692/IMG_20260616_204727_1_uuifbd.png',
    notes:    ['Lily', 'वसन्तस्मितम्', 'Tuberose'],
    category: 'Floral · Fresh · Feminine',
  },
  {
    id:       'anora-sisir',
    name:     'Anora — Śiśir',
    tagline:  'A cool aquatic breeze with crisp mint and golden undertones',
    size:     'Eau de Parfum · 30ml',
    price:    499,
    image:    'https://res.cloudinary.com/dtips5xbg/image/upload/f_auto,q_auto/v1781629691/IMG_20260616_210049_qwlyjh.png',
    notes:    ['Marine Accord', 'स्वर्णफलम्', 'Mint'],
    category: 'Aqua · Fresh · Cool',
  },
]

export const COMBO_PACK = {
  id:       'anora-trayee',
  name:     'त्रयी कीर्तिः — Pack of Three',
  tagline:  'The complete ANORA collection — Cāru · Somā · Śiśir',
  size:     '3 × Eau de Parfum · 30ml each',
  price:    399,
  originalPrice: 1497,
  image:    'https://res.cloudinary.com/dtips5xbg/image/upload/f_auto,q_auto/v1781629690/IMG_20260616_210624_1_nozoha.png',
  notes:    ['Cāru', 'Somā', 'Śiśir'],
  category: 'त्रयी कीर्तिः · Exclusive Combo',
  includes: ['anora-caru', 'anora-soma', 'anora-sisir'],
}
