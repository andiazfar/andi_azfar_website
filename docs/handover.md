# Handover — read this first

Written 2026-11-06 for a session whose workspace is `D:\programming` (covering both
projects). This chat's history is not carried over; this file and the other `docs/` files are.

## What exists

Two related but separate projects live under `D:\programming`:

| Folder | What it is | State |
|---|---|---|
| `andi_azfar_website` | Public personal site | Landing page built, committed, no server yet |
| `andi_azfar_links` | Private family contacts app | **Not started** — no folder yet, no code |

Each is its own git repository and its own deployable unit (decision D-007: one deployable
unit per hostname). They share one droplet, one Postgres instance, one Caddy.

## Project 1 — andi_azfar_website

Committed on `main`, four commits, working tree clean. Read its own `AGENTS.md` and
`docs/decisions.md` for detail; the essentials:

- Next.js 16.4.5 (App Router), React 19.3, TypeScript, Tailwind CSS v4
- Motion (`motion` package) for animation — entrance, scroll reveal, hover lift
- Landing page: hero with typewriter tagline, projects grid, footer
- Typewriter behaviour: intro cycles four phrases then settles on "Problem Solving Enjoyer";
  hover rotates through ten; hover is ignored while a sequence runs; erase is 2 chars / 14ms
- Dark-only theme; `html` and `body` carry the background, not just the page div
- Git and LinkedIn are placeholders pending real URLs
- Nothing deployed; no domain chosen yet (D-006 open)

## Project 2 — andi_azfar_links (next to build)

### The requirement, in the owner's words
Family members need common information — name, email, notes — to fill in scholarship
applications at night, without waking anyone up. A link to a Google Drive folder holds
scanned documents (ID copies). That Drive link is the second security layer and is shared
restricted — specific Google accounts only, not "anyone with the link".

### Who uses it
- **Owner (Andi): admin.** Can add and edit contacts, create users, reset passwords, revoke access.
- **Family members: view only.** They read; they never write.

### Non-goals for v1
- No email sending, no SMTP, no self-service signup, no password-reset emails.
- Accounts are created and passwords reset by the admin. This is deliberate: it removes an
  entire external dependency.

### Agreed security design
- **Never in the front end.** No data hardcoded in the bundle; a client-side "password gate"
  is explicitly forbidden as fake security.
- **Passwords:** Argon2id, hashed server-side.
- **Sessions:** opaque tokens stored in the database (revocable), sent in an `httpOnly`,
  `sameSite=lax` cookie, 30-day expiry.
- **Authorisation:** checked server-side on every read and write, by role.
- **Encryption at rest:** `name`, `email` and `notes` encrypted with AES-256-GCM before insert,
  key in `.env` only. A stolen database dump is useless without the key.
- **Rate limiting** on login.
- **Key loss = data loss.** The encryption key is backed up separately from the database, in a
  place the owner can reach without an agent.
- Rejected: end-to-end encryption keyed from the user's password. Stronger against a server
  compromise, but a forgotten password would destroy the data permanently — unacceptable for
  family information that must stay recoverable.

### Planned stack
Next.js 16 + TypeScript + Tailwind, `pg` driver with plain SQL migration files (no ORM),
`node:crypto` for AES-GCM, Argon2 for hashing. Pages: `/login`, `/` (list), `/admin`.
Schema roughly: `users` (id, email, password_hash, role, created_at),
`sessions` (token_hash, user_id, expires_at), `contacts` (id, name_enc, email_enc, notes_enc,
updated_at, updated_by), `settings` (drive_url and similar).

## Local database — already set up

PostgreSQL **18.6** installed natively on Windows. Service `postgresql-x64-18`, running,
listening on 5432. Not reachable via Docker from an agent session (sandbox), which is why
native was chosen.

- Database: `andi_links`, owned by role `andi_links` (not a superuser)
- Encoding UTF8, collation provider **ICU, locale `en-US`** — chosen so ordering matches the
  Linux server. Do not recreate with Windows locale defaults.
- `psql` is at `C:\Program Files\PostgreSQL\18\bin\psql.exe`, not on PATH
- Connection string with the generated password: `andi_azfar_website\.db-credentials.txt`
  (gitignored). Move it into `andi_azfar_links\.env` and delete the old file.
- The Postgres superuser password is not recorded anywhere. Ask the owner if it is needed.

## Environment constraints that shape the work

- The agent session cannot spawn Node child processes or open Windows named pipes.
  Fingerprints: `spawn EPERM`, `platform_channel ... Access is denied`, `cannot open named pipe`.
  Do not retry variants — restructure so the command runs outside the session.
- Therefore `npm run dev`, `next build` and headless Chrome all fail inside a session.
  Use the double-click scripts: `dev.cmd`, `build.cmd`, `preview.cmd`.
- npm's cache must stay inside the project: set `npm_config_cache` to `<project>\.npm-cache`.
- After installing software, the harness keeps a stale PATH until restarted.
- Screenshots only when the owner asks; the whole screen is captured; delete immediately after.

## Immediate next steps

1. Create `D:\programming\andi_azfar_links` and scaffold Next.js **without** letting a generator
   overwrite anything — see global rule 1. Generate into a temp directory, compare, then use
   `~/.dsh/scripts/safe-move.ps1`.
2. Write that project's `AGENTS.md` and `docs/` (decisions, roadmap, risks) from this handover
   before writing application code.
3. Move `DATABASE_URL` from `.db-credentials.txt` into `andi_azfar_links\.env`, generate the
   encryption key, delete the old credentials file.
4. Build schema migrations, then auth, then the contact list, then the admin page.
5. Verify with HTTP fetch and a screenshot; the owner must see it in a browser.

## Open questions for the owner

- Domain name still unchosen (blocks M2 of the website and any real deploy).
- Real GitHub and LinkedIn URLs.
- Should the Drive link be editable from `/admin`, or hardcoded as a setting?
