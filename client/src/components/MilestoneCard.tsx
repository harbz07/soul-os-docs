import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Milestone, MilestoneStatus } from "@/data/milestones";
import { CheckCircle2, Circle, Clock } from "lucide-react";

interface MilestoneCardProps {
  milestone: Milestone;
}

function getStatusIcon(status: MilestoneStatus) {
  switch (status) {
    case 'complete':
      return <CheckCircle2 className="w-6 h-6 text-primary" />;
    case 'in-progress':
      return <Clock className="w-6 h-6 text-amber-400 animate-pulse" />;
    case 'pending':
      return <Circle className="w-6 h-6 text-muted-foreground/40" />;
  }
}

function getStatusBadge(status: MilestoneStatus) {
  switch (status) {
    case 'complete':
      return <Badge className="bg-primary/20 text-primary border-primary/30">Complete</Badge>;
    case 'in-progress':
      return <Badge className="bg-amber-400/20 text-amber-400 border-amber-400/30 glow-amber">In Progress</Badge>;
    case 'pending':
      return <Badge variant="outline" className="text-muted-foreground">Pending</Badge>;
  }
}

export default function MilestoneCard({ milestone }: MilestoneCardProps) {
  const isActive = milestone.status !== 'pending';
  
  return (
    <Card className={`
      relative overflow-hidden transition-all duration-300
      ${isActive ? 'bg-card/80 backdrop-blur-sm border-primary/20' : 'bg-card/40 border-border/40'}
      ${milestone.status === 'in-progress' ? 'glow-amber' : ''}
      hover:border-primary/40 hover:shadow-lg
    `}>
      {/* Constellation pattern overlay */}
      {isActive && (
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img 
            src="https://private-us-east-1.manuscdn.com/sessionFile/FBrkBNkixwaXRUnXWMhdiS/sandbox/JkqqIQQSJwU9BF6vaa9ivv_1771814044880_na1fn_Y29uc3RlbGxhdGlvbi1wYXR0ZXJu.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvRkJya0JOa2l4d2FYUlVuWFdNaGRpUy9zYW5kYm94L0prcXFJUVFTSndVOUJGNnZhYTlpdnZfMTc3MTgxNDA0NDg4MF9uYTFmbl9ZMjl1YzNSbGJHeGhkR2x2Ymkxd1lYUjBaWEp1LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=IM3PRlYPrPsb-JgRz2V8oy0G01INvsIATsTAP8m3pi5lZrj2EfCHBWbWFYeZqlxoqaD94heRjS8Hz5oMLt1GiW5xbl1GpPQUr~trTp7Q5wRNVb8HMlF7EQBMRvwBdua-brYEHMgqlbBrlx5dV6YI8jKhMMTzO5t4p3hTSOuQ3~jUXFUydCLYp4u8HJhcH4xuBc15Jyl4P~5eRjeXbxLTJ0-ZoISx9Qd8Ui0iDvkVzUGvVrd7Ix4eqBTJHogc3a~eZ5VXW9gB6FcugR0kq3KMsb2s5fnutP45NASLB4V0oCbG3eG804MYujGA9kBkrfkjXYtrw~WnmNPgg0qNDYUhlA__"
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
        </div>
      )}
      
      <div className="relative p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="mt-1">
              {getStatusIcon(milestone.status)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm text-muted-foreground font-mono">
                  Milestone {milestone.id}
                </span>
                <span className="text-muted-foreground/40">•</span>
                <span className="text-sm text-muted-foreground">{milestone.estimatedWeeks}</span>
              </div>
              <h3 className="text-2xl font-display text-foreground mb-1">
                {milestone.title}
              </h3>
              <p className="text-primary/90 font-medium">
                {milestone.subtitle}
              </p>
            </div>
          </div>
          {getStatusBadge(milestone.status)}
        </div>
        
        {/* Description */}
        <p className="text-foreground/80 leading-relaxed">
          {milestone.description}
        </p>
        
        {/* Features */}
        <div>
          <h4 className="text-sm font-display text-foreground/70 mb-2">Features</h4>
          <ul className="space-y-1.5">
            {milestone.features.map((feature, idx) => (
              <li key={idx} className="text-sm text-foreground/70 flex items-start gap-2">
                <span className="text-primary/60 mt-1">→</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Deliverables */}
        <div>
          <h4 className="text-sm font-display text-foreground/70 mb-2">Deliverables</h4>
          <div className="flex flex-wrap gap-2">
            {milestone.deliverables.map((deliverable, idx) => (
              <Badge 
                key={idx} 
                variant="outline" 
                className="text-xs bg-secondary/30 border-secondary/50"
              >
                {deliverable}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Technical Notes (if present) */}
        {milestone.technicalNotes && milestone.technicalNotes.length > 0 && (
          <details className="group">
            <summary className="text-sm font-display text-primary/80 cursor-pointer hover:text-primary transition-colors">
              Technical Implementation Notes
            </summary>
            <ul className="mt-2 space-y-1 pl-4">
              {milestone.technicalNotes.map((note, idx) => (
                <li key={idx} className="text-xs text-muted-foreground font-mono">
                  • {note}
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>
    </Card>
  );
}
