# Decisions

One entry per major choice. Newest last. Status is Accepted or Proposed.

## D-001 — Project lives at D:\programming\andi_azfar_website
Status: Accepted
The site and its code stay in this one folder. Rejected: developing elsewhere.

## D-002 — AGENTS.md only, no CLAUDE.md
Status: Accepted
AGENTS.md is the cross-tool standard and this harness reads it. Maintaining both
would let them drift. Rejected: keeping CLAUDE.md too.

## D-003 — No Vercel
Status: Accepted
Owner preference. Rejected: Vercel, and any PaaS as the primary host.

## D-004 — Single server, everything on it
Status: Proposed
One droplet running the app and PostgreSQL, with automatic HTTPS and off-server
backups. Cheaper and fewer accounts than splitting database to a free tier.
Rejected: Vercel, Supabase free tier, static hosting (cannot run login or a database).

## D-005 — Playwright for browser verification
Status: Accepted
Lets the agent check its own work in a real browser instead of asking the owner.

## D-006 — Domain registrar and name
Status: Open
Not chosen yet.

## D-007 — Hostname strategy
Status: Accepted
One deployable unit gets one hostname.
Independently deployed POCs live at `<name>.andi.com`. Features and content that ship
with the main site live at paths, e.g. `andi.com/tools/timezones`. Static demos live
under `andi.com/demos/...`.
Rejected: every app under a path prefix (forces each app to be prefix-aware);
every feature on its own subdomain (needless certificates and config).
Shared login across POCs is handled by scoping the session cookie to `.andi.com`.

## D-008 — Docker containers on a single droplet
Status: Proposed (server deferred until D-009 is met)
The app and its dependencies are packaged as containers and orchestrated with
docker-compose on one droplet, with Caddy as the reverse proxy and Coolify for deploys.
Up to a handful of apps run at once; the rest are parked (container stopped, zero memory).
Rejected: installing runtimes directly on the server (version collisions over time);
Kubernetes (unnecessary complexity for one machine).

## D-009 — Build and verify locally before renting a server
Status: Accepted
Nothing is bought, provisioned or deployed until the site runs on the owner's machine
and has been seen working in a browser.
Rejected: provisioning the droplet first, then developing against it.

## D-010 — Minimum complexity as the default
Status: Accepted
Start with the simplest solution that solves the actual problem. Add complexity when a
concrete need appears, or immediately when a need is certain and imminent — never for
imagined futures.
Safety is exempt: backups, HTTPS, secret handling and tests are always included,
however small the project.
Container bases: smallest image that works, but compatibility beats byte count.
Using `node:slim` rather than Alpine musl images unless a real size constraint appears.
Rejected: Alpine-by-default (saves ~40MB, risks subtle native-dependency failures);
rejected: pre-emptive abstraction, queues, caches, microservices or Kubernetes.
