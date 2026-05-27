import { SectionWrapper } from '../shared/SectionWrapper';
import { ProjectCard } from '../ui/ProjectCard';
import { projects } from '../../data/projects';

export function Projects() {
  return (
    <SectionWrapper id="projects" className="py-24 bg-surface-light-2 dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-brand-primary text-sm font-bold uppercase tracking-widest block mb-4">
            Our Work
          </span>
          <h2 className="font-display font-bold text-4xl mb-4">
            Smart Spaces We've Built
          </h2>
          <p className="text-[#6B6B6B] dark:text-[#9E9E9E] text-lg">
            Real deployments across Nigeria — residential, commercial, and industrial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} index={index} project={project} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
