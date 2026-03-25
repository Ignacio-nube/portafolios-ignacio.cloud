'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'motion/react';
import { MessageCircle, ArrowDown } from 'lucide-react';
import SplitText from '@/components/bits/SplitText';

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER ?? '5493816000000';
const WA_MSG = encodeURIComponent('Hola Ignacio, vi tu portfolio y quiero hablar de mi proyecto.');

const phrases = [
  'Sistemas de reservas directas',
  'Webs que generan clientes',
  'Apps sin comisiones de Booking',
];

function TypingText() {
  const [text, setText] = useState('');
  const phraseIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const tick = () => {
      const phrase = phrases[phraseIdx.current];
      if (!deleting.current) {
        charIdx.current++;
        setText(phrase.slice(0, charIdx.current));
        if (charIdx.current >= phrase.length) {
          deleting.current = true;
          timer.current = setTimeout(tick, 2400);
          return;
        }
        timer.current = setTimeout(tick, 55);
      } else {
        charIdx.current--;
        setText(phrase.slice(0, charIdx.current));
        if (charIdx.current <= 0) {
          deleting.current = false;
          phraseIdx.current = (phraseIdx.current + 1) % phrases.length;
          timer.current = setTimeout(tick, 500);
          return;
        }
        timer.current = setTimeout(tick, 32);
      }
    };
    timer.current = setTimeout(tick, 1000);
    return () => clearTimeout(timer.current);
  }, []);

  return (
    <span>
      <span className="text-[#00E5FF]">{text}</span>
      <span className="inline-block w-[2px] h-[0.85em] bg-[#00E5FF] ml-1 align-middle animate-pulse" />
    </span>
  );
}

