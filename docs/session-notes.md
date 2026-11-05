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
