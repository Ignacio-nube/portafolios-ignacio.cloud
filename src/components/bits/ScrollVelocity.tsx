'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue, useAnimationFrame } from 'motion/react';

interface ScrollVelocityProps {
  items: string[];
  velocity?: number;
  separator?: string;
  className?: string;
}

function VelocityTrack({
  items,
  baseVelocity,
  separator,
  className,
}: {
  items: string[];
  baseVelocity: number;
  separator: string;
  className: string;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useSpring(scrollY, { stiffness: 300, damping: 120 });
  // Multiplicador suave: scroll rápido acelera levemente, scroll lento mantiene pace
  const velocityFactor = useTransform(scrollVelocity, [0, 800], [0, 1.5], { clamp: false });

  const x = useTransform(baseX, (v) => `${v % -50}%`);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  // Duplicate items enough times to fill and loop
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div className={`inline-flex ${className}`} style={{ x }}>
        {repeated.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4">
            <span>{item}</span>
            <span className="opacity-30 mx-1">{separator}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function ScrollVelocity({
  items,
  velocity = 3,
  separator = '·',
  className = '',
}: ScrollVelocityProps) {
  return (
    <div className="space-y-1">
      <VelocityTrack
        items={items}
        baseVelocity={velocity}
        separator={separator}
        className={className}
      />
      <VelocityTrack
        items={[...items].reverse()}
        baseVelocity={-velocity}
        separator={separator}
        className={className}
      />
    </div>
  );
}
