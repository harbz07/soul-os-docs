import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings2, ClipboardList, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Ops() {
  return (
    <div className="min-h-screen">
      <div className="container max-w-4xl mx-auto px-6 py-16 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Settings2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-4xl font-display text-foreground">Ops</h1>
                <Badge className="bg-amber-400/20 text-amber-400 border-amber-400/30">Internal</Badge>
              </div>
              <p className="text-foreground/70">Operational dashboards and agent management tools</p>
            </div>
          </div>
        </div>

        {/* Ops sections */}
        <div className="grid gap-6">
          <Card className="p-6 bg-card/60 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10 mt-1">
                  <ClipboardList className="w-5 h-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-xl font-display text-foreground">Daily Agent Digest</h2>
                  <p className="text-sm text-foreground/70">
                    Review queued and sent agent update summaries tracked in mcp-knowledge-hub.
                  </p>
                </div>
              </div>
              <Link href="/ops/daily-digest">
                <Button variant="outline" className="gap-2 border-primary/30 hover:bg-primary/10 text-primary/90 shrink-0">
                  View
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="p-6 bg-card/60 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10 mt-1">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-xl font-display text-foreground">Standard Operating Procedures</h2>
                  <p className="text-sm text-foreground/70">
                    Browse and follow SOPs sourced from the YAML registry, covering deployments, incidents, and engineering practices.
                  </p>
                </div>
              </div>
              <Link href="/ops/sops">
                <Button variant="outline" className="gap-2 border-primary/30 hover:bg-primary/10 text-primary/90 shrink-0">
                  View
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Back home */}
        <div>
          <Link href="/">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground gap-2">
              ← Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
