import { milestones, getProgress, getCurrentMilestone } from "@/data/milestones";
import MilestoneCard from "@/components/MilestoneCard";
import ProgressOrb from "@/components/ProgressOrb";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, GitBranch, Brain, Users, Code2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const progress = getProgress();
  const currentMilestone = getCurrentMilestone();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section with Cosmic Background */}
      <section 
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('https://private-us-east-1.manuscdn.com/sessionFile/FBrkBNkixwaXRUnXWMhdiS/sandbox/JkqqIQQSJwU9BF6vaa9ivv-img-1_1771814043000_na1fn_c291bC1vcy1oZXJvLWJn.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvRkJya0JOa2l4d2FYUlVuWFdNaGRpUy9zYW5kYm94L0prcXFJUVFTSndVOUJGNnZhYTlpdnYtaW1nLTFfMTc3MTgxNDA0MzAwMF9uYTFmbl9jMjkxYkMxdmN5MW9aWEp2TFdKbi5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=T1oWbn5BRvmXTyuXILwsoCs-1qy1E7n9jscuM2u22fzDiczpUmcLPLvjdpK1SnWCLpJWlfjuU6cZ~ZEiusjigopujk0VMr8ATgnqWQIxs7gooDjrLj-~zSKGY~Rz0t5OLrvREhmr0PAqsT3W448iJQi~pc-kony0li1xINPTX5TX3VvmXN2g1MiuXUYSr35tIWvEqDs1ofm7LGIxLLsGI90G2-MpQXRI5k1KYwqhpZo5I-pgTl-QfemBkE98s6bGx4sknpLcgHL-dASUBnx2D0IulZGGadIx7EG7jpB68gu0PnFsqmKJAyiesUrmXXOd-25wWcTsVpKW8LiBS4rRHQ__')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        
        <div className="container relative z-10 text-center space-y-6 py-20">
          <div className="flex justify-center mb-6">
            <ProgressOrb progress={progress} size="lg" />
          </div>
          
          <h1 className="text-6xl md:text-7xl font-display text-foreground tracking-wide">
            Soul-OS
          </h1>
          
          <p className="text-2xl md:text-3xl text-primary/90 font-display font-light">
            Multi-Agent Cognitive Ecosystem
          </p>
          
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            A constellation of AI agents, each with distinct personalities and expertise, 
            sharing memory and collaborating naturally with you and each other.
          </p>
          
          {currentMilestone && (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Currently building: <span className="text-primary font-medium">{currentMilestone.title}</span></span>
            </div>
          )}
          
          <div className="flex items-center justify-center gap-4 pt-4">
            <a href="/api">
              <Button variant="outline" className="gap-2 border-amber-500/30 hover:bg-amber-500/10 text-amber-200">
                <Code2 className="w-4 h-4" />
                API Reference
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>
      
      {/* Vision Section */}
      <section className="container py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-display text-foreground">The Vision</h2>
            <p className="text-lg text-foreground/70 leading-relaxed">
              Building a multi-agent cognitive ecosystem where different AI personalities collaborate 
              with shared memory, creating a more natural and powerful collaborative experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-card/60 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-display">Shared Memory</h3>
              </div>
              <p className="text-sm text-foreground/70">
                Agents share knowledge through global, project, and agent-specific memory banks, 
                building on each other's work.
              </p>
            </Card>
            
            <Card className="p-6 bg-card/60 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-display">Distinct Personalities</h3>
              </div>
              <p className="text-sm text-foreground/70">
                Each agent has unique expertise, conversational style, and problem-solving approach, 
                creating natural collaboration.
              </p>
            </Card>
            
            <Card className="p-6 bg-card/60 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <GitBranch className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-display">Intelligent Routing</h3>
              </div>
              <p className="text-sm text-foreground/70">
                System automatically routes tasks to the right agents or enables multi-agent 
                collaboration for complex problems.
              </p>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Architecture Overview */}
      <section className="container py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-display text-foreground text-center mb-12">Current Architecture</h2>
          
          <Card className="p-8 bg-card/60 backdrop-blur-sm border-primary/20">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Badge className="bg-primary/20 text-primary border-primary/30">Live</Badge>
                <h3 className="text-2xl font-display">Soul-OS Frontend</h3>
              </div>
              
              <div className="space-y-3 text-sm font-mono text-foreground/70">
                <div className="flex items-center gap-2">
                  <span className="text-primary">→</span>
                  <span>Cloudflare Worker: <code className="text-primary/80">soul-os-frontend</code></span>
                </div>
                <div className="flex items-center gap-2 pl-6">
                  <span className="text-primary">→</span>
                  <span>D1 Database: memory, sessions, traces</span>
                </div>
                <div className="flex items-center gap-2 pl-6">
                  <span className="text-primary">→</span>
                  <span>MindBridge API: <code className="text-primary/80">api.soul-os.cc</code></span>
                </div>
                <div className="flex items-center gap-2 pl-12">
                  <span className="text-primary">→</span>
                  <span>OpenAI: 8 models (gpt-4o, o1, etc.)</span>
                </div>
                <div className="flex items-center gap-2 pl-12">
                  <span className="text-primary">→</span>
                  <span>Anthropic: 10 models (claude-sonnet-4-6, etc.)</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border/40">
                <p className="text-sm text-foreground/70">
                  <strong className="text-foreground">Cognitive Pipeline:</strong> 8-stage biomimetic processing 
                  (INGEST → WERNICKE → RAG → THALAMUS → INSULA → ASSEMBLE → GENERATE → CONSOLIDATE)
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>
      
      {/* Milestones Section */}
      <section className="container py-16">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-display text-foreground">The Constellation</h2>
            <p className="text-lg text-foreground/70">
              Six milestones to build the multi-agent ecosystem
            </p>
          </div>
          
          <div className="space-y-6">
            {milestones.map((milestone) => (
              <MilestoneCard key={milestone.id} milestone={milestone} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="container py-12 border-t border-border/40">
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Built with celestial mythopoetic mysticism
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/60">
            <span>Soul-OS Documentation</span>
            <span>•</span>
            <span>Living Codex</span>
            <span>•</span>
            <span>v1.0.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
