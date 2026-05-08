'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { MergeBgContext } from './MergeBgContext';

interface Props {
  background: string;
  topSlot: React.ReactNode;
  bottomSlot: React.ReactNode;
}

// Mirrors the responsive horizontal insets used by blocks.tsx wrapper
// (mx-4 sm:mx-12 lg:mx-16 xl:mx-32 2xl:mx-64 → 16 / 48 / 64 / 128 / 256 px).
const insetForViewport = (w: number): number => {
  if (w >= 1536) return 256;
  if (w >= 1280) return 128;
  if (w >= 1024) return 64;
  if (w >= 640) return 48;
  return 16;
};

const ScrollMergedSection: React.FC<Props> = ({ background, topSlot, bottomSlot }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const topSlotRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const [maxInset, setMaxInset] = useState(64);
  const [topHeight, setTopHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    const update = () => {
      setMaxInset(insetForViewport(window.innerWidth));
      if (topSlotRef.current) setTopHeight(topSlotRef.current.offsetHeight);
      if (containerRef.current) setContainerHeight(containerRef.current.offsetHeight);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  // Phase 1 (0 → 0.4): horizontal expansion + corner unrounding
  const horizontalInset = useTransform(scrollYProgress, [0, 0.4], [maxInset, 0]);
  const cornerRadius = useTransform(scrollYProgress, [0, 0.4], [48, 0]);

  // Phase 2 (0.3 → 0.7): vertical extension — bottom edge of the blue rect grows
  // from "just below the top block" to "bottom of the container".
  const initialBottom = Math.max(containerHeight - topHeight, 0);
  const bottomOffset = useTransform(scrollYProgress, [0.3, 0.7], [initialBottom, 0]);

  if (reduceMotion) {
    // Static fallback — full expansion, no scroll-driven animation.
    return (
      <MergeBgContext.Provider value={{ active: true }}>
        <div className="relative" style={{ background }}>
          <div className="relative z-[1]">
            <div ref={topSlotRef}>{topSlot}</div>
            {bottomSlot}
          </div>
        </div>
      </MergeBgContext.Provider>
    );
  }

  return (
    <MergeBgContext.Provider value={{ active: true }}>
      <div ref={containerRef} className="relative">
        <motion.div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            background,
            top: 0,
            left: horizontalInset,
            right: horizontalInset,
            bottom: bottomOffset,
            borderRadius: cornerRadius,
          }}
        />
        <div className="relative z-[1]">
          <div ref={topSlotRef} className="mx-4 sm:mx-12 lg:mx-16 xl:mx-32 2xl:mx-64">{topSlot}</div>
          <div className="mx-4 sm:mx-12 lg:mx-16 xl:mx-32 2xl:mx-64">{bottomSlot}</div>
        </div>
      </div>
    </MergeBgContext.Provider>
  );
};

export default ScrollMergedSection;
