# Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Single server lost with no backup | Site and data gone | Nightly off-server backups, verified monthly |
| Secret committed to git | Full compromise | `.env` gitignored, review before every push |
| Destructive database command | Data loss | Explicit approval, backup first |
| Certificate fails to renew | Site appears broken | Automatic renewal, periodic check |
| Domain expires | Site dies, name theft risk | Auto-renew on, card current, 2FA on registrar |
| Server left unpatched | Intrusion | Unattended security updates |
| Agent runs as the owner's Windows account | Can read personal files | Writes limited to project folder; high-risk actions ask first |
| Parallel agents overwrite each other | Lost work | Worktrees, one branch per feature |
| Cost creep | Money | Budget 100 RM/month, review before adding services |
| Docker unreachable from the agent session | Local container testing blocked | Confirmed: the daemon runs, the sandbox blocks its pipe. Verify containers over SSH on the server instead |
