import { load } from "js-yaml";
import registryRaw from "../content/sops/registry.yml?raw";

export type SopStatus = "active" | "draft" | "deprecated";
export type SopCategory = string;

export interface Sop {
  slug: string;
  title: string;
  summary: string;
  category: SopCategory;
  status: SopStatus;
  repo?: string;
  steps: string[];
  notes?: string[];
}

interface SopRegistry {
  sops: Sop[];
}

const VALID_STATUSES: SopStatus[] = ["active", "draft", "deprecated"];

function parseRegistry(): Sop[] {
  const data = load(registryRaw) as SopRegistry;
  if (!data || !Array.isArray(data.sops)) {
    throw new Error("Invalid SOP registry: missing 'sops' array");
  }
  for (const sop of data.sops) {
    if (!sop.slug) throw new Error(`SOP entry missing required field: slug`);
    if (!sop.title) throw new Error(`SOP entry missing required field: title (slug: ${sop.slug})`);
    if (!sop.summary) throw new Error(`SOP entry missing required field: summary (slug: ${sop.slug})`);
    if (!sop.category) throw new Error(`SOP entry missing required field: category (slug: ${sop.slug})`);
    if (!sop.status) throw new Error(`SOP entry missing required field: status (slug: ${sop.slug})`);
    if (!VALID_STATUSES.includes(sop.status)) {
      throw new Error(
        `SOP entry has invalid status "${sop.status}" (slug: ${sop.slug}). Must be one of: ${VALID_STATUSES.join(", ")}`,
      );
    }
    if (!Array.isArray(sop.steps) || sop.steps.length === 0) {
      throw new Error(`SOP entry missing required field: steps (slug: ${sop.slug})`);
    }
  }
  return data.sops;
}

export const sops: Sop[] = parseRegistry();

export function getSopBySlug(slug: string): Sop | undefined {
  return sops.find((s) => s.slug === slug);
}
