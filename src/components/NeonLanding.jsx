import React, { useEffect, useState } from "react";
import { cv } from "../content/cv";
import { motion, useScroll, useTransform } from "framer-motion";

function TypewriterRole({ roles = ["MERN Stack Developer", "Graphic Designer"], speed = 80, pause = 1200 }) {
  const [roleIdx, setRoleIdx] = useState(0);
  const [display, setDisplay] = useState(roles[0].slice(0, 1));
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout;
    const current = roles[roleIdx];
    if (typing) {
      if (display.length < current.length) {
        timeout = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), speed);
      } else {
        timeout = setTimeout(() => setTyping(false), pause);
      }
    } else {
      if (display.length > 0) {
        timeout = setTimeout(() => setDisplay(current.slice(0, display.length - 1)), speed / 1.5);
      } else {
        timeout = setTimeout(() => {
          setRoleIdx((roleIdx + 1) % roles.length);
          setTyping(true);
        }, 400);
      }
    }
    return () => clearTimeout(timeout);
  }, [display, typing, roleIdx, roles, speed, pause]);

  return (
    <span className="text-fuchsia-400 inline-block md:min-w-[450px] lg:min-w-[550px] overflow-hidden whitespace-nowrap">{display}<span className="animate-pulse">|</span></span>
  );
}

