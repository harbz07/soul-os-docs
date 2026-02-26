import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, Clock, AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { sops, isSopStale } from "@/data/sops";

export default function OpsSops() {
  return (
    <div className="min-h-screen">
      <div className="container max-w-4xl mx-auto px-6 py-16 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-4xl font-display text-foreground">Standard Operating Procedures</h1>
                <Badge className="bg-amber-400/20 text-amber-400 border-amber-400/30">Internal</Badge>
              </div>
              <p className="text-foreground/70">
                Registry-driven SOPs for Soul-OS operations. Maintained via PR conventions for
                knowledge-hub maintenance agents.
              </p>
            </div>
          </div>
        </div>

        {/* SOP cards */}
        <div className="grid gap-6">
          {sops.map((sop) => {
            const stale = isSopStale(sop);
            return (
              <Card
                key={sop.slug}
                className="p-6 bg-card/60 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 mt-1">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-xl font-display text-foreground">{sop.title}</h2>
                        {stale && (
                          <Badge className="bg-amber-400/20 text-amber-400 border-amber-400/30 gap-1">
                            <AlertCircle className="w-3 h-3" />
                            Review due
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Last reviewed: {sop.last_reviewed}
                        </span>
                        <span>·</span>
                        <span>Owner: {sop.owner}</span>
                        <span>·</span>
                        <span>Review every {sop.review_interval_days}d</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {sop.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs border-primary/20 text-foreground/60"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Link href={`/ops/sops/${sop.slug}`}>
                    <Button
                      variant="outline"
                      className="gap-2 border-primary/30 hover:bg-primary/10 text-primary/90 shrink-0"
                    >
                      View
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Convention callout */}
        <Card className="p-6 bg-card/40 backdrop-blur-sm border-border/40">
          <h3 className="text-lg font-display text-foreground mb-3">Maintenance Agent Conventions</h3>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li className="flex items-start gap-2">
              <span className="text-primary/60 mt-0.5">→</span>
              <span>
                To add or update an SOP, open a PR against{" "}
                <code className="text-primary/80 bg-primary/10 px-1 rounded">harbz07/soul-os-docs:main</code>{" "}
                with the file in{" "}
                <code className="text-primary/80 bg-primary/10 px-1 rounded">client/src/content/sops/</code>.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary/60 mt-0.5">→</span>
              <span>
                Use PR title prefixes:{" "}
                <code className="text-primary/80 bg-primary/10 px-1 rounded">[sop-add]</code>{" "}
                <code className="text-primary/80 bg-primary/10 px-1 rounded">[sop-update]</code>{" "}
                <code className="text-primary/80 bg-primary/10 px-1 rounded">[sop-review]</code>{" "}
                so the Steward agent can route correctly.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary/60 mt-0.5">→</span>
              <span>
                Always update <code className="text-primary/80 bg-primary/10 px-1 rounded">client/src/data/sops.ts</code>{" "}
                alongside the markdown file to keep the registry in sync.
              </span>
            </li>
          </ul>
        </Card>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          <Link href="/ops">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground gap-2">
              ← Back to Ops
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
