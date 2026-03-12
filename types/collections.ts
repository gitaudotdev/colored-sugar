export interface CollectionPalette {
  primary: string
  secondary: string
  accent: string
  surface: string
  ink: string
}

export interface CollectionHighlight {
  label: string
  value: string
}

export interface CollectionFrame {
  eyebrow: string
  title: string
  caption: string
  shape: 'portrait' | 'landscape' | 'square'
}

export interface CollectionLook {
  name: string
  silhouette: string
  detail: string
  note: string
}

export interface CollectionData {
  slug: string
  name: string
  kicker: string
  tagline: string
  intro: string
  description: string
  palette: CollectionPalette
  highlights: CollectionHighlight[]
  frames: CollectionFrame[]
  looks: CollectionLook[]
  moments: string[]
}
