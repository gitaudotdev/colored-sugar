export interface LookbookItem {
  id: string
  title: string
  handle: string
  description: string
  price: string
  image: string
  imageAlt: string
  fabric: string
}

export interface ShopifyCollectionProduct {
  id: string
  title: string
  handle: string
  description: string
  price: string
  image: string | null
  imageAlt: string
  fabric: string
  availability: string
  source: 'shopify' | 'studio'
}

export interface ShopifyCollectionFeed {
  slug: string
  matchedProductCount: number
  source: 'shopify' | 'studio'
  products: ShopifyCollectionProduct[]
}

export interface ShopifyCollectionSummary {
  slug: string
  matchedProductCount: number
  source: 'shopify' | 'studio'
}
