'use client';

import React, { useRef, useEffect } from 'react';

interface NoiseProps {
  patternRefreshInterval?: number;
  patternAlpha?: number;
}

const Noise: React.FC<NoiseProps> = ({
  patternRefreshInterval = 4,
  patternAlpha = 15,
}) => {
  const grainRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true, willReadFrequently: false });
    if (!ctx) return;

    const canvasSize = 512;
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    // Allocate ImageData once and reuse — avoids 4MB allocation every frame
    const imageData = ctx.createImageData(canvasSize, canvasSize);
    const data = imageData.data;

    // Pre-fill alpha channel once since it never changes
    for (let i = 3; i < data.length; i += 4) {
      data[i] = patternAlpha;
    }

    let frame = 0;
    let animationId: number;

    const drawGrain = () => {
      for (let i = 0; i < data.length; i += 4) {
        const value = (Math.random() * 255) | 0;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
      }
      ctx.putImageData(imageData, 0, 0);
    };

    const loop = () => {
      if (frame % patternRefreshInterval === 0) drawGrain();
      frame++;
      animationId = requestAnimationFrame(loop);
    };

    loop();

    return () => cancelAnimationFrame(animationId);
  }, [patternRefreshInterval, patternAlpha]);

  return (
    <canvas
      ref={grainRef}
      className="pointer-events-none fixed inset-0 w-screen h-screen z-[200]"
      style={{ imageRendering: 'pixelated', opacity: 0.5 }}
    />
  );
};

export default Noise;
