import { useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  FiMenu, FiX, FiPhone, FiMail, FiMapPin, FiArrowRight,
  FiArrowDown, FiCheck, FiSend, FiAward, FiShield, FiTruck
} from 'react-icons/fi';

/* ───────────────────── Reusable scroll-triggered wrapper ───────────────────── */
function Reveal({ children, direction = 'up', delay = 0, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 60 : direction === 'down' ? -60 : 0,
      x: direction === 'left' ? 60 : direction === 'right' ? -60 : 0,
    },
    visible: {
      opacity: 1, y: 0, x: 0,
      transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ───────────────────── Counter Animation ───────────────────── */
function AnimatedCounter({ target, suffix = '', duration = 2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  if (isInView && count === 0) {
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
  }

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN APP COMPONENT
   ═══════════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSent, setFormSent] = useState(false);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const navLinks = [
    { label: 'Acasă', href: '#acasa' },
    { label: 'Despre Noi', href: '#despre' },
    { label: 'Produse', href: '#produse' },
    { label: 'Echipa', href: '#echipa' },
  ];

  const products = [
    {
      icon: '🏗️',
      title: 'Beton Preparat',
      desc: 'Beton de înaltă rezistență, livrat la standardele cele mai exigente pentru fundații și structuri complexe.',
    },
    {
      icon: '🧱',
      title: 'Cărămizi & Blocuri',
      desc: 'Cărămizi ceramice și blocuri de zidărie premium pentru pereți rezistenți și izolanți termic.',
    },
    {
      icon: '🔩',
      title: 'Oțel Beton',
      desc: 'Armături din oțel beton de calitate superioară, certificate conform normelor europene EN.',
    },
    {
      icon: '⛰️',
      title: 'Nisip & Pietriș',
      desc: 'Agregate sortate cu granulometrie precisă, ideale pentru betoane, mortare și finisaje.',
    },
    {
      icon: '🏠',
      title: 'Materiale Izolante',
      desc: 'Soluții complete de izolare termică și fonică — polistiren, vată minerală, spumă poliuretanică.',
    },
    {
      icon: '🪨',
      title: 'Ciment & Mortar',
      desc: 'Ciment Portland și mortare uscate de la producători de top, pentru orice tip de construcție.',
    },
  ];

  const stats = [
    { value: 10, suffix: '+', label: 'Ani de Experiență', icon: <FiAward /> },
    { value: 500, suffix: '+', label: 'Proiecte Finalizate', icon: <FiCheck /> },
    { value: 100, suffix: '%', label: 'Calitate Garantată', icon: <FiShield /> },
    { value: 50, suffix: '+', label: 'Parteneri de Încredere', icon: <FiTruck /> },
  ];

  const teamMembers = [
    { name: 'Pop Razvan Daniel', role: 'Director General', image: '/razvi.jpeg', color: 'from-primary to-primary-dark' },
    { name: 'Popa Ruxandra Ioana ', role: 'Manager Vânzări', image: '/ruxi.jpeg', color: 'from-dark to-dark-lighter' },
    { name: 'Popa Miruna', role: 'Inginer Logistică', image: '/miru.jpg', color: 'from-primary-dark to-dark' },
    { name: 'Vinczi Debora Alexandra', role: 'Specialist Relații Clienți', image: '/debo.jpeg', color: 'from-dark-lighter to-primary' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* ═══════════════════ NAVBAR ═══════════════════ */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 border-b border-steel-dark/20 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#acasa" className="flex items-center gap-3 group">
            <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
              <img src="/logo.png" alt="Beto Base Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-heading font-bold text-xl text-dark tracking-tight">BETO BASE</span>
              <span className="block text-[10px] tracking-[0.25em] text-warm-gray uppercase -mt-0.5">Materiale · Construcții</span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-dark/70 hover:text-primary transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href="#contact"
              className="bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              Contactează-ne
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-dark text-2xl p-2 hover:bg-steel rounded-lg transition-colors"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-steel-dark/10"
            >
              <div className="p-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-base font-medium text-dark/80 hover:text-primary transition-colors py-2"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ═══════════════════ HERO SECTION ═══════════════════ */}
      <section id="acasa" ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Parallax bg */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 -top-20">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/bg3.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/70 to-dark/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
        </motion.div>

        {/* Content */}
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 lg:px-24 pt-32 pb-20 w-full">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
            >
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-white/90 text-sm font-medium">Din inima Transilvaniei</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.95] tracking-tight mb-6"
            >
              BETO
              <br />
              <span className="text-primary">BASE</span>
            </motion.h1>

            {/* Slogan */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="text-xl sm:text-2xl md:text-3xl text-white/90 font-heading font-medium leading-snug mb-8 max-w-2xl"
            >
              Partenerul tau in constructii rezistente si calitative
            </motion.p>

            {/* Sub-text */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-base sm:text-lg text-white/60 max-w-xl mb-10 leading-relaxed"
            >
              Furnizăm materiale de construcții de cea mai înaltă calitate pentru proiectele care contează.
              De la fundație până la acoperiș — suntem alături de tine.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#produse"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 text-base"
              >
                Descoperă Produsele <FiArrowRight />
              </a>
              <a
                href="#despre"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-xl border border-white/20 transition-all duration-300 hover:-translate-y-1 text-base"
              >
                Despre Noi <FiArrowDown />
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-8 h-12 border-2 border-white/30 rounded-full flex items-start justify-center pt-2"
          >
            <motion.div className="w-1.5 h-3 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════ ABOUT / BUSINESS SECTION ═══════════════════ */}
      <section id="despre" className="py-24 md:py-32 bg-cream relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-steel-dark/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left copy */}
            <div>
              <Reveal>
                <span className="inline-block text-primary font-heading font-bold text-sm tracking-[0.2em] uppercase mb-4">
                  Despre Beto Base
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-dark leading-[1.05] mb-6">
                  Construim
                  <span className="text-primary"> Viitorul</span>
                  <br />
                  Transilvaniei
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-warm-gray text-lg leading-relaxed mb-6">
                  <strong className="text-dark">Beto Base SRL</strong> este un furnizor de top de materiale de construcții, 
                  cu sediul în inima Transilvaniei. De peste un deceniu, deservim cu mândrie constructorii, 
                  dezvoltatorii imobiliari și proprietarii din întreaga regiune, oferind produse de calitate superioară 
                  la prețuri competitive.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-warm-gray text-lg leading-relaxed mb-8">
                  Misiunea noastră este simplă: să fim partenerul de încredere pe care fiecare constructor 
                  din Transilvania îl merită. De la proiecte rezidențiale mici până la dezvoltări comerciale de 
                  anvergură, livrăm materiale certificate, consiliere de specialitate și un serviciu impecabil.
                </p>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-dark font-medium">
                    <FiCheck className="text-primary text-xl" />
                    <span>Livrare Rapidă</span>
                  </div>
                  <div className="flex items-center gap-2 text-dark font-medium">
                    <FiCheck className="text-primary text-xl" />
                    <span>Prețuri Competitive</span>
                  </div>
                  <div className="flex items-center gap-2 text-dark font-medium">
                    <FiCheck className="text-primary text-xl" />
                    <span>Consiliere Gratuită</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right — decorative card */}
            <Reveal direction="right" delay={0.2}>
              <div className="relative">
                <div className="bg-gradient-to-br from-dark to-dark-lighter rounded-3xl p-10 shadow-2xl">
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary rounded-2xl rotate-12 opacity-80" />
                  <div className="relative z-10">
                    <h3 className="font-heading font-bold text-3xl text-white mb-4">
                      De ce <span className="text-primary">Transilvania?</span>
                    </h3>
                    <p className="text-white/70 leading-relaxed mb-6">
                      Transilvania reprezintă motorul construcțiilor din România. Cu o cerere în continuă creștere 
                      pentru locuințe noi, spații comerciale și infrastructură modernă, noi suntem aici pentru a 
                      alimenta această dezvoltare cu materiale de primă clasă.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                        <div className="text-primary font-heading font-bold text-2xl">15+</div>
                        <div className="text-white/60 text-sm">Județe acoperite</div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                        <div className="text-primary font-heading font-bold text-2xl">24h</div>
                        <div className="text-white/60 text-sm">Livrare garantată</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════ STATS SECTION ═══════════════════ */}
      <section className="py-16 bg-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(230,59,46,0.15),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary text-2xl mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    {stat.icon}
                  </div>
                  <div className="font-heading font-black text-4xl md:text-5xl text-white mb-2">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-white/50 text-sm font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ PRODUCTS SECTION ═══════════════════ */}
      <section id="produse" className="py-24 md:py-32 bg-steel relative overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 relative z-10">
          <div className="text-center mb-16">
            <Reveal>
              <span className="inline-block text-primary font-heading font-bold text-sm tracking-[0.2em] uppercase mb-4">
                Gama Noastră
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-dark mb-6">
                Materiale <span className="text-primary">Premium</span>
                <br />
                Pentru Fiecare Proiect
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-warm-gray text-lg max-w-2xl mx-auto">
                Oferim o gamă completă de materiale de construcții, selectate cu grijă de la cei mai reputați 
                producători din România și Europa.
              </p>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-shadow duration-500 group cursor-default h-full"
                >
                  <div className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-500">
                    {product.icon}
                  </div>
                  <h3 className="font-heading font-bold text-xl text-dark mb-3 group-hover:text-primary transition-colors duration-300">
                    {product.title}
                  </h3>
                  <p className="text-warm-gray leading-relaxed text-[15px]">
                    {product.desc}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-primary font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Află mai multe <FiArrowRight />
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ WHY CHOOSE US ═══════════════════ */}
      <section className="py-24 md:py-32 bg-cream relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal direction="left">
              <div className="relative">
                <div className="bg-primary rounded-3xl p-12 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                  <div className="relative z-10">
                    <h2 className="font-heading font-black text-4xl md:text-5xl leading-tight mb-6">
                      DE CE <br />NE ALEG <br />CLIENȚII?
                    </h2>
                    <p className="text-white/80 text-lg leading-relaxed">
                      Într-o piață aglomerată, ne diferențiem prin calitate, promptitudine și 
                      grijă reală față de fiecare client. Nu vindem doar materiale — construim 
                      relații de lungă durată.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="space-y-6">
              {[
                {
                  title: 'Calitate Verificată',
                  desc: 'Toate materialele noastre sunt certificate și testate conform standardelor EN, garantând performanță structurală de top.',
                },
                {
                  title: 'Livrare în Toată Transilvania',
                  desc: 'Dispunem de o flotă modernă care acoperă toate județele din Transilvania, cu livrare în maxim 24 de ore.',
                },
                {
                  title: 'Consultanță de Specialitate',
                  desc: 'Echipa noastră de ingineri și specialiști în materiale vă stă la dispoziție cu sfaturi personalizate pentru fiecare proiect.',
                },
                {
                  title: 'Prețuri Transparente',
                  desc: 'Oferim cele mai competitive prețuri din regiune, fără costuri ascunse. Solicită o ofertă personalizată astăzi!',
                },
              ].map((item, i) => (
                <Reveal key={i} direction="right" delay={i * 0.12}>
                  <motion.div
                    whileHover={{ x: 8 }}
                    className="flex gap-5 items-start group cursor-default"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary text-xl group-hover:bg-primary group-hover:text-white transition-all duration-400">
                      <FiCheck />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-lg text-dark mb-1 group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h4>
                      <p className="text-warm-gray text-[15px] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ TEAM SECTION ═══════════════════ */}
      <section id="echipa" className="py-24 md:py-32 bg-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(230,59,46,0.1),transparent_50%)]" />

        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 relative z-10">
          <div className="text-center mb-16">
            <Reveal>
              <span className="inline-block text-primary font-heading font-bold text-sm tracking-[0.2em] uppercase mb-4">
                Echipa Noastră
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-white mb-6">
                Oamenii din Spatele<br /><span className="text-primary">Succesului</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-white/50 text-lg max-w-2xl mx-auto">
                O echipă dedicată, cu experiență vastă în industria materialelor de construcții, 
                pregătită să vă ofere cele mai bune soluții.
              </p>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -12, scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="group cursor-default"
                >
                  <div className="relative rounded-2xl overflow-hidden bg-dark-lighter shadow-lg">
                    {/* Member Image */}
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                      {/* Hover overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent flex items-end justify-center pb-20"
                      >
                        <div className="flex gap-3">
                          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all duration-300">
                            <FiMail className="text-lg" />
                          </div>
                          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all duration-300">
                            <FiPhone className="text-lg" />
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    {/* Name card */}
                    <div className="p-5 text-center bg-dark-lighter group-hover:bg-dark transition-colors duration-500">
                      <h4 className="font-heading font-bold text-lg text-white group-hover:text-primary transition-colors duration-300">
                        {member.name}
                      </h4>
                      <p className="text-white/40 text-sm mt-1 uppercase tracking-wider font-medium">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CONTACT SECTION ═══════════════════ */}
      <section id="contact" className="py-24 md:py-32 bg-cream relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 relative z-10">
          <div className="text-center mb-16">
            <Reveal>
              <span className="inline-block text-primary font-heading font-bold text-sm tracking-[0.2em] uppercase mb-4">
                Contact
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-dark mb-6">
                Hai Să <span className="text-primary">Vorbim</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-warm-gray text-lg max-w-2xl mx-auto">
                Ai un proiect în minte? Contactează-ne pentru o ofertă personalizată sau pentru 
                orice întrebare legată de materialele noastre.
              </p>
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <Reveal direction="left" className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-dark/5">
                <div className="space-y-6">
                  <div>
                    <label className="block text-dark font-heading font-semibold text-sm mb-2">Numele Dvs.</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="ex: Ion Popescu"
                      className="w-full px-5 py-3.5 rounded-xl border-2 border-steel-dark/30 focus:border-primary focus:ring-0 outline-none transition-colors duration-300 text-dark placeholder-warm-gray/50 bg-cream/40"
                    />
                  </div>
                  <div>
                    <label className="block text-dark font-heading font-semibold text-sm mb-2">Adresa de Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ex: ion@email.com"
                      className="w-full px-5 py-3.5 rounded-xl border-2 border-steel-dark/30 focus:border-primary focus:ring-0 outline-none transition-colors duration-300 text-dark placeholder-warm-gray/50 bg-cream/40"
                    />
                  </div>
                  <div>
                    <label className="block text-dark font-heading font-semibold text-sm mb-2">Mesajul Dvs.</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Descrieți proiectul dvs. sau puneți orice întrebare..."
                      className="w-full px-5 py-3.5 rounded-xl border-2 border-steel-dark/30 focus:border-primary focus:ring-0 outline-none transition-colors duration-300 text-dark placeholder-warm-gray/50 bg-cream/40 resize-none"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-heading font-bold text-base py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 flex items-center justify-center gap-3"
                  >
                    {formSent ? (
                      <>
                        <FiCheck className="text-xl" /> Mesaj Trimis cu Succes!
                      </>
                    ) : (
                      <>
                        <FiSend className="text-lg" /> Trimite Mesajul
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </Reveal>

            {/* Contact info */}
            <Reveal direction="right" delay={0.2} className="lg:col-span-2">
              <div className="space-y-6 h-full flex flex-col justify-center">
                {/* Address */}
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary text-xl group-hover:bg-primary group-hover:text-white transition-all duration-400 flex-shrink-0">
                      <FiMapPin />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-dark mb-1">Adresa</h4>
                      <p className="text-warm-gray text-sm leading-relaxed">
                        Str. Fabricii Nr. 42<br />
                        Cluj-Napoca, Jud. Cluj<br />
                        400210, România
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary text-xl group-hover:bg-primary group-hover:text-white transition-all duration-400 flex-shrink-0">
                      <FiPhone />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-dark mb-1">Telefon</h4>
                      <p className="text-warm-gray text-sm">+40 264 123 456</p>
                      <p className="text-warm-gray text-sm">+40 745 678 901</p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary text-xl group-hover:bg-primary group-hover:text-white transition-all duration-400 flex-shrink-0">
                      <FiMail />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-dark mb-1">Email</h4>
                      <p className="text-warm-gray text-sm">contact@betobase.ro</p>
                      <p className="text-warm-gray text-sm">vanzari@betobase.ro</p>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="bg-gradient-to-br from-dark to-dark-lighter rounded-2xl p-6 text-white">
                  <h4 className="font-heading font-bold mb-3">Program de Lucru</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-white/70">
                      <span>Luni – Vineri</span>
                      <span className="text-white font-medium">07:00 – 18:00</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Sâmbătă</span>
                      <span className="text-white font-medium">08:00 – 14:00</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Duminică</span>
                      <span className="text-primary font-medium">Închis</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="bg-dark border-t border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Logo & about */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                  <img src="/logo.png" alt="Beto Base Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <span className="font-heading font-bold text-xl text-white tracking-tight">BETO BASE</span>
                  <span className="block text-[10px] tracking-[0.25em] text-white/40 uppercase -mt-0.5">SRL</span>
                </div>
              </div>
              <p className="text-white/40 text-sm leading-relaxed max-w-sm">
                Furnizor de materiale de construcții premium în Transilvania. 
                Calitate, promptitudine și parteneriat — valorile care ne definesc.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h5 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-5">
                Link-uri Rapide
              </h5>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-white/40 hover:text-primary text-sm transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div>
              <h5 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-5">
                Produse
              </h5>
              <ul className="space-y-3">
                {products.slice(0, 5).map((p, i) => (
                  <li key={i}>
                    <a href="#produse" className="text-white/40 hover:text-primary text-sm transition-colors duration-300">
                      {p.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-sm">
              © 2025 Beto Base SRL. Toate drepturile rezervate.
            </p>
            <p className="text-white/20 text-xs">
              Construit cu 🧡 în Transilvania
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
