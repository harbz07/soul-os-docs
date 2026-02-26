import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { sops, type Sop } from "@/data/sops";
import { categoryBadgeClass } from "@/lib/sopUtils";

function SopCard({ sop }: { sop: Sop }) {
  return (
    <Card className="p-6 bg-card/60 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-lg bg-primary/10 mt-1">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-display text-foreground">{sop.title}</h2>
              <Badge className={categoryBadgeClass(sop.category)}>{sop.category}</Badge>
              {sop.status !== "active" && (
                <Badge className="bg-muted/40 text-muted-foreground border-border/40">{sop.status}</Badge>
              )}
            </div>
            <p className="text-sm text-foreground/70">{sop.summary}</p>
            {sop.repo && (
              <p className="text-xs text-muted-foreground font-mono">
                <a
                  href={`https://github.com/${sop.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-primary/80 transition-colors"
                >
                  {sop.repo}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            )}
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
}

export default function OpsSops() {
  return (
    <div className="min-h-screen">
      <div className="container max-w-4xl mx-auto px-6 py-16 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-4xl font-display text-foreground">SOPs</h1>
                <Badge className="bg-amber-400/20 text-amber-400 border-amber-400/30">Internal</Badge>
              </div>
              <p className="text-foreground/70">Standard Operating Procedures — sourced from YAML registry</p>
            </div>
          </div>
        </div>

        {/* SOP list */}
        <div className="grid gap-6">
          {sops.map((sop) => (
            <SopCard key={sop.slug} sop={sop} />
          ))}
        </div>

        {/* Navigation */}
        <div>
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
