# Game development

Sessions for Godot projects start in this folder. They get everything from
the root AGENTS.md plus the skills, MCP servers and repos below.

- Engine: Godot 4, written in GDScript.
- Skills: see the game-development section of SKILLS.md at the repo root.
  Their "Related skills" lines name GodotPrompter skills that aren't
  installed; work without them, or ask me whether to add one.
- MCP servers: see the game-development section of MCP-SERVERS.md. Use the
  `godot` server to run the game and read its debug output after a change.
- If Godot is missing, install it (see the install rule in the root
  AGENTS.md). If the `godot` server can't find it, ask me to set the
  `GODOT_PATH` user environment variable to the Godot .exe, then restart.
- Tests: use the project's existing framework (GUT or gdUnit4). In a project
  without one, ask me which to add; the `godot-testing` skill compares them.

## Other Repos

None yet. Add one line per game repo:
<name> (<what it is>): <local path>. Clone from <remote> if missing.
