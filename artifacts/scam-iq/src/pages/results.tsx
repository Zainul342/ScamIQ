import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import { Shield, Trophy, Share2, Download, Copy, Play, Sparkles, BrainCircuit, Flame, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useGame } from '../lib/game-store';
import { ShareCard } from '../components/share-card';
import { useGenerateCoaching, useGenerateScenarios } from '@workspace/api-client-react';

const getBadgeForScore = (score: number) => {
  if (score >= 95) return 'Human Firewall';
  if (score >= 80) return 'Fraud Fighter';
  if (score >= 60) return 'Scam Spotter';
  if (score >= 40) return 'Cautious Clicker';
  return 'Easy Target';
};

const BADGE_COLOR: Record<string, string> = {
  'Human Firewall': 'text-success',
  'Fraud Fighter': 'text-primary',
  'Scam Spotter': 'text-warning',
  'Cautious Clicker': 'text-orange-400',
  'Easy Target': 'text-danger',
};

export default function Results() {
  const { score, bestStreak, answers, resetGame, startGame } = useGame();
  const { toast } = useToast();
  const shareCardRef = useRef<HTMLDivElement>(null);
  const [displayScore, setDisplayScore] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  const normalizedScore = Math.min(100, Math.round((score / 850) * 100));
  const actualScore = Math.max(0, normalizedScore);
  const badge = getBadgeForScore(actualScore);
  const correctCount = answers.filter(a => a.isCorrect).length;
  const badgeColorClass = BADGE_COLOR[badge] ?? 'text-primary';

  const generateCoaching = useGenerateCoaching();
  const generateScenarios = useGenerateScenarios();

  // Count-up animation
  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const stepTime = duration / steps;
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setDisplayScore(Math.round((actualScore * currentStep) / steps));
      if (currentStep >= steps) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [actualScore]);

  // Auto-call AI Weakness Coach
  useEffect(() => {
    if (answers.length > 0 && generateCoaching.isIdle) {
      const wrongAnswers = answers.filter(a => !a.isCorrect).map(a => ({
        type: a.scenario.type,
        redFlags: a.scenario.redFlags,
        correctAnswer: a.scenario.correctAnswer,
        userAnswer: a.answer,
      }));
      if (wrongAnswers.length > 0) {
        generateCoaching.mutate({ data: { wrongAnswers, score: actualScore, badge } });
      }
    }
  }, [answers, actualScore, badge, generateCoaching]);

  const handleShare = async () => {
    const text = `I scored ${actualScore} on ScamIQ and earned the "${badge}" badge! Can you spot the scam before it spots you? Play at ${window.location.origin}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My ScamIQ Score', text, url: window.location.origin });
        return;
      } catch (_) { /* fallthrough */ }
    }
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin);
    toast({ title: 'Link copied!', description: 'Challenge your friends to beat your score.' });
  };

  const handleDownloadImage = async () => {
    if (!shareCardRef.current || isExporting) return;
    setIsExporting(true);
    toast({ title: 'Generating share card...' });
    try {
      await new Promise(r => setTimeout(r, 150));
      const dataUrl = await toPng(shareCardRef.current, {
        pixelRatio: 2,
        backgroundColor: '#0B1020',
        skipAutoScale: false,
      });
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `ScamIQ-${badge.replace(/\s+/g, '-')}-${actualScore}.png`;
      link.click();
      toast({ title: 'Share card saved!' });
    } catch (err) {
      toast({ title: 'Export failed', description: 'Could not generate image.', variant: 'destructive' });
    } finally {
      setIsExporting(false);
    }
  };

  const playAIChallenges = () => {
    generateScenarios.mutate({ data: { count: 8 } }, {
      onSuccess: (res) => { resetGame(); startGame(res.scenarios); },
      onError: () => {
        toast({ title: 'Failed to load AI scenarios', description: 'Falling back to standard challenges.', variant: 'destructive' });
        resetGame(); startGame();
      },
    });
  };

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col items-center p-4 md:p-6 pb-24 overflow-x-hidden">
      <ShareCard ref={shareCardRef} score={actualScore} badge={badge} correctCount={correctCount} />

      <div className="w-full max-w-lg mx-auto flex flex-col gap-5 relative z-10">

        {/* ── Score hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-card-border rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mb-3">
            <Shield className="w-12 h-12 text-primary drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]" />
          </motion.div>
          <p className="text-muted-foreground uppercase tracking-widest font-bold text-xs mb-1">Your ScamIQ</p>
          <div className="text-[88px] md:text-[108px] font-mono font-black leading-none text-transparent bg-clip-text bg-gradient-to-br from-primary to-accent mb-5">
            {displayScore}
          </div>
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.4, type: 'spring', stiffness: 180 }}
            className="bg-secondary/60 border border-border px-5 py-2.5 rounded-full flex items-center gap-2.5"
          >
            <Trophy className={`w-5 h-5 ${badgeColorClass}`} />
            <span className={`text-lg font-heading font-black ${badgeColorClass}`}>{badge}</span>
          </motion.div>
        </motion.div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'Correct', value: `${correctCount}/8`, color: 'text-success' },
            { label: 'Wrong', value: `${8 - correctCount}`, color: 'text-danger' },
            { label: 'Streak', value: bestStreak, color: 'text-warning', icon: <Flame className="w-3.5 h-3.5 inline ml-0.5" /> },
            { label: 'Points', value: score, color: 'text-foreground' },
          ].map(({ label, value, color, icon }) => (
            <div key={label} className="bg-card border border-card-border rounded-xl p-3 flex flex-col items-center text-center">
              <span className="text-muted-foreground text-xs font-medium mb-1">{label}</span>
              <span className={`text-xl font-mono font-black ${color}`}>{value}{icon}</span>
            </div>
          ))}
        </div>

        {/* ── Round breakdown ── */}
        {answers.length > 0 && (
          <div className="bg-card border border-card-border rounded-2xl p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Round Breakdown</p>
            <div className="flex gap-1.5 flex-wrap">
              {answers.map((a, i) => (
                <div
                  key={i}
                  title={`Round ${i + 1}: ${a.scenario.type} — ${a.isCorrect ? 'Correct' : 'Wrong'}`}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                    a.isCorrect
                      ? 'bg-success/15 border-success/30 text-success'
                      : 'bg-danger/15 border-danger/30 text-danger'
                  }`}
                >
                  {a.isCorrect
                    ? <CheckCircle2 className="w-4 h-4" />
                    : <XCircle className="w-4 h-4" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── AI Weakness Coach ── */}
        <div className="bg-card border border-card-border rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-3 text-accent font-bold text-sm">
            <BrainCircuit className="w-4 h-4" />
            <span>AI Weakness Coach</span>
          </div>
          {correctCount === 8 ? (
            <p className="text-sm text-foreground">Flawless! You spotted every scam perfectly. Share your score and challenge a friend.</p>
          ) : generateCoaching.isPending ? (
            <div className="flex flex-col gap-2.5 animate-pulse">
              <div className="h-3.5 bg-secondary rounded w-3/4" />
              <div className="h-3.5 bg-secondary rounded w-full" />
              <div className="h-3.5 bg-secondary rounded w-5/6" />
            </div>
          ) : generateCoaching.data ? (
            <div className="flex flex-col gap-3">
              <p className="text-sm text-foreground leading-relaxed">{generateCoaching.data.message}</p>
              {generateCoaching.data.tips?.length > 0 && (
                <ul className="space-y-2">
                  {generateCoaching.data.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="text-accent mt-0.5 shrink-0">→</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">Coach is analyzing your performance...</p>
          )}
        </div>

        {/* ── Share card preview ── */}
        <div className="bg-card border border-card-border rounded-2xl p-5">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Share Your Score</p>
          {/* Mini visual preview of the card */}
          <div className="rounded-xl overflow-hidden border border-border mb-4"
            style={{ background: 'linear-gradient(145deg, #0B1020, #0F172A)', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div className="font-heading font-black text-lg" style={{ color: '#F8FAFC' }}>
                Scam<span style={{ color: '#38BDF8' }}>IQ</span>
              </div>
              <div className="font-mono font-black text-4xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                {actualScore}
              </div>
              <div className={`text-sm font-bold ${badgeColorClass}`}>{badge}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground mb-1">scamiq.app</div>
              <div className="text-xs text-muted-foreground">{correctCount}/8 correct</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={handleShare} className="flex-1 min-w-0 h-10 rounded-xl bg-secondary border border-border text-sm font-medium flex items-center justify-center gap-2 hover:bg-secondary/80 transition-colors">
              <Share2 className="w-4 h-4 text-primary" /> Share to X
            </button>
            <button onClick={handleCopyLink} className="flex-1 min-w-0 h-10 rounded-xl bg-secondary border border-border text-sm font-medium flex items-center justify-center gap-2 hover:bg-secondary/80 transition-colors">
              <Copy className="w-4 h-4" /> Copy Link
            </button>
            <button
              onClick={handleDownloadImage}
              disabled={isExporting}
              className="w-full h-10 rounded-xl bg-primary/10 border border-primary/30 text-primary text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/20 transition-colors disabled:opacity-60"
            >
              <Download className="w-4 h-4" />
              {isExporting ? 'Generating...' : 'Download Share Card (PNG + QR)'}
            </button>
          </div>
        </div>

        {/* ── CTA buttons ── */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/">
            <Button
              onClick={() => { resetGame(); startGame(); }}
              size="lg"
              className="w-full h-14 text-base font-bold bg-secondary hover:bg-secondary/80 text-foreground border border-border"
            >
              <Play className="w-5 h-5 mr-2" /> Play Again
            </Button>
          </Link>
          <Button
            onClick={playAIChallenges}
            size="lg"
            disabled={generateScenarios.isPending}
            className="h-14 text-base font-bold bg-primary hover:brightness-110 text-background shadow-[0_0_24px_rgba(56,189,248,0.25)]"
          >
            {generateScenarios.isPending ? (
              <><Sparkles className="w-5 h-5 mr-2 animate-spin" /> AI loading...</>
            ) : (
              <><Sparkles className="w-5 h-5 mr-2" /> AI Challenges</>
            )}
          </Button>
        </div>

      </div>
    </div>
  );
}
