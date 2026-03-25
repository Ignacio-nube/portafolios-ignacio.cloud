'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;          // ms between words
  animateBy?: 'words' | 'chars';
  once?: boolean;
}

export default function BlurText({
  text,
  className = '',
  delay = 80,
  animateBy = 'words',
  once = true,
}: BlurTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-60px' });

  const tokens = animateBy === 'words' ? text.split(' ') : text.split('');

  return (
    <span ref={ref} className={`inline-block ${className}`} aria-label={text}>
      {tokens.map((token, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, filter: 'blur(8px)', y: 8 }}
          animate={isInView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
          transition={{
            duration: 0.4,
            delay: i * (delay / 1000),
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {token}
          {animateBy === 'words' && i < tokens.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </span>
  );
}
