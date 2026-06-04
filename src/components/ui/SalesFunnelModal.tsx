import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

interface SalesFunnelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SalesFunnelModal({ isOpen, onClose }: SalesFunnelModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm"
          />

          {/* Modal panel */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 pointer-events-none"
          >
            <div data-lenis-prevent="true" className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto pointer-events-auto bg-[#0a0d14] border border-white/10 rounded-2xl shadow-[0_0_80px_rgba(37,99,235,0.15)] text-white">
              
              {/* Header */}
              <div className="sticky top-0 z-50 bg-[#0a0d14] border-b border-white/8 px-6 py-5 flex items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Upgrade Your Home. Upgrade Your Life.
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">See what you're missing out on without Altair Smart Home Automation.</p>
                </div>
                <button
                  onClick={onClose}
                  className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                  aria-label="Close modal"
                >
                  <Icon icon="ph:x-bold" className="w-4 h-4" />
                </button>
              </div>

              {/* Content Grid */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Problem Column */}
                  <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="shrink-0 w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">
                        <Icon icon="ph:x-bold" className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-semibold text-red-200">Without Altair Smart Home Automation</h3>
                    </div>
                    
                    <ul className="space-y-5 flex-1">
                      <li className="flex gap-3">
                        <Icon icon="ph:lightning-slash-bold" className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-red-200 text-sm mb-0.5">High Energy Bills</strong>
                          <span className="text-gray-400 text-sm leading-relaxed">Forgetting to turn off ACs and lights wastes electricity and costs you money.</span>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <Icon icon="ph:shield-warning-bold" className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-red-200 text-sm mb-0.5">Security Anxiety</strong>
                          <span className="text-gray-400 text-sm leading-relaxed">Constantly worrying about your home, family, or business when you are far away.</span>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <Icon icon="ph:person-simple-walk-bold" className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-red-200 text-sm mb-0.5">Inconvenience</strong>
                          <span className="text-gray-400 text-sm leading-relaxed">Having to manually get up to turn off lights, open gates, or adjust the temperature.</span>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <Icon icon="ph:eye-closed-bold" className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-red-200 text-sm mb-0.5">Blind Spots</strong>
                          <span className="text-gray-400 text-sm leading-relaxed">Not knowing who is at your door or what is happening around your property.</span>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Solution Column */}
                  <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex flex-col h-full relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full pointer-events-none" />
                    
                    <div className="flex items-center gap-3 mb-6 relative z-10">
                      <div className="shrink-0 w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                        <Icon icon="ph:check-bold" className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-semibold text-blue-200">With Altair Smart Home Automation</h3>
                    </div>
                    
                    <ul className="space-y-5 flex-1 relative z-10">
                      <li className="flex gap-3">
                        <Icon icon="ph:leaf-bold" className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-blue-200 text-sm mb-0.5">Automated Efficiency</strong>
                          <span className="text-gray-400 text-sm leading-relaxed">Lights and ACs turn off automatically when you leave a room or the house.</span>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <Icon icon="ph:shield-check-bold" className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-blue-200 text-sm mb-0.5">Total Peace of Mind</strong>
                          <span className="text-gray-400 text-sm leading-relaxed">View live CCTV feeds and get instant security alerts directly on your smartphone.</span>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <Icon icon="ph:armchair-bold" className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-blue-200 text-sm mb-0.5">Ultimate Comfort</strong>
                          <span className="text-gray-400 text-sm leading-relaxed">Control your entire house using just your voice or a mobile app from your bed.</span>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <Icon icon="ph:door-open-bold" className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-blue-200 text-sm mb-0.5">Smart Access</strong>
                          <span className="text-gray-400 text-sm leading-relaxed">See, speak to, and open the gate for visitors remotely from anywhere in the world.</span>
                        </div>
                      </li>
                    </ul>
                  </div>

                </div>

                {/* Footer CTA */}
                <div className="mt-8 pt-6 border-t border-white/10 flex justify-center">
                  <a
                    href="https://altair-attic.vercel.app/shop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 sm:px-10 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base sm:text-lg transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] hover:scale-105 active:scale-95 shrink-0 whitespace-nowrap"
                    onClick={onClose}
                  >
                    Shop Smart Devices Now
                    <Icon icon="ph:shopping-cart-bold" className="w-5 h-5 shrink-0" />
                  </a>
                </div>
                
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
