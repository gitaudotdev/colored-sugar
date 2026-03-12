# Coloured Sugar

Nuxt 3 starter for Coloured Sugar, a luxury tailor in Nairobi using Shopify as the commerce backend.

## What is included

- Nuxt 3 app structure
- Shopify-friendly runtime config
- A mockable lookbook endpoint at `/api/shopify/lookbook`
- Shopify-backed collection feeds at `/api/shopify/collections`
- Initial pages for the homepage, lookbook, fitting flow, and cart architecture
- Inquiry submission and demo studio tracking endpoints at `/api/inquiries`
- A wardrobe builder page at `/build-a-look` for multi-look planning and conversion
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

4. Optional automation variables:

   - `STUDIO_ADMIN_USERNAME`
   - `STUDIO_ADMIN_PASSWORD`
   - `STUDIO_SESSION_SECRET`
   - `WHATSAPP_WEBHOOK_URL`
   - `WHATSAPP_ACCESS_TOKEN`
   - `WHATSAPP_PHONE_NUMBER_ID`
   - `WHATSAPP_GRAPH_API_BASE`
   - `WHATSAPP_NOTIFICATION_RECIPIENT`

4. Start the dev server:

   ```bash
   npm run dev
   ```

   The local dev server is pinned to `http://localhost:3031`.

## Recommended next steps

- Create Shopify products for consultation deposits and ready-made pieces
- Add collections or tags for bridal, occasion, and executive wear
- Mount a durable Nitro storage driver for the `studio` bucket before using the tracker as a real operations board
- Add cart creation and checkout redirect logic with the Storefront API
- Turn the `Coloured Sugar Babes` demo wall into an approval-based UGC pipeline
- Replace wardrobe-builder swatches with Shopify-backed 3D garment assets when hero products are ready
