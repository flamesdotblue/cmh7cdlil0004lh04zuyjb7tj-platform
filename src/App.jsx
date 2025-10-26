import { useRef } from 'react';
import IntroNavbar from './components/IntroNavbar';
import HeroCity3D from './components/HeroCity3D';
import ProjectsGallery from './components/ProjectsGallery';
import LoansEMI from './components/LoansEMI';

export default function App() {
  const homeRef = useRef(null);
  const projectsRef = useRef(null);
  const loansRef = useRef(null);
  const contactRef = useRef(null);

  const scrollTo = (ref) => ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-inter">
      <IntroNavbar
        onNav={(key) => {
          if (key === 'home') scrollTo(homeRef);
          if (key === 'projects') scrollTo(projectsRef);
          if (key === 'loans') scrollTo(loansRef);
          if (key === 'contact') scrollTo(contactRef);
        }}
      />

      <main className="pt-16">
        <section ref={homeRef} id="home">
          <HeroCity3D />
        </section>

        <section ref={projectsRef} id="projects">
          <ProjectsGallery />
        </section>

        <section ref={loansRef} id="loans">
          <LoansEMI />
        </section>

        <section ref={contactRef} id="contact" className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Contact</h2>
            <p className="text-zinc-600 mt-2">Send us a message and our team will get back to you.</p>
            <form
              className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thanks! Your message has been sent.');
                e.currentTarget.reset();
              }}
            >
              <input required placeholder="Your Name" className="px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-600" />
              <input required type="email" placeholder="Email" className="px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-600" />
              <input placeholder="Phone (optional)" className="px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-600 md:col-span-2" />
              <textarea required rows={5} placeholder="Message" className="px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-600 md:col-span-2" />
              <button className="md:col-span-2 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 text-white font-medium shadow-lg shadow-blue-600/20 hover:bg-blue-700 active:scale-[0.98] transition">
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="py-10 border-t border-zinc-100 text-center text-sm text-zinc-500">© {new Date().getFullYear()} Blue Estates. All rights reserved.</footer>
    </div>
  );
}
