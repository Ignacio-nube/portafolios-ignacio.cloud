'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface BlobCursorProps {
  fillColor?: string;
  trailCount?: number;
  sizes?: number[];
  opacities?: number[];
  filterId?: string;
  filterStdDeviation?: number;
  fastDuration?: number;
  slowDuration?: number;
}

export default function BlobCursor({
  fillColor = '#00E5FF',
  trailCount = 3,
  sizes = [40, 80, 55],
  opacities = [0.5, 0.4, 0.45],
  filterId = 'blob-cursor',
  filterStdDeviation = 20,
  fastDuration = 0.1,
  slowDuration = 0.4,
}: BlobCursorProps) {
  const blobsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      blobsRef.current.forEach((el, i) => {
        if (!el) return;
        const isLead = i === 0;
        gsap.to(el, {
          x: e.clientX,
          y: e.clientY,
          duration: isLead ? fastDuration : slowDuration * (1 + i * 0.3),
          ease: isLead ? 'power3.out' : 'power1.out',
        });
      });
    };

    document.addEventListener('mousemove', handleMove);
    return () => document.removeEventListener('mousemove', handleMove);
  }, [fastDuration, slowDuration]);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]">
      <svg className="absolute w-0 h-0">
        <filter id={filterId}>
          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation={filterStdDeviation} />
          <feColorMatrix in="blur" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10" />
        </filter>
      </svg>

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ filter: `url(#${filterId})` }}
      >
        {Array.from({ length: trailCount }).map((_, i) => (
          <div
            key={i}
            ref={el => { blobsRef.current[i] = el; }}
            className="absolute rounded-full will-change-transform -translate-x-1/2 -translate-y-1/2"
            style={{
              width: sizes[i] ?? 40,
              height: sizes[i] ?? 40,
              backgroundColor: fillColor,
              opacity: opacities[i] ?? 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
}
