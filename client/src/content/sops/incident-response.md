# Incident Response SOP

## Purpose

Define the standard response procedure for any production incident affecting Soul-OS services,
including agent pipeline failures, API outages, and memory-bank corruption.

## Scope

Applies to all services under the Soul-OS umbrella:

- **harbz07/mindbridge-mcp** — MCP server + cognitive pipeline
- **harbz07/mindbridge-router** — Wernicke routing layer
- **harbz07/cerebral-sdk-prototype** — SDK surface
- **harbz07/SoulSpace** — Front-end Cloudflare worker

## Severity Levels

| Level | Criteria | Target Response |
|-------|----------|-----------------|
| P0 | Full service outage or data loss | 15 min |
| P1 | Major feature broken, >50% users affected | 1 hr |
| P2 | Minor degradation, workaround available | 4 hrs |
| P3 | Cosmetic / docs issue | Next sprint |

## Response Steps

### 1. Detect & Triage

- Check the `#incidents` Discord channel for automated alerts from `harbz07/mcp-knowledge-hub`.
- Confirm scope: which service, which users, which pipeline stage (see cognitive pipeline stages: INGEST → WERNICKE → RAG → THALAMUS → INSULA → ASSEMBLE → GENERATE → CONSOLIDATE).
- Assign a severity level (P0–P3).

### 2. Communicate

- Post a brief status message in `#incidents` within 5 minutes of detection.
- If P0/P1, page the on-call owner via Discord DM.

### 3. Investigate

- Pull logs from the affected service (Cloudflare dashboard, D1 logs, or GitHub Actions run).
- Identify the root cause or narrow down the blast radius.

### 4. Mitigate

- Apply the fastest safe fix (feature flag, rollback, config change).
- Validate that the issue is resolved by checking the health endpoint or replaying a test request.

### 5. Post-Incident Review

Within 48 hours:

- Open a GitHub issue in the affected repo tagged `incident` + `post-mortem`.
- Fill out root cause, timeline, remediation, and prevention sections.
- Update this SOP if a gap was found.

## Maintenance Agent Integration

> **Convention for maintenance agents:** To propose updates to this SOP, open a PR against
> `harbz07/soul-os-docs` targeting `main` with the file path
> `client/src/content/sops/incident-response.md`. Include a PR description with
> `[sop-update]` in the title so the Steward agent can route it for review.

## Related Links

- [mcp-knowledge-hub issues](https://github.com/harbz07/mcp-knowledge-hub/issues)
- [mindbridge-mcp](https://github.com/harbz07/mindbridge-mcp)
