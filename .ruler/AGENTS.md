# Home Repo

This is the starting point for coding-agent sessions. It holds instructions
and skills that apply across all of my repos, and points at each project repo.

- Agent setup lives in `.ruler/` folders: instructions in `.ruler/*.md`, MCP
  servers in `.ruler/ruler.toml`, skills in `.ruler/skills/<name>/SKILL.md`
  (each skill's SOURCE.txt says where it came from). The root `.ruler/` holds
  what applies everywhere; each domain folder has its own. Edit only those,
  then run `node apply.mjs` from the repo root. It runs Ruler, which
  regenerates AGENTS.md, CLAUDE.md, .mcp.json, .codex/config.toml and the
  skill folders (all gitignored), and rebuilds SKILLS.md and MCP-SERVERS.md,
  the committed lists of skills and MCP servers. Never edit those generated
  files by hand.
- Before working in another repo, read that repo's own AGENTS.md. Its rules
  take precedence for work inside it.
- MCP servers: see MCP-SERVERS.md. Describe each new server in a comment
  line directly above its `[mcp_servers.<name>]` table in `ruler.toml`.
- For GitHub, use the `gh` CLI.
- This repo is used on Windows, macOS and Linux. Use relative paths, and
  check which OS you're on before running OS-specific commands.
- Install a tool when a task needs it and it's missing, then say you did. Use
  the OS's package manager: winget on Windows, Homebrew on macOS, the distro's
  package manager on Linux. Known packages:

  | Tool | Windows | macOS | Linux |
  |---|---|---|---|
  | gh (before-and-after needs 2.99+) | `winget install -e --id GitHub.cli` | `brew install gh` | distro package, e.g. `sudo dnf install gh` |
  | agent-browser | `npm install -g agent-browser`, then `agent-browser install` | same | same |
  | Godot | `winget install -e --id GodotEngine.GodotEngine` | `brew install --cask godot` | official build from godotengine.org (a single executable) |

  For other tools, use the official install method for the OS. Ask me to run
  anything that needs `sudo`, an admin prompt or an interactive login (such
  as `gh auth login`).

## Domains

Start a session in the folder for the kind of work. It adds that domain's
skills, MCP servers and project repos to everything here.

- `web-development/`: web apps (React, Cloudflare Workers, Neon).
- `game-development/`: Godot games (GDScript).

To add a domain (for example `mobile-development/`), create the folder with its
own `.ruler/AGENTS.md`, `.ruler/ruler.toml` and `.ruler/skills/`.

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
