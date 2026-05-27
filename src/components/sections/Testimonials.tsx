import { SectionWrapper } from '../shared/SectionWrapper';
import { TestimonialCard } from '../ui/TestimonialCard';
import { testimonials } from '../../data/testimonials';

export function Testimonials() {
  return (
    <SectionWrapper id="testimonials" className="py-24 bg-white dark:bg-surface-dark-3">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-brand-primary text-sm font-bold uppercase tracking-widest block mb-4">
            Testimonials
          </span>
          <h2 className="font-display font-bold text-4xl mb-4">
            What Our Clients Say
          </h2>
        </div>

        <div className="lg:grid lg:grid-cols-3 gap-6 overflow-x-auto snap-x snap-mandatory flex lg:flex-none pb-8 lg:pb-0 -mx-6 px-6 lg:mx-0">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} index={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
