import { SectionWrapper } from '../shared/SectionWrapper';
import { StatBlock } from '../ui/StatBlock';
import { FeaturePillar } from '../ui/FeaturePillar';
import { stats, pillars } from '../../data/about';

export function About() {
  return (
    <SectionWrapper id="about" className="py-24 bg-[#F9F9F9] dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 xl:gap-24">
          
          <div>
            <span className="text-brand-primary text-sm font-bold uppercase tracking-widest block mb-4">
              About Us
            </span>
            <h2 className="font-display font-bold text-4xl mb-6">
              Why Altair Attic?
            </h2>
            <p className="text-[#6B6B6B] dark:text-[#9E9E9E] text-lg leading-relaxed mb-10">
              We are a Nigerian technology company based in Abeokuta, Ogun State. Smart home automation is not just a service for us — it is our commitment to making intelligent living accessible to every Nigerian household and business. From a single room to an entire estate, we design, install, and support systems that work reliably in the Nigerian environment.
            </p>

            <div className="border-t border-brand-primary w-16 mb-10"></div>

            <div className="grid grid-cols-2 gap-y-10 gap-x-8">
              {stats.map((stat) => (
                <StatBlock key={stat.label} {...stat} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-10 justify-center">
            {pillars.map((pillar, index) => (
              <FeaturePillar key={pillar.title} index={index} {...pillar} />
            ))}
          </div>

        </div>
      </div>
    </SectionWrapper>
  );
}
