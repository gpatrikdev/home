# Home Repo

This is the starting point for coding-agent sessions. It holds instructions
and skills that apply across all of my repos, and points at each project repo.

- Agent setup lives in `.ruler/`: instructions in `.ruler/*.md`, MCP servers in
  `.ruler/ruler.toml`, shared skills in `.ruler/skills/<name>/SKILL.md`
  (each skill's SOURCE.txt says where it came from).
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

## Workflow

For new work in a project repo:

1. `/grill-with-docs`: settle the plan in rounds. It records terms in the
   repo's `GLOSSARY.md` and hard-to-reverse decisions in `docs/adr/`.
2. `/to-spec`: write the spec to the repo's issue tracker.
3. `/to-tickets`: split the spec into small tickets with their dependencies.
4. `/implement`: build each ticket test-first (`tdd`), review it
   (`code-review`), then commit.
5. Open the PR: `pr` shapes the description, `before-and-after` attaches the
   screenshots or recordings, `unslop` cleans the text.
6. `/retro`: after the session, suggest improvements to this setup.

For bugs, use `diagnosing-bugs`. Before the first spec or ticket in a repo,
run `/setup-matt-pocock-skills` there once to record its issue tracker.

## Other Repos

- campusevents (university event app with QR tickets, reviews and PDF
  certificates; my thesis; React on Cloudflare Workers with Neon):
  C:\Users\gpatr\Projects\campusevents. Clone from
  https://github.com/gpatrikdev/campusevents.git if missing. Read its
  AGENTS.md and rebuild-handoff.md first; implementation needs my explicit
  approval.
