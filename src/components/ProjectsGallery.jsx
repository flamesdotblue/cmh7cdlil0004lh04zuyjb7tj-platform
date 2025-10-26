import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DATA = [
  { id: 1, type: 'Apartments', title: 'Skyline Residences', img: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1600&auto=format&fit=crop' },
  { id: 2, type: 'Villas', title: 'Azure Villa', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&auto=format&fit=crop' },
  { id: 3, type: 'Commercial', title: 'Prime Towers', img: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop' },
  { id: 4, type: 'Apartments', title: 'Harbor Heights', img: 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop' },
  { id: 5, type: 'Villas', title: 'Solstice Villa', img: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c3f5?q=80&w=1600&auto=format&fit=crop' },
  { id: 6, type: 'Commercial', title: 'Axis Plaza', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop' },
];

export default function ProjectsGallery() {
  const [filter, setFilter] = useState('All');
  const filtered = useMemo(() => (filter === 'All' ? DATA : DATA.filter((d) => d.type === filter)), [filter]);
  const tabs = ['All', 'Apartments', 'Villas', 'Commercial'];

  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Projects</h2>
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-2 rounded-full border text-sm transition ${
                  filter === t ? 'bg-zinc-900 text-white border-zinc-900' : 'border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 16, rotateX: -4 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.45 }}
                className="group relative rounded-2xl overflow-hidden border border-zinc-100 bg-white shadow-sm hover:shadow-xl transition hover:-translate-y-1 [transform-style:preserve-3d]"
              >
                <div className="aspect-[4/3] w-full bg-cover bg-center" style={{ backgroundImage: `url(${p.img})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                <div className="absolute bottom-3 left-3 right-3 text-white drop-shadow">
                  <div className="text-xs uppercase tracking-[0.2em] opacity-80">{p.type}</div>
                  <div className="text-lg font-semibold">{p.title}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
