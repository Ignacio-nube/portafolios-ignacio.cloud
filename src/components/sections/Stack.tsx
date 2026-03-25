'use client';

import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

const Iridescence = dynamic(() => import('@/components/bits/Iridescence'), { ssr: false });

const categories = [
  {
    title: 'Frontend',
    items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'API Routes', 'Nodemailer', 'Puppeteer'],
  },
  {
    title: 'Base de datos',
    items: ['Supabase', 'PostgreSQL', 'Prisma'],
  },
  {
    title: 'Herramientas',
    items: ['Git', 'Mapbox', 'OpenAI API', 'Claude Code'],
  },
];

export default function Stack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="stack" className="py-24 md:py-32 px-6 relative overflow-hidden">
      {/* Iridescence background — subtle */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <Iridescence color={[0, 0.898, 1]} speed={0.4} amplitude={0.05} mouseReact={false} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
            Con qué trabajo
          </h2>
          <p className="text-[#555555] font-mono text-sm mb-12">
            Stack probado en producción, no en tutoriales.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {categories.map((cat, catIdx) => (
              <motion.div
                key={cat.title}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: catIdx * 0.1, ease: 'easeOut' }}
                className="border border-[#222222] rounded-xl bg-[#0d0d0d] p-6"
              >
                <h3 className="font-mono text-xs text-[#00E5FF] uppercase tracking-widest mb-4">
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((tech) => (
                    <motion.span
                      key={tech}
                      whileHover={prefersReducedMotion ? {} : { color: '#00E5FF', borderColor: '#00E5FF55' }}
                      transition={{ duration: 0.15 }}
                      className="font-mono text-xs border border-[#222222] text-[#888888] px-3 py-1.5 rounded-md bg-[#111111] transition-colors"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
