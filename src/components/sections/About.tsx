'use client';

import { useRef, useEffect, useState, memo } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';

const STAT_VALUES = [4, 3, 2, 1];

const AnimatedCounter = memo(function AnimatedCounter({
  value,
  isInView,
}: {
  value: number;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) { setCount(value); return; }

    const duration = 1200;
    const startTime = performance.now();
    let rafId: number;

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(eased * value));
      if (progress < 1) rafId = requestAnimationFrame(animate);
      else setCount(value);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, value, prefersReducedMotion]);

  return <span>{count}</span>;
});

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLanguage();

  return (
    <section id="sobre-mi" className="relative z-[1] py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="grid grid-cols-1 md:grid-cols-5 gap-16 items-start"
        >
          {/* Text — 60% */}
          <div className="md:col-span-3">
            <h2 className="font-mono text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-8">
              {t.about.title}
            </h2>
            <div className="space-y-5 text-[#888888] leading-relaxed">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p className="text-[#F5F5F5]">
                {t.about.p3}{' '}
                <span className="text-[#00E5FF]">
                  {t.about.p3highlight}
                </span>
              </p>
            </div>
          </div>

          {/* Stats — 40% */}
          <div className="md:col-span-2 grid grid-cols-2 gap-6">
            {STAT_VALUES.map((value, i) => (
              <motion.div
                key={i}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                className="flex flex-col gap-1 p-4 border border-[#222222] rounded-lg bg-[#0d0d0d]"
              >
                <span className="font-mono text-4xl font-bold text-[#00E5FF]">
                  <AnimatedCounter value={value} isInView={isInView} />
                </span>
                <span className="text-xs text-[#555555] leading-tight">
                  {t.about.statLabels[i]}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
