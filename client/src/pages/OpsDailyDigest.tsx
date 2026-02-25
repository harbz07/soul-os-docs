import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClipboardList, ExternalLink, Inbox, Send, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const REPO = "harbz07/mcp-knowledge-hub";

const GITHUB_QUEUED_URL = `https://github.com/${REPO}/issues?q=is%3Aissue+is%3Aopen+label%3Adaily-digest`;
const GITHUB_SENT_URL = `https://github.com/${REPO}/issues?q=is%3Aissue+label%3Adaily-digest+label%3Asent`;

export default function OpsDailyDigest() {
  return (
    <div className="min-h-screen">
      <div className="container max-w-4xl mx-auto px-6 py-16 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <ClipboardList className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-4xl font-display text-foreground">Daily Agent Digest</h1>
                <Badge className="bg-amber-400/20 text-amber-400 border-amber-400/30">Internal</Badge>
              </div>
              <p className="text-foreground/70">
                Agent update summaries tracked in{" "}
                <a
                  href={`https://github.com/${REPO}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary/80 hover:text-primary underline underline-offset-2"
                >
                  {REPO}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Issue query cards */}
        <div className="grid gap-6">
          {/* Queued */}
          <Card className="p-6 bg-card/60 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-amber-400/10 mt-1">
                  <Inbox className="w-5 h-5 text-amber-400" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-display text-foreground">Queued Updates</h2>
                    <Badge className="bg-amber-400/20 text-amber-400 border-amber-400/30">Open</Badge>
                  </div>
                  <p className="text-sm text-foreground/70">
                    Issues labelled <code className="text-primary/80 bg-primary/10 px-1 rounded">daily-digest</code> that
                    are still open and awaiting delivery.
                  </p>
                  <p className="text-xs text-muted-foreground font-mono break-all">{GITHUB_QUEUED_URL}</p>
                </div>
              </div>
              <a href={GITHUB_QUEUED_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2 border-amber-400/30 hover:bg-amber-400/10 text-amber-300 shrink-0">
                  Open
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </Card>

          {/* Sent */}
          <Card className="p-6 bg-card/60 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10 mt-1">
                  <Send className="w-5 h-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-display text-foreground">Sent Updates</h2>
                    <Badge className="bg-primary/20 text-primary border-primary/30">Sent</Badge>
                  </div>
                  <p className="text-sm text-foreground/70">
                    Issues labelled{" "}
                    <code className="text-primary/80 bg-primary/10 px-1 rounded">daily-digest</code> +{" "}
                    <code className="text-primary/80 bg-primary/10 px-1 rounded">sent</code> — already delivered digests.
                  </p>
                  <p className="text-xs text-muted-foreground font-mono break-all">{GITHUB_SENT_URL}</p>
                </div>
              </div>
              <a href={GITHUB_SENT_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2 border-primary/30 hover:bg-primary/10 text-primary/90 shrink-0">
                  Open
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </Card>
        </div>

        {/* How it works */}
        <Card className="p-6 bg-card/40 backdrop-blur-sm border-border/40">
          <h3 className="text-lg font-display text-foreground mb-3">How it works</h3>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li className="flex items-start gap-2">
              <span className="text-primary/60 mt-0.5">→</span>
              <span>
                Agents create GitHub issues in <code className="text-primary/80">{REPO}</code> tagged{" "}
                <code className="text-primary/80">daily-digest</code> when they have updates to share.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary/60 mt-0.5">→</span>
              <span>The digest runner collects open issues, composes a summary, and dispatches it.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary/60 mt-0.5">→</span>
              <span>
                Delivered issues are labelled <code className="text-primary/80">sent</code> and closed.
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
