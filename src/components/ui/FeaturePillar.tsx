import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

interface FeaturePillarProps {
  index: number;
  icon: string;
  title: string;
  description: string;
}

export function FeaturePillar({ index, icon, title, description }: FeaturePillarProps) {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animationProps = isReducedMotion ? {} : {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.5, ease: 'easeOut' as const, delay: index * 0.1 }
  };

  return (
    <motion.div {...animationProps} className="flex gap-4 items-start">
      <div className="w-10 h-10 bg-brand-light dark:bg-white/10 rounded-lg flex items-center justify-center text-brand-primary text-xl shrink-0">
        <Icon icon={icon} />
      </div>
      <div>
        <h4 className="font-display font-semibold text-base mb-1">{title}</h4>
        <p className="text-[#6B6B6B] dark:text-[#9E9E9E] text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
