import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface StatBlockProps {
  value: number;
  suffix: string;
  label: string;
}

export function StatBlock({ value, suffix, label }: StatBlockProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000; 
      const increment = value / (duration / 16); 

      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col">
      <div className="text-4xl font-display font-bold text-brand-primary">
        {count}{suffix}
      </div>
      <div className="text-[#6B6B6B] dark:text-[#9E9E9E] text-sm mt-1 font-medium">
        {label}
      </div>
    </div>
  );
}
