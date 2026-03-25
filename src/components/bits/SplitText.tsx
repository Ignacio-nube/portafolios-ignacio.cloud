'use client';

import { motion } from 'motion/react';

interface SplitTextProps {
  children: string;
  className?: string;
  stagger?: number;       // seconds between chars
  initialDelay?: number;  // seconds before first char
  y?: number;
}

export default function SplitText({
  children,
  className = '',
  stagger = 0.04,
  initialDelay = 0.1,
  y = 40,
}: SplitTextProps) {
  const chars = children.split('');

  return (
    <span className={`inline-block ${className}`} aria-label={children}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: initialDelay + i * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}
