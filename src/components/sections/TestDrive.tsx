'use client';

import { useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import LetterGlitch from '@/components/bits/LetterGlitch';

const demoProjects = [
  {
    id: 'fin-del-mundo',
    name: 'Fin del Mundo Stays',
    description: 'Reservas directas para alojamientos en Ushuaia.',
    url: 'https://finmundostays.com',
  },
  {
    id: 'ignacio-cloud',
    name: 'ignacio.cloud',
    description: 'Agregador inmobiliario con búsqueda IA.',
    url: 'https://ignacio.cloud',
  },
  {
    id: 'autos-tucuman',
    name: 'AutosTucumán',
    description: 'Buscador de autos en tiempo real.',
    url: 'https://autostucuman.com.ar',
  },
];

function GlitchTitle() {
  const [hovered, setHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h2 className="font-mono text-3xl md:text-5xl font-bold text-[#F5F5F5] relative z-10">
        Probalo vos mismo
      </h2>
      {hovered && !prefersReducedMotion && (
        <div className="absolute inset-0 z-0 overflow-hidden rounded opacity-40">
          <LetterGlitch
            glitchColors={['#003344', '#00E5FF', '#0099bb']}
            glitchSpeed={30}
            outerVignette={false}
          />
        </div>
      )}
    </div>
  );
}

export default function TestDrive() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="testear" className="py-24 md:py-32 px-6 bg-[#111111]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <GlitchTitle />

          <p className="text-[#888888] font-mono text-sm mt-4 mb-12">
            &ldquo;No describo lo que hago — te dejo que lo uses.&rdquo;
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            {demoProjects.map((project, i) => (
              <motion.a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                whileHover={prefersReducedMotion ? {} : { y: -4, borderColor: '#00E5FF55' }}
                className="group flex-1 border border-[#222222] rounded-xl bg-[#0d0d0d] p-6 transition-colors duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-mono text-base font-bold text-[#F5F5F5] group-hover:text-[#00E5FF] transition-colors duration-200">
                    {project.name}
                  </h3>
                  <ExternalLink
                    size={14}
                    className="text-[#444444] group-hover:text-[#00E5FF] transition-colors duration-200 shrink-0 mt-0.5"
                  />
                </div>
                <p className="text-[#555555] text-xs leading-relaxed mb-4">{project.description}</p>
                <span className="font-mono text-xs text-[#00E5FF] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Abrir →
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
