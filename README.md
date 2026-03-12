# Coloured Sugar

Nuxt 3 starter for Coloured Sugar, a luxury tailor in Nairobi using Shopify as the commerce backend.

## What is included

- Nuxt 3 app structure
- Shopify-friendly runtime config
- A mockable lookbook endpoint at `/api/shopify/lookbook`
- Initial pages for the homepage, lookbook, fitting flow, and cart architecture
- A branded UI direction for a consultation-led tailoring business

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment template:

   ```bash
   cp .env.example .env
   ```

3. Add the Shopify storefront values:

   - `NUXT_PUBLIC_SHOPIFY_STORE_DOMAIN`
   - `NUXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN`
   - `NUXT_PUBLIC_SHOPIFY_API_VERSION`

4. Start the dev server:

   ```bash
   npm run dev
   ```

   The local dev server is pinned to `http://localhost:3031`.

## Recommended next steps

- Create Shopify products for consultation deposits and ready-made pieces
- Add collections or tags for bridal, occasion, and executive wear
- Replace the starter fitting form with a real booking or lead-capture flow
- Add cart creation and checkout redirect logic with the Storefront API
