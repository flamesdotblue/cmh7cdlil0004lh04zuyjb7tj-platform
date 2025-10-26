import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ALL_PROJECTS = [
  { id: 1, title: 'Marina Heights', category: 'Apartments', img: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop' },
  { id: 2, title: 'Golden Dunes Villa', category: 'Villas', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&auto=format&fit=crop' },
  { id: 3, title: 'Axis Tech Park', category: 'Commercial', img: 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop' },
  { id: 4, title: 'Cedar Residency', category: 'Apartments', img: 'https://images.unsplash.com/photo-1505691723518-36a5ac3b2d52?q=80&w=1600&auto=format&fit=crop' },
  { id: 5, title: 'Solstice Villas', category: 'Villas', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop' },
  { id: 6, title: 'Mercury Plaza', category: 'Commercial', img: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1600&auto=format&fit=crop' },
];

export default function ProjectsAndTools() {
  return (
    <>
      <ProjectsGallery />
      <HomeLoansTools />
    </>
  );
}

function ProjectsGallery() {
  const [filter, setFilter] = useState('All');
  const filtered = useMemo(() => (filter === 'All' ? ALL_PROJECTS : ALL_PROJECTS.filter(p => p.category === filter)), [filter]);
  const tabs = ['All', 'Apartments', 'Villas', 'Commercial'];

  return (
    <section className="py-24 md:py-28 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900">Projects</h2>
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((t) => (
              <button key={t} onClick={() => setFilter(t)} className={`px-4 py-2 rounded-full border text-sm transition ${filter === t ? 'bg-zinc-900 text-white border-zinc-900' : 'border-zinc-200 text-zinc-700 hover:bg-zinc-50'}`}>{t}</button>
            ))}
          </div>
        </div>

        <motion.div layout className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 12, rotateX: -4 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-2xl overflow-hidden border border-zinc-100 bg-white shadow-sm hover:shadow-xl transition [transform-style:preserve-3d] hover:-translate-y-1"
              >
                <div className="aspect-[4/3] w-full bg-cover bg-center" style={{ backgroundImage: `url(${p.img})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                <div className="absolute bottom-3 left-3 right-3 text-white drop-shadow">
                  <div className="text-xs uppercase tracking-[0.2em] opacity-80">{p.category}</div>
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

function HomeLoansTools() {
  const [amount, setAmount] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const { emi, totalInterest, totalPayment } = useMemo(() => {
    const P = Number(amount);
    const r = Number(rate) / 1200; // monthly rate
    const n = Number(years) * 12;
    const emiVal = r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPay = emiVal * n;
    const interest = totalPay - P;
    return { emi: emiVal, totalInterest: interest, totalPayment: totalPay };
  }, [amount, rate, years]);

  return (
    <section className="py-20 bg-gradient-to-b from-zinc-50 to-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold text-zinc-900">Home Loans</h3>
            <p className="mt-3 text-zinc-600">Compare rates and estimate your monthly EMI. Our finance team partners with top banks to tailor the best option for you.</p>
            <div className="mt-6 space-y-4">
              <div>
                <label className="text-sm text-zinc-600">Loan Amount</label>
                <input type="number" className="mt-1 w-full px-4 py-3 rounded-xl border border-zinc-200" value={amount} onChange={(e) => setAmount(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-zinc-600">Interest Rate (% p.a.)</label>
                  <input type="number" step="0.1" className="mt-1 w-full px-4 py-3 rounded-xl border border-zinc-200" value={rate} onChange={(e) => setRate(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm text-zinc-600">Tenure (years)</label>
                  <input type="number" className="mt-1 w-full px-4 py-3 rounded-xl border border-zinc-200" value={years} onChange={(e) => setYears(e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          <motion.div className="rounded-3xl border border-white bg-white shadow-xl p-6 sticky top-24" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h4 className="text-lg font-medium text-zinc-900">EMI Estimate</h4>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <Stat label="Monthly EMI" value={`₹ ${emi.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`} />
              <Stat label="Total Interest" value={`₹ ${totalInterest.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`} />
              <Stat label="Total Payment" value={`₹ ${totalPayment.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`} />
            </div>
            <div className="mt-6 h-2 rounded-full bg-zinc-100 overflow-hidden">
              <div className="h-full bg-blue-600" style={{ width: `${Math.min(100, (emi / (amount / years / 12)) * 10)}%` }} />
            </div>
            <button className="mt-6 w-full px-5 py-3 rounded-xl bg-blue-600 text-white font-medium shadow-lg shadow-blue-600/20 hover:bg-blue-700 active:scale-[0.99] transition">Request Bank Offers</button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
      <div className="text-xs uppercase tracking-widest text-zinc-500">{label}</div>
      <div className="mt-1 text-lg font-semibold">{value}</div>
    </div>
  );
}
