import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  Shield, ShieldCheck, ShieldAlert, Mail, MessageSquare, Phone,
  Smartphone, Globe, Zap, Brain, Target, TrendingUp, Award,
  BookOpen, Sparkles, Users, CheckCircle2, ArrowRight,
  Twitter, Github, ChevronRight,
} from "lucide-react";
import { useState } from "react";

/* ── DATA ── */
const SCAM_TYPES = [
  { icon: MessageSquare, label: "SMS Scams", desc: "Fake delivery, banking, and prize texts that trick you into clicking malicious links.", color: "#58cc02", bg: "#e5f8e0" },
  { icon: Mail, label: "Email Phishing", desc: "Spoofed emails from 'trusted' brands asking for your credentials or payment info.", color: "#1cb0f6", bg: "#ddf4ff" },
  { icon: Phone, label: "Voice Scams", desc: "AI-generated voice calls impersonating banks, government, or family members.", color: "#ff9600", bg: "#fff0db" },
  { icon: Smartphone, label: "WhatsApp Fraud", desc: "Social engineering via messaging apps — fake job offers, romance scams, and more.", color: "#58cc02", bg: "#e5f8e0" },
  { icon: Globe, label: "Fake Websites", desc: "Pixel-perfect clones of login pages designed to steal your passwords.", color: "#ce82ff", bg: "#f3e5ff" },
  { icon: ShieldAlert, label: "Deepfake Attacks", desc: "AI-powered impersonation using cloned voices and synthetic video.", color: "#ff4b4b", bg: "#ffdfe0" },
];

const FEATURES = [
  { title: "free. fun. effective.", desc: "Learning to spot scams with ScamIQ is fun, and it works! With quick, bite-sized scenarios, you'll earn points and level up your threat detection skills.", icon: Zap, iconBg: "#fff0db", iconColor: "#ff9600", reverse: false },
  { title: "backed by real data", desc: "We use real-world scam patterns and the latest AI to generate realistic scenarios — from phishing emails to fake delivery texts and voice scams.", icon: Brain, iconBg: "#ddf4ff", iconColor: "#1cb0f6", reverse: true },
  { title: "stay motivated", desc: "Game-like features, streaks, and a personal ScamIQ score keep you engaged. Challenge friends and see who's the most scam-proof!", icon: Target, iconBg: "#e5f8e0", iconColor: "#58cc02", reverse: false },
  { title: "personalized learning", desc: "AI adapts scenarios to your weak spots. Struggle with phishing links? You'll see more of those until you master them.", icon: TrendingUp, iconBg: "#f3e5ff", iconColor: "#ce82ff", reverse: true },
];

const STEPS = [
  { num: 1, title: "Read the Message", desc: "You'll see realistic texts, emails, and DMs pulled from real-world scam patterns.", color: "#1cb0f6", icon: Mail },
  { num: 2, title: "Make Your Call", desc: "Tap Safe, Suspicious, or Scam. Trust your instincts — but be careful!", color: "#ff9600", icon: Target },
  { num: 3, title: "Learn & Level Up", desc: "Get instant feedback with red-flag breakdowns and personalized AI coaching.", color: "#58cc02", icon: Sparkles },
];

const STATS = [
  { value: "6", label: "Scam Types", color: "#fff" },
  { value: "100%", label: "Free Forever", color: "#fff" },
  { value: "AI", label: "Powered Coaching", color: "#fff" },
];

const S = { white: "#fff", dark: "#3c3c3c", gray: "#777", lightGray: "#afafaf", border: "#e5e5e5", bg: "#f7f7f7", green: "#58cc02", greenDark: "#58a700", blue: "#1cb0f6", font: "'Nunito', sans-serif" } as const;

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" } };

