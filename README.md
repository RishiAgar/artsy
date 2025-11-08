# Artsy Products Frontend

Browsing Artsy products with a focus on SEO, modular architecture, and good caching behavior.

---

## Requirements

- **Node.js**: `>= 20`
- **pnpm**: recommended package manager

You can verify your versions with:

```bash
node -v
pnpm -v
```

---

## Local Development

1. **Copy environment variables from example:**

   ```bash
   cp -n example/.env-example .env
   ```

   Update `.env` with the correct values for your environment.

2. **Install dependencies:**

   ```bash
   pnpm i
   ```

3. **Run the dev server:**

   ```bash
   pnpm dev
   ```

---

## Sitemap Generation

To generate the **dynamic sitemap** locally:

```bash
pnpm sitemap
```

This will create/update the sitemap file(s) used for SEO.

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **UI Library**: [React](https://react.dev/)
- **Component System**: [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State / Cart**: React context + localStorage persistence
- **Optimization**: React Compiler (where applicable)
- **Icon**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)

---

## Project Decisions & Thought Process

### Architecture

- **Modular structure**

  - Components are split by feature (e.g. page components, custom, hooks).
  - Business logic extracted into hooks and helpers where possible.

- **SEO-focused implementation**

  - Uses `generateMetadata` / Next.js metadata APIs for:
    - Dynamic titles and descriptions.
    - Canonical URLs.
  - Sitemap generation via `pnpm sitemap`.

- **Caching strategy**

  - Server-side fetching designed with caching in mind (e.g. `cache` for shared fetchers where appropriate).
  - Tries to avoid unnecessary refetches while still keeping data fresh enough for a product listing use case.

- **React Compiler aware**
  - Avoids over-using `useMemo` / `useCallback` for simple derivations.
  - Computations are kept pure and inside render when cheap, letting the compiler optimize.

### UX / Data Handling

- **Cart behavior**

  - Quantities in the cart respect:
    - Minimum order quantity.
    - Available stock.
  - Local UI logic guards against selecting invalid quantities.

- **LocalStorage usage**
  - Only stores **required data** to persist the cart across sessions.
  - Designed to be minimal to reduce storage footprint and serialization overhead.

---

## Limitations / Known Trade-offs

Some intentional trade-offs and current limitations:

- **Cart data vs. live product changes**

  - Cart does **not** automatically revalidate items if:
    - A product expires.
    - A price changes.
  - This is due to the lack of a dedicated API for:
    - Validating current cart items.
    - Returning updated prices and availability in bulk.
  - Result: validation happens primarily at the point of action (e.g. on add/update), not continuously.

- **LocalStorage constraints**

  - Browsers have size limits for localStorage.
  - While only essential data is stored, a very large cart or extra metadata could still approach limits in edge cases.

- **Cross-browser testing**

  - Currently only **tested on Chrome**.
  - No systematic testing on Safari, Firefox, Edge, or mobile browsers yet.

- **Category listing data**

  - There was no API providing category labels, icons, and images in the required shape.
  - A **hard-coded JSON** structure is used for:
    - Category labels.
    - Icons (lucide-react).
  - This should ideally be moved to a dedicated API in the future.

- **Testing & QA**

  - No automated test suite (Jest / Testing Library / Playwright) has been set up yet.
  - Manual testing only; edge cases may still exist.

- **Accessibility**
  - Basic semantics come from shadcn + Radix primitives (which are accessibility-friendly by default).
  - No full accessibility audit has been performed yet (keyboard navigation, screen readers, color contrast, etc.).

---

## Suggested Improvements / Future Work

- Add a **cart validation API** to:

  - Re-check price and availability on page load and before checkout.
  - Return per-item error states (e.g. “product no longer available”, “price updated”).

- Introduce **automated tests**:

  - Unit tests for helpers and hooks (cart logic, quantity clamping, etc.).
  - Integration tests for critical flows (add to cart, change quantity, etc.).
  - E2E tests for core user journeys.

- Improve **observability**:

  - Add basic logging around API errors and cart failures.
  - Optionally integrate a client-side error tracker (Sentry, etc.).

- Replace hard-coded category metadata with:

  - A proper **category API** supporting:
    - Labels.
    - Icons.
    - Images.
    - SEO slugs / descriptions.

- Expand **cross-browser / device testing**:
  - Desktop: Chrome, Firefox, Safari, Edge.
  - Mobile: Chrome (Android), Safari (iOS).

---

## Scripts Overview

Commonly used scripts:

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Generate sitemap
pnpm sitemap

# (Optional) Build & start
pnpm build
pnpm start
```

---

## Environment Variables

All environment variables are defined via `.env`. Start by copying:

```bash
cp -n example/.env-example .env
```

Then edit `.env` and provide values for:

- API base URLs
- Public website URL
- Any keys required by serverGet / API helpers

(Exact variable names depend on your implementation in `serverGet` and other helpers.)

---
