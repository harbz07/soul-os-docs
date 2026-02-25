import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, ArrowRight, Settings2, Lock } from "lucide-react";
import { Link } from "wouter";

export default function Ops() {
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
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Settings2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-4xl font-display text-foreground">Ops</h1>
                <Badge className="bg-primary/20 text-primary border-primary/30">Internal</Badge>
              </div>
              <p className="text-foreground/70 mt-1">
                Operational tooling and agent management for Soul-OS maintainers.
              </p>
            </div>
          </div>
        </div>

        {/* Ops Pages */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 bg-card/60 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <CalendarDays className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-display">Daily Agent Digest</h2>
                <Badge variant="outline" className="text-xs border-primary/30 text-primary/80 mt-1">
                  agent-update
                </Badge>
              </div>
            </div>
            <p className="text-sm text-foreground/70 mb-6">
              Review queued and sent agent-update issues in the GitHub Knowledge Hub. 
              Track which updates are pending dispatch and which have already been sent.
            </p>
            <Link href="/ops/daily-digest">
              <Button variant="outline" className="gap-2 border-primary/30 hover:bg-primary/10 text-primary w-full">
                Open Daily Digest
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
