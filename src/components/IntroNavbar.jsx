import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Image, Calculator, Phone } from 'lucide-react';

export default function IntroNavbar({ onNav }) {
  const [stage, setStage] = useState(0); // 0:init 1:logo 2:name 3:move 4:navbar

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 100); // logo
    const t2 = setTimeout(() => setStage(2), 900); // name
    const t3 = setTimeout(() => setStage(3), 2400); // move to corner
    const t4 = setTimeout(() => setStage(4), 3400); // navbar ready
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  const Brand = (
    <motion.div
      className="flex items-center gap-3 select-none"
      animate={{ scale: stage < 3 ? 1 : 0.72 }}
      transition={{ type: 'spring', stiffness: 90, damping: 16 }}
    >
      <motion.div
        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-2xl shadow-blue-600/40 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: stage >= 1 ? 1 : 0, scale: stage >= 1 ? 1 : 0.6 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-7 h-7 bg-white/95 rounded-[6px] rotate-12 shadow-md shadow-white/40" />
      </motion.div>
      <AnimatePresence>
        {stage >= 2 && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-xl md:text-2xl font-semibold tracking-tight text-zinc-900">Blue Estates</div>
            <div className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-zinc-500">Realty • Interiors • Finance</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <>
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
              animate={stage >= 3 ? { x: '-40vw', y: '-40vh', scale: 0.72 } : { x: 0, y: 0, scale: 1 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            >
              {Brand}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur border-b border-zinc-100"
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: stage >= 4 ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl h-16 flex items-center justify-between">
          {Brand}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { k: 'home', label: 'Home', icon: Home },
              { k: 'projects', label: 'Projects', icon: Image },
              { k: 'loans', label: 'Home Loans', icon: Calculator },
              { k: 'contact', label: 'Contact', icon: Phone },
            ].map((it, i) => (
              <motion.button
                key={it.k}
                onClick={() => onNav?.(it.k)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100/70 transition"
                initial={{ y: -12, opacity: 0 }}
                animate={{ y: 0, opacity: stage >= 4 ? 1 : 0 }}
                transition={{ delay: 0.06 * i + 0.15, duration: 0.5 }}
              >
                <it.icon className="w-4 h-4 opacity-70" />
                {it.label}
              </motion.button>
            ))}
          </nav>
          <motion.button
            onClick={() => onNav?.('projects')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium shadow-lg shadow-blue-600/20 hover:bg-blue-700 active:scale-[0.98] transition"
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: stage >= 4 ? 1 : 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Explore
          </motion.button>
        </div>
      </motion.header>
    </>
  );
}
