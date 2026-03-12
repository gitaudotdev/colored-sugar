import type { CollectionData } from '~/types/collections'

export const collections: CollectionData[] = [
  {
    slug: 'print-stories',
    name: 'Print Stories',
    kicker: 'Ankara, kitenge, graphic print',
    tagline: 'Bold print pieces with movement, polish, and enough structure to carry a room.',
    intro:
      'Print Stories is where Coloured Sugar feels most immediately recognisable: strong pattern, clear silhouette, and colour placed with confidence.',
    description:
      'The collection pulls from the studio’s strongest print-led looks, from blue-and-black ceremony dresses to multicolour flowing kaftans. The finish is never random. Each piece is balanced to feel expressive, flattering, and sharp in photographs.',
    palette: {
      primary: '#1295a3',
      secondary: '#16363c',
      accent: '#e4b13f',
      surface: '#f4fbfb',
      ink: '#fffaf3'
    },
    highlights: [
      { label: 'Mood', value: 'Graphic and bright' },
      { label: 'Best for', value: 'Celebrations and standout day dressing' },
      { label: 'Finish', value: 'Custom cut and studio-fitted' }
    ],
    frames: [
      {
        eyebrow: 'Studio print',
        title: 'Ceremony blue',
        caption: 'Pattern-forward silhouettes with clean lines and controlled volume.',
        shape: 'portrait'
      },
      {
        eyebrow: 'Cold-weather edit',
        title: 'Red Ankara layers',
        caption: 'Prints that still feel grounded, warm, and elevated.',
        shape: 'square'
      },
      {
        eyebrow: 'Statement flow',
        title: 'Colour-rich kaftans',
        caption: 'Movement, ease, and colour blocking that still reads polished.',
        shape: 'landscape'
      }
    ],
    looks: [
      {
        name: 'Column dress',
        silhouette: 'Long vertical lines with soft width through the skirt',
        detail: 'Ankara or kitenge placed to elongate the body',
        note: 'Ideal when the print itself should lead the full look'
      },
      {
        name: 'Kimono-cut print dress',
        silhouette: 'Relaxed shape with generous sleeve drama',
        detail: 'Works well for batik, repeat motifs, and layered colour stories',
        note: 'Best when the client wants presence without tight structure'
      },
      {
        name: 'Fitted statement dress',
        silhouette: 'Waist-defining with stronger shoulder or sleeve shape',
        detail: 'Print is controlled so the final look reads intentional on camera',
        note: 'Strong option for birthdays, dinners, and photo-led events'
      }
    ],
    moments: ['Birthday looks', 'Day-to-night dressing', 'Wedding guest pieces', 'Content shoots'],
    shopifyKeywords: ['ankara', 'kitenge', 'batik', 'print', 'pattern', 'african print', 'kaftan'],
    fallbackProducts: [
      {
        title: 'Ceremony Blue Print Dress',
        description: 'A strong studio print piece shaped for celebrations, portraits, and a polished entrance.',
        price: 'From KES 24,000',
        fabric: 'Ankara'
      },
      {
        title: 'Cold-Weather Ankara Layer',
        description: 'Ankara styling with warmth, texture, and enough structure to feel elevated all day.',
        price: 'From KES 18,000',
        fabric: 'Kitenge'
      },
      {
        title: 'Colour Story Kaftan',
        description: 'A flowing statement silhouette for clients who want comfort, print, and movement together.',
        price: 'From KES 22,000',
        fabric: 'Batik'
      }
    ]
  },
  {
    slug: 'occasionwear',
    name: 'Occasionwear',
    kicker: 'Sculpted tailoring, event dressing, special moments',
    tagline: 'Structured pieces for entrances, photographs, and the kind of dressing that becomes the point of the night.',
    intro:
      'Occasionwear is the studio’s sharper side: metallic dresses, corseted waists, sculpted jackets, and elevated event silhouettes.',
    description:
      'This collection is shaped for birthdays, red carpet moments, engagement dinners, wedding events, and every brief that needs a memorable silhouette. It balances drama with fit so the garment still moves well and lands cleanly in person.',
    palette: {
      primary: '#e4b13f',
      secondary: '#4d3510',
      accent: '#ff8f1f',
      surface: '#fff8ec',
      ink: '#fffaf3'
    },
    highlights: [
      { label: 'Mood', value: 'Sculpted and high-impact' },
      { label: 'Best for', value: 'Birthdays, weddings, formal evenings' },
      { label: 'Finish', value: 'Tailored and camera-ready' }
    ],
    frames: [
      {
        eyebrow: 'Editorial hero',
        title: 'Gold evening portrait',
        caption: 'Texture, shine, and silhouette-led event dressing.',
        shape: 'portrait'
      },
      {
        eyebrow: 'Birthday edit',
        title: 'Sculpted mini',
        caption: 'Clean tailoring with enough edge to feel celebratory.',
        shape: 'square'
      },
      {
        eyebrow: 'Statement volume',
        title: 'Orange tulle entrance',
        caption: 'Playful structure that still reads formal and styled.',
        shape: 'landscape'
      }
    ],
    looks: [
      {
        name: 'Corseted mini',
        silhouette: 'Strong waist, open neckline, short sculpted skirt',
        detail: 'Built for birthday dressing and event-led styling',
        note: 'A house signature when the brief calls for confident tailoring'
      },
      {
        name: 'Metallic drape gown',
        silhouette: 'Fluid column with shine and shoulder interest',
        detail: 'Designed to catch light and read editorial in motion',
        note: 'Works for formal evenings, receptions, and portraits'
      },
      {
        name: 'Tailored contrast look',
        silhouette: 'Clean blazer structure against a dramatic skirt or base layer',
        detail: 'Used when the client wants edge, not just softness',
        note: 'Ideal for standout fashion moments and themed events'
      }
    ],
    moments: ['Birthday dressing', 'Wedding receptions', 'Formal dinners', 'Red carpet styling'],
    shopifyKeywords: ['occasion', 'event', 'birthday', 'bridal', 'wedding', 'reception', 'gown', 'corset', 'tulle'],
    fallbackProducts: [
      {
        title: 'Gold Evening Statement',
        description: 'Metallic event dressing designed for portraits, formal dinners, and memorable entrances.',
        price: 'From KES 35,000',
        fabric: 'Lamé'
      },
      {
        title: 'Sculpted Birthday Mini',
        description: 'Tailored occasionwear with shape through the waist and a celebratory finish.',
        price: 'From KES 28,000',
        fabric: 'Structured satin'
      },
      {
        title: 'Orange Tulle Entrance Skirt',
        description: 'A playful formal look for clients who want structure up top and volume below.',
        price: 'From KES 32,000',
        fabric: 'Tulle'
      }
    ]
  },
  {
    slug: 'kimonos-and-drape',
    name: 'Kimonos and Drape',
    kicker: 'Soft overlays, waterfall shapes, easy elegance',
    tagline: 'Fluid silhouettes that move beautifully, layer well, and still feel intentional from every angle.',
    intro:
      'Kimonos and Drape holds the softer side of the label: flowing sleeves, semi-sheer layers, waterfall cuts, and dresses that feel airy without becoming vague.',
    description:
      'These pieces suit clients who want movement, softness, and comfort while keeping the final look elevated. The focus is on shape, fabric fall, and styling that feels composed rather than overworked.',
    palette: {
      primary: '#0f6e78',
      secondary: '#241d32',
      accent: '#c9bbe9',
      surface: '#f5f3fb',
      ink: '#fffaf3'
    },
    highlights: [
      { label: 'Mood', value: 'Fluid and composed' },
      { label: 'Best for', value: 'Resort, dinners, effortless statement dressing' },
      { label: 'Finish', value: 'Lightweight and elegant' }
    ],
    frames: [
      {
        eyebrow: 'Resort edit',
        title: 'Riviera kimono',
        caption: 'Easy layering with enough shape to feel dressed up.',
        shape: 'portrait'
      },
      {
        eyebrow: 'Soft evening',
        title: 'Lilac waterfall',
        caption: 'Fluid drape designed to feel airy and cinematic.',
        shape: 'square'
      },
      {
        eyebrow: 'Studio movement',
        title: 'Blue drape dress',
        caption: 'Sleeves and overlays that create motion without losing control.',
        shape: 'landscape'
      }
    ],
    looks: [
      {
        name: 'Waterfall dress',
        silhouette: 'Long, fluid front with asymmetrical fall',
        detail: 'Best when fabric movement is the key part of the brief',
        note: 'Feels elevated for dinners, beach weddings, and photo shoots'
      },
      {
        name: 'Sheer overlay set',
        silhouette: 'Base dress or slip layered with a transparent outer piece',
        detail: 'Lets the styling feel directional without becoming heavy',
        note: 'Strong option for clients who want softness with presence'
      },
      {
        name: 'Studio kimono',
        silhouette: 'Open or belted layer with wide sleeve volume',
        detail: 'Easy to style over a simple base look or matching set',
        note: 'Moves well between resort, brunch, and event dressing'
      }
    ],
    moments: ['Resort looks', 'Destination events', 'Dinner dressing', 'Layered styling'],
    shopifyKeywords: ['kimono', 'drape', 'waterfall', 'organza', 'overlay', 'resort', 'kaftan', 'flow'],
    fallbackProducts: [
      {
        title: 'Riviera Organza Kimono',
        description: 'A lightweight studio layer designed for easy elegance and soft, polished styling.',
        price: 'From KES 5,000',
        fabric: 'Organza'
      },
      {
        title: 'Lilac Waterfall Dress',
        description: 'Fluid lines and soft movement for evening dressing with an effortless feel.',
        price: 'From KES 16,000',
        fabric: 'Chiffon'
      },
      {
        title: 'Blue Drape Studio Dress',
        description: 'A softer statement with movement through the sleeves and a composed silhouette.',
        price: 'From KES 19,000',
        fabric: 'Silk blend'
      }
    ]
  },
  {
    slug: 'menswear-edit',
    name: 'Menswear Edit',
    kicker: 'Graphic detail, clean lines, easy statement pieces',
    tagline: 'Menswear with a studio point of view: crisp silhouettes, print confidence, and details that stand out without overcomplicating the fit.',
    intro:
      'Menswear Edit gives the brand a clear lane for men who want custom African fashion that feels sharp, modern, and wearable beyond one event.',
    description:
      'The focus here is not volume for its own sake. It is clean construction, graphic placement, coordinated sets, and pieces that feel styled but still easy to wear. The result is a tighter, more intentional menswear offering.',
    palette: {
      primary: '#17161d',
      secondary: '#0f6e78',
      accent: '#e4b13f',
      surface: '#f5f6f8',
      ink: '#fffaf3'
    },
    highlights: [
      { label: 'Mood', value: 'Sharp and modern' },
      { label: 'Best for', value: 'Celebrations, portraits, smart casual dressing' },
      { label: 'Finish', value: 'Clean construction with graphic detail' }
    ],
    frames: [
      {
        eyebrow: 'Graphic linework',
        title: 'Black statement shirt',
        caption: 'Minimal base, strong detail placement, polished finish.',
        shape: 'portrait'
      },
      {
        eyebrow: 'Event set',
        title: 'Ceremony blue',
        caption: 'Matching separates built to feel confident and effortless.',
        shape: 'square'
      },
      {
        eyebrow: 'Studio styling',
        title: 'Tailored ease',
        caption: 'Menswear that can read festive without losing clarity.',
        shape: 'landscape'
      }
    ],
    looks: [
      {
        name: 'Graphic tee or shirt',
        silhouette: 'Clean body with detail concentrated through the front',
        detail: 'Great for clients who want a statement without extra volume',
        note: 'Easy to style with denim, tailored trousers, or a full set'
      },
      {
        name: 'Coordinated print set',
        silhouette: 'Top and trouser pairing with unified print direction',
        detail: 'Made to feel bold but still wearable beyond one event',
        note: 'Ideal for celebrations, content shoots, and style-led gatherings'
      },
      {
        name: 'Tailored African shirt',
        silhouette: 'Sharper shoulder and cleaner sleeve finish',
        detail: 'Works well when the client wants something dressier than casualwear',
        note: 'A strong route for family functions and smart occasion dressing'
      }
    ],
    moments: ['Celebration dressing', 'Portrait sessions', 'Wedding functions', 'Smart casual events'],
    shopifyKeywords: ['menswear', 'men', 'male', 'shirt', 'set', 'trouser', 'graphic', 'agbada'],
    fallbackProducts: [
      {
        title: 'Graphic Line Statement Shirt',
        description: 'Clean menswear with focused detail placement and a sharp studio finish.',
        price: 'From KES 6,500',
        fabric: 'Cotton'
      },
      {
        title: 'Ceremony Blue Matching Set',
        description: 'A coordinated menswear look built for celebrations, portraits, and standout arrivals.',
        price: 'From KES 14,000',
        fabric: 'Ankara blend'
      },
      {
        title: 'Tailored African Shirt',
        description: 'A dressier menswear option with crisp lines and styling versatility.',
        price: 'From KES 7,800',
        fabric: 'Cotton twill'
      }
    ]
  }
]

export const collectionSlugs = collections.map((collection) => collection.slug)

export function getCollectionBySlug(slug: string) {
  return collections.find((collection) => collection.slug === slug)
}
