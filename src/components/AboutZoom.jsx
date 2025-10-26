import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TEAM = [
  { id: 1, name: 'Ava Patel', role: 'Creative Director', bio: 'Leads cinematic brand direction with an eye for detail.', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1400&auto=format&fit=crop' },
  { id: 2, name: 'Liam Chen', role: 'Lead Architect', bio: 'Designs iconic spaces blending form and function.', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1400&auto=format&fit=crop' },
  { id: 3, name: 'Noah Garcia', role: '3D Artist', bio: 'Builds immersive 3D visualizations and interactions.', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1400&auto=format&fit=crop' },
  { id: 4, name: 'Sophia Rossi', role: 'Product Manager', bio: 'Turns complex requirements into fluid experiences.', img: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1400&auto=format&fit=crop' },
];

export default function AboutZoom() {
  const [mode, setMode] = useState('brand'); // brand -> grid -> detail
  const [selected, setSelected] = useState(null);

  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">About</h2>
          <div className="flex gap-2">
            {mode !== 'brand' && (
              <button onClick={() => { setMode('brand'); setSelected(null); }} className="px-4 py-2 rounded-lg border border-zinc-200 text-zinc-700 hover:bg-zinc-50">Reset</button>
            )}
            {mode === 'brand' && (
              <button onClick={() => setMode('grid')} className="px-4 py-2 rounded-lg bg-zinc-900 text-white hover:bg-black">Meet the Team</button>
            )}
          </div>
        </div>

        <div className="relative min-h-[360px] md:min-h-[420px] [perspective:1400px]">
          <AnimatePresence mode="wait">
            {mode === 'brand' && (
              <motion.div
                key="brand"
                className="grid place-items-center rounded-3xl border border-zinc-100 bg-gradient-to-br from-zinc-50 to-white h-[360px] md:h-[420px] shadow-inner"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center">
                  <div className="inline-flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700" />
                    <div className="text-2xl font-semibold">Blue Estates</div>
                  </div>
                  <p className="max-w-xl text-zinc-600">We craft real estate experiences with cinematic motion, immersive 3D, and thoughtful design.</p>
                </div>
              </motion.div>
            )}

            {mode === 'grid' && (
              <motion.div
                key="grid"
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5 }}
              >
                {TEAM.map((m, i) => (
                  <motion.button
                    key={m.id}
                    onClick={() => { setSelected(m); setMode('detail'); }}
                    className="relative rounded-2xl overflow-hidden aspect-[4/5] group border border-zinc-100 bg-zinc-50"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <img alt={m.name} src={m.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-left">
                      <div className="text-white font-medium drop-shadow">{m.name}</div>
                      <div className="text-white/90 text-xs drop-shadow">{m.role}</div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {mode === 'detail' && selected && (
              <motion.div
                key="detail"
                className="grid md:grid-cols-2 gap-8 items-center"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
              >
                <div className="relative rounded-3xl overflow-hidden border border-zinc-100">
                  <img alt={selected.name} src={selected.img} className="w-full h-[340px] md:h-[420px] object-cover" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">{selected.name}</h3>
                  <p className="text-zinc-500">{selected.role}</p>
                  <p className="mt-4 text-zinc-600">{selected.bio}</p>
                  <div className="mt-6 flex gap-3">
                    <button onClick={() => setMode('grid')} className="px-4 py-2 rounded-lg border border-zinc-200 hover:bg-zinc-50">Back</button>
                    <button onClick={() => { setSelected(null); setMode('brand'); }} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Home</button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
