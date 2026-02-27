---
name: "Phase 0 Risk / Blocker"
about: "Track operational risks and blockers for the Soul-OS Hearth Phase 0 implementation (WERNICKE latency, memory drift, safety exceptions, etc.)"
title: "[RISK/BLOCKER] <short description>"
labels: "phase-0, risk"
assignees: ""
---

## Risk Category

<!-- Select all that apply -->

- [ ] Latency (e.g., WERNICKE routing latency spike)
- [ ] Memory Quality (e.g., mem0 retrieval precision/recall drift)
- [ ] Safety (e.g., policy violation, redaction failure)
- [ ] Cost (e.g., unexpected token/compute overrun)
- [ ] Dependency (e.g., upstream service outage or API change)

---

## Severity & Impact

**Severity:** <!-- Critical / High / Medium / Low -->

**Affected component(s):** <!-- e.g., WERNICKE router, mem0 layer, safety filter -->

**User / system impact:**

> Briefly describe who or what is affected and how severely.

---

## Reproduction Details / Evidence

**Observed behavior:**

> What is happening vs. what is expected?

**WERNICKE latency spike** (if applicable):
- Observed p95/p99 latency: `__ ms` (threshold: `__ ms`)
- Affected routing path / model endpoint:
- Relevant trace/log links:

**mem0 retrieval quality drift** (if applicable):
- Precision drop: `__%` → `__%`
- Recall drop: `__%` → `__%`
- Dataset / evaluation run link:

**Policy violation / redaction failure** (if applicable):
- Violation type: <!-- e.g., PII leak, prohibited content, guardrail bypass -->
- Example prompt/response (sanitised):
- Safety audit log link:

**Supporting evidence links:**

- [ ] Trace / log: <!-- URL -->
- [ ] Dashboard / alert: <!-- URL -->
- [ ] Evaluation report: <!-- URL -->

---

## Mitigation Plan

<!-- List concrete steps to resolve or contain this risk -->

1.
2.
3.

**Workaround available?** <!-- Yes / No — if yes, describe briefly -->

---

## Owner & ETA

| Field | Value |
|-------|-------|
| **Owner** | @<!-- GitHub handle --> |
| **ETA** | YYYY-MM-DD |
| **Reviewer** | @<!-- GitHub handle --> |

---

## Status Updates

<!-- Append dated entries as the issue progresses -->

- **YYYY-MM-DD** — Initial report filed.
