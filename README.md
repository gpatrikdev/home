# Home Repo

Starting point for my coding-agent sessions. The agent setup is defined in
`.ruler/` folders: the root one applies everywhere, and each domain folder
(`web-development/`, ...) adds its own. The files the agents read
(AGENTS.md, CLAUDE.md, .mcp.json, .codex/config.toml, skill folders) are
generated and not committed.

After cloning, and after any edit under a `.ruler/` folder, run this from the
repo root:

    npx @intellectronica/ruler apply

Start a session in the domain folder for the work, for example
`web-development/` for web projects.
