# CodeDuel

**CodeDuel** puts you head-to-head against Claude on real coding problems. Same problem, same time, one winner — the idea being that the best way to know if AI is making you worse at coding is to race it directly and get an honest, scored answer.

Live at [duelai.dev](https://duelai.dev).

## How it works

1. **Pick a problem** from six categories (Arrays, Strings, Trees, Graphs, Dynamic Programming, System Design) across three difficulties.
2. **Start coding** in a full Monaco editor (Python, JavaScript, or Java). The moment you type your first character, your timer starts — and so does Claude's. A second, read-only editor pane shows Claude typing live alongside you, in sync with its real pace. That pane never reveals actual code (it streams only character-count deltas from the server and renders obfuscated placeholder text), so there's nothing to read or copy mid-duel — it's there for the competitive pressure, not as a hint.
3. **Submit**, and both solutions run against the same hidden test cases via [Judge0](https://judge0.com/).
4. **Get scored** out of 100 points: 50 for correctness (% of tests passed), 30 for speed (relative to your opponent's time — beating a slow solution is worth less than beating a fast one), and 20 for code quality (Claude reviews both solutions for complexity, readability, and edge-case handling). A margin of more than 5 points decides a win or loss; anything closer is a draw.
5. **See the results**: side-by-side scores, your ELO change (bigger swings on Hard problems), and Claude's own explanation of its approach so every duel teaches you something.

## Features

- **ELO rating system** — climb or drop based on results, scaled by problem difficulty.
- **Global leaderboard** (`/leaderboard`) — public, ranks players by ELO, works whether you're logged in or not, and surfaces your own rank even outside the top 100.
- **Dashboard** — win rate, streaks, ELO history chart, weak-spot detection by category, and recent duel history (Pro only).
- **Daily limits for the free tier** — 3 duels/day, enforced with an atomic reserve-then-refund pattern to avoid race conditions under concurrent requests.
- **Stripe billing** — Pro subscriptions with monthly and annual pricing, a 7-day free trial, and a self-serve customer portal for managing/cancelling.
- **Blog** (`/blog`) — statically generated long-form content.
- **PostHog analytics** — pageviews plus custom events (duel started/submitted/completed, upgrade clicks, registrations) with user identification tied to account plan.

## Tech stack

- **[Next.js 16](https://nextjs.org/)** (App Router, Turbopack) + React 19 + TypeScript
- **MongoDB** via Mongoose
- **[Anthropic SDK](https://github.com/anthropics/anthropic-sdk-typescript)** — Claude generates solutions (including streamed, live generation) and judges code quality
- **[Judge0](https://judge0.com/)** — sandboxed code execution for scoring
- **[Monaco Editor](https://microsoft.github.io/monaco-editor/)** — the in-browser code editor
- **Stripe** — subscriptions, billing portal, webhooks
- **Nodemailer** (Gmail) — password reset emails
- **PostHog** — product analytics
- **JWT** (`jsonwebtoken` + `bcrypt`) — auth

## Project structure

```
app/
  api/
    auth/            login, register, forgot/reset password
    duels/           duel submission + scoring, live Claude solving stream
    problems/        problem list/detail
    leaderboard/      public ELO rankings
    stripe/          checkout, billing portal, webhook, subscription status
    user/             profile, plan, stats, settings
    execute/         sandboxed code execution
  duel/[id]/         the duel page (editor + live Claude pane)
  results/[id]/      post-duel results and Claude's explanation
  dashboard/         stats, ELO chart, weak-spot detection (Pro)
  leaderboard/       public rankings page
  problems/          problem browser
  blog/              blog listing + posts
  login, register, forgot-password, reset-password/
  privacy, terms, rules, success/
  components/        shared UI (UpgradeBanner, UserMenu, PostHogProvider, legal-page links)

models/              Mongoose schemas (User, Problem, Duel, DailyDuelCount, LiveSolveSession)
lib/                 Anthropic client, auth helpers, Stripe client, Mongo connection, mailer, prompt builder
scripts/             seedProblems.ts — seeds the problem bank
middleware.ts        CORS handling for /api/*
```

## Getting started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Seed the problem bank (requires `MONGODB_URI` to be set):

```bash
npm run seed
```

### Environment variables

Create a `.env.local` with:

```bash
# Database / auth
MONGODB_URI=
JWT_SECRET=

# Anthropic (Claude solves problems, judges quality, explains its approach)
ANTHROPIC_API_KEY=

# Judge0 (sandboxed code execution)
JUDGE0_API_URL=
JUDGE0_API_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_PRICE_ID=            # monthly Pro price
STRIPE_ANNUAL_PRICE_ID=     # annual Pro price
STRIPE_WEBHOOK_SECRET=

# Email (password reset, via Gmail)
GMAIL_USER=
GMAIL_APP_PASSWORD=

# App
NEXT_PUBLIC_APP_URL=        # e.g. https://duelai.dev

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run seed` | Seed the problem bank into MongoDB |
