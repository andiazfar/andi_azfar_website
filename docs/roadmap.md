# Roadmap

Local first. Nothing is rented or deployed until M1 shows a working site in a browser.

## M1 — Local foundation
- [ ] Install Node.js and confirm the version
- [ ] `git init`, `.gitignore`, first commit
- [ ] Scaffold the app and run it on this machine
- [ ] See it working in a real browser
- [ ] Choose the domain name

## M2 — Server
- [ ] Create the droplet and get SSH access working
- [ ] Install Docker, Caddy and Coolify
- [ ] Deploy a placeholder and confirm it is reachable
- [ ] Automatic HTTPS on the real domain
- [ ] Nightly backups running and verified

## M3 — Site content
- [x] Landing page: hero, projects grid, footer
- [x] Motion animations: entrance, scroll reveal, hover lift
- [ ] About section
- [ ] Responsive layout, checked in a browser
- [ ] Hub page listing projects (the registry)

## M4 — Login
- [ ] Sign-up, sign-in, sign-out
- [ ] Password reset
- [ ] Protected pages that require login

## M5 — Working loop
- [ ] Push-to-deploy confirmed end to end
- [ ] Pull request previews
- [ ] Local database copy for development
- [ ] First POC deployed on its own subdomain

## Backlog
- Time-zone tool: quick view of times across the places I work with
- Park/unpark a POC from the hub
- Browse motion.dev for more animation ideas (source of the typewriter effect) and pick
  a few to add. Keep to the "few patterns, not heavy" rule in D-011.
