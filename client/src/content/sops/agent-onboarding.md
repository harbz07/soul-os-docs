# Agent Onboarding SOP

## Purpose

Define how a new AI agent is introduced into the Soul-OS ecosystem: from initial design,
to memory bootstrapping, to production registration.

## Scope

Applies to all agents integrated via:

- **harbz07/mindbridge-mcp** — agent execution and memory access
- **harbz07/mindbridge-router** — Wernicke routing (task-to-agent mapping)
- **harbz07/cerebral-sdk-prototype** — SDK agent definition helpers

## Onboarding Steps

### 1. Define Agent Identity

Create an agent profile with the following fields:

| Field | Description |
|-------|-------------|
| `name` | Display name (e.g., "Architect", "Builder") |
| `slug` | URL-safe identifier (e.g., `architect`) |
| `personality` | 1–3 sentence description of tone and expertise |
| `model` | Default model (`gpt-4o`, `claude-sonnet-4-6`, etc.) |
| `expertise` | Array of domain tags (e.g., `["system-design", "architecture"]`) |

### 2. Bootstrap Memory

Seed the agent with foundational context using the `cerebral-sdk-prototype` helpers:

```typescript
import { seedAgentMemory } from "@soul-os/cerebral-sdk";

await seedAgentMemory({
  agentSlug: "architect",
  scope: "agent",
  entries: [
    { key: "soul-os-overview", value: "Soul-OS is a multi-agent cognitive ecosystem..." },
  ],
});
```

### 3. Register Routing Rules

Add the agent to the Wernicke router config in `harbz07/mindbridge-router`:

```json
{
  "agent": "architect",
  "triggers": ["design", "architecture", "system", "schema"],
  "priority": 1
}
```

### 4. Add to Agents Table

Insert a row into the `agents` D1 table via a migration:

```sql
INSERT INTO agents (slug, name, model, personality, expertise)
VALUES ('architect', 'Architect', 'gpt-4o', 'Systematic, precise...', '["system-design"]');
```

### 5. Test the Agent

Send a test message via the MindBridge API:

```bash
curl -X POST https://api.soul-os.cc/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Design a simple key-value store", "agent": "architect"}'
```

Verify the response uses the correct model and personality.

### 6. Announce

Post a brief intro in `#agent-announcements` Discord channel and link the agent's profile page.

## Offboarding

To retire an agent:

1. Set `active = false` in the agents table.
2. Remove routing rules from Wernicke config.
3. Archive agent memories (copy to `scope = "archived"`).
4. Update this SOP's "Active Agents" section.

## Active Agents

| Slug | Name | Primary Model |
|------|------|---------------|
| `architect` | Architect | gpt-4o |
| `builder` | Builder | claude-sonnet-4-6 |
| `researcher` | Researcher | gpt-4o |
| `steward` | Steward | gpt-4o-mini |

## Maintenance Agent Integration

> **Convention for maintenance agents:** To update the "Active Agents" table or any procedure,
> open a PR against `harbz07/soul-os-docs` targeting `main` with the file path
> `client/src/content/sops/agent-onboarding.md`. Include `[sop-update]` in the PR title.

## Related Links

- [mindbridge-mcp](https://github.com/harbz07/mindbridge-mcp)
- [mindbridge-router](https://github.com/harbz07/mindbridge-router)
- [cerebral-sdk-prototype](https://github.com/harbz07/cerebral-sdk-prototype)
