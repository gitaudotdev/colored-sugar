export const wardrobeMoments = [
  {
    id: 'welcome-dinner',
    title: 'Welcome dinner',
    description: 'Start the weekend with a confident entrance piece that photographs well and still feels relaxed.'
  },
  {
    id: 'ceremony',
    title: 'Main ceremony',
    description: 'Choose the central statement look for vows, introductions, or the formal family moment.'
  },
  {
    id: 'after-party',
    title: 'After-party',
    description: 'Switch into movement, shine, or drama for the second half of the night.'
  },
  {
    id: 'farewell-brunch',
    title: 'Farewell brunch',
    description: 'Close the weekend with something soft, fresh, and easy to style again.'
  }
] as const

export const wardrobeOptions = {
  'welcome-dinner': [
    {
      id: 'gold-sculpt',
      name: 'Gold sculpt dress',
      silhouette: 'Structured mini with a sculpted waist',
      fabric: 'Lustrous satin',
      palette: 'Gold, bronze, champagne',
      note: 'A polished arrival look with the same energy as the hero editorial.',
      garmentType: 'Occasion wear',
      colors: ['#f0c55f', '#8b5f13', '#f7ebc0']
    },
    {
      id: 'teal-kimono-set',
      name: 'Teal kimono set',
      silhouette: 'Fluid overlay with a column base',
      fabric: 'Lightweight organza and crepe',
      palette: 'Deep teal, soft black',
      note: 'Elegant, photogenic, and easy to layer with statement jewelry.',
      garmentType: 'Kimono / soft drape',
      colors: ['#0d6970', '#142f34', '#b9ecee']
    },
    {
      id: 'graphic-menswear',
      name: 'Graphic menswear set',
      silhouette: 'Sharp tunic top with a clean trouser line',
      fabric: 'Cotton blend with embroidery detail',
      palette: 'Black, gold',
      note: 'For a groom or guest edit that wants a tailored African detail.',
      garmentType: 'Menswear',
      colors: ['#15141a', '#ba8813', '#ebe2be']
    }
  ],
  ceremony: [
    {
      id: 'ankara-royal',
      name: 'Royal Ankara gown',
      silhouette: 'Full-length column with statement sleeve volume',
      fabric: 'Print cotton with structured lining',
      palette: 'Turquoise, gold, midnight',
      note: 'Ideal when the ceremony look needs presence and cultural texture.',
      garmentType: 'Bridal',
      colors: ['#1ba5b2', '#e4b13f', '#112d33']
    },
    {
      id: 'orange-tulle',
      name: 'Orange tulle statement',
      silhouette: 'Tailored jacket over layered tulle volume',
      fabric: 'Suiting and tulle',
      palette: 'Citrus orange, charcoal',
      note: 'A directional ceremonial look for a client who wants fashion-first drama.',
      garmentType: 'Occasion wear',
      colors: ['#ff8f1f', '#1c1a1f', '#ffd29a']
    },
    {
      id: 'modern-traditional',
      name: 'Modern traditional set',
      silhouette: 'Wrap-inspired bodice with a flowing skirt',
      fabric: 'Kitenge with soft drape panels',
      palette: 'Blue, lime, black',
      note: 'A strong choice for a Kenyan wedding weekend with a custom cultural spin.',
      garmentType: 'Occasion wear',
      colors: ['#1b8da1', '#d4d742', '#1d1c22']
    }
  ],
  'after-party': [
    {
      id: 'lilac-fall',
      name: 'Lilac waterfall dress',
      silhouette: 'Soft drape with a clean neckline',
      fabric: 'Fluid crepe',
      palette: 'Lilac, plum',
      note: 'Light enough for movement, dramatic enough for content.',
      garmentType: 'Occasion wear',
      colors: ['#c5b7ef', '#55386a', '#f0e9ff']
    },
    {
      id: 'studio-red',
      name: 'Red studio print',
      silhouette: 'Wrap dress with sculpted shape',
      fabric: 'Print cotton',
      palette: 'Red, black',
      note: 'A bold print-led choice that still feels easy and celebratory.',
      garmentType: 'Occasion wear',
      colors: ['#c72e2d', '#211e24', '#f5c1bc']
    },
    {
      id: 'midnight-blue',
      name: 'Midnight blue drape',
      silhouette: 'Voluminous sleeve with a defined waist',
      fabric: 'Soft matte satin',
      palette: 'Midnight, electric blue',
      note: 'Refined and striking for the client who wants a cooler palette.',
      garmentType: 'Kimono / soft drape',
      colors: ['#101822', '#17a7d3', '#b8f1ff']
    }
  ],
  'farewell-brunch': [
    {
      id: 'olive-skirt',
      name: 'Olive brunch edit',
      silhouette: 'Printed blouse with a fluid metallic skirt',
      fabric: 'Printed satin and soft pleats',
      palette: 'Olive, ivory',
      note: 'A lighter, wearable finish to the weekend that still feels styled.',
      garmentType: 'Executive wear',
      colors: ['#88914b', '#dfd8bf', '#524930']
    },
    {
      id: 'soft-kimono',
      name: 'Soft kimono column',
      silhouette: 'Longline outer layer over a clean inner dress',
      fabric: 'Sheer organza over matte base',
      palette: 'Forest, black',
      note: 'Easy for brunch, travel, or a low-key final event with polish.',
      garmentType: 'Kimono / soft drape',
      colors: ['#255953', '#16171d', '#d7f2e8']
    },
    {
      id: 'sunrise-print',
      name: 'Sunrise print set',
      silhouette: 'Relaxed print set with statement sleeves',
      fabric: 'Print cotton',
      palette: 'Pink, orange, turquoise',
      note: 'For a client who wants the brunch look to feel as joyful as the weekend.',
      garmentType: 'Occasion wear',
      colors: ['#f06b95', '#ff9b28', '#1ca9b3']
    }
  ]
} as const
