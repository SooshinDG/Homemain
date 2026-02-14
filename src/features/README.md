# Feature module architecture

Each feature lives in its own folder and exposes a single public API via
`index.ts`.

Required structure per feature:

- `components/`
- `hooks/`
- `types.ts`
- `index.ts`

## Scaling rules

1. Keep internals private and export only from `index.ts`.
2. Register new features in:
   - `feature-keys.ts`
   - `feature-flags.ts`
   - `registry.ts`
3. Enable or disable features by toggling values in `FEATURE_FLAGS`.

This layout keeps feature boundaries explicit and supports clean architecture
dependency direction (application depends on feature contracts, not internals).
