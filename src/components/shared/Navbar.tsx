'use client';

import { useEffect, useState } from 'react';
import CardNav from '@/components/bits/CardNav';

const navItems = [
  {
    label: 'Proyectos',
    bgColor: 'rgba(0, 229, 255, 0.06)',
    links: [
      { label: 'Fin del Mundo Stays', href: '#proyectos', ariaLabel: 'Fin del Mundo Stays' },
      { label: 'ignacio.cloud', href: '#proyectos', ariaLabel: 'ignacio.cloud' },
      { label: 'AutosTucumán', href: '#proyectos', ariaLabel: 'AutosTucumán' },
      { label: 'Ignacio Motos', href: '#proyectos', ariaLabel: 'Ignacio Motos' },
    ],
  },
  {
    label: 'Stack',
    bgColor: 'rgba(255, 255, 255, 0.03)',
    links: [
      { label: 'Tecnologías', href: '#stack', ariaLabel: 'Stack tecnológico' },
      { label: 'Sobre mí', href: '#sobre-mi', ariaLabel: 'Sobre mí' },
    ],
  },
  {
    label: 'Contacto',
    bgColor: 'rgba(255, 255, 255, 0.03)',
    links: [
      { label: 'WhatsApp', href: '#contacto', ariaLabel: 'Contactar por WhatsApp' },
      { label: 'Email', href: '#contacto', ariaLabel: 'Contactar por email' },
    ],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <CardNav
      items={navItems}
      onCtaClick={() => document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth' })}
      ctaLabel="Ver proyectos"
      scrolled={scrolled}
    />
  );
}
