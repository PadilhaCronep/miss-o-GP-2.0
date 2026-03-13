'use client';

import { useEffect, useMemo, useState } from 'react';

function parseValue(value: string | number) {
  const raw = String(value);
  const digits = raw.replace(/[^0-9]/g, '');
  const numeric = Number(digits || 0);
  const suffix = raw.replace(/[0-9.,]/g, '');
  return { numeric, suffix, raw };
}

export function AnimatedCounter({ value }: { value: string | number }) {
  const [current, setCurrent] = useState(0);
  const parsed = useMemo(() => parseValue(value), [value]);

  useEffect(() => {
    if (!parsed.numeric) return;
    const duration = 900;
    const steps = 24;
    let step = 0;
    const increment = parsed.numeric / steps;
    const timer = setInterval(() => {
      step += 1;
      const next = Math.min(parsed.numeric, Math.round(step * increment));
      setCurrent(next);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [parsed.numeric]);

  if (!parsed.numeric) return <>{parsed.raw}</>;

  return (
    <>
      {current.toLocaleString('pt-BR')}
      {parsed.suffix}
    </>
  );
}
