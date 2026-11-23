# Home Repo

This is the starting point for coding-agent sessions. It holds instructions
and skills that apply across all of my repos, and points at each project repo.

- Shared skills go in `skills/<name>/SKILL.md`. There are none yet, and no
  skills are installed at user level.
- Before working in another repo, read that repo's own AGENTS.md. Its rules
  take precedence for work inside it.
- MCP servers for sessions started here: Context7 (library docs), Playwright
  (browser), Neon (Postgres) and the Cloudflare API. Claude Code reads them
  from `.mcp.json`, Codex from `.codex/config.toml`.
- For GitHub, use the `gh` CLI.

## Other Repos

- campusevents (university event app with QR tickets, reviews and PDF
  certificates; my thesis; React on Cloudflare Workers with Neon):
  C:\Users\gpatr\Projects\campusevents. Clone from
  https://github.com/gpatrikdev/campusevents.git if missing. Read its
  AGENTS.md and rebuild-handoff.md first; implementation needs my explicit
  approval.
