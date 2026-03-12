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
  nitro: {
    storage: {
      studio: {
        driver: 'memory'
      }
    },
    devStorage: {
      studio: {
        driver: 'fs',
        base: './.data/studio'
      }
    }
  },
  modules: hasShopifyStorefront ? ['@nuxtjs/shopify'] : [],
  runtimeConfig: {
    studioAdminUsername: process.env.STUDIO_ADMIN_USERNAME || '',
    studioAdminPassword: process.env.STUDIO_ADMIN_PASSWORD || '',
    studioSessionSecret: process.env.STUDIO_SESSION_SECRET || '',
    whatsappWebhookUrl: process.env.WHATSAPP_WEBHOOK_URL || '',
    whatsappAccessToken: process.env.WHATSAPP_ACCESS_TOKEN || '',
    whatsappPhoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || '',
    whatsappGraphApiBase: process.env.WHATSAPP_GRAPH_API_BASE || 'https://graph.facebook.com/v23.0',
    whatsappNotificationRecipient: process.env.WHATSAPP_NOTIFICATION_RECIPIENT || '',
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
