#!/usr/bin/env node
// Regenerates the agent files with Ruler, then rebuilds SKILLS.md and MCP-SERVERS.md.
// Works on Windows, macOS and Linux.
// Run from the repo root:   node apply.mjs          (extra args go to Ruler)
// Rebuild the lists only:   node apply.mjs --index-only
import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const args = process.argv.slice(2);
const indexOnly = args.includes("--index-only");

if (!existsSync(join(root, ".ruler"))) {
  console.error("Run this from the repo root (no .ruler folder here).");
  process.exit(1);
}

if (!indexOnly) {
  // One command string through the shell, so `npx` resolves on every OS
  // (npx.cmd on Windows) without Node's warning about unescaped shell args.
  const command = ["npx", "@intellectronica/ruler", "apply", ...args].map(shellQuote).join(" ");
  const ruler = spawnSync(command, { stdio: "inherit", shell: true });
  if (ruler.status !== 0) process.exit(ruler.status ?? 1);
}

// Domains: the root .ruler (shared) plus every top-level folder with its own .ruler.
const domains = [{ name: "shared", folder: "", ruler: join(root, ".ruler") }];
for (const entry of readdirSync(root, { withFileTypes: true })) {
  if (!entry.isDirectory() || entry.name.startsWith(".")) continue;
  const ruler = join(root, entry.name, ".ruler");
  if (existsSync(ruler)) domains.push({ name: entry.name, folder: entry.name, ruler });
}

// Claude Code on native Windows can't start `npx` directly; it needs `cmd /c npx`.
// ruler.toml keeps plain `npx` so it works everywhere, and the generated
// (gitignored) .mcp.json files are adjusted here on Windows only.
if (!indexOnly && process.platform === "win32") {
  for (const domain of domains) {
    const file = join(root, domain.folder, ".mcp.json");
    if (!existsSync(file)) continue;
    const config = JSON.parse(readFileSync(file, "utf8"));
    let changed = 0;
    for (const server of Object.values(config.mcpServers ?? {})) {
      if (server.command === "npx") {
        server.args = ["/c", "npx", ...(server.args ?? [])];
        server.command = "cmd";
        changed++;
      }
    }
    if (changed) {
      writeFileSync(file, JSON.stringify(config, null, 2) + "\n");
      console.log(`${domain.folder || "."}/.mcp.json: wrapped ${changed} npx server(s) in cmd /c for Windows.`);
    }
  }
}

// One timestamp per run, in local time with its UTC offset, e.g. 2026-11-23 20:15 (UTC+01:00).
const generatedAt = localTimestamp(new Date());

writeSkills();
writeMcpServers();

function localTimestamp(d) {
  const pad = (n) => String(Math.abs(n)).padStart(2, "0");
  const offset = -d.getTimezoneOffset();
  const sign = offset >= 0 ? "+" : "-";
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ` +
    `${pad(d.getHours())}:${pad(d.getMinutes())} ` +
    `(UTC${sign}${pad(Math.trunc(offset / 60))}:${pad(offset % 60)})`
  );
}

function writeSkills() {
  const sections = [];
  let total = 0;
  for (const domain of domains) {
    const dir = join(domain.ruler, "skills");
    const rows = existsSync(dir)
      ? readdirSync(dir, { withFileTypes: true })
          .filter((e) => e.isDirectory() && existsSync(join(dir, e.name, "SKILL.md")))
          .map((e) => skillRow(join(dir, e.name), e.name))
          .sort((a, b) => a.name.localeCompare(b.name))
      : [];
    if (rows.length === 0) continue;
    total += rows.length;
    sections.push(
      [
        `## ${domain.name} (${rows.length})`,
        "",
        `Source folder: \`${rulerPath(domain)}/skills/\`.`,
        "",
        "| Skill | Runs | What it does | Source |",
        "|---|---|---|---|",
        ...rows.map((r) => `| ${r.name} | ${r.runs} | ${cell(r.summary)} | ${r.source} |`),
      ].join("\n"),
    );
  }
  write("SKILLS.md", [
    "# Skills",
    "",
    generatedNote(),
    "",
    `${total} skills. A session started in a domain folder gets the shared skills plus that ` +
      'domain\'s. "Automatically" means agents can load the skill on their own; you can also ' +
      "call those by name. The others run only when you type the command.",
    "",
    sections.join("\n\n"),
  ]);
  console.log(`SKILLS.md: ${total} skills.`);
}

function writeMcpServers() {
  const sections = [];
  for (const domain of domains) {
    const file = join(domain.ruler, "ruler.toml");
    if (!existsSync(file)) continue;
    const servers = mcpServers(readFileSync(file, "utf8"));
    if (servers.length === 0) continue;
    const startIn = domain.folder
      ? `started in \`${domain.folder}/\` get these plus the shared ones`
      : "get these wherever they start";
    sections.push(
      [
        `## ${domain.name} (${servers.length})`,
        "",
        `Sessions ${startIn}. Defined in \`${rulerPath(domain)}/ruler.toml\`.`,
        "",
        "| Server | Connects to | What it's for | Agents |",
        "|---|---|---|---|",
        ...servers.map(
          (s) => `| ${s.name} | ${cell(s.target)} | ${cell(s.description || "-")} | ${s.agents} |`,
        ),
      ].join("\n"),
    );
  }
  write("MCP-SERVERS.md", [
    "# MCP servers",
    "",
    generatedNote(),
    "",
    "Like skills, MCP servers add up: a session started in a domain folder gets the shared " +
      "servers plus that domain's. Define a shared server only in the root `.ruler/ruler.toml`. " +
      "The description comes from the comment line directly above each server in `ruler.toml`.",
    "",
    sections.join("\n\n"),
  ]);
  console.log(`MCP-SERVERS.md: ${sections.length} domain(s).`);
}

