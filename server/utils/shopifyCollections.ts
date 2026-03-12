import type { RuntimeConfig } from 'nuxt/schema'

import { collections, getCollectionBySlug } from '~/data/collections'
import type { CollectionData } from '~/types/collections'
import type { ShopifyCollectionFeed, ShopifyCollectionProduct, ShopifyCollectionSummary } from '~/types/shopify'

interface StorefrontProductNode {
  id: string
  handle: string
  title: string
  description: string
  productType: string
  tags: string[]
  availableForSale: boolean
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
}

interface ShopifyProductsResponse {
  products: {
    edges: Array<{
      node: StorefrontProductNode
    }>
  }
}

const productsQuery = `
  query CollectionCatalogProducts {
    products(first: 40, sortKey: BEST_SELLING) {
      edges {
        node {
          id
          handle
          title
          description
          productType
          tags
          availableForSale
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

function normalizeStoreDomain(storeDomain: string) {
  return storeDomain.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function matchesKeyword(text: string, keyword: string) {
  return new RegExp(`\\b${escapeRegExp(keyword.toLowerCase())}\\b`, 'i').test(text)
}

function scoreProductForCollection(product: StorefrontProductNode, collection: CollectionData) {
  const titleText = `${product.title} ${product.handle}`.toLowerCase()
  const productTypeText = product.productType.toLowerCase()
  const tagText = product.tags.join(' ').toLowerCase()
  const descriptionText = product.description.toLowerCase()

  return collection.shopifyKeywords.reduce((score, keyword) => {
    let nextScore = score

    if (matchesKeyword(titleText, keyword)) {
      nextScore += 4
    }

    if (matchesKeyword(productTypeText, keyword)) {
      nextScore += 3
    }

    if (matchesKeyword(tagText, keyword)) {
      nextScore += 2
    }

    if (matchesKeyword(descriptionText, keyword)) {
      nextScore += 1
    }

    return nextScore
  }, 0)
}

function formatMoney(amount: string, currencyCode: string) {
  const numericAmount = Number(amount)

  if (Number.isNaN(numericAmount)) {
    return `${currencyCode} ${amount}`
  }

  try {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: currencyCode,
      maximumFractionDigits: 0
    }).format(numericAmount)
  } catch {
    return `${currencyCode} ${numericAmount.toLocaleString()}`
  }
}

function inferFabric(product: StorefrontProductNode, collection: CollectionData) {
  const searchableFields = [product.productType, ...product.tags]
    .filter(Boolean)
    .map((value) => value.trim())

  return searchableFields[0] || collection.fallbackProducts[0]?.fabric || collection.kicker
}

function mapStorefrontProduct(product: StorefrontProductNode, collection: CollectionData): ShopifyCollectionProduct {
  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
    description: product.description || collection.intro,
    price: formatMoney(
      product.priceRange.minVariantPrice.amount,
      product.priceRange.minVariantPrice.currencyCode
    ),
    image: product.featuredImage?.url || null,
    imageAlt: product.featuredImage?.altText || `${product.title} by Coloured Sugar`,
    fabric: inferFabric(product, collection),
    availability: product.availableForSale ? 'Ready to order or tailor' : 'Made to order',
    source: 'shopify'
  }
}

function buildFallbackProducts(collection: CollectionData): ShopifyCollectionProduct[] {
  return collection.fallbackProducts.map((product, index) => ({
    id: `${collection.slug}-preview-${index + 1}`,
    title: product.title,
    handle: `${collection.slug}-preview-${index + 1}`,
    description: product.description,
    price: product.price,
    image: null,
    imageAlt: `${product.title} studio preview`,
    fabric: product.fabric,
    availability: 'Studio preview',
    source: 'studio'
  }))
}

async function fetchStorefrontProducts(config: RuntimeConfig) {
  const storeDomain = config.public.shopifyStoreDomain
  const storefrontToken = config.public.shopifyStorefrontToken

  if (!storeDomain || !storefrontToken) {
    return []
  }

  const endpoint = `https://${normalizeStoreDomain(storeDomain)}/api/${config.public.shopifyApiVersion}/graphql.json`

  try {
    const response = await $fetch<{ data?: ShopifyProductsResponse; errors?: Array<{ message: string }> }>(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontToken
      },
      body: {
        query: productsQuery
      }
    })

    if (response.errors?.length || !response.data) {
      return []
    }

    return response.data.products.edges.map(({ node }) => node)
  } catch {
    return []
  }
}

export async function getShopifyCollectionSummaries(config: RuntimeConfig): Promise<ShopifyCollectionSummary[]> {
  const products = await fetchStorefrontProducts(config)

  return collections.map((collection) => {
    const matchedProductCount = products.filter((product) => scoreProductForCollection(product, collection) > 0).length

    if (matchedProductCount > 0) {
      return {
        slug: collection.slug,
        matchedProductCount,
        source: 'shopify'
      }
    }

    return {
      slug: collection.slug,
      matchedProductCount: collection.fallbackProducts.length,
      source: 'studio'
    }
  })
}

export async function getShopifyCollectionFeed(
  config: RuntimeConfig,
  slug: string
): Promise<ShopifyCollectionFeed | null> {
  const collection = getCollectionBySlug(slug)

  if (!collection) {
    return null
  }

  const products = await fetchStorefrontProducts(config)
  const matchedProducts = products
    .map((product) => ({
      product,
      score: scoreProductForCollection(product, collection)
    }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 6)
    .map((entry) => mapStorefrontProduct(entry.product, collection))

  if (matchedProducts.length > 0) {
    return {
      slug,
      matchedProductCount: matchedProducts.length,
      source: 'shopify',
      products: matchedProducts
    }
  }

  return {
    slug,
    matchedProductCount: collection.fallbackProducts.length,
    source: 'studio',
    products: buildFallbackProducts(collection)
  }
}
