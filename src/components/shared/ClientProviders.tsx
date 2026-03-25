'use client';

import dynamic from 'next/dynamic';

const LiquidEther = dynamic(() => import('@/components/bits/LiquidEther'), { ssr: false });
const Noise = dynamic(() => import('@/components/bits/Noise'), { ssr: false });

export default function ClientProviders() {
  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <LiquidEther
          colors={['#050a0a', '#00E5FF', '#002233', '#001a1a']}
          autoDemo={true}
          autoSpeed={0.3}
          autoIntensity={1.2}
          mouseForce={18}
          cursorSize={90}
          resolution={0.4}
        />
      </div>
      <Noise patternAlpha={12} patternRefreshInterval={5} />
    </>
  );
}
