import type { LookbookItem } from '~/types/shopify'

interface ShopifyProductsResponse {
  products: {
    edges: Array<{
      node: {
        id: string
        handle: string
        title: string
        description: string
        featuredImage?: {
          url: string
          altText?: string | null
        } | null
        priceRange: {
          minVariantPrice: {
            amount: string
            currencyCode: string
          }
        }
        fabric?: {
          value?: string | null
        } | null
      }
    }>
  }
}

const mockLookbook: LookbookItem[] = [
  {
    id: 'mock-1',
    title: 'Teal Print Statement Dress',
    handle: 'royal-ankara-occasion-set',
    description: 'Print-led silhouette with volume and presence, designed to echo the strongest studio looks from the feed.',
    price: 'From KES 42,000',
    image:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Statement teal print dress',
    fabric: 'Ankara'
  },
  {
    id: 'mock-2',
    title: 'Riviera Organza Kimono',
    handle: 'modern-kitenge-bridal-look',
    description: 'Fluid, versatile layering piece designed for elegant movement and easy styling from day to evening.',
    price: 'From KES 5,000',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Organza kimono styling piece',
    fabric: 'Organza'
  },
  {
    id: 'mock-3',
    title: 'Tailored Tulle Birthday Look',
    handle: 'statement-reception-dress',
    description: 'Structured tailoring up top, bold theatrical volume below, and a silhouette made to own the room.',
    price: 'From KES 55,000',
    image:
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Statement tulle and tailoring look',
    fabric: 'Occasion'
  }
]

const query = `
  query LookbookProducts {
    products(first: 6, sortKey: BEST_SELLING) {
      edges {
        node {
          id
          handle
          title
          description
          featuredImage {
            url
            altText
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`

export default defineEventHandler(async (): Promise<LookbookItem[]> => {
  const config = useRuntimeConfig()
  const normalizedStoreDomain = config.public.shopifyStoreDomain
    .replace(/^https?:\/\//, '')
    .replace(/\/.*$/, '')

  if (!config.public.shopifyStoreDomain || !config.public.shopifyStorefrontToken) {
    return mockLookbook
  }

  const endpoint = `https://${normalizedStoreDomain}/api/${config.public.shopifyApiVersion}/graphql.json`
  const response = await $fetch<{ data?: ShopifyProductsResponse; errors?: Array<{ message: string }> }>(
    endpoint,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': config.public.shopifyStorefrontToken
      },
      body: { query }
    }
  )

  if (response.errors?.length || !response.data) {
    return mockLookbook
  }

  return response.data.products.edges.map(({ node }, index) => ({
    id: node.id,
    title: node.title,
    handle: node.handle,
    description: node.description || 'Consultation-led tailoring with handcrafted finishing.',
    price: `${node.priceRange.minVariantPrice.currencyCode} ${Number(node.priceRange.minVariantPrice.amount).toLocaleString()}`,
    image:
      node.featuredImage?.url ||
      mockLookbook[index % mockLookbook.length].image,
    imageAlt:
      node.featuredImage?.altText ||
      `${node.title} tailored look`,
    fabric: ['Ankara', 'Kitenge', 'Aso Oke', 'Silk blend'][index % 4]
  }))
})
