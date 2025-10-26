import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Info, Image, Calculator, Phone } from 'lucide-react';

export default function IntroAndNavbar({ onNav }) {
  const [stage, setStage] = useState(0); // 0: init, 1: logo, 2: name, 3: move, 4: nav+hero

  useEffect(() => {
    // Stage timings mimic cinematic intro
    const timers = [];
    timers.push(setTimeout(() => setStage(1), 100)); // Logo reveal
    timers.push(setTimeout(() => setStage(2), 900)); // Name reveal
    timers.push(setTimeout(() => setStage(3), 2500)); // Move to navbar
    timers.push(setTimeout(() => setStage(4), 3500)); // Navbar + hero content
    return () => timers.forEach(clearTimeout);
  }, []);

  const brand = (
    <motion.div
      layoutId="brand"
      className="flex items-center gap-3 select-none"
      initial={false}
      animate={{ scale: stage < 3 ? 1 : 0.7 }}
      transition={{ type: 'spring', stiffness: 80, damping: 15 }}
    >
      <motion.div
        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-2xl shadow-blue-600/40 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: stage >= 1 ? 1 : 0, scale: stage >= 1 ? 1 : 0.6 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-7 h-7 bg-white/90 rounded-[6px] rotate-12 shadow-md shadow-white/40" />
      </motion.div>
      <AnimatePresence>
        {stage >= 2 && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            <span className="text-xl md:text-2xl font-semibold tracking-tight text-zinc-900">Aurora Estates</span>
            <span className="text-xs uppercase tracking-[0.25em] text-zinc-500">Realty • Interiors • Finance</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <>
      {/* Intro Layer */}
      <AnimatePresence>
        {stage < 4 && (
          <motion.div
            className="fixed inset-0 z-[60] grid place-items-center bg-gradient-to-b from-white to-zinc-50"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative"
              animate={stage >= 3 ? { x: '-38vw', y: '-40vh', scale: 0.7 } : { x: 0, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {brand}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-zinc-100"
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: stage >= 4 ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl h-16 flex items-center justify-between">
          {brand}
          <nav className="hidden md:flex items-center gap-2">
            {[
              { key: 'home', label: 'Home', icon: Home },
              { key: 'about', label: 'About', icon: Info },
              { key: 'projects', label: 'Projects', icon: Image },
              { key: 'contact', label: 'Contact', icon: Phone },
            ].map((item, idx) => (
              <motion.button
                key={item.key}
                onClick={() => onNav?.(item.key)}
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100/70 transition"
                initial={{ y: -12, opacity: 0 }}
                animate={{ y: 0, opacity: stage >= 4 ? 1 : 0 }}
                transition={{ delay: 0.05 * idx + 0.2, duration: 0.5 }}
              >
                <item.icon className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                {item.label}
              </motion.button>
            ))}
          </nav>
          <motion.button
            onClick={() => onNav?.('contact')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium shadow-lg shadow-blue-600/20 hover:bg-blue-700 active:scale-[0.98] transition"
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: stage >= 4 ? 1 : 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Calculator className="w-4 h-4" /> Home Loans
          </motion.button>
        </div>
      </motion.header>

      {/* Cinematic hero layer appears behind navbar after stage 4 */}
      <AnimatePresence>
        {stage >= 4 && (
          <motion.div
            className="relative pt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
