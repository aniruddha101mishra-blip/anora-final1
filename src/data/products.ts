import type { Product } from '@/types'

const VARIANTS = [
  { ml: 100, price: 2499, size: 'Eau de Parfum · 100ml', freeShipping: true },
]

export const PRODUCTS: Product[] = [
  {
    id:       'anora-caru',
    name:     'Anora — Cāru',
    tagline:  'A radiant floral bouquet lifted by sun-drenched citrus',
    size:     'Eau de Parfum · 100ml',
    price:    2499,
    image:    'https://res.cloudinary.com/dtips5xbg/image/upload/f_auto,q_auto/anora-1_afkq6k',
    notes:    ['MUSK', 'नीलफलम्', 'Floral'],
    category: 'Intense · Sweet · Refreshing',
    variants: VARIANTS,
  },
  {
    id:       'anora-soma',
    name:     'Anora — Somā',
    tagline:  'A blooming floral journey through spring gardens at dawn',
    size:     'Eau de Parfum · 100ml',
    price:    2499,
    image:    'https://res.cloudinary.com/dtips5xbg/image/upload/f_auto,q_auto/v1781629692/IMG_20260616_204727_1_uuifbd.png',
    notes:    ['Lily', 'वसन्तस्मितम्', 'Tuberose'],
    category: 'Floral · Fresh · Feminine',
    variants: VARIANTS,
  },
  {
    id:       'anora-sisir',
    name:     'Anora — Śiśir',
    tagline:  'A cool aquatic breeze with crisp mint and golden undertones',
    size:     'Eau de Parfum · 100ml',
    price:    2499,
    image:    'https://res.cloudinary.com/dtips5xbg/image/upload/f_auto,q_auto/v1781629691/IMG_20260616_210049_qwlyjh.png',
    notes:    ['Marine Accord', 'स्वर्णफलम्', 'Mint'],
    category: 'Aqua · Fresh · Cool',
    variants: VARIANTS,
  },
]