function skillRow(dir, folderName) {
  const meta = frontmatter(readFileSync(join(dir, "SKILL.md"), "utf8"));
  const name = meta.name || folderName;
  const typedOnly = String(meta["disable-model-invocation"]).toLowerCase() === "true";
  return {
    name,
    runs: typedOnly ? `\`/${name}\` only` : "automatically",
    summary: firstSentence(meta.description || ""),
    source: source(dir),
  };
}

// Minimal YAML frontmatter reader: `key: value`, quoted values, and > or | blocks.
function frontmatter(text) {
  const match = text.replace(/\r\n/g, "\n").match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const meta = {};
  const lines = match[1].split("\n");
  for (let i = 0; i < lines.length; i++) {
    const kv = lines[i].match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!kv) continue;
    let value = kv[2].trim();
    if (/^[>|][-+]?$/.test(value)) {
      const block = [];
      while (i + 1 < lines.length && /^\s+\S/.test(lines[i + 1])) block.push(lines[++i].trim());
      value = block.join(" ");
    } else if (/^(["']).*\1$/.test(value)) {
      value = value.slice(1, -1).replace(/\\"/g, '"');
    }
    meta[kv[1]] = value;
  }
  return meta;
}

// Minimal TOML reader for [mcp_servers.<name>] and [agents.<agent>.mcp_servers.<name>] tables.
function mcpServers(text) {
  const servers = new Map();
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  let current = null;
  let comments = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("#")) {
      comments.push(line.replace(/^#\s?/, ""));
      continue;
    }
    if (line === "") {
      comments = [];
      continue;
    }
    const header = line.match(/^\[(?:agents\.([A-Za-z0-9_-]+)\.)?mcp_servers\.("?)([^"\].]+)\2\]$/);
    if (header) {
      const [, agent, , name] = header;
      const server = servers.get(name) ?? { name, agents: new Set(), description: "" };
      server.agents.add(agent ?? "all");
      if (!server.description && comments.length) server.description = comments.join(" ");
      // The shared definition is what gets listed; an agent override only fills in
      // a server that has no shared definition.
      if (!agent) server.shared = true;
      current = !agent || !server.shared ? server : null;
      servers.set(name, server);
      comments = [];
      continue;
    }
    if (line.startsWith("[")) {
      current = null;
      comments = [];
      continue;
    }
    comments = [];
    if (!current) continue;
    const kv = line.match(/^([A-Za-z0-9_-]+)\s*=\s*(.*)$/);
    if (!kv) continue;
    let value = kv[2];
    while (value.startsWith("[") && !value.includes("]") && i + 1 < lines.length) {
      value += " " + lines[++i].trim();
    }
    if (kv[1] === "url") current.target = unquote(value);
    if (kv[1] === "command") current.command = unquote(value);
    if (kv[1] === "args") current.args = [...value.matchAll(/"([^"]*)"|'([^']*)'/g)].map((m) => m[1] ?? m[2]);
  }
  return [...servers.values()].map((s) => ({
    name: s.name,
    target: s.target ?? (s.command ? `\`${[s.command, ...(s.args ?? [])].join(" ")}\`` : "-"),
    description: s.description,
    agents: s.agents.has("all")
      ? "all"
      : [...s.agents].join(", ") + " only",
  }));
}

function shellQuote(arg) {
  return /^[\w@%+=:,./-]+$/.test(arg) ? arg : `"${arg.replace(/(["\\$`])/g, "\\$1")}"`;
}

function unquote(value) {
  return value.trim().replace(/^(["'])(.*)\1$/, "$2");
}

function firstSentence(text) {
  const sentence = text.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? text;
  return sentence.length > 160 ? `${sentence.slice(0, 157)}...` : sentence;
}

function source(dir) {
  const file = join(dir, "SOURCE.txt");
  if (!existsSync(file)) return "local";
  const url = readFileSync(file, "utf8").match(/https:\/\/github\.com\/([^/\s]+\/[^/\s)]+)/);
  return url ? `[${url[1]}](https://github.com/${url[1]})` : "see SOURCE.txt";
}

function rulerPath(domain) {
  return domain.folder ? `${domain.folder}/.ruler` : ".ruler";
}

function generatedNote() {
  return [
    "<!-- Generated by apply.mjs. Do not edit; change .ruler folders and rerun it. -->",
    "",
    `Last regenerated: ${generatedAt}.`,
  ].join("\n");
}

function cell(text) {
  return text.replace(/\|/g, "\\|").replace(/\s+/g, " ").trim();
}

function write(file, lines) {
  writeFileSync(join(root, file), lines.join("\n") + "\n");
}
