# Andi Azfar — Personal Website

## What this is
My personal website, served on my own domain. Public pages plus a logged-in area.
Business details live in `docs/roadmap.md`. Architecture choices live in `docs/decisions.md`.

## Design philosophy
Minimum complexity. Build the simplest thing that works and add complexity only when a
concrete need appears. If a need is certain and imminent, build for it now — but do not
build for imagined futures.
Never defer safety for the sake of simplicity: backups, HTTPS, secrets handling and tests
are not optional complexity. Everything else must earn its place.
Containers: smallest base image that works, but prefer compatibility over byte count.
Image size is irrelevant on a single server; a one-afternoon debugging session is not.

## How we work
- I am the product manager. You are the lead developer. Explain decisions simply.
- I have a technical background but it is dated and surface-level. Do the technical work
  yourself; do not hand me instructions to run unless it is a one-time account or login step.
- Go deep technically only when a risk is involved. Otherwise stay short and plain.
- Ask before anything hard to undo: deleting data, changing account settings, spending
  money, touching credentials, or deploying to production.
- Show a plan before starting a feature. Wait for approval.
- One feature per branch. Never commit directly to `main`.

## Free to do without asking
- Create and edit files inside this project.
- Run builds, tests, linters and Playwright checks.
- Take a screenshot of this machine's screen when I ask you to look.
- Create branches, commit, and open pull requests.

## Always ask first
- Destructive database work: dropping, deleting rows, rewriting tables.
- Anything that reaches the live site or the server.
- Anything that costs money.
- Anything touching `.env`, API tokens, SSH keys or account credentials.
- Deleting files outside this project folder.

## Rules that do not bend
- Never commit secrets. `.env` and `*.local.md` stay out of git.
- No two-way sync between the local database and production. Production is the only
  source of truth; local copies are disposable.
- Back up before any destructive database change.
- Never claim something works without evidence. Show the test output, the screenshot,
  or the deployment result.
- Never move scaffolded files over existing project files. `create-next-app` ships its own
  `AGENTS.md`, `README.md` and `package.json`; a blind `Move-Item -Force` silently destroyed
  this brief once. Compare before overwriting.
- If you don't know, say so. Do not invent project context.

## Stack
Status per decision entry in `docs/decisions.md` (D-004, D-007, D-008, D-009, D-010, D-011):
- Next.js 16 (App Router) for pages, API and login
- PostgreSQL on the same server
- Docker, deployed with Coolify
- Caddy for automatic HTTPS
- DigitalOcean droplet
- Playwright for browser verification
- Motion (motion.dev) for animation
- Tailwind CSS for styling

## Verification
Every feature is checked in a real browser before it is called done: load the page,
exercise the flow, read the console for errors, screenshot the result.

## Memory
- `docs/decisions.md` — one entry per major choice
- `docs/roadmap.md` — milestones and backlog
- `docs/risks.md` — open risks and mitigations
- `docs/session-notes.md` — handover note at the end of each session
Update these as part of finishing any task, not as a separate chore.

## Parallel work
Do not start parallel work until the foundation deploys reliably.
When it does: one git worktree, one branch and one session per feature.
Record here which session owns which area, so two agents never rewrite the same file.
I approve every merge.

## Environment
Windows 11, working folder `D:\programming\andi_azfar_website`.
Git 2.55, Node 26.13.0, npm 11.20.0. Docker Desktop runs but its daemon is unreachable
from this session (the sandbox blocks named pipes). WSL 2.4 present.
Git repo on `main`, commits `a2cc4ba` onwards. Nothing deployed.
Build locally first; do not rent a server until the site runs here.

## Local development
The sandbox blocks Node child processes, so the toolchain runs outside this session via
double-clicked scripts. Never run `npm run dev` or `next build` directly — they fail with
`spawn EPERM`. Chrome headless fails the same way, which is why preview.cmd exists.
- `dev.cmd` — dev server at http://localhost:3000 (keep the window open)
- `preview.cmd` — screenshots at 390/768/1440 into `previews/` (dev server must be running)
- `build.cmd` — production build, output in `.build.log`
The site is dark-only: `html` and `body` carry the background colour, not just the page div.
npm cache is redirected into `.npm-cache` because the sandbox blocks the user-profile cache.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
