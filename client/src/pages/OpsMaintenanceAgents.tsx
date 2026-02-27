import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, Shield, Search, Wrench, Play, Workflow, ExternalLink, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const KNOWLEDGE_HUB_REPO = "harbz07/mcp-knowledge-hub";

const agents = [
  {
    icon: Shield,
    slug: "steward",
    name: "Steward",
    role: "Review Reminders",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/30",
    badge: "bg-amber-400/20 text-amber-400 border-amber-400/30",
    description:
      "Monitors SOP registry staleness. When today exceeds last_reviewed + review_interval_days, opens a review-reminder issue in mcp-knowledge-hub tagged sop-review and notifies the SOP owner.",
    triggers: ["Daily cron via mcp-knowledge-hub workflow", "Manual dispatch from Ops dashboard"],
    outputs: ["GitHub issue: [sop-review] <title> in mcp-knowledge-hub", "Discord digest message via Runner"],
  },
  {
    icon: Search,
    slug: "auditor",
    name: "Auditor",
    role: "Drift Detection",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30",
    badge: "bg-primary/20 text-primary border-primary/30",
    description:
      "Compares SOP content against the actual state of related repositories (README, CHANGELOG, API schemas). Flags inconsistencies as audit findings and can trigger the Builder to draft a correction PR.",
    triggers: ["Post-merge hook on related repos", "Weekly audit run scheduled in mcp-knowledge-hub"],
    outputs: ["GitHub issue: [sop-audit] drift detected in mcp-knowledge-hub", "Builder invocation with diff payload"],
  },
  {
    icon: Wrench,
    slug: "builder",
    name: "Builder",
    role: "PR Drafts",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30",
    badge: "bg-primary/20 text-primary border-primary/30",
    description:
      "Drafts pull requests against harbz07/soul-os-docs when an SOP needs updating. Follows the PR title prefix convention ([sop-add], [sop-update], [sop-review], [sop-retire]) so that the Steward can route the PR to the correct reviewer.",
    triggers: ["Invoked by Auditor with a diff payload", "Manual dispatch with SOP slug + change description"],
    outputs: ["Draft PR against harbz07/soul-os-docs:main", "PR tagged sop-update in mcp-knowledge-hub issue"],
  },
  {
    icon: Play,
    slug: "runner",
    name: "Runner",
    role: "Guided Execution",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30",
    badge: "bg-primary/20 text-primary border-primary/30",
    description:
      "Walks a human operator through a specific SOP step-by-step in Discord. For each step it posts the instruction, waits for confirmation or a result, then advances. Completion is recorded in mcp-knowledge-hub as a run log.",
    triggers: ["!run-sop <slug> command in Discord", "Steward escalation when review is overdue"],
    outputs: ["Discord thread with step-by-step prompts", "Run log issue in mcp-knowledge-hub tagged sop-run"],
  },
];

