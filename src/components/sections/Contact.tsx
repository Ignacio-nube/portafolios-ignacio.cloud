'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { MessageCircle, Mail } from 'lucide-react';
import BlurText from '@/components/bits/BlurText';

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER ?? '5493816000000';
const WA_MSG = encodeURIComponent('Hola Ignacio, vi tu portfolio y quiero hablar de mi proyecto.');

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contacto" className="relative z-[1] py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto text-center" ref={ref}>

        {/* Título con BlurText */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-2"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#F5F5F5] mb-2">
            ¿Tenés un proyecto?
          </h2>
          <p className="text-2xl md:text-3xl font-bold text-[#00E5FF] mb-5">
            <BlurText text="Hablemos hoy." delay={90} animateBy="words" />
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="font-mono text-sm text-[#555555] mb-14"
        >
          No cobro consulta inicial.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {/* WhatsApp — entra desde la izquierda */}
          <motion.a
            href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ type: 'spring', stiffness: 70, damping: 18, delay: 0.1 }}
            className="group flex flex-col items-center gap-4 p-8 rounded-2xl bg-[#0a1f0a] border border-green-700/20 hover:border-green-500/40 hover:bg-[#0c220c] transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors duration-300">
              <MessageCircle size={26} className="text-green-400" />
            </div>
            <div>
              <p className="font-bold text-[#F5F5F5] text-lg mb-1">WhatsApp</p>
              <p className="font-mono text-sm text-[#555555]">Respuesta inmediata</p>
            </div>
            <span className="font-mono text-sm text-green-400 group-hover:text-green-300 transition-colors duration-200">
              Escribirme →
            </span>
          </motion.a>

          {/* Email — entra desde la derecha */}
          <motion.a
            href="mailto:nacho@ignacio.cloud"
            initial={{ x: 50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ type: 'spring', stiffness: 70, damping: 18, delay: 0.2 }}
            className="group flex flex-col items-center gap-4 p-8 rounded-2xl bg-[#0a0a1f] border border-[#00E5FF]/10 hover:border-[#00E5FF]/30 hover:bg-[#0d0d28] transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#00E5FF]/5 flex items-center justify-center group-hover:bg-[#00E5FF]/10 transition-colors duration-300">
              <Mail size={26} className="text-[#00E5FF]" />
            </div>
            <div>
              <p className="font-bold text-[#F5F5F5] text-lg mb-1">Email</p>
              <p className="font-mono text-sm text-[#555555]">nacho@ignacio.cloud</p>
            </div>
            <span className="font-mono text-sm text-[#00E5FF]/60 group-hover:text-[#00E5FF] transition-colors duration-200">
              Enviar email →
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
