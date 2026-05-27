import { useState, FormEvent } from 'react';
import { Icon } from '@iconify/react';
import { SectionWrapper } from '../shared/SectionWrapper';
import { Button } from '../ui/Button';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid Email Address is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({ name: '', email: '', phone: '', type: '', message: '' });
      setTimeout(() => setShowSuccess(false), 4000);
    }, 1000);
  };

  const inputClasses = "w-full px-4 py-3 rounded-lg border border-[#E0E0E0] dark:border-[#2E2E2E] bg-white dark:bg-surface-dark-3 text-black dark:text-white placeholder:text-[#6B6B6B] dark:placeholder:text-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition duration-200";

  return (
    <SectionWrapper id="contact" className="py-24 bg-white dark:bg-surface-dark-2 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-5">
            <h2 className="font-display font-bold text-4xl mb-4">
              Let's Automate Your Space
            </h2>
            <p className="text-[#6B6B6B] dark:text-[#9E9E9E] text-lg mb-10">
              Fill the form and our team will reach out within 24 hours.
            </p>

            <div className="flex flex-col gap-6 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-light dark:bg-white/10 rounded-full flex items-center justify-center text-brand-primary text-2xl">
                  <Icon icon="ph:phone-bold" />
                </div>
                <div>
                  <div className="text-sm font-semibold uppercase tracking-wider text-[#6B6B6B] dark:text-[#9E9E9E] mb-1">Phone</div>
                  <div className="font-medium">+2347077195098</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-light dark:bg-white/10 rounded-full flex items-center justify-center text-brand-primary text-2xl shrink-0">
                  <Icon icon="ph:envelope-bold" />
                </div>
                <div>
                  <div className="text-sm font-semibold uppercase tracking-wider text-[#6B6B6B] dark:text-[#9E9E9E] mb-1">Email</div>
                  <div className="font-medium">altairattic@gmail.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-light dark:bg-white/10 rounded-full flex items-center justify-center text-brand-primary text-2xl shrink-0">
                  <Icon icon="ph:map-pin-bold" />
                </div>
                <div>
                  <div className="text-sm font-semibold uppercase tracking-wider text-[#6B6B6B] dark:text-[#9E9E9E] mb-1">Location</div>
                  <div className="font-medium leading-relaxed">
                    3rd floor, Opposite Cathedral of St. Peter Ang. Sec. Sch, <br />
                    Along Oba Ademola Maternity Hospital, Ake, Abeokuta.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              {[
                                { icon: 'mdi:whatsapp', href: 'https://wa.me/2347077195098' },
                { icon: 'mdi:facebook', href: '#' },
                { icon: 'mdi:instagram', href: 'https://www.instagram.com/altairsmarthomes?igsh=MWw4NDlwcWNvZG9udg==' },
                { icon: 'ph:tiktok-logo-bold', href: 'https://www.tiktok.com/@altair.attic?_r=1&_t=ZS-96gkq0riUVh' },
              ].map((social) => (
                <a 
                  key={social.icon} 
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-[#6B6B6B] dark:text-[#9E9E9E] hover:text-brand-primary dark:hover:text-brand-primary transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm"
                >
                  <Icon icon={social.icon} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="bg-[#F9F9F9] dark:bg-surface-dark-3 p-8 rounded-2xl border border-[#E0E0E0] dark:border-[#2E2E2E]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name <span className="text-brand-primary">*</span></label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                  {errors.name && <p className="text-[#DC2626] text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address <span className="text-brand-primary">*</span></label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                  {errors.email && <p className="text-[#DC2626] text-xs mt-1">{errors.email}</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    placeholder="+234 800 000 0000"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="type" className="block text-sm font-medium mb-2">Type of Property</label>
                  <select 
                    id="type" 
                    name="type" 
                    value={formData.type}
                    onChange={handleChange}
                    className={inputClasses}
                  >
                    <option value="" disabled>Select type...</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>
              </div>

              <div className="mb-8">
                <label htmlFor="message" className="block text-sm font-medium mb-2">Project Brief</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4} 
                  value={formData.message}
                  onChange={handleChange}
                  className={`${inputClasses} resize-none`}
                ></textarea>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed bottom-6 right-6 bg-[#16A34A] text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-3">
          <Icon icon="ph:check-circle-bold" className="text-xl" />
          <span>Message sent! We'll be in touch within 24 hours.</span>
        </div>
      )}
    </SectionWrapper>
  );
}
