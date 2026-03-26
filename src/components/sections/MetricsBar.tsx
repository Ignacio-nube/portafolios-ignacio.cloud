'use client';

import { useRef, useEffect, useState, memo } from 'react';
import { motion, useInView } from 'motion/react';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/context/LanguageContext';

const ScrollVelocity = dynamic(() => import('@/components/bits/ScrollVelocity'), { ssr: false });

const METRIC_VALUES = [
  { value: 4, suffix: '' },
  { value: 2, suffix: '' },
  { value: 100, suffix: '%' },
];

const techStack = [
  'Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS',
  'OpenAI', 'GSAP', 'PostgreSQL', 'React', 'Puppeteer', 'Mapbox',
];

const CountUp = memo(function CountUp({
  value,
  suffix,
  isInView,
}: {
  value: number;
  suffix: string;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1400;
    const start = performance.now();
    let raf: number;

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(animate);
      else setCount(value);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isInView, value]);

  return <span>{count}{suffix}</span>;
});

export default function MetricsBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const { t } = useLanguage();

  return (
    <section className="relative z-[1] py-14 px-6 border-y border-[#111111] bg-[#080808]/60">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 sm:divide-x sm:divide-[#111111]">
          {METRIC_VALUES.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="flex flex-col items-center text-center px-8 py-2"
            >
              <span className="text-4xl md:text-5xl font-bold text-[#00E5FF] mb-2 tabular-nums">
                <CountUp value={m.value} suffix={m.suffix} isInView={isInView} />
              </span>
              <span className="font-mono text-sm text-[#555555]">{t.metrics.labels[i]}</span>
            </motion.div>
          ))}
        </div>

        {/* Tech marquee */}
        <div className="border-t border-[#111111] mt-10 pt-6 overflow-hidden">
          <ScrollVelocity
            items={techStack}
            velocity={0.7}
            separator="·"
            className="font-mono text-xs text-[#282828] gap-6"
          />
        </div>
      </div>
    </section>
  );
}
