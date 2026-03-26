'use client';

import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import CardNav from '@/components/bits/CardNav';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { lang, t, toggle } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    {
      label: t.nav.projects,
      bgColor: 'rgba(0, 229, 255, 0.06)',
      links: [
        { label: 'Fin del Mundo Stays', href: '#proyectos', ariaLabel: 'Fin del Mundo Stays' },
        { label: 'ignacio.cloud', href: '#proyectos', ariaLabel: 'ignacio.cloud' },
        { label: 'AutosTucumán', href: '#proyectos', ariaLabel: 'AutosTucumán' },
        { label: 'Ignacio Motos', href: '#proyectos', ariaLabel: 'Ignacio Motos' },
      ],
    },
    {
      label: t.nav.stack,
      bgColor: 'rgba(255, 255, 255, 0.03)',
      links: [
        { label: t.nav.technologies, href: '#stack', ariaLabel: t.nav.stack },
        { label: t.nav.aboutMe, href: '#sobre-mi', ariaLabel: t.nav.aboutMe },
      ],
    },
    {
      label: t.nav.contact,
      bgColor: 'rgba(255, 255, 255, 0.03)',
      links: [
        { label: 'WhatsApp', href: '#contacto', ariaLabel: 'WhatsApp' },
        { label: 'ignacio@ignacio.cloud', href: 'mailto:ignacio@ignacio.cloud', ariaLabel: 'Email' },
      ],
    },
  ];

  const extraButtons = (
    <>
      {/* Language toggle */}
      <button
        onClick={toggle}
        className="font-mono text-[11px] border border-[#333333] text-[#888888] hover:border-[#00E5FF]/50 hover:text-[#00E5FF] px-2.5 py-1 rounded-md transition-all duration-200 bg-transparent cursor-pointer"
        aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a español'}
      >
        {lang === 'es' ? 'EN' : 'ES'}
      </button>

      {/* CV download */}
      <a
        href="/Juan_Ignacio_Marquez_CV.pdf"
        download="Ignacio-Marquez-CV.pdf"
        className="inline-flex items-center gap-1.5 font-mono text-[11px] border border-[#333333] text-[#888888] hover:border-[#00E5FF]/50 hover:text-[#00E5FF] px-2.5 py-1 rounded-md transition-all duration-200"
        aria-label="Descargar CV"
      >
        <Download size={11} />
        CV
      </a>
    </>
  );

  return (
    <CardNav
      items={navItems}
      onCtaClick={() => document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth' })}
      ctaLabel={t.nav.viewProjects}
      scrolled={scrolled}
      extraButtons={extraButtons}
    />
  );
}
