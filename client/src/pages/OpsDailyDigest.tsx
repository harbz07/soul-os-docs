import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, ExternalLink, ArrowLeft, Send, Clock, Lock } from "lucide-react";
import { Link } from "wouter";

const QUEUED_URL =
  "https://github.com/harbz07/mcp-knowledge-hub/issues?q=is%3Aissue+is%3Aopen+label%3Aagent-update+-label%3Asent";
const SENT_URL =
  "https://github.com/harbz07/mcp-knowledge-hub/issues?q=is%3Aissue+is%3Aopen+label%3Asent";

export default function OpsDailyDigest() {
  return (
    <div className="min-h-screen">
      {/* Access / Visibility Notice */}
      <div className="sticky top-0 z-50 flex items-center justify-center gap-2 bg-amber-950/90 backdrop-blur-sm border-b border-amber-500/40 px-4 py-2 text-sm text-amber-200">
        <Lock className="w-4 h-4 shrink-0 text-amber-400" />
        <span>
          <strong>Internal use only.</strong> This documentation site is not intended to be public-facing. Do not share this URL externally.
        </span>
      </div>

      <div className="container py-16 max-w-4xl mx-auto space-y-12">
        {/* Back link */}
        <Link href="/ops">
          <Button variant="ghost" className="gap-2 text-foreground/60 hover:text-foreground -ml-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Ops
          </Button>
        </Link>

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <CalendarDays className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-4xl font-display text-foreground">Daily Agent Digest</h1>
                <Badge className="bg-primary/20 text-primary border-primary/30">Ops</Badge>
              </div>
              <p className="text-foreground/70 mt-1">
                Agent-update issues in the GitHub Knowledge Hub — track queued and sent dispatches.
              </p>
            </div>
          </div>
        </div>

        {/* Issue Queue Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Queued */}
          <Card className="p-6 bg-card/60 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <Clock className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h2 className="text-xl font-display">Queued</h2>
                <Badge variant="outline" className="text-xs border-amber-500/30 text-amber-400 mt-1">
                  agent-update · not sent
                </Badge>
              </div>
            </div>
            <p className="text-sm text-foreground/70 mb-6">
              Open issues labelled <code className="text-primary/80">agent-update</code> that have{" "}
              <strong>not</strong> yet been sent. These are pending dispatch.
            </p>
            <a href={QUEUED_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2 border-amber-500/30 hover:bg-amber-500/10 text-amber-300 w-full">
                View Queued Issues
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </Card>

          {/* Sent */}
          <Card className="p-6 bg-card/60 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <Send className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-xl font-display">Sent</h2>
                <Badge variant="outline" className="text-xs border-emerald-500/30 text-emerald-400 mt-1">
                  agent-update · sent
                </Badge>
              </div>
            </div>
            <p className="text-sm text-foreground/70 mb-6">
              Open issues labelled <code className="text-primary/80">sent</code>. These agent-update 
              digests have already been dispatched.
            </p>
            <a href={SENT_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2 border-emerald-500/30 hover:bg-emerald-500/10 text-emerald-300 w-full">
                View Sent Issues
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </Card>
        </div>

        {/* Reference */}
        <Card className="p-6 bg-card/60 backdrop-blur-sm border-primary/20">
          <h3 className="text-lg font-display mb-3">GitHub Knowledge Hub</h3>
          <p className="text-sm text-foreground/70 mb-4">
            All agent-update issues are tracked in the{" "}
            <strong className="text-foreground">mcp-knowledge-hub</strong> repository.
            Use the links above to review and action pending digests.
          </p>
          <div className="space-y-2 text-sm font-mono text-foreground/60">
            <div className="flex items-start gap-2">
              <span className="text-primary mt-0.5">→</span>
              <span>
                Queued:{" "}
                <a
                  href={QUEUED_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary/80 hover:text-primary underline underline-offset-2 break-all"
                >
                  {QUEUED_URL}
                </a>
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary mt-0.5">→</span>
              <span>
                Sent:{" "}
                <a
                  href={SENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary/80 hover:text-primary underline underline-offset-2 break-all"
                >
                  {SENT_URL}
                </a>
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
