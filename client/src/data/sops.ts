export interface SopEntry {
  slug: string;
  title: string;
  owner: string;
  review_interval_days: number;
  last_reviewed: string; // YYYY-MM-DD
  tags: string[];
  related_repos: string[];
}

export const sops: SopEntry[] = [
  {
    slug: "incident-response",
    title: "Incident Response",
    owner: "harbz07",
    review_interval_days: 90,
    last_reviewed: "2026-01-15",
    tags: ["incident", "ops", "on-call"],
    related_repos: ["harbz07/mcp-knowledge-hub", "harbz07/mindbridge-mcp"],
  },
  {
    slug: "deploy-checklist",
    title: "Deploy Checklist",
    owner: "harbz07",
    review_interval_days: 60,
    last_reviewed: "2026-01-20",
    tags: ["deploy", "ops", "cloudflare", "npm"],
    related_repos: [
      "harbz07/mindbridge-mcp",
      "harbz07/mindbridge-router",
      "harbz07/cerebral-sdk-prototype",
      "harbz07/SoulSpace",
    ],
  },
  {
    slug: "agent-onboarding",
    title: "Agent Onboarding",
    owner: "harbz07",
    review_interval_days: 180,
    last_reviewed: "2026-02-01",
    tags: ["agents", "onboarding", "memory"],
    related_repos: [
      "harbz07/mindbridge-mcp",
      "harbz07/mindbridge-router",
      "harbz07/cerebral-sdk-prototype",
    ],
  },
  {
    slug: "sop-maintenance",
    title: "SOP Maintenance",
    owner: "harbz07",
    review_interval_days: 180,
    last_reviewed: "2026-02-15",
    tags: ["sop", "docs", "maintenance-agents"],
    related_repos: ["harbz07/soul-os-docs", "harbz07/mcp-knowledge-hub"],
  },
];

export function getSopBySlug(slug: string): SopEntry | undefined {
  return sops.find((s) => s.slug === slug);
}

/** Returns true when today is past the review deadline. */
export function isSopStale(sop: SopEntry): boolean {
  const reviewed = new Date(sop.last_reviewed).getTime();
  const deadline = reviewed + sop.review_interval_days * 24 * 60 * 60 * 1000;
  return Date.now() > deadline;
}