function MockupCard({ y }: { y: MotionValue<number> }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cx = e.clientX;
    const cy = e.clientY;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!containerRef.current || !cardRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      const x = (cx - r.left - r.width / 2) / (r.width / 2);
      const yVal = (cy - r.top - r.height / 2) / (r.height / 2);
      cardRef.current.style.transition = 'none';
      cardRef.current.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-yVal * 7}deg) scale3d(1.025, 1.025, 1.025)`;
    });
  };

  const onMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.7s ease-out';
      cardRef.current.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(2deg)';
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className="hidden lg:flex flex-1 items-center justify-center relative"
      style={{ y }}
      initial={{ opacity: 0, x: 60, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div
        ref={cardRef}
        className="relative w-[460px] rounded-2xl overflow-hidden shadow-2xl shadow-black/60 will-change-transform"
        style={{
          transform: 'perspective(1000px) rotateY(-5deg) rotateX(2deg)',
          transition: 'transform 0.7s ease-out',
          border: '1px solid rgba(0, 229, 255, 0.18)',
        }}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#111111] border-b border-[#1a1a1a]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 mx-3 bg-[#1a1a1a] rounded px-3 py-1 text-[10px] font-mono text-[#444444]">
            finmundostays.com
          </div>
        </div>

        {/* App content */}
        <div className="bg-[#0d0d0d] p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-5 w-28 rounded bg-[#00E5FF]/20" />
            <div className="flex gap-2">
              <div className="h-7 w-16 rounded-lg bg-[#1a1a1a]" />
              <div className="h-7 w-24 rounded-lg bg-[#00E5FF]" />
            </div>
          </div>

          <div>
            <div className="h-6 w-3/4 bg-[#1e1e1e] rounded mb-2" />
            <div className="h-5 w-1/2 bg-[#181818] rounded mb-3" />
            <div className="h-2.5 w-full bg-[#151515] rounded mb-1.5" />
            <div className="h-2.5 w-5/6 bg-[#151515] rounded" />
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="col-span-2 bg-[#111111] border border-[#1e1e1e] rounded-lg p-3">
              <div className="h-2 w-12 bg-[#2a2a2a] rounded mb-2" />
              <div className="h-3.5 w-20 bg-[#1e1e1e] rounded" />
            </div>
            <div className="bg-[#00E5FF] rounded-lg flex items-center justify-center">
              <div className="h-4 w-12 bg-[#002222]/40 rounded" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[0, 1].map((i) => (
              <div key={i} className="bg-[#111111] border border-[#1e1e1e] rounded-xl overflow-hidden">
                <div className={`h-20 ${i === 0 ? 'bg-gradient-to-br from-[#0a2535] to-[#001520]' : 'bg-gradient-to-br from-[#1a1020] to-[#0a0a1a]'}`} />
                <div className="p-3 space-y-1.5">
                  <div className="h-3 w-3/4 bg-[#1e1e1e] rounded" />
                  <div className="h-2 w-1/2 bg-[#161616] rounded" />
                  <div className="h-4 w-14 bg-[#00E5FF]/15 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-tr from-[#00E5FF]/3 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Floating badge: sin comisiones */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute top-[28%] right-[4%] bg-[#111111] border border-[#1e1e1e] rounded-xl px-4 py-3 shadow-xl pointer-events-none"
      >
        <div className="flex items-center gap-2 mb-0.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono text-[10px] text-[#666666] uppercase tracking-wider">Reserva directa</span>
        </div>
        <p className="font-mono text-sm font-bold text-[#F5F5F5]">Sin comisiones</p>
      </motion.div>

      {/* Floating badge: reservas */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-[28%] left-[4%] bg-[#111111] border border-[#1e1e1e] rounded-xl px-4 py-3 shadow-xl pointer-events-none"
      >
        <p className="font-mono text-[10px] text-[#555555] mb-1">Reservas este mes</p>
        <p className="font-mono text-2xl font-bold text-[#00E5FF]">+34</p>
      </motion.div>
    </motion.div>
  );
}

function scrollToProjects() {
  document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth' });
}

export default function Hero() {
  const { scrollYProgress } = useScroll();

  // Parallax mockup: sube suavemente al scrollear
  const rawMockupY = useTransform(scrollYProgress, [0, 0.4], [0, -60]);
  const mockupY = useSpring(rawMockupY, { stiffness: 80, damping: 25 });

  // Fade-out del contenido left al scrollear
  const heroOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);

  return (
    <>
      <section className="relative min-h-screen overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025] z-[1]"
          style={{
            backgroundImage:
              'linear-gradient(#F5F5F5 1px,transparent 1px),linear-gradient(90deg,#F5F5F5 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 flex min-h-screen items-center gap-0">
          {/* LEFT */}
          <motion.div
            className="w-full lg:w-[48%] pt-28 pb-20 flex flex-col"
            style={{ opacity: heroOpacity }}
          >
            {/* Badge disponible */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-7"
            >
              <span className="inline-flex items-center gap-2 font-mono text-xs border border-green-500/30 bg-green-500/5 text-green-400 px-4 py-2 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Disponible — respondo en menos de 24hs
              </span>
            </motion.div>

            {/* H1 — SplitText per-character */}
            <h1 className="text-5xl md:text-7xl font-bold text-[#F5F5F5] tracking-tight leading-none mb-4">
              <SplitText stagger={0.04} initialDelay={0.15} y={60}>
                Ignacio
              </SplitText>
              <br />
              <SplitText stagger={0.04} initialDelay={0.42} y={60}>
                Márquez
              </SplitText>
            </h1>

            {/* H2 typing */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="text-xl md:text-2xl font-medium text-[#888888] mb-3 min-h-[2em]"
            >
              <TypingText />
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="font-mono text-sm text-[#555555] mb-10"
            >
              Técnico en Programación · Tucumán, Argentina
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-sm bg-[#00E5FF] text-[#080808] hover:bg-[#00E5FF]/90 px-7 py-3 rounded-lg font-bold transition-all duration-200"
              >
                <MessageCircle size={15} />
                Hablar de tu proyecto →
              </a>

              <button
                onClick={scrollToProjects}
                className="inline-flex items-center gap-2 font-mono text-sm border border-[#222222] text-[#888888] hover:text-[#F5F5F5] hover:border-[#444444] bg-transparent px-7 py-3 rounded-lg transition-all duration-200"
              >
                <ArrowDown size={14} />
                Ver proyectos
              </button>
            </motion.div>
          </motion.div>

          {/* RIGHT: 3D mockup con parallax */}
          <MockupCard y={mockupY} />
        </div>
      </section>
    </>
  );
}
