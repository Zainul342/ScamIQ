import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, CheckCircle2, XCircle, ChevronRight, Flame, Users, AlertTriangle, TrendingUp } from "lucide-react";

const DEMO_SCENARIO = {
  type: "sms",
  sender: "USPS Delivery",
  senderNumber: "+1 (800) 555-0199",
  message:
    "USPS: Your package cannot be delivered due to an incomplete address. Update your details within 24 hrs or the package will be returned: https://usps-delivery-update.net/track",
  correctAnswer: "scam",
  redFlags: ["Fake domain (not usps.com)", "24-hr pressure tactic", "Unsolicited link"],
  explanation: "Real USPS never sends links via SMS. The domain 'usps-delivery-update.net' is a phishing site designed to steal your info.",
};

// Global Threat Level data — simulated weekly feed
const THREAT_DATA = {
  level: "HIGH",
  levelColor: "#FF4D6D",
  topThreat: "SMS Delivery Fraud",
  topThreatChange: "+34% this week",
  topThreatIcon: "sms",
  activeScams: [
    { label: "SMS Delivery Scams", bar: 88, color: "#FF4D6D" },
    { label: "AI Voice Impersonation", bar: 74, color: "#FBBF24" },
    { label: "Fake Login Pages", bar: 61, color: "#FB923C" },
  ],
};

type AnswerState = "idle" | "correct" | "wrong";

// Simulated live counter — starts near a base and ticks up slowly
function useLiveCounter(base: number) {
  const [count, setCount] = useState(base);
  const ref = useRef(base);

  useEffect(() => {
    const tick = () => {
      const increment = Math.floor(Math.random() * 3) + 1;
      ref.current += increment;
      setCount(ref.current);
    };
    const id = setInterval(tick, 3500 + Math.random() * 2000);
    return () => clearInterval(id);
  }, []);

  return count;
}

