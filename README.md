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
- `MCP-SERVERS.md`: every MCP server, grouped by domain, with what it
  connects to and what it's for. Generated; see below.
- Each skill folder has a `SOURCE.txt` with its upstream repo, commit and any
  local edits, plus the upstream license.

## Applying changes

After cloning, and after any edit under a `.ruler/` folder, run this from the
repo root:

    node apply.mjs

It does three things:

1. Runs `npx @intellectronica/ruler apply`. Ruler writes `AGENTS.md`,
   `CLAUDE.md`, `.mcp.json`, `.codex/config.toml` and the `.claude/skills` and
   `.agents/skills` folders at the root and in each domain folder. These are
   gitignored and overwritten on every run, so edit the `.ruler/` sources
   instead. Extra arguments go to Ruler (for example `--dry-run`).
2. Rebuilds `SKILLS.md` from the skill folders: name and first sentence of the
   description from `SKILL.md`, "automatically" or "`/name` only" from its
   `disable-model-invocation` setting, the domain from the folder it's in, and
   the source from `SOURCE.txt`. Commit it with the change.
3. Rebuilds `MCP-SERVERS.md` from each `ruler.toml`: the server name, its URL
   or command, which agents get it, and a description taken from the comment
   line directly above its `[mcp_servers.<name>]` table. When you add a
   server, write that comment. Commit the file with the change.

`node apply.mjs --index-only` rebuilds both lists without running Ruler.

Both lists start with a "Last regenerated" line showing when `apply.mjs`
last wrote them, in local time. Because it changes on every run, both files
show a one-line diff even when nothing else changed.

Skills add up from the root to the folder a session starts in. MCP servers
don't: a session gets only the servers in its own folder's `ruler.toml`,
which is why `web-development/` repeats Context7.

## Starting a session

Start the agent in the domain folder for the work, for example
`web-development/` for web projects. Codex only loads the project's MCP
config if you trust the repo; accept its trust prompt the first time.
