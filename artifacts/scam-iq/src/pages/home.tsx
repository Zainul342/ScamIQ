import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Mail,
  MessageSquare,
  Phone,
  Smartphone,
  Globe,
  ChevronLeft,
  ChevronRight,
  Zap,
  Brain,
  Target,
  TrendingUp,
  Award,
  BookOpen,
} from "lucide-react";
import { useRef, useState } from "react";

const SCAM_TYPES = [
  { icon: MessageSquare, label: "SMS", color: "#58cc02" },
  { icon: Mail, label: "EMAIL", color: "#1cb0f6" },
  { icon: Phone, label: "VOICE CALL", color: "#ff9600" },
  { icon: Smartphone, label: "WHATSAPP", color: "#58cc02" },
  { icon: Globe, label: "WEBSITE", color: "#ce82ff" },
  { icon: ShieldAlert, label: "PHISHING", color: "#ff4b4b" },
];

const FEATURES = [
  {
    title: "free. fun. effective.",
    description:
      "Learning to spot scams with ScamIQ is fun, and it works! With quick, bite-sized scenarios, you'll earn points and level up your threat detection skills.",
    icon: Zap,
    iconBg: "#fff0db",
    iconColor: "#ff9600",
    reverse: false,
  },
  {
    title: "backed by real data",
    description:
      "We use real-world scam patterns and the latest AI to generate realistic scenarios — from phishing emails to fake delivery texts and voice scams.",
    icon: Brain,
    iconBg: "#ddf4ff",
    iconColor: "#1cb0f6",
    reverse: true,
  },
  {
    title: "stay motivated",
    description:
      "Game-like features, streaks, and a personal ScamIQ score keep you engaged. Challenge friends and see who's the most scam-proof!",
    icon: Target,
    iconBg: "#e5f8e0",
    iconColor: "#58cc02",
    reverse: false,
  },
  {
    title: "personalized learning",
    description:
      "AI adapts scenarios to your weak spots. Struggle with phishing links? You'll see more of those until you master them.",
    icon: TrendingUp,
    iconBg: "#f3e5ff",
    iconColor: "#ce82ff",
    reverse: true,
  },
];

