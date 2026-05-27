import { Icon } from '@iconify/react';
import logoImage from '../../assets/image.png';

export function Footer({ onOpenConsultation }: { onOpenConsultation: () => void }) {

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Our Work', id: 'projects' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  const services = [
    'Smart Lighting Control Systems',
    'Security & CCTV Integration',
    'Climate Automation & Control',
    'Access Control Systems',
    'Energy Management',
    'Smart Home Gadgets'
  ];

  const socials = [
    { icon: 'ph:instagram-logo-bold', label: 'Instagram', href: 'https://www.instagram.com/altairsmarthomes?igsh=MWw4NDlwcWNvZG9udg==' },
    { icon: 'ph:facebook-logo-bold', label: 'Facebook', href: 'https://facebook.com' },
    { icon: 'ph:whatsapp-logo-bold', label: 'WhatsApp', href: 'https://wa.me/2347077195098' },
    { icon: 'ph:tiktok-logo-bold', label: 'TikTok', href: 'https://www.tiktok.com/@altair.attic?_r=1&_t=ZS-96gkq0riUVh' },
  ];

  return (
    <footer className="relative bg-[#050608] text-white overflow-hidden">

      {/* Ambient glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[80px] bg-blue-600/10 blur-3xl rounded-full" />

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand Column */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <a href="#home">
              <img src={logoImage} alt="Altair Attic Logo" className="h-12 w-auto object-contain" />
            </a>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Building intelligent, effortless smart homes across Nigeria — from Abeokuta to Lagos.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 mt-1">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-blue-600/20 hover:border-blue-500/50 hover:text-blue-400 text-gray-400 transition-all duration-300"
                >
                  <Icon icon={s.icon} className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-400">Navigation</h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-blue-500 transition-all duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-400">Services</h4>
            <ul className="flex flex-col gap-3">
              {services.map((service) => (
                <li key={service} className="text-sm text-gray-400 flex items-center gap-2">
                  <Icon icon="ph:caret-right-bold" className="w-3 h-3 text-blue-500/60 flex-shrink-0" />
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-400">Get In Touch</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <Icon icon="ph:map-pin-bold" className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>Abeokuta, Ogun State, Nigeria</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Icon icon="ph:phone-bold" className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <a href="tel:+2347077195098" className="hover:text-white transition-colors">+2347077195098</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Icon icon="ph:envelope-bold" className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <a href="mailto:altairattic@gmail.com" className="hover:text-white transition-colors">altairattic@gmail.com</a>
              </li>
            </ul>

            <button
              onClick={onOpenConsultation}
              className="mt-2 inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 transition-colors w-fit"
            >
              Book a Consultation
              <Icon icon="ph:arrow-right-bold" className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/8 flex flex-row items-center justify-center gap-2 text-xs text-gray-500 text-center">
          <p>© 2026 Smart Homes Automation. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built With
            <Icon icon="ph:heart-fill" className="w-3 h-3 text-blue-400" />
            By
            <a
              href="https://altairattic.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400/80 hover:text-blue-400 transition-colors font-semibold"
            >
              Altair Attic
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
