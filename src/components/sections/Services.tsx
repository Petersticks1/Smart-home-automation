import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { SectionWrapper } from '../shared/SectionWrapper';

const SERVICES = [
  {
    icon: 'ph:lightbulb-filament-bold',
    title: 'Smart Lighting Control',
    description: 'Automate your entire lighting system — from ambient scenes to motion-triggered responses — all controlled from your phone or voice.',
    color: 'from-amber-500/20 to-amber-500/5',
    iconColor: 'text-amber-400',
  },
  {
    icon: 'ph:shield-check-bold',
    title: 'Security & CCTV Integration',
    description: 'Comprehensive surveillance and smart alarm systems that keep your home safe 24/7, with remote monitoring and instant alerts.',
    color: 'from-blue-500/20 to-blue-500/5',
    iconColor: 'text-blue-400',
  },
  {
    icon: 'ph:thermometer-bold',
    title: 'Climate Automation & Control',
    description: 'Intelligent climate systems that learn your preferences and maintain perfect temperature — saving energy while keeping you comfortable.',
    color: 'from-cyan-500/20 to-cyan-500/5',
    iconColor: 'text-cyan-400',
  },
  {
    icon: 'ph:lock-key-bold',
    title: 'Access Control Systems',
    description: 'Biometric locks, smart intercoms, and remote door management — grant or revoke access from anywhere in the world.',
    color: 'from-violet-500/20 to-violet-500/5',
    iconColor: 'text-violet-400',
  },
  {
    icon: 'ph:lightning-bold',
    title: 'Energy Management',
    description: 'Monitor and optimize your home\'s energy consumption in real-time, reducing your electricity bill with smart scheduling and automation.',
    color: 'from-green-500/20 to-green-500/5',
    iconColor: 'text-green-400',
  },
  {
    icon: 'ph:devices-bold',
    title: 'Smart Home Gadgets',
    description: 'Curated smart devices — sensors, speakers, displays, and hubs — expertly integrated into one seamless ecosystem for your home.',
    color: 'from-rose-500/20 to-rose-500/5',
    iconColor: 'text-rose-400',
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export function Services() {
  return (
    <SectionWrapper id="services" className="py-24 bg-white dark:bg-surface-dark-2 relative overflow-hidden">

      {/* Subtle background grid */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #0066cc 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-brand-primary text-sm font-bold uppercase tracking-widest block mb-4">
            Our Services
          </span>
          <h2 className="font-display font-bold text-4xl mb-4">
            Intelligent Services for Modern Homes
          </h2>
          <p className="text-[#6B6B6B] dark:text-[#9E9E9E] text-lg">
            From a single room to an entire estate — we design and install smart home systems tailored to your lifestyle.
          </p>
        </div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className="group relative p-6 rounded-2xl border border-[#E0E0E0] dark:border-[#2E2E2E] bg-white dark:bg-surface-dark-3 hover:border-brand-primary/40 dark:hover:border-brand-primary/40 hover:shadow-[0_0_30px_rgba(0,102,204,0.08)] transition-all duration-300 overflow-hidden"
            >
              {/* Gradient bg on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 ${service.iconColor}`}>
                  <Icon icon={service.icon} className="w-6 h-6" />
                </div>

                <h3 className="font-semibold text-lg mb-3 group-hover:text-brand-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm text-[#6B6B6B] dark:text-[#9E9E9E] leading-relaxed">
                  {service.description}
                </p>

                <div className="mt-5 flex items-center gap-1 text-brand-primary text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Learn more <Icon icon="ph:arrow-right-bold" className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-primary hover:bg-brand-hover text-white font-semibold text-sm transition-colors shadow-[0_0_25px_rgba(0,102,204,0.3)]"
          >
            Get a Custom Quote
            <Icon icon="ph:arrow-right-bold" className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
