# Home Repo

Starting point for my coding-agent sessions (Claude Code and Codex). The
agent setup is defined in `.ruler/` folders and turned into the files each
agent reads by [Ruler](https://github.com/intellectronica/ruler).

## Layout

- `.ruler/`: applies to every session. `AGENTS.md` holds the instructions,
  `ruler.toml` the MCP servers, `skills/<name>/` the shared skills.
- `<domain>/.ruler/` (for example `web-development/`): the same, for one kind
  of work. A session started in that folder gets the root setup plus the
  domain's.
- `SKILLS.md`: every skill, grouped by domain, with how it runs and where it
  came from. Generated; see below.
- Each skill folder has a `SOURCE.txt` with its upstream repo, commit and any
  local edits, plus the upstream license.

## Applying changes

After cloning, and after any edit under a `.ruler/` folder, run this from the
repo root:

    node apply.mjs

It does two things:

1. Runs `npx @intellectronica/ruler apply`. Ruler writes `AGENTS.md`,
   `CLAUDE.md`, `.mcp.json`, `.codex/config.toml` and the `.claude/skills` and
   `.agents/skills` folders at the root and in each domain folder. These are
   gitignored and overwritten on every run, so edit the `.ruler/` sources
   instead. Extra arguments go to Ruler (for example `--dry-run`).
2. Rebuilds `SKILLS.md` from the skill folders: name and first sentence of the
   description from `SKILL.md`, "automatically" or "`/name` only" from its
   `disable-model-invocation` setting, the domain from the folder it's in, and
   the source from `SOURCE.txt`. Commit it with the change.

`node apply.mjs --index-only` rebuilds `SKILLS.md` without running Ruler.

## Starting a session

Start the agent in the domain folder for the work, for example
`web-development/` for web projects. Codex only loads the project's MCP
config if you trust the repo; accept its trust prompt the first time.
