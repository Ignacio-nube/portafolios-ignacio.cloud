'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'motion/react';
import dynamic from 'next/dynamic';
import { ExternalLink, Github, Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  type Project,
  type Category,
  getFeatured,
  getAllProjects,
  searchProjects,
  getCategoryCounts,
} from '@/lib/projects';

const ScrollFloat = dynamic(() => import('@/components/bits/ScrollFloat'), { ssr: false });

// ─── Constants ────────────────────────────────────────────────────────────────

const PAGE_SIZE = 6;
const PAGINATION_THRESHOLD = 20;
const SEARCH_MIN_LENGTH = 2;

const CATEGORY_LABELS: Record<string, string> = {
  all: 'Todos',
  saas: 'SaaS',
  demo: 'Demo',
  negocio: 'Negocio',
  ia: 'IA',
  app: 'App',
  juego: 'Juego',
};

const CATEGORY_GRADIENT: Record<string, string> = {
  saas:    'from-[#0a2535] to-[#001520]',
  demo:    'from-[#1a1a1a] to-[#0d0d0d]',
  negocio: 'from-[#0a1a12] to-[#051009]',
  ia:      'from-[#1a0a2a] to-[#0d0015]',
  app:     'from-[#0a1535] to-[#000d20]',
  juego:   'from-[#2a1a0a] to-[#150d00]',
};

const CATEGORY_TAG: Record<string, string> = {
  saas:    'bg-cyan-950 text-cyan-400 border-cyan-800/30',
  demo:    'bg-zinc-800 text-zinc-300 border-zinc-700/30',
  negocio: 'bg-emerald-950 text-emerald-400 border-emerald-800/30',
  ia:      'bg-purple-950 text-purple-400 border-purple-800/30',
  app:     'bg-blue-950 text-blue-400 border-blue-800/30',
  juego:   'bg-orange-950 text-orange-400 border-orange-800/30',
};

const STATUS_LABEL: Record<string, string> = {
  produccion: 'En producción',
  desarrollo: 'En desarrollo',
  demo: 'Demo',
};

const BLUR_PLACEHOLDER =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';

// ─── Shared sub-components ────────────────────────────────────────────────────

function TagPill({ category }: { category: string }) {
  return (
    <span className={`font-mono text-[9px] px-2 py-0.5 rounded-full border ${CATEGORY_TAG[category] ?? ''}`}>
      {CATEGORY_LABELS[category] ?? category}
    </span>
  );
}

