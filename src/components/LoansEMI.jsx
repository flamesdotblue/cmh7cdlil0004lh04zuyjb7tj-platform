import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

export default function LoansEMI() {
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
            <h3 className="text-3xl md:text-4xl font-semibold tracking-tight">Home Loans</h3>
            <p className="mt-3 text-zinc-600">Compare rates and estimate your monthly EMI. Partner banks and tailored offers available.</p>
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
