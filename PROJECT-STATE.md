# PeptideLog — Project State

_Last updated: 2026-09-05. This document is the source of truth for where the
project is. Read it first after a context compaction._

---

## 1. What it is

PeptideLog is a web tool for research-peptide users. It does two core jobs today:

1. **Reconstitution calculator** — works out how much bacteriostatic (BAC) water to
   add to a vial and how many syringe units to draw for a target dose.
2. **Cycle tracker** — a logged-in user records doses, progress, and side effects
   over a cycle.

It also has a peptide reference/compare section and a how-to guide.

Tagline in metadata: "PeptideLog - Reconstitution Calculator & Cycle Tracker".

---

## 2. Live deployment (WORKING)

- **URL:** https://peptidelog.lifestyle (and www). HTTPS live, HTTP→HTTPS redirect.
- **Host:** Hostinger VPS `72.62.4.238` (shared with ChorusTrade + other apps).
- **Runtime:** Next.js standalone, systemd unit `peptidelog` on `127.0.0.1:3001`,
  behind nginx. Env at `/etc/peptidelog/app.env` (mode 600).
- **Database:** Supabase project `bnfutmwfosravnfxaaeh`. Verified live —
  `/api/counter` returns real data (`{"count":14847}`).
- **Auth:** Privy (app `cmov9uck000yv0bkwzvxsc6mb`), email + wallet. Domain is on
  the Privy allowlist and login works. Server token verification confirmed
  (`/api/log` returns 401 without a valid token).
- Full VPS/deploy details are in the auto-memory `peptidelog-vps-deploy.md`.

### How to redeploy (build LOCALLY, never on the VPS)
```
cd .../peptide-log
./node_modules/.bin/next build            # use next binary directly; rm -rf .next if a
                                          # stale "_document PageNotFoundError" appears
cp -r .next/static  .next/standalone/.next/static
cp -r public        .next/standalone/public
rsync -az --delete -e "ssh -i ~/.ssh/id_ed25519 -o IdentitiesOnly=yes" \
  .next/standalone/ root@72.62.4.238:/opt/peptidelog/app/
ssh -i ~/.ssh/id_ed25519 -o IdentitiesOnly=yes root@72.62.4.238 \
  'chown -R www-data:www-data /opt/peptidelog && systemctl restart peptidelog'
```
Note: `NEXT_PUBLIC_*` values are baked in at build time, so a client-side env change
needs a rebuild, not just an env-file edit.

---

## 3. Current pages (App Router) — REDESIGN SHIPPED (2026-09-05)

The redesign is built, verified in the production build, and deployed. The site
went from 4 routes to a multipage site with this IA:

| Route | Nav label | What it does |
|---|---|---|
| `/` | Home | Landing hero ("Measure. Calculate. Inject.") + section overview |
| `/calculator` | Calculator | Reconstitution calculator (single + stack mode), peptide selector, presets, syringe visual |
| `/learn` | Learn | Guide hub → 3 guides below |
| `/learn/formula` | — | Interactive formula walkthrough (editable inputs feed step-by-step math) |
| `/learn/reconstitution` | — | Step-by-step mixing walkthrough |
| `/learn/storage` | — | Storage & shelf life per peptide |
| `/peptides` | Peptides | Peptide library, categorized cards + "Am I Normal?" compare link |
| `/peptides/[slug]` | — | Per-peptide profile (17 SSG pages): dose, storage, side effects, stacks |
| `/compare` | (linked from Peptides) | Compare peptides; filter; comparison view |
| `/guide` | (legacy) | Older guide page, still routed |
| `/tracker` | Cycle Log | Logged-in cycle logging: dose entries, body injection-zone diagram, progress sliders, side-effect chips/form |

New shared components: `app-shell.tsx`, `page-header.tsx`, `background-video.tsx`,
`auth/auth-gate.tsx` (soft blur-and-unlock gate), `learn/formula-guide.tsx`,
`landing/landing-sections.tsx`.

APIs: `/api/counter`, `/api/log` (per-user, Privy-gated), `/api/aggregate`, `/api/og`.

---

## 4. Tech stack

- Next.js 14.2.35 (App Router), React 18, TypeScript.
- Tailwind CSS. framer-motion. zustand (state). date-fns.
- Supabase (`@supabase/supabase-js`) for data.
- Privy (`@privy-io/react-auth` + `@privy-io/server-auth`) for auth.
- Serwist (`@serwist/next`) — PWA/service worker (`src/sw.ts`, disabled in dev).
- html2canvas — for share images.
- Package manager: pnpm (but `pnpm dev`/`pnpm build` fail on this machine due to an
  ignored-build-scripts policy → call the `next` binary directly).

---

## 5. Data model (static, in `src/data/`)

- `peptides.ts` — 17 peptides. Each: id, name, ticker, category, common vial sizes,
  typical dose range (mcg), injection frequency, storage, UV sensitivity, shelf life,
  BAC water expiry, common side effects, stack compatibility, notes.
- `presets.ts` — named stacks (e.g. "Wolverine Stack" = BPC-157 + TB-500).
- `side-effects.ts` — 13 side effects, categorized.
- `syringe-types.ts` — insulin syringe definitions (U100 1mL, 0.5mL, …).

Reconstitution math lives in `src/lib/calculator.ts`:
`concentration = vialMg / bacWaterMl`, `unitsToDraw = (doseMcg / concMcgPerMl) *
syringeUnits`, `dosesPerVial = vialMg*1000 / doseMcg`, plus over/under-capacity
warnings and optional cost-per-dose.

---

## 6. Known issues / status

- ✅ **`metadataBase` fixed:** `src/app/layout.tsx` now uses
  `https://peptidelog.lifestyle`. OG / canonical URLs are correct.
- ✅ **Render loop ruled out (2026-09-05):** `/calculator` and `/tracker` froze the
  browser extension during review. Investigated against the production build — no JS
  timer, no `requestAnimationFrame` loop, no network flood, no console errors. A fresh
  browser tab loads both pages instantly. The freeze was accumulated state in one
  long-lived tab (repeated navigations + Privy session restores), not a code defect.
- Not committed: `pnpm-workspace.yaml` (broken placeholder values — would break
  pnpm; leave uncommitted until filled in) and `tweets.md` (private marketing copy).
- Namecheap SPF TXT still points at the old email-forwarding service (harmless).

---

## 7. Redesign — DONE (user brief 2026-09-04, shipped 2026-09-05)

The redesign is built and deployed. Original requirements and how they were met:

1. ✅ **UX redesign** — full rework, not a reskin. New hero, new IA, new components.
2. ✅ **Multipage website** — expanded from 4 routes to the IA in section 3.
3. ✅ **Formula vs. guide decision — RESOLVED: BOTH, clearly separated.**
   - **Compute** → `/calculator` (enter numbers, get syringe units, doses/vial, cost).
   - **Guide** → `/learn/formula` (interactive walkthrough of every step of the math).
   - They cross-link both ways.

### Follow-ups still open
- Confirm the desktop breakpoint: during review the layout sat in its narrow/mobile
  state (hamburger nav) at a 1440px window — verify on a real wide screen.
- Decide whether legacy `/guide` stays or folds fully into `/learn`.
- Decide whether to fill in and commit `pnpm-workspace.yaml`.

---

## 8. Local paths

- Repo: `/Users/jefferson/dev/quarter-two-earning-M/peptide-log`
- GitHub: `github.com/jeffersonnnn/peptide-log`
- Dev server (local): `./node_modules/.bin/next dev` → http://localhost:3000
