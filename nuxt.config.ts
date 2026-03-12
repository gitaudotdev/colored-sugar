const shopifyStoreDomain = process.env.NUXT_PUBLIC_SHOPIFY_STORE_DOMAIN || ''
const shopifyStorefrontToken = process.env.NUXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || ''
const shopifyStoreName = shopifyStoreDomain
  .replace(/^https?:\/\//, '')
  .replace(/\/.*$/, '')
  .replace(/\.myshopify\.com$/, '')
const hasShopifyStorefront =
  Boolean(shopifyStoreDomain) &&
  Boolean(shopifyStorefrontToken) &&
  shopifyStoreDomain !== 'your-store.myshopify.com' &&
  shopifyStorefrontToken !== 'your-storefront-access-token'

export default defineNuxtConfig({
  compatibilityDate: '2026-03-11',
  devtools: { enabled: true },
  devServer: {
    port: 3031
  },
  preview: {
    devServer: {
      port: 3031
    }
  },
  css: ['~/assets/css/main.css'],
  modules: hasShopifyStorefront ? ['@nuxtjs/shopify'] : [],
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3031',
      shopifyStoreDomain,
      shopifyStorefrontToken,
      shopifyApiVersion: process.env.NUXT_PUBLIC_SHOPIFY_API_VERSION || '2026-01'
    }
  },
  app: {
    head: {
      title: 'Coloured Sugar',
      meta: [
        {
          name: 'description',
          content:
            'Coloured Sugar by Nicole Muchai offers custom fittings in Nairobi, bold African fashion, statement prints, occasionwear, and tailored style for women and men.'
        }
      ]
    }
  },
  ...(hasShopifyStorefront
    ? {
        shopify: {
          name: shopifyStoreName,
          clients: {
            storefront: {
              apiVersion: process.env.NUXT_PUBLIC_SHOPIFY_API_VERSION || '2026-01',
              codegen: {
                skip: true
              },
              publicAccessToken: shopifyStorefrontToken
            }
          }
        }
      }
    : {})
})
