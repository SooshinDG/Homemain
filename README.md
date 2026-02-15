# Next.js 14 App Router Template

Production-ready minimal starter for building and reselling templates.

## Stack

- Next.js 14 (App Router)
- TypeScript (strict mode)
- TailwindCSS
- shadcn/ui
- ESLint + Prettier

## Commands

```bash
npm run dev
npm run lint
npm run build
npm run format
```

## Project structure

```text
src/
  app/
  core/
    layout/
    components/
    hooks/
    lib/
  features/
  templates/
  config/
```

Use `features/` for user-facing product modules and `templates/` for resale catalog/domain data.

## Shopping Mall Template Page

New reusable shopping mall template module:

- `src/templates/shopping-mall/ShoppingMallTemplatePage.tsx`
- imports mock products from `src/features/ecommerce/product/mock.ts`
- renders product grid through `ProductList`
- includes a simple hero section and template-friendly styling
