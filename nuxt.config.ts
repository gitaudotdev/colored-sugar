const shopifyStoreDomain = process.env.NUXT_PUBLIC_SHOPIFY_STORE_DOMAIN || ''
const shopifyStorefrontToken = process.env.NUXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || ''
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
      title: 'Colored Sugar',
      meta: [
        {
          name: 'description',
          content:
            'High-end custom tailoring in Nairobi with consultation-led design, luxury fittings, and African craftsmanship.'
        }
      ]
    }
  },
  ...(hasShopifyStorefront
    ? {
        shopify: {
          name: 'coloredsugar',
          clients: {
            storefront: {
              apiVersion: process.env.NUXT_PUBLIC_SHOPIFY_API_VERSION || '2026-01',
              publicAccessToken: shopifyStorefrontToken
            }
          }
        }
      }
    : {})
})
