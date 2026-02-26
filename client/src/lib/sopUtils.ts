const categoryColors: Record<string, string> = {
  deployment: "bg-primary/20 text-primary border-primary/30",
  operations: "bg-amber-400/20 text-amber-400 border-amber-400/30",
  engineering: "bg-emerald-400/20 text-emerald-400 border-emerald-400/30",
};

export function categoryBadgeClass(category: string): string {
  return categoryColors[category] ?? "bg-muted/40 text-muted-foreground border-border/40";
}
