# GlobalMart

A responsive nutraceutical storefront for Sri Lanka, built with Next.js App Router conventions, TypeScript, Tailwind CSS and the Sites Vinext runtime. It uses the bundled accessible UI primitives and Cloudflare D1 for saved shopping records.

## Run locally

Requires Node.js 22.13 or later. Run `npm run install:ci`, then `npm run build`. Apply the initial local database migration:

```sh
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_huge_whirlwind.sql
```

Run `npm run dev` and open the URL printed by the server. The development server provides a local Sites identity. `npm start` previews the built Worker and shares the same local database.

## Pages and components

- `/`: homepage, catalogue highlights, campaigns, categories, brands and editorial.
- `/categories`, `/category/[id]`, `/shop`, `/search`, `/brands`, `/offers`: discovery and filtering.
- `/product/[id]`: gallery, saved products, quantities, stock, details and reviews.
- `/wishlist`, `/cart`, `/checkout`: persistent saved items and a three-step sample checkout.
- `/login`, `/register`, `/account`, `/orders`: platform sign-in, saved details and sample order history.
- `/about`, `/contact`, `/health-library`, `/health-library/[id]`, `/delivery`, `/faq`, `/privacy`: store and editorial information.

Reusable storefront components are in `components/globalmart`. Catalogue data, types and pricing calculations are centralized in `lib/catalog.ts`. Server-side validation and prepared D1 operations live in `app/api/store/route.ts`; schema and migrations live in `db` and `drizzle`.

## Sample commerce behavior

Prices, ratings, stock, offers and delivery policies are illustrative. `WELL10` gives 10% off. Standard delivery costs LKR 450 and becomes free from LKR 15,000 after discounts. Express delivery costs LKR 850 and is limited to Colombo, Gampaha and Kalutara. Prices, stock and totals are validated on the server. Order submission uses a stable unique ID so retrying does not create duplicate records.

The checkout stores sample orders only. It does not process money, reserve real stock, send email or arrange fulfilment. Contact and newsletter forms save preview submissions without sending external messages. Do not enter real payment credentials or sensitive medical data.

Production launch requires a verified catalogue, inventory and fulfilment provider, payment gateway, email delivery, merchant identity and policies reviewed for the business. Sites currently provides secure ChatGPT sign-in; this project does not implement email/password authentication.

## Data and privacy

D1 stores carts, wishlists, recently viewed products, orders, profiles, submitted reviews and enquiries. Guest visitors use an HTTP-only session cookie. Signing in associates guest shopping records with the authenticated account. API ownership comes from the trusted Sites identity or the random guest session, never an owner ID in a request body.

Original product image sources are documented in `public/product-sources.json`. Brand assets belong to their respective owners. The hero is an original generated asset. Earlier conversation reference uploads were not available in this workspace; the design follows the written brief.

## Checks

`npx tsc --noEmit` checks TypeScript. `npm run build` compiles all application routes and the Worker. `work/verify-store.mjs` (when present locally) exercises server-side checkout invariants and route availability against the development server.
# Global_Mart
# Global_Mart
