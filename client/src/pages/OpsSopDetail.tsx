import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink, Clock, AlertCircle, User, RefreshCw } from "lucide-react";
import { Link, useParams } from "wouter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getSopBySlug, isSopStale } from "@/data/sops";

// Load all SOP markdown files as raw strings at build time
const sopModules = import.meta.glob("../content/sops/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function getSopContent(slug: string): string | null {
  const key = `../content/sops/${slug}.md`;
  return sopModules[key] ?? null;
}

export default function OpsSopDetail() {
  const { slug } = useParams<{ slug: string }>();
  const sop = getSopBySlug(slug);
  const content = getSopContent(slug);

  if (!sop || content === null) {
    return (
      <div className="min-h-screen">
        <div className="container max-w-4xl mx-auto px-6 py-16 space-y-8">
          <div className="text-center space-y-4">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto" />
            <h1 className="text-3xl font-display text-foreground">SOP Not Found</h1>
            <p className="text-foreground/70">No SOP exists with the slug "{slug}".</p>
          </div>
          <div className="flex justify-center">
            <Link href="/ops/sops">
              <Button variant="outline" className="gap-2 border-primary/30 hover:bg-primary/10 text-primary/90">
                ← Back to SOPs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const stale = isSopStale(sop);

  return (
    <div className="min-h-screen">
      <div className="container max-w-4xl mx-auto px-6 py-16 space-y-10">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-4xl font-display text-foreground">{sop.title}</h1>
                <Badge className="bg-amber-400/20 text-amber-400 border-amber-400/30">Internal</Badge>
                {stale && (
                  <Badge className="bg-amber-400/20 text-amber-400 border-amber-400/30 gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Review due
                  </Badge>
                )}
              </div>
              <p className="text-foreground/70">
                SOP /{" "}
                <span className="font-mono text-primary/80">{sop.slug}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Metadata card */}
        <Card className="p-5 bg-card/40 backdrop-blur-sm border-border/40">
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2 text-foreground/70">
              <User className="w-4 h-4 text-primary/60" />
              <span>Owner:</span>
              <a
                href={`https://github.com/${sop.owner}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary/80 hover:text-primary underline underline-offset-2"
              >
                {sop.owner}
              </a>
            </div>
            <div className="flex items-center gap-2 text-foreground/70">
              <Clock className="w-4 h-4 text-primary/60" />
              <span>Last reviewed:</span>
              <span className="text-foreground">{sop.last_reviewed}</span>
            </div>
            <div className="flex items-center gap-2 text-foreground/70">
              <RefreshCw className="w-4 h-4 text-primary/60" />
              <span>Review every:</span>
              <span className="text-foreground">{sop.review_interval_days} days</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mt-4">
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

          {/* Related repos */}
          {sop.related_repos.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border/40">
              <p className="text-xs text-muted-foreground mb-2">Related repositories:</p>
              <div className="flex flex-wrap gap-2">
                {sop.related_repos.map((repo) => (
                  <a
                    key={repo}
                    href={`https://github.com/${repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Badge
                      variant="outline"
                      className="gap-1 border-primary/20 text-primary/70 hover:border-primary/40 hover:text-primary transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {repo}
                    </Badge>
                  </a>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Markdown content */}
        <Card className="p-8 bg-card/60 backdrop-blur-sm border-primary/20">
          <div className="prose prose-invert prose-sm max-w-none
            prose-headings:font-display prose-headings:text-foreground
            prose-p:text-foreground/80 prose-p:leading-relaxed
            prose-a:text-primary/80 prose-a:no-underline hover:prose-a:text-primary
            prose-code:text-primary/80 prose-code:bg-primary/10 prose-code:px-1 prose-code:rounded prose-code:text-sm
            prose-pre:bg-card/80 prose-pre:border prose-pre:border-border/40
            prose-blockquote:border-primary/30 prose-blockquote:text-foreground/70
            prose-table:text-sm prose-th:text-foreground prose-td:text-foreground/70
            prose-strong:text-foreground prose-li:text-foreground/80
            prose-hr:border-border/40">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          <Link href="/ops/sops">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground gap-2">
              ← Back to SOPs
            </Button>
          </Link>
          <Link href="/ops">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground gap-2">
              Ops
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