export default function NeonLanding() {
  const { scrollYProgress } = useScroll();
  const yMove = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 25]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);

  const [scrollTop, setScrollTop] = useState(0);
  const [showSplash, setShowSplash] = useState(true);
  const [splashExit, setSplashExit] = useState(false);
  // Pre-calculate star positions only once
  const [shootingStars] = useState(() =>
    Array.from({ length: 3 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      x2: Math.random() * window.innerWidth - 100,
      y2: Math.random() * window.innerHeight + 100,
      duration: Math.random() * 6 + 6, // longer duration
    }))
  );
  const [floatingStars] = useState(() =>
    Array.from({ length: 10 }, () => ({
      width: Math.random() * 2 + 1,
      height: Math.random() * 2 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 10 + 8, // longer duration
    }))
  );

  // Email copy fallback if mail client isn't configured
  const [copied, setCopied] = useState(false);
  const handleEmailClick = (e) => {
    // Always keep mailto working
    // Additionally try copying to clipboard as a fallback UX
    try {
      if (navigator?.clipboard && cv.email) {
        navigator.clipboard.writeText(cv.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {}
  };

  useEffect(() => {
    const handleScroll = () => setScrollTop(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSplashExit = () => {
    setSplashExit(true);
    setTimeout(() => setShowSplash(false), 800);
  };

  // Auto-hide splash after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSplashExit();
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: splashExit ? 0 : 1 }}
        transition={{ duration: 0.8 }}
        onClick={handleSplashExit}
        className="fixed inset-0 z-[9999] bg-gradient-to-br from-[#000010] via-[#0a0520] to-[#000] flex items-center justify-center cursor-pointer overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-fuchsia-600/30 to-indigo-600/20 blur-[100px]"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-600/30 blur-[80px]"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full bg-gradient-to-br from-fuchsia-500 to-indigo-500 flex items-center justify-center text-4xl sm:text-6xl font-bold shadow-2xl shadow-fuchsia-500/50">
              {cv.name?.[0] || 'U'}
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
          >
            {cv.name || 'Utkarsh'}
          </motion.h1>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg sm:text-xl text-slate-300 mb-8"
          >
            <TypewriterRole roles={["MERN Stack Developer", "Frontend Developer", "Full Stack Developer"]} speed={100} pause={800} />
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="text-sm sm:text-base text-slate-400 flex items-center justify-center gap-2 animate-pulse"
          >
            <span>Click anywhere to enter</span>
            <span className="text-2xl">→</span>
          </motion.div>

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-fuchsia-400/60"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                repeat: Infinity,
                duration: 3 + i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundPositionY: scrollTop * 0.5 }}
      className="min-h-screen bg-gradient-to-b from-[#000010] via-[#020524] to-[#000] text-white antialiased overflow-x-hidden relative"
    >
      {/* Enhanced Space Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
          transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
          className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"
          style={{ willChange: 'background-position' }}
        />
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 24, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.10),_transparent_70%)] mix-blend-screen"
          style={{ willChange: 'opacity, transform' }}
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 240, ease: "linear" }}
          className="absolute -top-40 left-1/2 w-[900px] h-[900px] rounded-full bg-gradient-to-br from-fuchsia-800/20 to-indigo-800/10 blur-[120px]"
          style={{ willChange: 'transform' }}
        />
        
        {/* Shooting Stars */}
        {shootingStars.map((star, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_4px_#fff]"
            initial={{ x: star.x, y: star.y }}
            animate={{
              x: [star.x, star.x2],
              y: [star.y, star.y2],
              opacity: [0, 0.7, 0],
            }}
            transition={{ duration: star.duration, repeat: Infinity, ease: "easeInOut" }}
            style={{ willChange: 'transform, opacity' }}
          />
        ))}
      </div>

      {/* Floating Stars */}
      {floatingStars.map((star, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white/60"
          style={{
            width: star.width,
            height: star.height,
            top: `${star.top}%`,
            left: `${star.left}%`,
            willChange: 'transform, opacity',
          }}
          animate={{ y: [0, -10, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: star.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-50 backdrop-blur-md bg-[#070e1f]/70 border-b border-fuchsia-700/10 shadow-lg shadow-fuchsia-500/10"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-indigo-500 flex items-center justify-center font-bold text-white text-sm sm:text-base"
          >
            {cv.name?.[0] || 'U'}
          </div>
          <div className="text-base sm:text-lg font-semibold tracking-wide flex items-center gap-1 sm:gap-2">
            <span className="text-sm sm:text-base">{cv.name || 'Utkarsh'}</span>
            <span className="hidden md:inline text-slate-400 text-xs sm:text-sm">— {cv.title || 'Frontend Developer'}</span>
          </div>
        </div>
        <div className="flex gap-4 sm:gap-8 text-xs sm:text-sm opacity-90">
          <a href="#work" className="hover:text-fuchsia-400 transition-colors">Work</a>
          <a href="#services" className="hover:text-fuchsia-400 transition-colors">Services</a>
          <a href="#contact" className="hover:text-fuchsia-400 transition-colors">Contact</a>
        </div>
      </motion.nav>

      {/* HERO SECTION */}
      <header className="max-w-6xl mx-auto px-4 sm:px-6 py-2 sm:py-4 md:py-6">
        <div className="md:min-h-[600px] lg:min-h-[700px] flex flex-col-reverse md:flex-row items-center gap-8 sm:gap-12">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex-1 md:-mt-12 lg:-mt-16"
          >
          <motion.h1
            style={{ y: yMove, rotateY: rotate, scale: scale }}
            className="text-2xl sm:text-4xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight md:min-h-[100px] lg:min-h-[120px]"
          >
            <span className="uppercase">{cv.name || 'Utkarsh'}</span> <span className="hidden sm:inline sm:ml-2">—</span> <span className="block sm:inline mt-2 sm:mt-0"><TypewriterRole roles={[
              "MERN Stack Developer",
              "Frontend Developer",
              "Backend Developer",
              "Full Stack Developer",
              "UI/UX Enthusiast",
              "Graphic Designer"
            ]} /></span>
          </motion.h1>
          <p className="mt-2 sm:mt-3 md:mt-4 text-slate-300 max-w-xl text-base sm:text-lg">
            {cv.summary || 'I craft responsive, high-performance UIs with motion and clean code. Passionate about building fast, beautiful, and accessible web apps.'}
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href={`mailto:${cv.email}`}
              onClick={handleEmailClick}
              className="px-6 py-3 rounded-full bg-fuchsia-500 text-white font-bold shadow-lg shadow-fuchsia-500/60 hover:bg-white hover:text-fuchsia-500 hover:shadow-white/50 hover:scale-105 transform-gpu transition-all duration-300 ring-1 ring-white/10 hover:ring-white/30 antialiased cursor-pointer relative z-20 text-center text-sm sm:text-base"
              style={{ textShadow: '0 0 2px rgba(0,0,0,0.45)', willChange: 'transform' }}
            >
              Hire Me
            </a>
            <a href="#work" className="px-6 py-3 rounded-full border border-slate-700 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer relative z-20 text-center text-sm sm:text-base">View Projects</a>
          </div>

          <div className="mt-8 sm:mt-10 grid grid-cols-3 gap-3 sm:gap-4 max-w-sm">
            <Stat label="Clients" value="20+" />
            <Stat label="Projects" value="50+" />
            <Stat label="Success Rate" value="100%" />
          </div>
        </motion.div>

        {/* Floating 3D Card */}
        <motion.div
          style={{ rotateY: rotate, scale: scale }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex-1 flex justify-center md:justify-end md:pr-8 lg:pr-12 w-full"
        >
          <motion.div
            whileHover={{ rotateY: 25, rotateX: -15, scale: 1.1 }}
            animate={{ y: [0, -10, 0], boxShadow: ["0 0 40px rgba(217,70,239,0.3)", "0 0 80px rgba(139,92,246,0.5)", "0 0 40px rgba(217,70,239,0.3)"] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="relative w-full max-w-sm sm:w-96 h-48 sm:h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-[#08122a] to-[#0b1020] border border-white/10 shadow-2xl transform-gpu"
          >
            <div className="absolute top-2 sm:top-3 left-2 sm:left-3 right-2 sm:right-3 rounded-md p-3 sm:p-4 bg-gradient-to-r from-[#08122a]/60 to-transparent backdrop-blur-sm">
              <div className="h-32 sm:h-40 rounded-md bg-gradient-to-br from-fuchsia-700/30 to-indigo-700/10 p-3 sm:p-4 flex flex-col justify-between">
                <div className="text-xs text-slate-300">Concept · UI Card</div>
                <div className="text-white font-semibold text-base sm:text-lg">3D Interface</div>
                <div className="text-xs sm:text-sm text-slate-400">Smooth motion, light play & futuristic feel</div>
              </div>
            </div>
            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-gradient-to-br from-fuchsia-600/40 to-indigo-600/20 blur-3xl" />
            <div className="absolute -left-16 bottom-0 w-56 h-56 rounded-full bg-gradient-to-br from-cyan-400/10 to-indigo-700/10 blur-3xl" />
          </motion.div>
        </motion.div>
        </div>
      </header>

      <Section id="services" title="Skills & Services">
        {(cv.skills?.frontend?.length || cv.skills?.backend?.length || cv.skills?.tools?.length) ? (
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ rotateY: 10, scale: 1.06, boxShadow: "0px 0px 40px rgba(217, 70, 239, 0.35)" }}
              transition={{ type: "spring", stiffness: 120 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg backdrop-blur-sm transform-gpu hover:border-fuchsia-500/40"
            >
              <h3 className="text-white font-semibold mb-3">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                {(cv.skills.frontend || []).map((s, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-fuchsia-500/20 text-fuchsia-200 text-sm">{s}</span>
                ))}
              </div>
            </motion.div>
            <motion.div
              whileHover={{ rotateY: 10, scale: 1.06, boxShadow: "0px 0px 40px rgba(99, 102, 241, 0.35)" }}
              transition={{ type: "spring", stiffness: 120 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg backdrop-blur-sm transform-gpu hover:border-indigo-500/40"
            >
              <h3 className="text-white font-semibold mb-3">Backend</h3>
              <div className="flex flex-wrap gap-2">
                {(cv.skills.backend || []).map((s, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 text-sm">{s}</span>
                ))}
              </div>
            </motion.div>
            <motion.div
              whileHover={{ rotateY: 10, scale: 1.06, boxShadow: "0px 0px 40px rgba(34, 211, 238, 0.35)" }}
              transition={{ type: "spring", stiffness: 120 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg backdrop-blur-sm transform-gpu hover:border-cyan-400/40"
            >
              <h3 className="text-white font-semibold mb-3">Tools</h3>
              <div className="flex flex-wrap gap-2">
                {(cv.skills.tools || []).map((s, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-200 text-sm">{s}</span>
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          <>
            <Card title="Landing Pages" desc="Visually magnetic sites with immersive motion & dynamic depth." />
            <Card title="3D Web Design" desc="Realistic 3D effects using WebGL, motion & interactive layers." />
            <Card title="UI Systems" desc="Elegant, fast and scalable front‑end components with precision." />
          </>
        )}
      </Section>

      <Section id="work" title="Featured Projects">
        {Array.isArray(cv.projects) && cv.projects.length > 0 ? (
          cv.projects.map((p, idx) => {
            const hoverColors = [
              "rgba(217, 70, 239, 0.6)",   // Fuchsia/Pink
              "rgba(59, 130, 246, 0.6)",   // Blue
              "rgba(34, 197, 94, 0.6)"     // Green
            ];
            const accentHexes = ["#D946EF", "#3B82F6", "#22C55E"]; // match skills accent colors
            return (
              <WorkCard
                key={idx}
                title={p.title}
                tag={p.tag || 'Project'}
                desc={p.desc}
                tech={p.tech}
                live={p.live}
                github={p.github}
                hoverColor={hoverColors[idx % hoverColors.length]}
                accentHex={accentHexes[idx % accentHexes.length]}
              />
            );
          })
        ) : (
          <>
            <WorkCard title="NeonVerse" tag="Portfolio" hoverColor="rgba(217, 70, 239, 0.6)" accentHex="#D946EF" />
            <WorkCard title="Pulse Analytics" tag="Dashboard" hoverColor="rgba(59, 130, 246, 0.6)" accentHex="#3B82F6" />
            <WorkCard title="FlowStore" tag="E‑commerce" hoverColor="rgba(34, 197, 94, 0.6)" accentHex="#22C55E" />
          </>
        )}
      </Section>

      <footer id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 border-t border-white/10 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-3 sm:mb-4">Let's Build Something Legendary</h2>
        <p className="text-slate-300 mb-6 max-w-2xl mx-auto text-sm sm:text-base px-4">
          Available for freelance collaborations & creative ventures — let's create something truly cosmic together.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-wrap items-center justify-center px-4">
          <a
            href={`mailto:${cv.email}`}
            onClick={handleEmailClick}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-fuchsia-500 text-white font-bold shadow-lg shadow-fuchsia-500/60 hover:bg-white hover:text-fuchsia-500 hover:shadow-white/50 hover:scale-105 transform-gpu transition-all antialiased cursor-pointer relative z-20 text-sm sm:text-base"
            style={{ textShadow: '0 0 2px rgba(0,0,0,0.45)', willChange: 'transform' }}
          >
            Email Me
          </a>
          <a href={cv.resumePath} download="Utkarsh_CV.pdf" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-6 py-3 rounded-full border border-slate-700 hover:bg-white/5 transition-all cursor-pointer relative z-20 text-sm sm:text-base">Download CV</a>
          {copied && (
            <span className="text-sm text-slate-400">Email copied ✓</span>
          )}
        </div>
  <div className="mt-8 sm:mt-10 text-xs sm:text-sm text-slate-500 px-4">© {new Date().getFullYear()} {cv.name || 'Utkarsh'} — Designed with passion, powered by cosmic creativity ⚡</div>
      </footer>
    </motion.div>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-indigo-400"
      >
        {title}
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">{children}</div>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-white/5 p-3 sm:p-4 rounded-xl text-center backdrop-blur-sm border border-white/10 hover:scale-110 transition-transform duration-300">
      <div className="text-xl sm:text-2xl font-semibold text-fuchsia-400">{value}</div>
      <div className="text-xs text-slate-300">{label}</div>
    </div>
  );
}

function Card({ title, desc }) {
  return (
    <motion.div
      whileHover={{ rotateY: 10, scale: 1.1, boxShadow: "0px 0px 40px rgba(217, 70, 239, 0.45)" }}
      transition={{ type: "spring", stiffness: 120 }}
      className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 shadow-lg backdrop-blur-sm transform-gpu hover:border-fuchsia-500/40"
    >
      <div className="text-xs sm:text-sm text-slate-400 mb-2">Service</div>
      <div className="font-semibold text-lg sm:text-xl mb-2 text-white">{title}</div>
      <div className="text-slate-400 text-sm leading-relaxed">{desc}</div>
    </motion.div>
  );
}

function WorkCard({ title, tag, desc, tech = [], live, github, hoverColor = "rgba(139, 92, 246, 0.6)", accentHex = "#D946EF" }) {
  return (
    <motion.div
      whileHover={{ rotateY: 10, rotateX: -5, scale: 1.08, boxShadow: `0px 0px 40px ${hoverColor}` }}
      transition={{ type: "spring", stiffness: 120, damping: 10 }}
      className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 shadow-lg backdrop-blur-sm transform-gpu hover:border-fuchsia-500/40"
    >
      <div
        className="rounded-xl p-4 sm:p-5 border"
        style={{ borderColor: accentHex, backgroundColor: hoverColor.replace('0.6', '0.12') }}
      >
        <div className="text-xs sm:text-sm text-slate-300 mb-2">{tag || 'Project'}</div>
        <div className="font-semibold text-lg sm:text-xl mb-2 text-white">{title}</div>
        {desc && <div className="text-slate-300/90 text-sm leading-relaxed">{desc}</div>}
        {tech?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tech.map((t, i) => (
              <span
                key={i}
                className="px-2 py-1 rounded text-xs"
                style={{ backgroundColor: hoverColor.replace('0.6', '0.2'), color: accentHex }}
              >
                {t}
              </span>
            ))}
          </div>
        )}
        {(live || github) && (
          <div className="mt-4 flex gap-4">
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: accentHex }}
              >
                Live
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: accentHex }}
              >
                Code
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
