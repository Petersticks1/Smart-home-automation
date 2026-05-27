import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useActiveSection } from '../../hooks/useActiveSection';
import logoImage from '../../assets/image.png';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeSection = useActiveSection(['home', 'services', 'projects', 'testimonials', 'about', 'contact']);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Our Work', id: 'projects' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  const scrollClasses = isScrolled 
    ? 'bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-[#E0E0E0] dark:border-[#2E2E2E]' 
    : 'bg-transparent border-transparent border-b';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollClasses}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#home" className="flex items-center group outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg">
          <img 
            src={logoImage} 
            alt="Altair Attic Logo" 
            className="h-12 md:h-14 w-auto object-contain group-hover:scale-105 transition-transform brightness-0 dark:brightness-100" 
          />
        </a>

        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm transition-colors duration-200 py-1
                  ${activeSection === link.id 
                    ? 'text-brand-primary font-semibold border-b-2 border-brand-primary' 
                    : 'text-black dark:text-white hover:text-brand-primary border-b-2 border-transparent'
                  }`}
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="w-px h-6 bg-[#E0E0E0] dark:bg-[#2E2E2E]"></div>
          <ThemeToggle />
        </div>

        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -mr-2 text-black dark:text-white outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg"
            aria-label="Toggle menu"
          >
            <Icon icon={mobileMenuOpen ? "ph:x-bold" : "ph:list-bold"} className="w-6 h-6" />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-surface-dark-2 border-b border-[#E0E0E0] dark:border-[#2E2E2E] shadow-lg absolute w-full left-0 top-20">
          <div className="flex flex-col py-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-6 py-3 font-medium outline-none
                  ${activeSection === link.id 
                    ? 'text-brand-primary bg-brand-light dark:bg-white/5 border-l-4 border-brand-primary pl-5' 
                    : 'text-black dark:text-white hover:text-brand-primary hover:bg-black/5 dark:hover:bg-white/5 pl-6 border-l-4 border-transparent'
                  }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
