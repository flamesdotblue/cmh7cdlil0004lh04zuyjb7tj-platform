import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function HomeSections() {
  return (
    <div className="relative">
      <Hero3D />
      <FeaturedProjects />
      <InteriorParallax />
    </div>
  );
}

function Hero3D() {
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  useEffect(() => {
    const el = containerRef.current;
    const onMove = (e) => {
      const bounds = el.getBoundingClientRect();
      const cx = bounds.left + bounds.width / 2;
      const cy = bounds.top + bounds.height / 2;
      const dx = (e.clientX - cx) / (bounds.width / 2);
      const dy = (e.clientY - cy) / (bounds.height / 2);
      setTilt({ rx: dy * -6, ry: dx * 8 });
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section ref={containerRef} className="relative h-[90vh] md:h-[92vh] bg-white overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 via-white to-white" />
        <motion.div
          className="absolute -inset-20 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.12),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(99,102,241,0.12),transparent_40%)]"
          style={{ filter: 'blur(10px)' }}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="h-full container mx-auto px-6 grid md:grid-cols-2 items-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8 }}
          className="perspective-[1200px]"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-semibold tracking-tight text-zinc-900"
            style={{ transformStyle: 'preserve-3d' }}
            animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
            transition={{ type: 'spring', stiffness: 60, damping: 18 }}
          >
            Elevating Real Estate into a Cinematic Experience
          </motion.h1>
          <motion.p className="mt-6 text-lg text-zinc-600 max-w-xl" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
            Discover signature residences, immersive interiors, and bespoke home loan guidance—all in one seamless 3D interface.
          </motion.p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 text-white hover:bg-black transition">
              Explore Projects
            </a>
            <a href="#about" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-zinc-300 text-zinc-900 hover:border-zinc-900 transition">
              About Us
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-[380px] md:h-[520px] [perspective:1600px]"
        >
          <div className="absolute inset-0 grid place-items-center">
            <motion.div
              className="relative w-[85%] h-[85%] rounded-3xl bg-gradient-to-br from-zinc-100 to-zinc-50 border border-white shadow-2xl overflow-hidden"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ rotateX: tilt.rx, rotateY: tilt.ry, boxShadow: '0 40px 120px rgba(0,0,0,0.12)' }}
              transition={{ type: 'spring', stiffness: 60, damping: 18 }}
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505692794403-34d4982f88aa?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white drop-shadow-lg">
                <div className="text-sm uppercase tracking-[0.25em] opacity-80">Featured</div>
                <div className="text-2xl md:text-3xl font-semibold">Skyline Vista Residences</div>
                <div className="text-sm opacity-90">Penthouse • Marina District</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedProjects() {
  const projects = [
    { id: 1, title: 'Harborview Apartments', img: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1600&auto=format&fit=crop', tag: 'Apartments' },
    { id: 2, title: 'Aurora Villas', img: 'https://images.unsplash.com/photo-1582582494700-66d0d7b1c61b?q=80&w=1600&auto=format&fit=crop', tag: 'Villas' },
    { id: 3, title: 'Axis Commercial Center', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop', tag: 'Commercial' },
  ];
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-6">
        <motion.h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Featured Projects
        </motion.h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.a
              key={p.id}
              href="#projects"
              className="group relative overflow-hidden rounded-2xl bg-zinc-100 border border-zinc-200 shadow-sm hover:shadow-xl transition-shadow [transform-style:preserve-3d]"
              initial={{ opacity: 0, y: 20, rotateX: -6 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.06 * i }}
            >
              <div className="aspect-[4/3] w-full bg-cover bg-center" style={{ backgroundImage: `url(${p.img})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-zinc-900 shadow-sm">{p.tag}</div>
                <div className="mt-2 text-white text-lg font-semibold drop-shadow">{p.title}</div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function InteriorParallax() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.04),transparent_70%)]" />
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h3 className="text-2xl md:text-3xl font-semibold text-zinc-900">Interior Designing</h3>
            <p className="mt-4 text-zinc-600">From concept to completion, our interior studio crafts immersive spaces. Explore before/after transformations with subtle 3D depth.</p>
            <a href="#projects" className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 text-white hover:bg-black transition">View Portfolio</a>
          </motion.div>
          <motion.div className="relative h-[340px] md:h-[420px]" initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <div className="absolute inset-0 grid place-items-center">
              <BeforeAfterCard />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BeforeAfterCard() {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative w-full max-w-xl h-full rounded-3xl overflow-hidden border border-white shadow-2xl bg-zinc-100">
      <img alt="after" className="absolute inset-0 w-full h-full object-cover" src="https://images.unsplash.com/photo-1505692794403-34d4982f88aa?q=80&w=1600&auto=format&fit=crop" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img alt="before" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=1600&auto=format&fit=crop" />
      </div>
      <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="-ml-0.5 w-1 h-full bg-white/80 backdrop-blur rounded-full" />
      </div>
      <input aria-label="before-after slider" className="absolute inset-0 opacity-0 cursor-ew-resize" type="range" min={0} max={100} value={pos} onChange={(e) => setPos(parseInt(e.target.value, 10))} />
      <div className="absolute top-4 left-4 text-xs px-2 py-1 rounded bg-white/80">Before</div>
      <div className="absolute top-4 right-4 text-xs px-2 py-1 rounded bg-white/80">After</div>
    </div>
  );
}
