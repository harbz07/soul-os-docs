import { Lock } from "lucide-react";

export default function InternalBanner() {
  return (
    <div className="w-full bg-amber-500/15 border-b border-amber-500/30 py-2 px-4 flex items-center justify-center gap-2 text-sm text-amber-200 sticky top-0 z-50 backdrop-blur-sm">
      <Lock className="w-3.5 h-3.5 shrink-0" />
      <span>
        <strong>Internal use only</strong> — This site is not indexed and contains non-public information.
      </span>
    </div>
  );
}
