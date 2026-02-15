# Small Business Landing Template

This template is intentionally content-first and modular.

## Quick text replacement

Update `/content/small-business.json` to replace all placeholder text, links, and image URLs.

## Structure

- `SmallBusinessLandingTemplate.tsx`: section orchestration + layout rendering
- `content.ts`: typed JSON loader and section-order normalization
- `types.ts`: strict section and template contracts
- `components/*`: section UI components that only render incoming props
- `../layouts/SectionStackLayout.tsx`: reusable page layout shell

## Sections

- Hero
- About
- Services
- Gallery
- Contact
- CTA
