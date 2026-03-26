'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight, Cloud } from 'lucide-react';
import { motion } from 'motion/react';

export type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  links: CardNavLink[];
};

export interface CardNavProps {
  items: CardNavItem[];
  className?: string;
  ease?: string;
  onCtaClick?: () => void;
  ctaLabel?: string;
  scrolled?: boolean;
  extraButtons?: React.ReactNode;
}

const CardNav: React.FC<CardNavProps> = ({
  items,
  className = '',
  ease = 'power3.out',
  onCtaClick,
  ctaLabel = 'Ver demos',
  scrolled = false,
  extraButtons,
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement;
      if (contentEl) {
        const wasVisibility = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';

        void contentEl.offsetHeight;

        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisibility;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return 60 + contentHeight + 16;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    const cards = cardsRef.current.filter(Boolean);

    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(cards, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, { height: calculateHeight, duration: 0.4, ease });
    tl.to(cards, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;
    return () => {
      tl?.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, items]);

  useLayoutEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!tlRef.current) return;
        if (isExpanded) {
          gsap.set(navRef.current, { height: calculateHeight() });
          tlRef.current.kill();
          const newTl = createTimeline();
          if (newTl) { newTl.progress(1); tlRef.current = newTl; }
        } else {
          tlRef.current.kill();
          const newTl = createTimeline();
          if (newTl) tlRef.current = newTl;
        }
      }, 200);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    setIsHamburgerOpen(false);
    tlRef.current?.eventCallback('onReverseComplete', () => setIsExpanded(false));
    tlRef.current?.reverse();
    setTimeout(() => {
      document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <motion.div
      className={`fixed left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] z-50 top-[1.2em] md:top-[2em] ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
    >
      <nav
        ref={navRef}
        className={`block h-[60px] p-0 rounded-xl relative overflow-hidden will-change-[height] backdrop-blur-xl transition-all duration-300 ${
          scrolled
            ? 'bg-[#0a0a0a]/88 border border-white/[0.08] shadow-2xl'
            : 'bg-[#0a0a0a]/40 border border-transparent shadow-none'
        }`}
      >
        {/* Top bar */}
        <div className="absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 pl-[1.1rem] z-[2]">
          {/* Hamburger */}
          <div
            className="group h-full flex flex-col items-center justify-center cursor-pointer gap-[5px] order-2 md:order-none"
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? 'Cerrar menú' : 'Abrir menú'}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && toggleMenu()}
          >
            <div
              className={`w-[22px] h-[1.5px] bg-[#aaaaaa] transition-[transform,opacity] duration-300 ease-linear [transform-origin:50%_50%] ${
                isHamburgerOpen ? 'translate-y-[3.5px] rotate-45' : ''
              } group-hover:bg-[#F5F5F5]`}
            />
            <div
              className={`w-[22px] h-[1.5px] bg-[#aaaaaa] transition-[transform,opacity] duration-300 ease-linear [transform-origin:50%_50%] ${
                isHamburgerOpen ? '-translate-y-[3.5px] -rotate-45' : ''
              } group-hover:bg-[#F5F5F5]`}
            />
          </div>

          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-none"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <Cloud size={20} className="text-[#00E5FF]" strokeWidth={2} />
            <span className="font-mono text-sm font-bold text-[#F5F5F5] tracking-tight">
              ignacio.cloud
            </span>
          </motion.div>

          {/* Extra buttons (language toggle, CV, etc.) */}
          {extraButtons && (
            <motion.div
              className="hidden md:flex items-center gap-2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            >
              {extraButtons}
            </motion.div>
          )}

          {/* CTA */}
          <motion.button
            type="button"
            onClick={onCtaClick}
            className="hidden md:inline-flex rounded-[calc(0.75rem-0.35rem)] px-4 items-center h-[calc(100%-12px)] font-mono text-xs font-medium cursor-pointer transition-all duration-200 border border-[#00E5FF]/40 text-[#00E5FF] hover:bg-[#00E5FF]/10 bg-transparent"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          >
            {ctaLabel}
          </motion.button>
        </div>

        {/* Cards */}
        <div
          className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-[1] ${
            isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
          } md:flex-row md:items-end md:gap-[10px]`}
          aria-hidden={!isExpanded}
        >
          {items.slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="select-none relative flex flex-col gap-2 p-[12px_16px] rounded-[calc(0.75rem-0.35rem)] min-w-0 flex-[1_1_auto] h-auto min-h-[60px] md:h-full md:min-h-0 md:flex-[1_1_0%] border border-white/[0.05]"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor }}
            >
              <div className="font-mono font-medium tracking-tight text-[16px] md:text-[18px] text-[#F5F5F5]">
                {item.label}
              </div>
              <div className="mt-auto flex flex-col gap-[3px]">
                {item.links?.map((lnk, i) => (
                  <a
                    key={`${lnk.label}-${i}`}
                    className="inline-flex items-center gap-[5px] no-underline cursor-pointer transition-all duration-200 hover:opacity-90 text-[13px] md:text-[14px] text-[#666666] hover:text-[#aaaaaa] font-mono"
                    href={lnk.href}
                    aria-label={lnk.ariaLabel}
                    onClick={(e) => handleLinkClick(e, lnk.href)}
                  >
                    <ArrowUpRight size={12} className="shrink-0 text-[#00E5FF]" aria-hidden="true" />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </motion.div>
  );
};

export default CardNav;
