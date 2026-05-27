import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  index: number;
  project: {
    name: string;
    location: string;
    description: string;
    tags: string[];
    icons: string[];
  };
}

export function ProjectCard({ index, project }: ProjectCardProps) {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animationProps = isReducedMotion ? {} : {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.5, ease: 'easeOut' as const, delay: index * 0.1 }
  };

  return (
    <motion.div
      {...animationProps}
      className="bg-white dark:bg-surface-dark-2 border border-[#E0E0E0] dark:border-[#2E2E2E] rounded-xl p-6 hover:-translate-y-1 hover:shadow-lg hover:border-brand-primary hover:shadow-[0_0_0_2px_#0066CC] transition-all duration-300"
    >
      <div className="flex items-center gap-1 text-brand-primary text-xs font-semibold uppercase tracking-wide">
        <Icon icon="ph:map-pin-bold" className="w-4 h-4" />
        <span>{project.location}</span>
      </div>
      <h3 className="font-display font-bold text-xl mt-2">{project.name}</h3>
      <p className="text-[#6B6B6B] dark:text-[#9E9E9E] text-sm leading-relaxed mt-2 mb-6">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag, i) => (
          <span
            key={tag}
            className="bg-brand-light dark:bg-white/10 text-brand-primary dark:text-white text-xs px-3 py-1 rounded-full flex items-center gap-1"
          >
            <Icon icon={project.icons[i]} className="w-3.5 h-3.5" />
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
