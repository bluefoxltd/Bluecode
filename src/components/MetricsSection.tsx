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
      } catch (err) {
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
    <section ref={sectionRef} className="relative py-28 lg:py-36 bg-white border-t border-slate-200/80">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header with live Kathmandu clock */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 lg:mb-24">
          <div>
            <div className="inline-flex items-center gap-3 text-xs font-semibold tracking-wider uppercase text-slate-500 mb-4">
              <span className="w-8 h-px bg-[#0052FF]" />
              <span>Our Impact</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-[#002068] leading-tight">
              Results you <br />
              can measure.
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs lg:text-sm font-medium text-slate-600 bg-slate-50 border border-slate-200/80 px-4 py-2.5 rounded-full self-start lg:self-auto">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Kathmandu, Nepal</span>
            </span>
            <span className="text-slate-300">|</span>
            <span className="font-mono font-semibold text-slate-900">{kathmanduTime || '5:45 PM'} NPT</span>
          </div>
        </div>

        {/* 4-Grid Metric Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          {metrics.map((metric, idx) => (
            <div
              key={metric.label}
              className="bg-white p-8 lg:p-12 flex flex-col justify-between hover:bg-slate-50/50 transition-colors"
            >
              <div className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#002068] font-mono tabular-nums">
                {metric.prefix}
                <Counter target={metric.value} start={hasAnimated} />
                <span className="text-[#0052FF]">{metric.suffix}</span>
              </div>
              <div className="mt-4 text-sm lg:text-base font-medium text-slate-600">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Count up helper
const Counter: React.FC<{ target: number; start: boolean }> = ({ target, start }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let current = 0;
    const duration = 1500;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, start]);

  return <span>{count}</span>;
};