export default function OpsMaintenanceAgents() {
  return (
    <div className="min-h-screen">
      <div className="container max-w-4xl mx-auto px-6 py-16 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-4xl font-display text-foreground">Maintenance Agents</h1>
                <Badge className="bg-amber-400/20 text-amber-400 border-amber-400/30">Internal</Badge>
              </div>
              <p className="text-foreground/70">
                Lifecycle documentation for the knowledge-hub maintenance agent quartet —
                how they interact with{" "}
                <a
                  href={`https://github.com/${KNOWLEDGE_HUB_REPO}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary/80 hover:text-primary underline underline-offset-2"
                >
                  {KNOWLEDGE_HUB_REPO}
                </a>{" "}
                as workflow engine and Discord digest publisher.
              </p>
            </div>
          </div>
        </div>

        {/* Overview flow */}
        <Card className="p-6 bg-card/40 backdrop-blur-sm border-border/40">
          <div className="flex items-center gap-2 mb-4">
            <Workflow className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-display text-foreground">Agent Lifecycle Overview</h2>
          </div>
          <div className="space-y-2 text-sm font-mono text-foreground/70">
            <div className="flex items-center gap-2">
              <span className="text-amber-400">Steward</span>
              <span className="text-foreground/40">→</span>
              <span>detects stale SOP</span>
              <span className="text-foreground/40">→</span>
              <span>opens review-reminder issue</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">Auditor</span>
              <span className="text-foreground/40">→</span>
              <span>detects content drift</span>
              <span className="text-foreground/40">→</span>
              <span>invokes Builder</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">Builder</span>
              <span className="text-foreground/40">→</span>
              <span>drafts PR on soul-os-docs</span>
              <span className="text-foreground/40">→</span>
              <span>human reviews & merges</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">Runner</span>
              <span className="text-foreground/40">→</span>
              <span>guides operator through SOP steps in Discord</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            All workflow state is tracked as GitHub issues in{" "}
            <code className="text-primary/80">{KNOWLEDGE_HUB_REPO}</code>.
            Discord digests are published by the Runner via the knowledge-hub webhook integration
            (webhook URL stored as a repository secret — never committed to source).
          </p>
        </Card>

        {/* Agent cards */}
        <div className="grid gap-6">
          {agents.map((agent) => {
            const Icon = agent.icon;
            return (
              <Card
                key={agent.slug}
                className="p-6 bg-card/60 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${agent.bg} mt-1 shrink-0`}>
                    <Icon className={`w-5 h-5 ${agent.color}`} />
                  </div>
                  <div className="space-y-3 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-display text-foreground">{agent.name}</h2>
                      <Badge className={agent.badge}>{agent.role}</Badge>
                    </div>
                    <p className="text-sm text-foreground/70">{agent.description}</p>
                    <div className="grid sm:grid-cols-2 gap-4 pt-1">
                      <div>
                        <p className="text-xs font-medium text-foreground/50 uppercase tracking-wider mb-1">Triggers</p>
                        <ul className="space-y-1">
                          {agent.triggers.map((t) => (
                            <li key={t} className="flex items-start gap-1.5 text-xs text-foreground/60">
                              <span className="text-primary/50 mt-0.5 shrink-0">→</span>
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-foreground/50 uppercase tracking-wider mb-1">Outputs</p>
                        <ul className="space-y-1">
                          {agent.outputs.map((o) => (
                            <li key={o} className="flex items-start gap-1.5 text-xs text-foreground/60">
                              <span className="text-primary/50 mt-0.5 shrink-0">·</span>
                              {o}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Integration with mcp-knowledge-hub */}
        <Card className="p-6 bg-card/40 backdrop-blur-sm border-border/40">
          <h3 className="text-lg font-display text-foreground mb-3">Integration: mcp-knowledge-hub</h3>
          <p className="text-sm text-foreground/70 mb-4">
            <a
              href={`https://github.com/${KNOWLEDGE_HUB_REPO}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary/80 hover:text-primary underline underline-offset-2"
            >
              {KNOWLEDGE_HUB_REPO}
            </a>{" "}
            acts as the central workflow engine and Discord digest publisher for all maintenance agents.
          </p>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li className="flex items-start gap-2">
              <span className="text-primary/60 mt-0.5">→</span>
              <span>
                <strong className="text-foreground">Issue labels</strong> route work items:{" "}
                <code className="text-primary/80 bg-primary/10 px-1 rounded">sop-review</code>,{" "}
                <code className="text-primary/80 bg-primary/10 px-1 rounded">sop-audit</code>,{" "}
                <code className="text-primary/80 bg-primary/10 px-1 rounded">sop-run</code>,{" "}
                <code className="text-primary/80 bg-primary/10 px-1 rounded">sop-update</code>.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary/60 mt-0.5">→</span>
              <span>
                <strong className="text-foreground">GitHub Actions</strong> in mcp-knowledge-hub trigger
                agent logic on schedule and on issue events.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary/60 mt-0.5">→</span>
              <span>
                <strong className="text-foreground">Discord webhook</strong> URL stored as a repository
                secret (<code className="text-primary/80 bg-primary/10 px-1 rounded">DISCORD_WEBHOOK_URL</code>)
                — never committed to source code.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary/60 mt-0.5">→</span>
              <span>
                SOPs live in <strong className="text-foreground">harbz07/soul-os-docs</strong> and are
                referenced by slug. Agents open PRs here; they do not modify workflow engine state directly.
              </span>
            </li>
          </ul>
          <div className="mt-4 pt-4 border-t border-border/40 flex flex-wrap gap-2">
            {[
              { repo: KNOWLEDGE_HUB_REPO, label: "mcp-knowledge-hub" },
              { repo: "harbz07/soul-os-docs", label: "soul-os-docs" },
              { repo: "harbz07/mindbridge-mcp", label: "mindbridge-mcp" },
            ].map(({ repo, label }) => (
              <a key={repo} href={`https://github.com/${repo}`} target="_blank" rel="noopener noreferrer">
                <Badge
                  variant="outline"
                  className="gap-1 border-primary/20 text-primary/70 hover:border-primary/40 hover:text-primary transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3 h-3" />
                  {label}
                </Badge>
              </a>
            ))}
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          <Link href="/ops">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground gap-2">
              ← Back to Ops
            </Button>
          </Link>
          <Link href="/ops/sops">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground gap-2">
              SOPs
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
