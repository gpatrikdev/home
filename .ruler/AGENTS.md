# Home Repo

This is the starting point for coding-agent sessions. It holds instructions
and skills that apply across all of my repos, and points at each project repo.

- Agent setup lives in `.ruler/`: instructions in `.ruler/*.md`, MCP servers in
  `.ruler/ruler.toml`, shared skills in `.ruler/skills/<name>/SKILL.md`
  (agent-browser, before-and-after, cloudflare, neon, neon-postgres,
  ponytail, unslop; each SOURCE.txt says where it came from).
  Edit only those, then run `npx @intellectronica/ruler apply`. It
  regenerates AGENTS.md, CLAUDE.md, .mcp.json, .codex/config.toml and the
  skill folders, which are gitignored.
- Before working in another repo, read that repo's own AGENTS.md. Its rules
  take precedence for work inside it.
- MCP servers for sessions started here: Context7 (library docs), Neon
  (Postgres) and the Cloudflare API.
- For browser work (opening pages, screenshots, recordings, testing web
  apps), use the `agent-browser` CLI. For GitHub, use the `gh` CLI.
- Install a CLI tool when a task needs it and it's missing, then say you did.
  This is a Windows PC. Known install commands:
  - agent-browser: `npm install -g agent-browser`, then `agent-browser install`
    (downloads its browser).
  - gh: `winget install GitHub.cli` (before-and-after needs 2.99+).
    `gh auth login` is interactive, so ask me to run it.
  For other tools, use the official Windows install method.

## Other Repos

- campusevents (university event app with QR tickets, reviews and PDF
  certificates; my thesis; React on Cloudflare Workers with Neon):
  C:\Users\gpatr\Projects\campusevents. Clone from
  https://github.com/gpatrikdev/campusevents.git if missing. Read its
  AGENTS.md and rebuild-handoff.md first; implementation needs my explicit
  approval.
