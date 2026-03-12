import { getShopifyCollectionFeed } from '~/server/utils/shopifyCollections'
import type { ShopifyCollectionFeed } from '~/types/shopify'

export default defineEventHandler(async (event): Promise<ShopifyCollectionFeed> => {
  const slug = getRouterParam(event, 'slug')
  const config = useRuntimeConfig()

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Collection slug is required'
    })
  }

  const feed = await getShopifyCollectionFeed(config, slug)

  if (!feed) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Collection not found'
    })
  }

  return feed
})
