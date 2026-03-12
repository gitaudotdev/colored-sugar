import { getShopifyCollectionSummaries } from '~/server/utils/shopifyCollections'
import type { ShopifyCollectionSummary } from '~/types/shopify'

export default defineEventHandler(async (): Promise<ShopifyCollectionSummary[]> => {
  const config = useRuntimeConfig()

  return getShopifyCollectionSummaries(config)
})