function StatusBadge({ status, badge }: { status: string; badge?: string | null }) {
  const label = badge ?? STATUS_LABEL[status] ?? status;
  const isLive = status === 'produccion';
  return (
    <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] px-2 py-1 rounded-full border shrink-0 ${
      isLive
        ? 'border-green-500/40 text-green-400 bg-green-500/8'
        : 'border-[#00E5FF]/40 text-[#00E5FF] bg-[#00E5FF]/8'
    }`}>
      {isLive && <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />}
      {label}
    </span>
  );
}

function ProjectThumbnail({
  project,
  className,
  width,
  height,
  priority = false,
}: {
  project: Project;
  className?: string;
  width: number;
  height: number;
  priority?: boolean;
}) {
  if (!project.thumbnail) {
    return (
      <div
        className={`bg-gradient-to-br ${CATEGORY_GRADIENT[project.category] ?? 'from-[#111] to-[#0d0d0d]'} ${className ?? ''}`}
      />
    );
  }

  if (project.thumbnail.endsWith('.mp4')) {
    return (
      <video
        src={project.thumbnail}
        autoPlay
        muted
        loop
        playsInline
        className={`object-cover ${className ?? ''}`}
      />
    );
  }

  return (
    <Image
      src={project.thumbnail}
      alt={project.name}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      placeholder="blur"
      blurDataURL={BLUR_PLACEHOLDER}
      className={`object-cover ${className ?? ''}`}
    />
  );
}

// ─── Card: Featured main (2/3 width) ─────────────────────────────────────────

function FeaturedCard({ project }: { project: Project }) {
  return (
    <div className="h-full rounded-xl overflow-hidden border border-[#00E5FF]/20 bg-[#111111] flex flex-col group hover:border-[#00E5FF]/35 transition-colors duration-300">
      <div className="relative w-full h-48 overflow-hidden">
        <ProjectThumbnail
          project={project}
          width={800}
          height={400}
          priority
          className="w-full h-full opacity-55 group-hover:opacity-65 transition-opacity duration-300"
        />
      </div>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold text-[#F5F5F5]">{project.name}</h3>
          <StatusBadge status={project.status} badge={project.badge} />
        </div>
        <p className="text-[#666666] text-sm leading-relaxed line-clamp-2">{project.short_desc}</p>
        {project.stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {project.stack.slice(0, 4).map((t) => (
              <span key={t} className="font-mono text-[10px] border border-[#222222] text-[#555555] px-2 py-0.5 rounded">
                {t}
              </span>
            ))}
          </div>
        )}
        <div className="flex gap-2 pt-1">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs bg-[#00E5FF] text-[#080808] px-4 py-2 rounded-lg font-bold hover:bg-[#00E5FF]/90 transition-colors"
          >
            Ver demo <ExternalLink size={10} />
          </a>
          {project.code_url && (
            <a
              href={project.code_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs border border-[#222222] text-[#555555] hover:text-[#888888] hover:border-[#444444] px-4 py-2 rounded-lg transition-colors"
            >
              <Github size={10} /> Código
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Card: Featured side (1/3 width) ─────────────────────────────────────────

function FeaturedSideCard({ project }: { project: Project }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="h-full rounded-xl overflow-hidden border border-[#1e1e1e] bg-[#111111] flex flex-col group hover:border-[#00E5FF]/25 transition-colors duration-300"
    >
      <div className="relative w-full h-32 overflow-hidden">
        <ProjectThumbnail
          project={project}
          width={400}
          height={300}
          priority
          className="w-full h-full opacity-50 group-hover:opacity-60 transition-opacity"
        />
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-[#F5F5F5]">{project.name}</h3>
          <ExternalLink size={12} className="text-[#444444] group-hover:text-[#00E5FF] transition-colors shrink-0 mt-0.5" />
        </div>
        <StatusBadge status={project.status} badge={project.badge} />
        <p className="text-[#555555] text-xs leading-relaxed line-clamp-3">{project.short_desc}</p>
        {project.stack.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto pt-1">
            {project.stack.slice(0, 3).map((t) => (
              <span key={t} className="font-mono text-[9px] border border-[#1e1e1e] text-[#444444] px-1.5 py-0.5 rounded">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}

// ─── Card: Medium (3-col grid) ────────────────────────────────────────────────

function MediumCard({ project }: { project: Project }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-xl overflow-hidden border border-[#1e1e1e] bg-[#111111] flex flex-col group hover:border-[#2a2a2a] hover:scale-[1.02] transition-all duration-200"
      style={{ willChange: 'transform' }}
    >
      <div className="relative w-full h-28 overflow-hidden">
        <ProjectThumbnail
          project={project}
          width={400}
          height={220}
          className="w-full h-full opacity-50 group-hover:opacity-60 transition-opacity"
        />
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-[#F5F5F5] leading-snug">{project.name}</h3>
          <TagPill category={project.category} />
        </div>
        <p className="text-[#555555] text-xs leading-relaxed line-clamp-2">{project.short_desc}</p>
        {project.stack.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto pt-1">
            {project.stack.slice(0, 3).map((t) => (
              <span key={t} className="font-mono text-[9px] border border-[#1e1e1e] text-[#444444] px-1.5 py-0.5 rounded">
                {t}
              </span>
            ))}
            {project.stack.length > 3 && (
              <span className="font-mono text-[9px] text-[#333333]">+{project.stack.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </a>
  );
}

// ─── Card: Compact (4-col grid) ───────────────────────────────────────────────

function CompactCard({ project }: { project: Project }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between rounded-lg border border-[#1e1e1e] bg-[#0d0d0d] px-4 py-3 hover:border-[#2a2a2a] hover:bg-[#141414] hover:translate-x-0.5 transition-all duration-200 group"
    >
      <div className="flex flex-col gap-1.5 min-w-0">
        <p className="text-sm font-medium text-[#cccccc] group-hover:text-white transition-colors truncate">
          {project.name}
        </p>
        <TagPill category={project.category} />
      </div>
      <ExternalLink size={13} className="text-[#333333] group-hover:text-[#00E5FF] transition-all duration-200 shrink-0 ml-4" />
    </a>
  );
}

// ─── Search results grid (flat, uniform) ─────────────────────────────────────

function SearchGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <p className="text-center text-[#444444] font-mono text-sm py-16">
        Sin resultados. Probá con otro término.
      </p>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {projects.map((p) => (
        <MediumCard key={p.id} project={p} />
      ))}
    </div>
  );
}

// ─── Featured layout (always visible, entrada desde lados opuestos) ──────────

function FeaturedLayout({ projects, isInView }: { projects: Project[]; isInView: boolean }) {
  const [main, side, third] = projects;
  return (
    <div className="space-y-4 mb-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div
          className="lg:col-span-2"
          initial={{ x: -40, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ type: 'spring', stiffness: 80, damping: 22, delay: 0.15 }}
        >
          <FeaturedCard project={main} />
        </motion.div>
        {side && (
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ type: 'spring', stiffness: 80, damping: 22, delay: 0.25 }}
          >
            <FeaturedSideCard project={side} />
          </motion.div>
        )}
      </div>
      {third && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 80, damping: 22, delay: 0.35 }}
        >
          <MediumCard project={third} />
        </motion.div>
      )}
    </div>
  );
}

// ─── All-projects grid with expand / pagination ───────────────────────────────

function AllProjectsGrid({
  projects,
  visibleCount,
  page,
  onLoadMore,
  onPageChange,
}: {
  projects: Project[];
  visibleCount: number;
  page: number;
  onLoadMore: () => void;
  onPageChange: (p: number) => void;
}) {
  const usePagination = projects.length > PAGINATION_THRESHOLD;
  const totalPages = Math.ceil(projects.length / PAGE_SIZE);

  const visible = usePagination
    ? projects.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
    : projects.slice(0, visibleCount);

  const remaining = projects.length - visibleCount;

  if (projects.length === 0) {
    return (
      <p className="text-center text-[#444444] font-mono text-sm py-16">
        Sin proyectos en esta categoría.
      </p>
    );
  }

  // Split: first 3 as medium cards, rest as compact
  const medium = visible.slice(0, 3);
  const compact = visible.slice(3);

  return (
    <div className="space-y-3">
      {medium.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {medium.map((p) => (
            <MediumCard key={p.id} project={p} />
          ))}
        </div>
      )}
      {compact.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {compact.map((p) => (
            <CompactCard key={p.id} project={p} />
          ))}
        </div>
      )}

      {/* Load more / pagination */}
      {usePagination ? (
        <div className="flex items-center justify-center gap-1 pt-4">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 0}
            className="p-2 rounded-lg border border-[#1a1a1a] text-[#555555] hover:text-[#888888] hover:border-[#2a2a2a] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ChevronLeft size={14} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => onPageChange(i)}
              className={`w-8 h-8 rounded-lg font-mono text-xs border transition-all duration-200 ${
                page === i
                  ? 'bg-[#00E5FF] text-[#080808] border-[#00E5FF] font-bold'
                  : 'border-[#1a1a1a] text-[#555555] hover:border-[#2a2a2a] hover:text-[#888888]'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages - 1}
            className="p-2 rounded-lg border border-[#1a1a1a] text-[#555555] hover:text-[#888888] hover:border-[#2a2a2a] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      ) : (
        remaining > 0 && (
          <button
            onClick={onLoadMore}
            className="w-full flex items-center justify-center gap-2 font-mono text-xs text-[#444444] hover:text-[#888888] border border-[#1a1a1a] hover:border-[#2a2a2a] rounded-xl py-3 transition-all duration-200"
          >
            <ChevronDown size={13} />
            <span>+ Ver {Math.min(remaining, PAGE_SIZE)} proyectos más</span>
          </button>
        )
      )}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<'all' | Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [page, setPage] = useState(0);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const featured = getFeatured();
  const allProjects = getAllProjects();
  const counts = getCategoryCounts();

  const isSearching = searchQuery.length >= SEARCH_MIN_LENGTH;

  const filteredAll = isSearching
    ? [] // not used when searching
    : activeCategory === 'all'
      ? allProjects.filter((p) => !p.archived)
      : allProjects.filter((p) => p.category === activeCategory && !p.archived);

  const searchResults = isSearching ? searchProjects(searchQuery) : [];

  const handleCategoryChange = useCallback((cat: 'all' | Category) => {
    setActiveCategory(cat);
    setVisibleCount(PAGE_SIZE);
    setPage(0);
  }, []);

  const handleLoadMore = useCallback(() => {
    setVisibleCount((v) => v + PAGE_SIZE);
  }, []);

  const handlePageChange = useCallback((p: number) => {
    setPage(p);
    setVisibleCount(PAGE_SIZE);
  }, []);

  const showSearch = allProjects.length > 8;

  return (
    <section id="proyectos" className="relative z-[1] py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <ScrollFloat
            containerClassName="mb-2"
            textClassName="font-mono text-3xl md:text-4xl font-bold text-[#F5F5F5]"
            animationDuration={1}
            stagger={0.025}
          >
            Lo que construí
          </ScrollFloat>
          <p className="text-[#555555] font-mono text-sm mb-10">
            Proyectos reales para mercados reales.
          </p>
        </motion.div>

        {/* Featured — always visible, animación manejada internamente */}
        <FeaturedLayout projects={featured} isInView={isInView} />

        {/* Controls: category pills + search */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3 mb-6 mt-8"
        >
          {/* Category pills con highlight deslizante (layoutId) */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => {
              const count = counts[key] ?? 0;
              if (key !== 'all' && count === 0) return null;
              const isActive = activeCategory === key && !isSearching;
              return (
                <button
                  key={key}
                  onClick={() => handleCategoryChange(key as 'all' | Category)}
                  className={`relative font-mono text-xs px-4 py-1.5 rounded-full border overflow-hidden transition-colors duration-200 ${
                    isActive
                      ? 'border-[#00E5FF] text-[#080808] font-bold'
                      : 'border-[#222222] text-[#555555] hover:border-[#333333] hover:text-[#888888]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-pill"
                      className="absolute inset-0 bg-[#00E5FF] rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">
                    {label}
                    {count > 0 && (
                      <span className={`ml-1.5 ${isActive ? 'text-[#080808]/70' : 'text-[#333333]'}`}>
                        ({count})
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search input */}
          {showSearch && (
            <div className="relative sm:ml-auto shrink-0">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444444] pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(0);
                  setVisibleCount(PAGE_SIZE);
                }}
                placeholder="Buscar proyecto..."
                className="w-full sm:w-52 font-mono text-xs bg-[#0d0d0d] border border-[#222222] text-[#cccccc] placeholder:text-[#333333] rounded-lg pl-8 pr-4 py-1.5 focus:outline-none focus:border-[#00E5FF]/40 transition-colors duration-200"
              />
            </div>
          )}
        </motion.div>

        {/* All-projects grid */}
        <div key={`${activeCategory}-${isSearching}`}>
          {isSearching ? (
            <SearchGrid projects={searchResults} />
          ) : (
            <AllProjectsGrid
              projects={filteredAll}
              visibleCount={visibleCount}
              page={page}
              onLoadMore={handleLoadMore}
              onPageChange={handlePageChange}
            />
          )}
        </div>

      </div>
    </section>
  );
}
