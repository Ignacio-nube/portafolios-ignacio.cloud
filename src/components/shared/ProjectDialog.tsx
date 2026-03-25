'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ExternalLink } from 'lucide-react';

const featured = [
  {
    name: 'Fin del Mundo Stays',
    desc: 'Reservas directas · Ushuaia',
    url: 'https://ushuaia.ignacio.cloud',
    accent: true,
  },
  {
    name: 'ignacio.cloud',
    desc: 'Inmobiliario con búsqueda IA · Tucumán',
    url: 'https://ignacio.cloud',
    accent: false,
  },
  {
    name: 'AutosTucumán',
    desc: 'Buscador de autos en tiempo real',
    url: 'https://autos.ignacio.cloud',
    accent: false,
  },
];

const demos = [
  { name: 'Panel Admin',        url: 'https://panel.ignacio.cloud',        tag: 'SaaS' },
  { name: 'Inmobiliaria',       url: 'https://inmobiliaria.ignacio.cloud', tag: 'Demo' },
  { name: 'Dashboard Gráficos', url: 'https://graficos.ignacio.cloud',     tag: 'Dashboard' },
  { name: 'El Club de Mike',    url: 'https://elclubdemike2.ignacio.cloud',tag: 'Club' },
  { name: 'Barbería',           url: 'https://barberia.ignacio.cloud',     tag: 'Negocio' },
  { name: 'Eventos',            url: 'https://eventos.ignacio.cloud',      tag: 'Demo' },
  { name: 'Chat con PDF',       url: 'https://chatpdf.ignacio.cloud',      tag: 'IA' },
  { name: 'Cancerbero',         url: 'https://cancerbero.ignacio.cloud',   tag: 'App' },
  { name: 'Impostor',           url: 'https://impostor.ignacio.cloud',     tag: 'Juego' },
];

interface ProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProjectDialog({ open, onOpenChange }: ProjectDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#111111] border-[#222222] text-[#F5F5F5] max-w-2xl p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="font-mono text-lg text-[#F5F5F5]">
            ¿Qué querés probar?
          </DialogTitle>
          <DialogDescription className="text-[#555555] text-xs font-mono mt-1">
            Proyectos reales, funcionales — abrí en una pestaña nueva.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh]">
          <div className="px-6 pb-6 space-y-5 pt-4">
            {/* Featured */}
            <div className="space-y-2">
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#333333] mb-3">
                Proyectos principales
              </p>
              {featured.map((p) => (
                <a
                  key={p.url}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center justify-between rounded-lg border px-4 py-3 transition-all duration-200 hover:border-[#00E5FF]/50 hover:bg-[#00E5FF]/5 ${
                    p.accent
                      ? 'border-[#00E5FF]/30 bg-[#00E5FF]/5'
                      : 'border-[#1e1e1e] bg-[#0d0d0d]'
                  }`}
                >
                  <div className="min-w-0">
                    <p className={`text-sm font-semibold truncate ${p.accent ? 'text-[#00E5FF]' : 'text-[#F5F5F5]'}`}>
                      {p.name}
                    </p>
                    <p className="text-[11px] text-[#555555] font-mono mt-0.5">{p.desc}</p>
                  </div>
                  <ExternalLink size={13} className="text-[#444444] group-hover:text-[#00E5FF] transition-colors shrink-0 ml-4" />
                </a>
              ))}
            </div>

            {/* Demos grid */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#333333] mb-3">
                Más demos
              </p>
              <div className="grid grid-cols-3 gap-2">
                {demos.map((p) => (
                  <a
                    key={p.url}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-1.5 rounded-lg border border-[#1e1e1e] bg-[#0d0d0d] px-3 py-2.5 transition-all duration-200 hover:border-[#333333] hover:bg-[#141414]"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <p className="text-[12px] font-medium text-[#cccccc] group-hover:text-white truncate transition-colors">
                        {p.name}
                      </p>
                      <ExternalLink size={10} className="text-[#333333] group-hover:text-[#00E5FF] transition-colors shrink-0" />
                    </div>
                    <span className="font-mono text-[9px] text-[#444444] bg-[#1a1a1a] px-1.5 py-0.5 rounded self-start">
                      {p.tag}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
