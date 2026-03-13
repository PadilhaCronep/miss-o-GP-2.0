'use client';

import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

type InteractiveCardProps = {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
};

export function InteractiveCard({ children, className, intensity = 8 }: InteractiveCardProps) {
  const [hovered, setHovered] = useState(false);
  const [point, setPoint] = useState({ x: 50, y: 50, rx: 0, ry: 0 });

  const glowStyle = useMemo(
    () => ({
      background: `radial-gradient(420px circle at ${point.x}% ${point.y}%, rgba(255,214,0,0.16), transparent 45%)`,
    }),
    [point.x, point.y],
  );

  return (
    <motion.div
      className={cn('relative overflow-hidden rounded-sm will-change-transform', className)}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const px = ((event.clientX - rect.left) / rect.width) * 100;
        const py = ((event.clientY - rect.top) / rect.height) * 100;

        const ry = ((px - 50) / 50) * intensity;
        const rx = -((py - 50) / 50) * intensity;

        setPoint({ x: px, y: py, rx, ry });
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPoint({ x: 50, y: 50, rx: 0, ry: 0 });
      }}
      animate={{
        transform: hovered
          ? `perspective(1000px) rotateX(${point.rx}deg) rotateY(${point.ry}deg) translateY(-2px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
      }}
      transition={{ type: 'spring', stiffness: 260, damping: 22, mass: 0.5 }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300" style={glowStyle} />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
