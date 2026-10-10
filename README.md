# Ahmad Danaf — Portfolio

Source for [ahmaddanaf.com](https://www.ahmaddanaf.com): experience, projects and skills of a software engineer working on production web and mobile products.

## Stack
Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, React Three Fiber. Deployed on Vercel.

## Content
All copy lives in typed data files under `content/`. `npm test` checks the wording rules (no unsupported skills, honest status wording).

## Media
- `node scripts/media/capture.mjs [id]` — re-capture posters and loops of the live products.
- `node scripts/media/encode.mjs poster|clip …` — encode raw images/videos for the web.

## Scripts
- `npm run dev` — local dev server
- `npm test` — content and media checks
- `npm run test:e2e` — production build + Playwright smoke tests

## Acknowledgements
Based on the **Space Portfolio** project by [Sanidhyy](https://github.com/sanidhyy/space-portfolio), licensed under the MIT License.
