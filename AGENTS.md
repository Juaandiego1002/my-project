# Agents

Payload 3 **Ecommerce** template: one Next.js 16 App Router app (React 19, Tailwind 4) with the Payload admin in the same process. Package manager: pnpm only.

## Payload skill

This project uses the Payload CMS skill at `.agents/skills/payload/`.
Start with `.agents/skills/payload/SKILL.md` for a quick reference, then `.agents/skills/payload/reference/` for detail.
Its snippets use `mongooseAdapter`; this repo uses `postgresAdapter` (`src/payload.config.ts`) — trust the repo over the skill on DB/adapter details.

## Architecture

- Storefront routes: `src/app/(app)` — Payload admin + REST/GraphQL API: `src/app/(payload)`. No separate backend service.
- Payload config: `src/payload.config.ts`. Local collections are only `Users`, `Pages`, `Categories`, `Media`. Products, variants, carts, orders, transactions, addresses are injected by `@payloadcms/plugin-ecommerce` through collection **overrides** declared in `src/plugins/index.ts` — customize them there, don't create parallel collections. The Products override itself lives in `src/collections/Products/`.
- Repo is customized from the stock template: Spanish UI/copy, custom `/nosotros` page, seeded catalogue content. Don't assume upstream-template behaviour or copy verbatim from the README.
- Access rules: `src/access/`; layout blocks: `src/blocks/` + `src/heros/`; reusable UI in `src/components/` (shadcn/ui style).
- Path aliases (`tsconfig.json`): `@/*` → `src/*`, `@payload-config` → `src/payload.config.ts`.
- `src/payload-types.ts` is generated but committed; `src/collections` code imports from it.
- Seed data lives in `src/endpoints/seed/`, triggered from the admin dashboard "seed database" link. It **drops existing data**.

## Commands

- `pnpm dev` — dev server on :3000 (needs a running Postgres, see below).
- `./scripts/dev-stack.sh` — builds and runs **Postgres + Next in Docker** (`up` is idempotent, plus `rebuild`, `down`, `logs`, `ps`, `shell`, `db`, `reset`). Host port 3000 must be free: a host `pnpm dev` and the container cannot both own it (the script aborts unless the responder on 3000 is its own app container). After changing `package.json`/`pnpm-lock.yaml` use `rebuild`, not `up` — `up` reuses the container's old `node_modules` volume.
- `pnpm generate:types` — run after any collection/field change and commit the updated `src/payload-types.ts`.
- `pnpm payload <cmd>` — Payload CLI, e.g. `pnpm payload migrate:create`, `pnpm payload migrate`.
- `pnpm exec prettier --write .` — formatting (`.prettierrc.json`: no semicolons, single quotes, printWidth 100). `lint-staged` is a devDep but unconfigured (no `.lintstagedrc`, no husky), so nothing runs on commit.
- `pnpm lint` / `pnpm lint:fix` and `pnpm exec tsc --noEmit` — see **Verification status** before assuming you caused failures.
- There is no typecheck script; `pnpm build` type-checks as part of the build.

## Database and environment

- Postgres only, provided by the root `docker-compose.yml`: `docker compose up -d` (db `my-project`, user/password `postgres`, port 5432). `DATABASE_URL` must be a `postgresql://…` connection string; with an unreachable database, dev and tests die with `ECONNREFUSED 127.0.0.1:5432`.
- The compose `app` service (`Dockerfile.dev`) runs Next in Docker. Inside the container `DATABASE_URL` is overridden to `postgres:5432` (service name, not localhost). `node_modules` and `.next` are **anonymous volumes that survive recreates**, so a plain `docker compose up --build` keeps stale deps after a `package.json` change; `./scripts/dev-stack.sh rebuild` uses `--renew-anon-volumes`. HMR on Windows bind mounts relies on `WATCHPACK_POLLING`/`CHOKIDAR_USEPOLLING`.
- A reachable local Postgres is a prerequisite for `pnpm dev`, `pnpm test:int`, and Playwright e2e (e2e boots the dev server).
- Schema is auto-pushed on connect outside production (`push` is not disabled in the adapter), so local schema edits need no migrations. For production: `pnpm payload migrate:create` locally, commit the SQL files, then `pnpm payload migrate` before `pnpm start`.
- Required env: `PAYLOAD_SECRET`, `PREVIEW_SECRET`, `NEXT_PUBLIC_SERVER_URL`, plus Stripe keys (`STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOKS_SIGNING_SECRET`). Local Stripe webhooks: `pnpm stripe-webhooks` (forwards to localhost:3000/api/payments/stripe/webhooks).

## Tests

- `pnpm test:int` — Vitest, files matching `tests/int/**/*.int.spec.ts`, boots a real Payload instance against `DATABASE_URL` (no mocks; needs Postgres).
- `pnpm test:e2e` — Playwright, `tests/e2e/`, chromium only, starts `pnpm dev` itself (reuses an already-running server on :3000). If browsers are missing: `pnpm exec playwright install chromium`.
- Run one test: `pnpm test:int tests/int/api.int.spec.ts` or `pnpm test:e2e tests/e2e/frontend.e2e.spec.ts`.
- `pnpm test` runs int first, then e2e.

## Verification status (re-verify before blaming yourself for failures)

- `pnpm build` and `pnpm exec tsc --noEmit` both pass today (exit 0). There is no standalone typecheck; build does it.
- `pnpm lint` runs (ESLint flat config `eslint.config.mjs`) but exits 1: 3 hard errors — `react/no-unescaped-entities` in `src/app/(app)/nosotros/page.tsx` (lines 24, 30, 81) — plus ~118 warnings (`no-unused-vars`, `no-explicit-any`, `react-hooks/set-state-in-effect`). Only the 3 errors fail the run; warnings do not.
- `pnpm exec prettier --check .` flags exactly one file: the Payload-generated `src/app/(payload)/admin/importMap.js` (regenerated on `pnpm generate:importmap` / build).
- README.md is upstream template prose and partly stale: it says `docker-compose up` (use `docker compose up -d`) and its caching note references `./src/app/_api` / `(pages)` routes that don't exist (real route group is `(app)`).
