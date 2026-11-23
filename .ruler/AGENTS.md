# Home Repo

This is the starting point for coding-agent sessions. It holds instructions
and skills that apply across all of my repos, and points at each project repo.

- Agent setup lives in `.ruler/`: instructions in `.ruler/*.md`, MCP servers in
  `.ruler/ruler.toml`, shared skills in `.ruler/skills/<name>/SKILL.md`
  (before-and-after, cloudflare, neon, neon-postgres, ponytail, unslop; each
  SOURCE.txt says where it came from).
  Edit only those, then run `npx @intellectronica/ruler apply`. It
  regenerates AGENTS.md, CLAUDE.md, .mcp.json, .codex/config.toml and the
  skill folders, which are gitignored.
- Before working in another repo, read that repo's own AGENTS.md. Its rules
  take precedence for work inside it.
- MCP servers for sessions started here: Context7 (library docs), Playwright
  (browser), Neon (Postgres) and the Cloudflare API.
- For GitHub, use the `gh` CLI.
- Use unslop on prose you write: docs, comments and commit messages.
- Keep screenshots local. Upload them to a public host (before-and-after's
  default, 0x0.st) only when I ask.

## Other Repos

- campusevents (university event app with QR tickets, reviews and PDF
  certificates; my thesis; React on Cloudflare Workers with Neon):
  C:\Users\gpatr\Projects\campusevents. Clone from
  https://github.com/gpatrikdev/campusevents.git if missing. Read its
  AGENTS.md and rebuild-handoff.md first; implementation needs my explicit
  approval.