export default function Home() {
  const [, setLocation] = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  function handleStart() {
    setLocation("/game");
  }

  function handleScroll() {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }

  function scrollCarousel(dir: "left" | "right") {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -200 : 200,
      behavior: "smooth",
    });
  }

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: "#fff",
        color: "#3c3c3c",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      {/* ── NAVBAR ── */}
      <nav
        className="w-full border-b flex items-center justify-between px-6 py-3"
        style={{ borderColor: "#e5e5e5" }}
      >
        <div className="flex items-center gap-2">
          <Shield className="w-8 h-8" style={{ color: "#58cc02" }} />
          <span
            className="font-black text-2xl tracking-tight"
            style={{ color: "#58cc02" }}
          >
            scamIQ
          </span>
        </div>
        <button
          className="text-sm font-bold uppercase tracking-wider"
          style={{ color: "#afafaf" }}
        >
          Site language: English
        </button>
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="w-full max-w-5xl mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center gap-8 md:gap-16">
        {/* Left — illustration area */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex items-center justify-center"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
            {/* Background circles */}
            <div
              className="absolute w-full h-full rounded-full opacity-10"
              style={{ background: "#58cc02" }}
            />
            <div
              className="absolute w-3/4 h-3/4 rounded-full opacity-15"
              style={{ background: "#1cb0f6" }}
            />
            {/* Central shield */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <ShieldCheck
                className="w-32 h-32 md:w-40 md:h-40"
                style={{ color: "#58cc02" }}
                strokeWidth={1.5}
              />
            </motion.div>
            {/* Floating icons */}
            <motion.div
              className="absolute top-4 right-4"
              animate={{ y: [0, -6, 0], rotate: [0, 10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <Mail
                className="w-10 h-10"
                style={{ color: "#ff4b4b" }}
                strokeWidth={2}
              />
            </motion.div>
            <motion.div
              className="absolute bottom-8 left-2"
              animate={{ y: [0, -5, 0], rotate: [0, -8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 3.5,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <MessageSquare
                className="w-9 h-9"
                style={{ color: "#ff9600" }}
                strokeWidth={2}
              />
            </motion.div>
            <motion.div
              className="absolute top-10 left-6"
              animate={{ y: [0, -7, 0] }}
              transition={{
                repeat: Infinity,
                duration: 3.8,
                ease: "easeInOut",
                delay: 0.3,
              }}
            >
              <Phone
                className="w-8 h-8"
                style={{ color: "#1cb0f6" }}
                strokeWidth={2}
              />
            </motion.div>
            <motion.div
              className="absolute bottom-4 right-8"
              animate={{ y: [0, -6, 0], rotate: [0, 5, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4.2,
                ease: "easeInOut",
                delay: 0.7,
              }}
            >
              <Globe
                className="w-8 h-8"
                style={{ color: "#ce82ff" }}
                strokeWidth={2}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Right — text + CTA */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 flex flex-col items-center md:items-start gap-6 text-center md:text-left"
        >
          <h1
            className="font-extrabold text-3xl md:text-4xl leading-tight"
            style={{ color: "#3c3c3c" }}
          >
            The free, fun, and effective way to learn{" "}
            <span style={{ color: "#58cc02" }}>scam detection!</span>
          </h1>

          <div className="flex flex-col gap-3 w-full max-w-xs">
            <button
              onClick={handleStart}
              id="btn-get-started"
              className="duo-btn duo-btn-primary w-full py-4 text-base"
            >
              Get Started
            </button>
            <button
              id="btn-how-it-works"
              className="duo-btn duo-btn-secondary w-full py-4 text-base"
              onClick={() => {
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              How it works
            </button>
          </div>
        </motion.div>
      </section>

      {/* ── SCAM TYPES CAROUSEL ── */}
      <div
        className="w-full border-t border-b py-4 relative"
        style={{ borderColor: "#e5e5e5", background: "#fafafa" }}
      >
        <div className="max-w-4xl mx-auto relative px-10">
          {/* Left arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scrollCarousel("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "#e5e5e5" }}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" style={{ color: "#afafaf" }} />
            </button>
          )}

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex items-center gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {SCAM_TYPES.map((type) => (
              <div
                key={type.label}
                className="flex items-center gap-2 shrink-0 cursor-default select-none px-2"
              >
                <type.icon
                  className="w-5 h-5"
                  style={{ color: type.color }}
                />
                <span
                  className="text-sm font-extrabold uppercase tracking-wider"
                  style={{ color: "#777" }}
                >
                  {type.label}
                </span>
              </div>
            ))}
          </div>

          {/* Right arrow */}
          {canScrollRight && (
            <button
              onClick={() => scrollCarousel("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "#e5e5e5" }}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" style={{ color: "#afafaf" }} />
            </button>
          )}
        </div>
      </div>

      {/* ── FEATURES SECTIONS ── */}
      <div id="features" className="w-full">
        {FEATURES.map((feature, i) => (
          <section
            key={feature.title}
            className={`w-full max-w-5xl mx-auto px-6 py-16 md:py-24 flex flex-col ${
              feature.reverse ? "md:flex-row-reverse" : "md:flex-row"
            } items-center gap-10 md:gap-20`}
          >
            {/* Icon / illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex-1 flex items-center justify-center"
            >
              <div
                className="w-40 h-40 md:w-52 md:h-52 rounded-full flex items-center justify-center"
                style={{ background: feature.iconBg }}
              >
                <feature.icon
                  className="w-20 h-20 md:w-28 md:h-28"
                  style={{ color: feature.iconColor }}
                  strokeWidth={1.5}
                />
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
              className="flex-1 text-center md:text-left"
            >
              <h2
                className="font-black text-2xl md:text-3xl mb-4"
                style={{ color: "#3c3c3c" }}
              >
                {feature.title}
              </h2>
              <p
                className="text-base md:text-lg leading-relaxed"
                style={{ color: "#777" }}
              >
                {feature.description}
              </p>
            </motion.div>
          </section>
        ))}
      </div>

      {/* ── BOTTOM CTA ── */}
      <section
        className="w-full py-20 flex flex-col items-center gap-6"
        style={{ background: "#58cc02" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex items-center gap-3">
            <Award className="w-10 h-10 text-white" strokeWidth={2} />
            <BookOpen className="w-10 h-10 text-white" strokeWidth={2} />
          </div>
          <h2
            className="font-black text-3xl md:text-4xl text-center leading-tight"
            style={{ color: "#fff" }}
          >
            learn scam detection
            <br />
            with scamIQ
          </h2>
          <button
            onClick={handleStart}
            id="btn-bottom-cta"
            className="duo-btn w-64 py-4 text-base font-extrabold uppercase tracking-wide rounded-2xl"
            style={{
              background: "#fff",
              color: "#58cc02",
              borderColor: "#e5e5e5",
              borderBottomWidth: "6px",
              borderBottomColor: "#e5e5e5",
            }}
          >
            Get Started
          </button>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="w-full border-t px-6 py-8"
        style={{ borderColor: "#e5e5e5", background: "#fff" }}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" style={{ color: "#58cc02" }} />
            <span className="font-black text-lg" style={{ color: "#58cc02" }}>
              scamIQ
            </span>
          </div>
          <p className="text-sm" style={{ color: "#afafaf" }}>
            Built for the Replit 10 Year Buildathon · 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
