# InspireStack

Next.js application for authentication, onboarding, profiles, pins, search, and related social features.

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Current Folder Structure

Generated/runtime directories and local environment files are omitted: `.git/`, `.next/`, `node_modules/`, `.env*`, and `tsconfig.tsbuildinfo`.

```text
app/
|-- api/
|   `-- auth/
|       `-- [...nextauth]/
|           `-- route.ts
|-- create/
|   `-- page.tsx
|-- dashboard/
|   `-- page.tsx
|-- login/
|   `-- page.tsx
|-- onboarding/
|   `-- page.tsx
|-- pin/
|   `-- [id]/
|       `-- page.tsx
|-- profile/
|   `-- [username]/
|       `-- page.tsx
|-- search/
|   `-- page.tsx
|-- settings/
|   `-- page.tsx
|-- favicon.ico
|-- globals.css
|-- layout.tsx
`-- page.tsx

components/
|-- layout/
|   |-- container.tsx
|   `-- navbar.tsx
|-- providers/
|   |-- app-providers.tsx
|   `-- theme-provider.tsx
|-- shared/
`-- ui/
    |-- button.tsx
    |-- field.tsx
    |-- input.tsx
    |-- label.tsx
    `-- separator.tsx

db/
|-- schema/
|   |-- auth.ts
|   `-- index.ts
`-- index.ts

drizzle/
|-- meta/
|   |-- _journal.json
|   |-- 0000_snapshot.json
|   `-- 0001_snapshot.json
|-- 0000_new_screwball.sql
`-- 0001_fuzzy_sharon_carter.sql

features/
|-- auth/
|-- collection/
|-- comment/
|-- notification/
|-- onboarding/
|   |-- actions/
|   |-- components/
|   |   `-- onboarding-form.tsx
|   |-- constants/
|   |-- hooks/
|   |-- lib/
|   |-- schemas/
|   |   `-- onboarding-schema.tsx
|   |-- services/
|   |-- types/
|   |-- README.md
|   `-- index.ts
|-- pin/
|-- profile/
|-- search/
`-- upload/

lib/
|-- session.ts
`-- utils.ts

public/
|-- file.svg
|-- globe.svg
|-- next.svg
|-- vercel.svg
`-- window.svg

types/
`-- auth.d.ts

auth.config.ts
auth.ts
components.json
drizzle.config.ts
eslint.config.mjs
next-env.d.ts
next.config.ts
package.json
pnpm-lock.yaml
pnpm-workspace.yaml
postcss.config.mjs
proxy.ts
tsconfig.json
```
