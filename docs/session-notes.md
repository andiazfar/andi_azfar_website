# Session notes

## 2026-11-06
Done:
- Environment unblocked: Node 26.13.0 installed, git repo created, Next.js 16.4.5 scaffolded.
- `dev.cmd` / `build.cmd` added because the DSH sandbox blocks Node child processes.
- Landing page built: hero, tagline, email, three project cards, footer.
- Motion installed; entrance, scroll-reveal and hover animations in place.
- Verified: page serves 200 and renders in the browser.

In progress:
- Nothing half-finished; tree is clean after the commit.

Next:
- About section, responsive check, then M4 login.

Blocked on / decisions needed:
- Domain name not chosen (D-006).
- GitHub and LinkedIn links are placeholders until the owner provides them.

Known limits:
- `next dev` / `next build` cannot run inside the DSH session (spawn EPERM).
  Use `dev.cmd` and `build.cmd` instead.
- Docker Desktop is running but unreachable from the session (named-pipe restriction).

## 2026-11-22
Done:
- Decisions D-012..D-015: public site is static on GitHub Pages; login/DB go in separate
  droplet apps; resume is a Google Drive link; start on github.io, domain later.
- Static export + GitHub Actions deploy. Live at https://andiazfar.github.io/andi_azfar_website/
  (base path set by `PAGES_BASE_PATH` in the workflow). Every push to `main` redeploys.
- `/card` page for the NFC card: LinkedIn, GitHub, Website, plus a back link.
- Typewriter: on hover each phrase holds ~2.2s then changes; after hover-out it lingers ~2s
  before resetting to the default.
- Removed the "Portfolio" label and the footer name from the home page.

Next:
- Google Drive resume link, world-time widget.
- Choose the domain (D-006) BEFORE writing the NFC card.

Known limits:
- Pages needs a public repo on the free plan.
- A hidden browser pane throttles timers, so animation timing cannot be checked live there.
