'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Zap, Users, MapPin } from 'lucide-react';
import BlurText from '@/components/bits/BlurText';
import { useLanguage } from '@/context/LanguageContext';

const icons = [Zap, Users, MapPin];
const initialAnimations = [
  { initial: { x: -60, opacity: 0 }, animate: { x: 0, opacity: 1 } },
  { initial: { y: 50, opacity: 0 },  animate: { y: 0, opacity: 1 } },
  { initial: { x: 60, opacity: 0 },  animate: { x: 0, opacity: 1 } },
];

export default function WhyMe() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { t } = useLanguage();

  return (
    <section className="relative z-[1] py-24 md:py-28 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>

        {/* Título con BlurText */}
        <div className="mb-3">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5]">
            <BlurText
              text={t.whyme.title}
              delay={70}
              animateBy="words"
            />
          </h2>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="font-mono text-sm text-[#555555] mb-12"
        >
          {t.whyme.subtitle}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {t.whyme.cards.map((card, i) => {
            const Icon = icons[i];
            const anim = initialAnimations[i];
            return (
              <motion.div
                key={i}
                initial={anim.initial}
                animate={isInView ? anim.animate : anim.initial}
                transition={{
                  type: 'spring',
                  stiffness: 80,
                  damping: 20,
                  delay: i * 0.15,
                }}
                className="group p-7 rounded-xl border border-[#1e1e1e] bg-[#111111] hover:border-[#00E5FF]/20 transition-colors duration-300"
              >
                {/* Ícono con spring entrada */}
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -30 }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 15,
                    delay: i * 0.15 + 0.12,
                  }}
                  className="mb-5 inline-block"
                >
                  <Icon size={26} className="text-[#00E5FF]" strokeWidth={1.5} />
                </motion.div>

                <h3 className="text-base font-bold text-[#F5F5F5] mb-2 group-hover:text-[#00E5FF] transition-colors duration-200">
                  {card.title}
                </h3>
                <p className="text-sm text-[#666666] leading-relaxed">{card.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
