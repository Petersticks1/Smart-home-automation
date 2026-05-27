import { useState, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WHATSAPP_NUMBER = '2347077195098';
const EMAIL_ADDRESS  = 'altairattic@gmail.com';

const SERVICES = [
  'Smart Lighting Control',
  'Security & CCTV Integration',
  'Climate Automation',
  'Access Control Systems',
  'Energy Management',
  'Home Theatre Setup',
  'Full Smart Home Package',
  'Other',
];

export function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

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

  const update = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const buildMessage = () =>
    `Hi Altair Attic! 👋\n\nI'd like to book a consultation.\n\n` +
    `*Name:* ${form.name}\n` +
    `*Email:* ${form.email}\n` +
    `*Phone:* ${form.phone}\n` +
    `*Service Interest:* ${form.service || 'Not specified'}\n` +
    `*Details:*\n${form.message}`;

  const sendWhatsApp = (e: FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    setSubmitted(true);
  };

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent('Consultation Request – Altair Attic');
    const body = encodeURIComponent(buildMessage());
    window.open(`mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${body}`, '_blank');
    setSubmitted(true);
  };

  const reset = () => {
    setForm({ name: '', email: '', phone: '', service: '', message: '' });
    setSubmitted(false);
  };

  const isValid = form.name.trim() && form.phone.trim() && form.message.trim();

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
            <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto pointer-events-auto bg-[#0a0d14] border border-white/10 rounded-2xl shadow-[0_0_80px_rgba(37,99,235,0.15)] text-white">

              {/* Header */}
              <div className="sticky top-0 z-10 bg-[#0a0d14] border-b border-white/8 px-6 py-5 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Book a Consultation</h2>
                  <p className="text-xs text-gray-400 mt-0.5">We'll get back to you within 24 hours</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                  aria-label="Close modal"
                >
                  <Icon icon="ph:x-bold" className="w-4 h-4" />
                </button>
              </div>

              <div className="px-6 py-6">
                {submitted ? (
                  /* Success state */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-4 py-8 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center">
                      <Icon icon="ph:check-circle-bold" className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold">Request Sent!</h3>
                    <p className="text-gray-400 text-sm max-w-xs">
                      Thank you, {form.name}! Our team will reach out to you soon.
                    </p>
                    <button
                      onClick={reset}
                      className="mt-2 text-sm text-blue-400 hover:text-blue-300 underline underline-offset-2"
                    >
                      Send another request
                    </button>
                  </motion.div>
                ) : (
                  <form className="flex flex-col gap-4">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-gray-400 font-medium tracking-wide">Full Name *</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={e => update('name', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/60 focus:outline-none focus:ring-1 focus:ring-blue-500/30 text-sm placeholder-gray-600 transition-all"
                        required
                      />
                    </div>

                    {/* Email & Phone side by side */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-gray-400 font-medium tracking-wide">Email</label>
                        <input
                          type="email"
                          placeholder="you@email.com"
                          value={form.email}
                          onChange={e => update('email', e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/60 focus:outline-none focus:ring-1 focus:ring-blue-500/30 text-sm placeholder-gray-600 transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-gray-400 font-medium tracking-wide">Phone / WhatsApp *</label>
                        <input
                          type="tel"
                          placeholder="+234 800 000 0000"
                          value={form.phone}
                          onChange={e => update('phone', e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/60 focus:outline-none focus:ring-1 focus:ring-blue-500/30 text-sm placeholder-gray-600 transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Service interest */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-gray-400 font-medium tracking-wide">Service Interest</label>
                      <select
                        value={form.service}
                        onChange={e => update('service', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/60 focus:outline-none focus:ring-1 focus:ring-blue-500/30 text-sm text-gray-300 transition-all appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-[#0a0d14]">Select a service…</option>
                        {SERVICES.map(s => (
                          <option key={s} value={s} className="bg-[#0a0d14]">{s}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-gray-400 font-medium tracking-wide">Tell Us More *</label>
                      <textarea
                        rows={4}
                        placeholder="Describe your home, goals, and any specific requirements…"
                        value={form.message}
                        onChange={e => update('message', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/60 focus:outline-none focus:ring-1 focus:ring-blue-500/30 text-sm placeholder-gray-600 resize-none transition-all"
                        required
                      />
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-2">
                      <button
                        type="button"
                        onClick={sendWhatsApp}
                        disabled={!isValid}
                        className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all"
                      >
                        <Icon icon="ph:whatsapp-logo-bold" className="w-5 h-5" />
                        Send via WhatsApp
                      </button>
                      <button
                        type="button"
                        onClick={sendEmail}
                        disabled={!isValid}
                        className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all"
                      >
                        <Icon icon="ph:envelope-bold" className="w-5 h-5" />
                        Send via Email
                      </button>
                    </div>

                    <p className="text-center text-xs text-gray-600 mt-1">
                      * Required fields. Your info is only used to contact you.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
