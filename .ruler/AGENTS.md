# Home Repo

This is the starting point for coding-agent sessions. It holds instructions
and skills that apply across all of my repos, and points at each project repo.

- Agent setup lives in `.ruler/` folders: instructions in `.ruler/*.md`, MCP
  servers in `.ruler/ruler.toml`, skills in `.ruler/skills/<name>/SKILL.md`
  (each skill's SOURCE.txt says where it came from). The root `.ruler/` holds
  what applies everywhere; each domain folder has its own. Edit only those,
  then run `node apply.mjs` from the repo root. It runs Ruler, which
  regenerates AGENTS.md, CLAUDE.md, .mcp.json, .codex/config.toml and the
  skill folders (all gitignored), and rebuilds SKILLS.md, the committed list
  of skills. Never edit those generated files by hand.
- Before working in another repo, read that repo's own AGENTS.md. Its rules
  take precedence for work inside it.
- MCP servers for sessions started here: Context7 (library docs).
- For GitHub, use the `gh` CLI.
- Install a CLI tool when a task needs it and it's missing, then say you did.
  This is a Windows PC. Known install commands:
  - gh: `winget install GitHub.cli` (before-and-after needs 2.99+).
    `gh auth login` is interactive, so ask me to run it.
  For other tools, use the official Windows install method.

## Domains

Start a session in the folder for the kind of work. It adds that domain's
skills, MCP servers and project repos to everything here.

- `web-development\`: web apps (React, Cloudflare Workers, Neon).

To add a domain (for example `game-development\`), create the folder with its
own `.ruler\AGENTS.md`, `.ruler\ruler.toml` and `.ruler\skills\`.

## Workflow

For new work in a project repo:

1. `/grill-with-docs`: settle the plan in rounds. It records terms in the
   repo's `GLOSSARY.md` and hard-to-reverse decisions in `docs/adr/`.
2. `/to-spec`: write the spec to the repo's issue tracker.
3. `/to-tickets`: split the spec into small tickets with their dependencies.
4. `/implement`: build each ticket test-first (`tdd`), review it
   (`code-review`), then commit.
5. Open the PR: `pr` shapes the description, `unslop` cleans the text. In web
   projects, `before-and-after` attaches the screenshots or recordings.
6. `/retro`: after the session, suggest improvements to this setup.

For bugs, use `diagnosing-bugs`. Before the first spec or ticket in a repo,
run `/setup-matt-pocock-skills` there once to record its issue tracker.
