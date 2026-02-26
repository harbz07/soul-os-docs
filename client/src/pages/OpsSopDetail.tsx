import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, ExternalLink, ArrowRight } from "lucide-react";
import { Link, useParams } from "wouter";
import { getSopBySlug } from "@/data/sops";
import NotFound from "@/pages/NotFound";
import { categoryBadgeClass } from "@/lib/sopUtils";

export default function OpsSopDetail() {
  const { slug } = useParams<{ slug: string }>();
  const sop = getSopBySlug(slug ?? "");

  if (!sop) {
    return <NotFound />;
  }

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
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h1 className="text-4xl font-display text-foreground">{sop.title}</h1>
                <Badge className={categoryBadgeClass(sop.category)}>{sop.category}</Badge>
                {sop.status !== "active" && (
                  <Badge className="bg-muted/40 text-muted-foreground border-border/40">{sop.status}</Badge>
                )}
                <Badge className="bg-amber-400/20 text-amber-400 border-amber-400/30">Internal</Badge>
              </div>
              <p className="text-foreground/70">{sop.summary}</p>
              {sop.repo && (
                <a
                  href={`https://github.com/${sop.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground font-mono hover:text-primary/80 transition-colors mt-1"
                >
                  {sop.repo}
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Steps */}
        <Card className="p-6 bg-card/60 backdrop-blur-sm border-primary/20">
          <h2 className="text-lg font-display text-foreground mb-4">Steps</h2>
          <ol className="space-y-3">
            {sop.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                <span className="text-primary/60 font-mono shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </Card>

        {/* Notes */}
        {sop.notes && sop.notes.length > 0 && (
          <Card className="p-6 bg-card/40 backdrop-blur-sm border-border/40">
            <h3 className="text-lg font-display text-foreground mb-3">Notes</h3>
            <ul className="space-y-2 text-sm text-foreground/70">
              {sop.notes.map((note, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary/60 mt-0.5">→</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex items-center gap-4">
          <Link href="/ops/sops">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground gap-2">
              ← Back to SOPs
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground gap-2">
              Home
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
