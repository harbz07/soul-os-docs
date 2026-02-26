# SOP Maintenance SOP

## Purpose

Define how SOPs in this repository are created, reviewed, and updated — including the
conventions used by maintenance agents to propose changes autonomously.

## Scope

Applies to all SOP markdown files under `client/src/content/sops/` in
**harbz07/soul-os-docs**.

## SOP File Convention

Each SOP is a Markdown file with the slug as its filename:

```
client/src/content/sops/<slug>.md
```

A corresponding entry **must** exist in `client/src/data/sops.ts` with:

| Field | Type | Description |
|-------|------|-------------|
| `slug` | `string` | Matches the filename (without `.md`) |
| `title` | `string` | Human-readable title |
| `owner` | `string` | GitHub username responsible for the SOP |
| `review_interval_days` | `number` | How often to review (e.g., 90) |
| `last_reviewed` | `string` | ISO date `YYYY-MM-DD` |
| `tags` | `string[]` | Searchable tags |
| `related_repos` | `string[]` | `org/repo` format |

## Review Cycle

SOPs are considered **stale** when:

```
today - last_reviewed > review_interval_days
```

The Steward agent (see [Maintenance Agents](/ops/maintenance-agents)) monitors this and opens
a review reminder issue in `harbz07/mcp-knowledge-hub` tagged `sop-review`.

## Creating a New SOP

1. Create `client/src/content/sops/<new-slug>.md` with the standard header sections:
   - Purpose, Scope, Steps/Procedure, Maintenance Agent Integration, Related Links.
2. Add a registry entry in `client/src/data/sops.ts`.
3. Open a PR against `main` with `[sop-add]` in the title.
4. The Auditor agent reviews the PR for completeness and drift against related repos.

## Updating an Existing SOP

1. Edit the markdown file directly.
2. Update `last_reviewed` in `client/src/data/sops.ts` to today's date.
3. Open a PR with `[sop-update]` in the title.

## Maintenance Agent PR Conventions

All automated SOP PRs must follow this format to be routed correctly by the Steward:

| PR Title Prefix | Meaning |
|-----------------|---------|
| `[sop-add]` | New SOP file + registry entry |
| `[sop-update]` | Content revision to existing SOP |
| `[sop-review]` | Review confirmation (last_reviewed bump only) |
| `[sop-retire]` | Remove SOP from registry (keep file, mark deprecated) |

PRs are opened against `harbz07/soul-os-docs:main` by the **Builder** agent, reviewed by the
human owner listed in the registry, then merged.

## Related Links

- [Maintenance Agents](/ops/maintenance-agents)
- [soul-os-docs](https://github.com/harbz07/soul-os-docs)
- [mcp-knowledge-hub](https://github.com/harbz07/mcp-knowledge-hub)
