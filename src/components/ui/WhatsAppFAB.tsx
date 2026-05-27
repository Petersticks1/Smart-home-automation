import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

const WHATSAPP_NUMBER = '2347077195098';
const DEFAULT_MESSAGE = "Hi Altair Attic! 👋 I'm interested in your smart home services.";

export function WhatsAppFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const dragMoveDistance = useRef(0);

  const openWhatsApp = () => {
    const text = encodeURIComponent(chatMessage.trim() || DEFAULT_MESSAGE);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  // Distinguish between a click and a drag so the FAB doesn't open on drag release
  const handleDragStart = (_: unknown, info: { point: { x: number; y: number } }) => {
    dragStartPos.current = info.point;
    dragMoveDistance.current = 0;
    setIsDragging(false);
  };

  const handleDrag = (_: unknown, info: { point: { x: number; y: number } }) => {
    const dx = info.point.x - dragStartPos.current.x;
    const dy = info.point.y - dragStartPos.current.y;
    dragMoveDistance.current = Math.sqrt(dx * dx + dy * dy);
    if (dragMoveDistance.current > 5) setIsDragging(true);
  };

  const handleDragEnd = () => {
    setTimeout(() => setIsDragging(false), 100);
  };

  const handleToggle = () => {
    if (!isDragging) setIsOpen(prev => !prev);
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      className="fixed bottom-6 right-6 z-[998] flex flex-col items-end gap-3 cursor-grab active:cursor-grabbing select-none"
      style={{ touchAction: 'none' }}
    >
      {/* Chat popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="w-72 rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.5)] border border-white/10 cursor-default"
            onClick={e => e.stopPropagation()}
          >
            {/* Chat header */}
            <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Icon icon="ph:buildings-bold" className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm leading-tight">Altair Attic</p>
                <p className="text-green-200 text-xs">Usually replies within an hour</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <Icon icon="ph:x-bold" className="w-4 h-4" />
              </button>
            </div>

            {/* Chat body */}
            <div className="bg-[#ECE5DD] px-4 py-4 flex flex-col gap-3">
              {/* Greeting bubble */}
              <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 shadow-sm max-w-[85%]">
                <p className="text-gray-800 text-sm leading-relaxed">
                  👋 Hi there! How can we help you automate your home today?
                </p>
                <p className="text-gray-400 text-[10px] mt-1 text-right">Altair Attic</p>
              </div>

              {/* Input area */}
              <div className="flex gap-2 items-end mt-1">
                <textarea
                  rows={2}
                  placeholder="Type a message…"
                  value={chatMessage}
                  onChange={e => setChatMessage(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); openWhatsApp(); }}}
                  className="flex-1 px-3 py-2 rounded-xl text-sm text-gray-800 placeholder-gray-400 border border-gray-200 resize-none focus:outline-none focus:ring-1 focus:ring-[#25D366]/50 bg-white shadow-sm"
                />
                <button
                  onClick={openWhatsApp}
                  className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full bg-[#25D366] hover:bg-[#1ebe5a] text-white shadow-md transition-colors"
                  aria-label="Send via WhatsApp"
                >
                  <Icon icon="ph:paper-plane-tilt-bold" className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Footer note */}
            <div className="bg-[#ECE5DD] border-t border-black/5 px-4 py-2 flex items-center justify-center gap-1.5">
              <Icon icon="ph:whatsapp-logo-fill" className="w-3.5 h-3.5 text-[#25D366]" />
              <p className="text-[10px] text-gray-500">Chat opens in WhatsApp</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB button */}
      <motion.button
        onClick={handleToggle}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="w-14 h-14 rounded-full bg-[#25D366] shadow-[0_4px_24px_rgba(37,211,102,0.45)] flex items-center justify-center text-white relative"
        aria-label="Open WhatsApp chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Icon icon="ph:x-bold" className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span
              key="whatsapp"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Icon icon="ph:whatsapp-logo-bold" className="w-7 h-7" />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!isOpen && (
          <motion.span
            className="absolute inset-0 rounded-full bg-[#25D366]"
            animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeOut' }}
          />
        )}
      </motion.button>
    </motion.div>
  );
}