export default function Home() {
  const [, setLocation] = useLocation();
  const [selected, setSelected] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>("idle");
  const liveCount = useLiveCounter(12847);

  function handleAnswer(answer: string) {
    if (selected) return;
    setSelected(answer);
    setAnswerState(answer === DEMO_SCENARIO.correctAnswer ? "correct" : "wrong");
  }

  function handleStart() {
    setLocation("/game");
  }

  const answered = answerState !== "idle";

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center bg-background overflow-hidden relative px-4 py-8 scanlines">
      {/* arcade background grid */}
      <div className="absolute inset-0 arcade-grid opacity-20 pointer-events-none" />
      
      {/* ambient glows */}
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[280px] bg-primary/8 blur-[120px] rounded-full" />
      <div className="pointer-events-none fixed bottom-0 right-1/4 w-[400px] h-[280px] bg-danger/5 blur-[120px] rounded-full" />

      <div className="w-full max-w-md mx-auto flex flex-col gap-4 z-10">

        {/* ── TOP BAR ── */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
            <span className="font-heading font-black text-xl tracking-tight">
              Scam<span className="text-primary glow-text-primary">IQ</span>
            </span>
          </div>
          <motion.div
            key={liveCount}
            initial={{ scale: 1.15, color: "#34D399" }}
            animate={{ scale: 1, color: "#94A3B8" }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-1.5 text-xs text-muted-foreground bg-card/50 backdrop-blur-sm border border-border rounded-full px-3 py-1.5"
          >
            <Users className="w-3.5 h-3.5 text-success" />
            <span>{liveCount.toLocaleString()} tested today</span>
          </motion.div>
        </div>

        {/* ── GLOBAL THREAT LEVEL BANNER ── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-danger/25 bg-danger/8 px-4 py-3"
        >
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-danger" />
              <span className="text-xs font-black uppercase tracking-widest text-danger">
                Global Threat Level: {THREAT_DATA.level}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-warning font-semibold">
              <TrendingUp className="w-3 h-3" />
              <span>{THREAT_DATA.topThreatChange}</span>
            </div>
          </div>
          <div className="space-y-1.5">
            {THREAT_DATA.activeScams.map((scam) => (
              <div key={scam.label} className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-36 shrink-0">{scam.label}</span>
                <div className="flex-1 h-1.5 bg-card rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${scam.bar}%` }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="h-full rounded-full"
                    style={{ background: scam.color }}
                  />
                </div>
                <span className="text-xs font-mono text-muted-foreground w-8 text-right">{scam.bar}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── HOOK LINE ── */}
        <div className="text-center py-1">
          <h1 className="font-heading font-black text-4xl md:text-5xl leading-tight text-foreground mb-2">
            Can you spot<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent glow-text-primary">
              the scam?
            </span>
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            <span className="text-warning font-semibold">73% of people</span> fail this first test.
          </p>
        </div>

        {/* ── ROUND INDICATOR ── */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            Round 1 of 8
          </span>
          <div className="flex-1 h-2 bg-card rounded-full border border-border overflow-hidden">
            <div className="h-full w-[12.5%] bg-primary rounded-full shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-warning">
            <Flame className="w-3.5 h-3.5" />
            <span>0</span>
          </div>
        </div>

        {/* ── SMS SCENARIO CARD ── */}
        <motion.div
          animate={answerState === "wrong" ? { x: [0, -10, 10, -8, 8, -4, 4, 0] } : {}}
          transition={{ duration: 0.4 }}
          className={`rounded-2xl border-2 overflow-hidden transition-all duration-300 arcade-card ${
            answerState === "correct"
              ? "border-success shadow-[0_0_32px_-4px_rgba(52,211,153,0.5)]"
              : answerState === "wrong"
              ? "border-destructive shadow-[0_0_32px_-4px_rgba(255,77,109,0.4)]"
              : "border-border"
          }`}
          id="demo-scenario-card"
        >
          {/* Card header */}
          <div className="bg-card px-4 py-3 border-b border-border flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-0.5">SMS Message</p>
              <p className="text-sm font-semibold text-foreground">{DEMO_SCENARIO.sender}</p>
              <p className="text-xs text-muted-foreground">{DEMO_SCENARIO.senderNumber}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-muted-foreground border border-border">
              U
            </div>
          </div>

          {/* SMS bubble */}
          <div className="bg-background px-4 py-4">
            <div className="bg-[#1E2A3A] border border-slate-700/50 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[90%] relative shadow-sm">
              <p className="text-sm text-foreground leading-relaxed">{DEMO_SCENARIO.message}</p>
              <p className="text-right text-xs text-muted-foreground mt-1">10:42 AM</p>
            </div>
          </div>

          {/* FEEDBACK OVERLAY */}
          <AnimatePresence>
            {answered && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mx-4 mb-4 rounded-xl p-4 border ${
                  answerState === "correct"
                    ? "bg-success/10 border-success/30"
                    : "bg-destructive/10 border-destructive/30"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {answerState === "correct" ? (
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                  )}
                  <span
                    className={`font-heading font-bold text-base ${
                      answerState === "correct" ? "text-success" : "text-destructive"
                    }`}
                  >
                    {answerState === "correct" ? "Correct!" : "This is a Scam"}
                  </span>
                  {answerState === "correct" && (
                    <span className="ml-auto text-xs font-mono font-bold text-success bg-success/20 px-2 py-0.5 rounded-full">+100 pts</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {DEMO_SCENARIO.redFlags.map((flag) => (
                    <span
                      key={flag}
                      className="text-xs px-2.5 py-1 rounded-full bg-destructive/20 text-destructive border border-destructive/30 font-medium"
                    >
                      {flag}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{DEMO_SCENARIO.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── ANSWER BUTTONS / POST-ANSWER CTA ── */}
        <AnimatePresence mode="wait">
          {!answered ? (
            <motion.div
              key="answers"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex flex-col gap-3"
            >
              <p className="text-center text-sm text-muted-foreground font-medium">What is this message?</p>
              <div className="grid grid-cols-3 gap-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer("safe")}
                  id="btn-safe"
                  className="relative flex flex-col items-center gap-1.5 py-4 px-2 rounded-2xl bg-card border-2 border-success/30 hover:border-success hover:bg-success/10 transition-all min-h-[70px] font-bold text-success text-sm shadow-[0_4px_0_0_rgba(52,211,153,0.2)] active:translate-y-1 active:shadow-none"
                >
                  <Shield className="w-5 h-5" />
                  Safe
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer("suspicious")}
                  id="btn-suspicious"
                  className="relative flex flex-col items-center gap-1.5 py-4 px-2 rounded-2xl bg-card border-2 border-warning/30 hover:border-warning hover:bg-warning/10 transition-all min-h-[70px] font-bold text-warning text-sm shadow-[0_4px_0_0_rgba(251,191,36,0.2)] active:translate-y-1 active:shadow-none"
                >
                  <span className="text-xl leading-none font-black">?</span>
                  Suspicious
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer("scam")}
                  id="btn-scam"
                  className="relative flex flex-col items-center gap-1.5 py-4 px-2 rounded-2xl bg-card border-2 border-destructive/30 hover:border-destructive hover:bg-destructive/10 transition-all min-h-[70px] font-bold text-destructive text-sm shadow-[0_4px_0_0_rgba(255,77,109,0.2)] active:translate-y-1 active:shadow-none"
                >
                  <XCircle className="w-5 h-5" />
                  Scam
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="cta"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-3"
            >
              {/* Mini score preview */}
              <div className="flex items-center justify-between bg-card rounded-xl border border-border px-4 py-3 shadow-inner">
                <div className="text-center flex-1">
                  <p className="text-xs text-muted-foreground font-medium">Score</p>
                  <p className="text-xl font-mono font-black text-primary glow-text-primary">
                    {answerState === "correct" ? "100" : "0"}
                  </p>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center flex-1">
                  <p className="text-xs text-muted-foreground font-medium">Round</p>
                  <p className="text-xl font-mono font-black text-foreground">1/8</p>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center flex-1">
                  <p className="text-xs text-muted-foreground font-medium">ScamIQ</p>
                  <p className="text-xl font-mono font-black text-accent">?</p>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleStart}
                id="btn-start-test"
                className="w-full h-16 rounded-2xl bg-primary text-background font-heading font-black text-xl flex items-center justify-center gap-3 shadow-[0_0_40px_-8px_rgba(56,189,248,0.6)] hover:shadow-[0_0_60px_-8px_rgba(56,189,248,0.8)] hover:brightness-110 transition-all border-b-4 border-primary-foreground/20 active:translate-y-1 active:border-b-0"
              >
                Continue — Round 2
                <ChevronRight className="w-6 h-6" />
              </motion.button>
              <p className="text-center text-xs text-muted-foreground">7 rounds left · under 3 minutes</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── SKIP CTA ── */}
        {!answered && (
          <div className="flex flex-col items-center gap-3 pb-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-8 h-px bg-border" />
              or skip the preview
              <span className="w-8 h-px bg-border" />
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleStart}
              id="btn-start-full"
              className="w-full h-14 rounded-2xl border-2 border-primary/40 text-primary font-heading font-bold text-lg flex items-center justify-center gap-2 hover:bg-primary/10 transition-all active:translate-y-0.5 shadow-[0_2px_0_0_rgba(56,189,248,0.2)]"
            >
              Start Full Test — 8 Rounds
              <ChevronRight className="w-5 h-5" />
            </motion.button>
            <p className="text-center text-xs text-muted-foreground leading-tight">
              Can you get <span className="text-warning font-semibold">8/8?</span> Most people don't.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