export default function Home() {
  const [, setLocation] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (path: string) => setLocation(path);
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen w-full" style={{ background: S.white, color: S.dark, fontFamily: S.font }}>

      {/* ══════════════════════════════════════════
          S1: NAVBAR
      ══════════════════════════════════════════ */}
      <nav className="w-full border-b sticky top-0 z-50 backdrop-blur-md" style={{ borderColor: S.border, background: "rgba(255,255,255,0.95)" }}>
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo("hero")}>
            <img src="/images/logo.png" alt="ScamIQ Logo" className="w-10 h-10 object-contain" />
            <span className="font-black text-2xl tracking-tight" style={{ color: S.green }}>scamIQ</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollTo("how-it-works")} className="text-sm font-bold hover:opacity-70 transition" style={{ color: S.gray }}>How it Works</button>
            <button onClick={() => scrollTo("scam-types")} className="text-sm font-bold hover:opacity-70 transition" style={{ color: S.gray }}>Scam Types</button>
            <button onClick={() => scrollTo("about")} className="text-sm font-bold hover:opacity-70 transition" style={{ color: S.gray }}>About</button>
            <button onClick={() => go("/game")} className="duo-btn duo-btn-primary px-6 py-2 text-sm">Play Now</button>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <div className="flex flex-col gap-1">
              <span className="w-6 h-0.5 rounded" style={{ background: S.gray }} />
              <span className="w-6 h-0.5 rounded" style={{ background: S.gray }} />
              <span className="w-6 h-0.5 rounded" style={{ background: S.gray }} />
            </div>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t px-6 py-4 flex flex-col gap-3" style={{ borderColor: S.border, background: S.white }}>
            <button onClick={() => { scrollTo("how-it-works"); setMenuOpen(false); }} className="text-sm font-bold text-left" style={{ color: S.gray }}>How it Works</button>
            <button onClick={() => { scrollTo("scam-types"); setMenuOpen(false); }} className="text-sm font-bold text-left" style={{ color: S.gray }}>Scam Types</button>
            <button onClick={() => { scrollTo("about"); setMenuOpen(false); }} className="text-sm font-bold text-left" style={{ color: S.gray }}>About</button>
            <button onClick={() => go("/game")} className="duo-btn duo-btn-primary py-3 text-sm mt-2">Play Now</button>
          </div>
        )}
      </nav>

      {/* ══════════════════════════════════════════
          S2: HERO
      ══════════════════════════════════════════ */}
      <section id="hero" className="w-full max-w-6xl mx-auto px-6 py-16 md:py-28 flex flex-col md:flex-row items-center gap-10 md:gap-20">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex-1 flex items-center justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
            <div className="absolute w-full h-full rounded-full opacity-10" style={{ background: S.green }} />
            <div className="absolute w-3/4 h-3/4 rounded-full opacity-15" style={{ background: S.blue }} />
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}>
              <ShieldCheck className="w-32 h-32 md:w-40 md:h-40" style={{ color: S.green }} strokeWidth={1.5} />
            </motion.div>
            <motion.div className="absolute top-4 right-4" animate={{ y: [0, -6, 0], rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}>
              <Mail className="w-10 h-10" style={{ color: "#ff4b4b" }} strokeWidth={2} />
            </motion.div>
            <motion.div className="absolute bottom-8 left-2" animate={{ y: [0, -5, 0], rotate: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3.5, delay: 1 }}>
              <MessageSquare className="w-9 h-9" style={{ color: "#ff9600" }} strokeWidth={2} />
            </motion.div>
            <motion.div className="absolute top-10 left-6" animate={{ y: [0, -7, 0] }} transition={{ repeat: Infinity, duration: 3.8, delay: 0.3 }}>
              <Phone className="w-8 h-8" style={{ color: S.blue }} strokeWidth={2} />
            </motion.div>
            <motion.div className="absolute bottom-4 right-8" animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 4.2, delay: 0.7 }}>
              <Globe className="w-8 h-8" style={{ color: "#ce82ff" }} strokeWidth={2} />
            </motion.div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex-1 flex flex-col items-center md:items-start gap-6 text-center md:text-left">
          <h1 className="font-extrabold text-3xl md:text-5xl leading-tight" style={{ color: S.dark }}>
            The free, fun, and effective way to learn <span style={{ color: S.green }}>scam detection!</span>
          </h1>
          <p className="text-base md:text-lg leading-relaxed max-w-md" style={{ color: S.gray }}>
            8 realistic rounds. AI-powered coaching. One score that shows how scam-proof you really are.
          </p>
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <button onClick={() => go("/game")} id="btn-get-started" className="duo-btn duo-btn-primary w-full py-4 text-base">Get Started</button>
            <button onClick={() => scrollTo("how-it-works")} id="btn-how" className="duo-btn duo-btn-secondary w-full py-4 text-base">How it works</button>
          </div>
          <div className="flex flex-wrap gap-3 mt-2">
            {[
              { icon: Shield, text: "6 Scam Types" },
              { icon: Zap, text: "8 Rounds" },
              { icon: Sparkles, text: "AI Coaching" },
            ].map(b => (
              <span key={b.text} className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: S.bg, color: S.gray, border: `1px solid ${S.border}` }}>
                <b.icon className="w-3.5 h-3.5" style={{ color: S.green }} />{b.text}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          S3: DEMO PREVIEW
      ══════════════════════════════════════════ */}
      <section className="w-full py-16" style={{ background: S.bg }}>
        <motion.div {...fadeUp} className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center gap-8">
          <h2 className="font-black text-2xl md:text-3xl" style={{ color: S.dark }}>Can you spot the scam?</h2>
          <p className="text-base max-w-lg" style={{ color: S.gray }}>Here's what a real round looks like. You'll see messages that could be safe — or dangerously deceptive.</p>
          {/* Phone mockup */}
          <div className="relative w-72 md:w-80">
            <div className="rounded-[2.5rem] p-3" style={{ background: "#1a1a2e", border: "3px solid #333" }}>
              <div className="rounded-[2rem] overflow-hidden" style={{ background: S.white }}>
                {/* Fake game header */}
                <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: `1px solid ${S.border}` }}>
                  <div className="w-6 h-6 rounded-full" style={{ background: "#e5e5e5" }} />
                  <div className="flex-1 h-3 rounded-full" style={{ background: `linear-gradient(90deg, ${S.green} 60%, ${S.border} 60%)` }} />
                  <span className="text-[10px] font-bold" style={{ color: S.lightGray }}>4/8</span>
                </div>
                {/* Fake SMS bubble */}
                <div className="p-4">
                  <div className="text-[10px] font-bold mb-2" style={{ color: S.lightGray }}>ROUND 4 OF 8</div>
                  <div className="rounded-xl p-3 mb-3" style={{ background: S.bg, border: `1px solid ${S.border}` }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-black text-white" style={{ background: "#ff4b4b" }}>B</div>
                      <span className="text-[10px] font-bold" style={{ color: S.dark }}>BankAlert</span>
                    </div>
                    <p className="text-[10px] leading-relaxed" style={{ color: S.dark }}>
                      ⚠️ Your account has been compromised! Verify your identity immediately at secure-bank-verify.com or your account will be frozen within 24hrs.
                    </p>
                  </div>
                  {/* Fake buttons */}
                  <div className="flex flex-col gap-1.5">
                    {[{ l: "SAFE", c: S.green }, { l: "SUSPICIOUS", c: "#ffc800" }, { l: "SCAM", c: "#ff4b4b" }].map(b => (
                      <div key={b.l} className="rounded-xl py-2 text-center text-[10px] font-black" style={{ border: `2px solid ${b.c}`, borderBottomWidth: "4px", color: b.c }}>{b.l}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button onClick={() => go("/game")} className="duo-btn duo-btn-primary px-10 py-4 text-base">
            Try it Yourself <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          S4: HOW IT WORKS
      ══════════════════════════════════════════ */}
      <section id="how-it-works" className="w-full max-w-5xl mx-auto px-6 py-20">
        <motion.div {...fadeUp} className="text-center mb-12">
          <h2 className="font-black text-2xl md:text-3xl mb-3" style={{ color: S.dark }}>How ScamIQ Works</h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: S.gray }}>Three simple steps to become scam-proof.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <motion.div key={step.num} {...fadeUp} transition={{ delay: i * 0.15 }} className="step-card rounded-2xl" style={{ background: S.white, border: `2px solid ${S.border}`, borderBottomWidth: "4px" }}>
              <div className="step-number" style={{ background: step.color }}>{step.num}</div>
              <step.icon className="w-10 h-10" style={{ color: step.color }} />
              <h3 className="font-black text-lg" style={{ color: S.dark }}>{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: S.gray }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          S5: FEATURE SECTIONS (Alternating)
      ══════════════════════════════════════════ */}
      <div id="features" className="w-full" style={{ background: S.bg }}>
        {FEATURES.map((f, i) => (
          <section key={f.title} className={`w-full max-w-5xl mx-auto px-6 py-16 md:py-24 flex flex-col ${f.reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-10 md:gap-20`}>
            <motion.div {...fadeUp} transition={{ delay: i * 0.1 }} className="flex-1 flex items-center justify-center">
              <div className="w-40 h-40 md:w-52 md:h-52 rounded-full flex items-center justify-center" style={{ background: f.iconBg }}>
                <f.icon className="w-20 h-20 md:w-28 md:h-28" style={{ color: f.iconColor }} strokeWidth={1.5} />
              </div>
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: i * 0.1 + 0.2 }} className="flex-1 text-center md:text-left">
              <h2 className="font-black text-2xl md:text-3xl mb-4" style={{ color: S.dark }}>{f.title}</h2>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: S.gray }}>{f.desc}</p>
            </motion.div>
          </section>
        ))}
      </div>

      {/* ══════════════════════════════════════════
          S6: STATS BAND
      ══════════════════════════════════════════ */}
      <section className="w-full py-16" style={{ background: S.blue }}>
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-6">
          {STATS.map(s => (
            <motion.div key={s.label} {...fadeUp} className="stat-item">
              <span className="text-5xl md:text-6xl font-black" style={{ color: S.white }}>{s.value}</span>
              <span className="text-sm md:text-base font-bold mt-1" style={{ color: "rgba(255,255,255,0.8)" }}>{s.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          S7: SCAM TYPES GRID
      ══════════════════════════════════════════ */}
      <section id="scam-types" className="w-full max-w-5xl mx-auto px-6 py-20">
        <motion.div {...fadeUp} className="text-center mb-12">
          <h2 className="font-black text-2xl md:text-3xl mb-3" style={{ color: S.dark }}>6 Scam Types. 1 Game.</h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: S.gray }}>Master them all to become a Human Firewall.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {SCAM_TYPES.map((scam, i) => (
            <motion.div key={scam.label} {...fadeUp} transition={{ delay: i * 0.08 }} className="scam-type-card">
              <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: scam.bg }}>
                <scam.icon className="w-7 h-7" style={{ color: scam.color }} />
              </div>
              <h3 className="font-black text-base" style={{ color: S.dark }}>{scam.label}</h3>
              <p className="text-xs leading-relaxed" style={{ color: S.gray }}>{scam.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          S8: ABOUT / MISSION
      ══════════════════════════════════════════ */}
      <section id="about" className="w-full py-20" style={{ background: S.bg }}>
        <motion.div {...fadeUp} className="max-w-3xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Award className="w-8 h-8" style={{ color: S.green }} />
            <BookOpen className="w-8 h-8" style={{ color: S.blue }} />
          </div>
          <h2 className="font-black text-2xl md:text-3xl mb-4" style={{ color: S.dark }}>Our Mission</h2>
          <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: S.gray }}>
            ScamIQ was built for the <strong style={{ color: S.dark }}>Replit 10-Year Buildathon 2026</strong>. We believe everyone deserves to be protected from online threats — and the best protection is education. Our AI-powered game turns scam awareness into an engaging, memorable experience.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: Users, text: "Community Driven" },
              { icon: Sparkles, text: "AI-Powered" },
              { icon: Shield, text: "Privacy First" },
            ].map(b => (
              <span key={b.text} className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl" style={{ background: S.white, border: `2px solid ${S.border}`, borderBottomWidth: "4px", color: S.dark }}>
                <b.icon className="w-4 h-4" style={{ color: S.green }} />{b.text}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          S9: BOTTOM CTA
      ══════════════════════════════════════════ */}
      <section className="w-full py-20 flex flex-col items-center gap-6" style={{ background: S.green }}>
        <motion.div {...fadeUp} className="flex flex-col items-center gap-6">
          <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}>
            <ShieldCheck className="w-16 h-16" style={{ color: S.white }} strokeWidth={1.5} />
          </motion.div>
          <h2 className="font-black text-3xl md:text-4xl text-center leading-tight" style={{ color: S.white }}>
            learn scam detection<br />with scamIQ
          </h2>
          <button onClick={() => go("/game")} id="btn-bottom-cta" className="duo-btn w-64 py-4 text-base font-extrabold uppercase rounded-2xl" style={{ background: S.white, color: S.green, borderColor: S.border, borderBottomWidth: "6px", borderBottomColor: "#e5e5e5" }}>
            Get Started
          </button>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          S10: FOOTER
      ══════════════════════════════════════════ */}
      <footer className="w-full border-t px-6 py-12" style={{ borderColor: S.border, background: S.white }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/images/logo.png" alt="ScamIQ Logo" className="w-8 h-8 object-contain" />
              <span className="font-black text-lg" style={{ color: S.green }}>scamIQ</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: S.lightGray }}>The free, fun way to learn scam detection. Powered by AI.</p>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: S.dark }}>Product</h4>
            <div className="flex flex-col gap-2">
              <button onClick={() => go("/game")} className="text-sm text-left hover:underline" style={{ color: S.gray }}>Play Game</button>
              <button onClick={() => scrollTo("how-it-works")} className="text-sm text-left hover:underline" style={{ color: S.gray }}>How it Works</button>
              <button onClick={() => scrollTo("scam-types")} className="text-sm text-left hover:underline" style={{ color: S.gray }}>Scam Types</button>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: S.dark }}>Resources</h4>
            <div className="flex flex-col gap-2">
              <button onClick={() => scrollTo("features")} className="text-sm text-left hover:underline" style={{ color: S.gray }}>Features</button>
              <button onClick={() => scrollTo("about")} className="text-sm text-left hover:underline" style={{ color: S.gray }}>About Us</button>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: S.dark }}>Connect</h4>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: S.bg, border: `1px solid ${S.border}` }}>
                <Twitter className="w-4 h-4" style={{ color: S.gray }} />
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: S.bg, border: `1px solid ${S.border}` }}>
                <Github className="w-4 h-4" style={{ color: S.gray }} />
              </div>
            </div>
          </div>
        </div>
        <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-3" style={{ borderColor: S.border }}>
          <p className="text-xs" style={{ color: S.lightGray }}>© 2026 ScamIQ. Built for the Replit 10-Year Buildathon.</p>
          <p className="text-xs" style={{ color: S.lightGray }}>Made with ❤️ and AI</p>
        </div>
      </footer>
    </div>
  );
}
