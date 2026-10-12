import React, { useState, useEffect, useRef } from 'react';

interface MetricItem {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
}

export const MetricsSection: React.FC = () => {
  const [kathmanduTime, setKathmanduTime] = useState('');
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const metrics: MetricItem[] = [
    { value: 10, suffix: '+', label: "Brands we've transformed" },
    { value: 98, suffix: '%', label: 'Client satisfaction rate' },
    { value: 3, suffix: 'x', label: 'Average engagement lift' },
    { value: 12, suffix: '+', label: 'Industries served' },
  ];

  // Live Kathmandu, Nepal Clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
          timeZone: 'Asia/Kathmandu',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        };
        setKathmanduTime(new Intl.DateTimeFormat('en-US', options).format(now));
      } catch {
        setKathmanduTime(new Date().toLocaleTimeString());
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Intersection observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-[#070B16] border-t border-slate-800 transition-colors">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Header with live Kathmandu clock */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 lg:mb-20">
          <div>
            <div className="inline-flex items-center gap-3 text-xs font-semibold tracking-wider uppercase text-[#6495ED] mb-4">
              <span className="w-8 h-px bg-[#6495ED]" />
              <span>Our Impact</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Results you <br />
              <span className="text-[#6495ED]">can measure.</span>
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs lg:text-sm font-medium text-slate-300 bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-full self-start lg:self-auto shadow-2xs">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Kathmandu, Nepal</span>
            </span>
            <span className="text-slate-700">|</span>
            <span className="font-mono font-semibold text-[#6495ED]">{kathmanduTime || '5:45 PM'} NPT</span>
          </div>
        </div>

        {/* 4-Grid Metric Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-800 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-[#0C1222] p-8 lg:p-12 flex flex-col justify-between hover:bg-[#10182E] transition-colors"
            >
              <div className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white font-mono tabular-nums">
                {metric.prefix}
                <Counter target={metric.value} start={hasAnimated} />
                <span className="text-[#6495ED]">{metric.suffix}</span>
              </div>
              <div className="mt-4 text-sm lg:text-base font-medium text-slate-300">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Counter: React.FC<{ target: number; start: boolean }> = ({ target, start }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    const duration = 1600; // ms

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuad = (t: number) => t * (2 - t);
      setCount(Math.floor(easeOutQuad(progress) * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [start, target]);

  return <span>{count}</span>;
};
