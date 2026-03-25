import Fuse from 'fuse.js';
import projectsData from '../../projects/projects.json';

// ─── Types ────────────────────────────────────────────────────────────────────

export type Category = 'saas' | 'demo' | 'negocio' | 'ia' | 'app' | 'juego';
export type Status = 'produccion' | 'desarrollo' | 'demo';

export interface Project {
  id: string;
  name: string;
  short_desc: string;
  category: Category;
  status: Status;
  order: number;
  tags: string[];
  url: string;
  code_url: string | null;
  thumbnail: string | null;
  cover: string | null;
  stack: string[];
  badge: string | null;
  archived: boolean;
  /** Set internally — not in JSON */
  featured?: boolean;
}

// ─── Internal data ────────────────────────────────────────────────────────────

const _featured: Project[] = (projectsData.featured as Project[]).map((p) => ({
  ...p,
  featured: true,
}));

const _all: Project[] = projectsData.all as Project[];

/** All projects merged and sorted by order (featured first, then rest) */
const _merged: Project[] = [..._featured, ..._all].sort((a, b) => a.order - b.order);

// Fuse instance — created once, reused
const _fuse = new Fuse(_merged, {
  keys: [
    { name: 'name', weight: 0.5 },
    { name: 'tags', weight: 0.3 },
    { name: 'short_desc', weight: 0.2 },
  ],
  threshold: 0.35,
  includeScore: true,
});

// ─── Public API ───────────────────────────────────────────────────────────────

/** Featured + all merged, sorted by order */
export function getProjects(): Project[] {
  return _merged;
}

/** Featured projects only, max 3 */
export function getFeatured(): Project[] {
  return _featured.slice(0, 3);
}

/** Non-featured projects */
export function getAllProjects(): Project[] {
  return _all;
}

/** Filter non-featured by category */
export function getByCategory(cat: Category): Project[] {
  return _all.filter((p) => p.category === cat && !p.archived);
}

/** Fuse.js search across name + tags + short_desc (merged list) */
export function searchProjects(query: string): Project[] {
  if (query.trim().length <= 1) return _merged.filter((p) => !p.archived);
  return _fuse.search(query).map((r) => r.item).filter((p) => !p.archived);
}

/**
 * Paginate non-featured projects.
 * page is 0-indexed.
 */
export function getVisible(page: number, limit = 6): Project[] {
  const start = page * limit;
  return _all.slice(start, start + limit);
}

/** Projects marked as archived */
export function getArchived(): Project[] {
  return _merged.filter((p) => p.archived);
}

/** Count per category in the "all" (non-featured) list */
export function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = { all: _all.filter((p) => !p.archived).length };
  for (const p of _all) {
    if (p.archived) continue;
    counts[p.category] = (counts[p.category] ?? 0) + 1;
  }
  return counts;
}
