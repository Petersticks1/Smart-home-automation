import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  index: number;
  testimonial: {
    quote: string;
    name: string;
    title: string;
    location: string;
    rating: number;
  };
}

export function TestimonialCard({ index, testimonial }: TestimonialCardProps) {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animationProps = isReducedMotion ? {} : {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.5, ease: 'easeOut' as const, delay: index * 0.1 }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2);
  };

  return (
    <motion.div
      {...animationProps}
      className="bg-[#F9F9F9] dark:bg-surface-dark-2 border border-[#E0E0E0] dark:border-[#2E2E2E] rounded-xl p-6 snap-center min-w-[85vw] lg:min-w-0"
    >
      <Icon icon="ph:quotes-bold" className="text-brand-primary text-3xl" />
      <p className="text-base leading-relaxed text-[#000000] dark:text-white mt-3 italic">
        "{testimonial.quote}"
      </p>
      <div className="flex gap-1 mt-4 mb-6">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Icon key={i} icon="ph:star-fill" className="text-[#F59E0B] w-5 h-5" />
        ))}
      </div>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-brand-light text-brand-primary font-bold flex items-center justify-center shrink-0">
          {getInitials(testimonial.name)}
        </div>
        <div>
          <div className="font-semibold text-sm">{testimonial.name}</div>
          <div className="text-[#6B6B6B] dark:text-[#9E9E9E] text-xs">
            {testimonial.title}, {testimonial.location}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
