import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
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
  const [biggestWeakness, setBiggestWeakness] = useState<string | null>(null);

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

  // Celebratory confetti for high scores
  useEffect(() => {
    if (correctCount >= 6) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [correctCount]);

  // Auto-call AI Weakness Coach
  useEffect(() => {
    if (answers.length > 0) {
      const wrongAnswers = answers.filter(a => !a.isCorrect);
      if (wrongAnswers.length > 0) {
        // Count occurrences of each category in wrong answers
        const categoryCounts: Record<string, number> = {};
        wrongAnswers.forEach(a => {
          const cat = a.scenario.category;
          categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
        });

        // Find the category with the most errors
        let maxCount = 0;
        let worstCat = '';
        Object.entries(categoryCounts).forEach(([cat, count]) => {
          if (count > maxCount) {
            maxCount = count;
            worstCat = cat;
          }
        });
        setBiggestWeakness(worstCat);
      }
    }
  }, [answers]);

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
    <div className="min-h-[100dvh] bg-background flex flex-col items-center p-4 md:p-6 pb-24 overflow-x-hidden relative">
      {/* Arcade Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 arcade-grid opacity-20"></div>
        <div className="absolute inset-0 scanlines opacity-10"></div>
      </div>
      
      <ShareCard ref={shareCardRef} score={actualScore} badge={badge} correctCount={correctCount} />

      <div className="w-full max-w-2xl mx-auto flex flex-col gap-6 relative z-10">
        
        {/* ── Score Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="arcade-card border-2 border-primary/30 rounded-[2.5rem] p-8 flex flex-col items-center text-center shadow-2xl relative overflow-hidden bg-card/80 backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
          
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-4"
          >
            <Shield className="w-16 h-16 text-primary drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]" />
          </motion.div>
          
          <h2 className="text-primary uppercase tracking-[0.3em] font-black text-xs mb-2 drop-shadow-neon">Your ScamIQ</h2>
          
          <div className="text-8xl md:text-9xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-br from-primary via-accent to-primary mb-6 drop-shadow-[0_0_30px_rgba(56,189,248,0.4)]">
            {displayScore.toString().padStart(3, '0')}
          </div>

          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.5, type: 'spring', stiffness: 180 }}
            className="bg-primary/20 border-2 border-primary/40 px-8 py-4 rounded-2xl flex items-center gap-4 shadow-[0_0_20px_rgba(56,189,248,0.2)]"
          >
            <Trophy className={`w-8 h-8 ${badgeColorClass} filter drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]`} />
            <span className={`text-2xl font-black uppercase tracking-tight drop-shadow-neon ${badgeColorClass}`}>{badge}</span>
          </motion.div>
        </motion.div>

        {/* ── Stats Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="arcade-card border border-success/30 rounded-2xl p-4 flex flex-col items-center text-center bg-card/60">
            <span className="text-success text-[10px] font-black uppercase tracking-wider mb-1">CORRECT</span>
            <span className="text-3xl font-mono font-bold text-success drop-shadow-neon-success">{correctCount}/8</span>
          </div>
          <div className="arcade-card border border-destructive/30 rounded-2xl p-4 flex flex-col items-center text-center bg-card/60">
            <span className="text-destructive text-[10px] font-black uppercase tracking-wider mb-1">WRONG</span>
            <span className="text-3xl font-mono font-bold text-destructive drop-shadow-neon-destructive">{8 - correctCount}</span>
          </div>
          <div className="arcade-card border border-warning/30 rounded-2xl p-4 flex flex-col items-center text-center bg-card/60">
            <span className="text-warning text-[10px] font-black uppercase tracking-wider mb-1">STREAK</span>
            <span className="text-3xl font-mono font-bold text-warning flex items-center gap-1 drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">
              {bestStreak} <Flame className="w-5 h-5" />
            </span>
          </div>
          <div className="arcade-card border border-accent/30 rounded-2xl p-4 flex flex-col items-center text-center bg-card/60">
            <span className="text-accent text-[10px] font-black uppercase tracking-wider mb-1">POINTS</span>
            <span className="text-3xl font-mono font-bold text-accent drop-shadow-neon-accent">{score}</span>
          </div>
        </div>

        {/* ── Round Breakdown ── */}
        {answers.length > 0 && (
          <div className="arcade-card border border-border/50 rounded-2xl p-5 bg-card/40 backdrop-blur-sm">
            <p className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] mb-4">Round Breakdown</p>
            <div className="flex gap-2 flex-wrap">
              {answers.map((a, i) => (
                <div
                  key={i}
                  title={`Round ${i + 1}: ${a.scenario.type} — ${a.isCorrect ? 'Correct' : 'Wrong'}`}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all hover:scale-110 ${
                    a.isCorrect
                      ? 'bg-success/15 border-success/40 text-success shadow-[0_0_10px_rgba(52,211,153,0.2)]'
                      : 'bg-destructive/15 border-destructive/40 text-destructive shadow-[0_0_10px_rgba(255,77,109,0.2)]'
                  }`}
                >
                  {a.isCorrect
                    ? <CheckCircle2 className="w-5 h-5" />
                    : <XCircle className="w-5 h-5" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── AI Weakness Coach ── */}
        <div className="arcade-card border-2 border-accent/30 rounded-[2rem] p-6 relative overflow-hidden bg-card/80 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3 text-accent font-black uppercase tracking-wider">
              <BrainCircuit className="w-6 h-6 drop-shadow-neon-accent" />
              <h3 className="text-sm">AI Weakness Coach</h3>
            </div>
            {biggestWeakness && (
              <div className="bg-destructive/20 border border-destructive/40 px-3 py-1 rounded-lg text-[10px] font-black text-destructive uppercase tracking-widest animate-pulse">
                CRITICAL: {biggestWeakness}
              </div>
            )}
          </div>
          
          {correctCount === 8 ? (
            <p className="text-sm text-foreground leading-relaxed">Flawless! You spotted every scam perfectly. You are a true Human Firewall. Challenge your friends to see if they can match your score.</p>
          ) : generateCoaching.isPending ? (
            <div className="flex flex-col gap-3 animate-pulse">
              <div className="h-4 bg-white/5 rounded w-3/4" />
              <div className="h-4 bg-white/5 rounded w-full" />
              <div className="h-4 bg-white/5 rounded w-5/6" />
            </div>
          ) : generateCoaching.data ? (
            <div className="flex flex-col gap-4">
              <p className="text-sm text-foreground leading-relaxed">{generateCoaching.data.message}</p>
              {generateCoaching.data.tips?.length > 0 && (
                <ul className="space-y-3">
                  {generateCoaching.data.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs text-muted-foreground bg-white/5 p-3 rounded-xl border border-white/10">
                      <span className="text-accent font-black shrink-0">{">>"}</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">Systems online. Awaiting data stream for deep analysis...</p>
          )}
        </div>

        {/* ── Share Card Preview ── */}
        <div className="arcade-card border border-border/50 rounded-2xl p-6 bg-card/40 backdrop-blur-sm">
          <p className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] mb-4">Share Scorecard</p>
          
          <div className="rounded-2xl overflow-hidden border-2 border-primary/30 mb-6 shadow-2xl"
            style={{ background: 'linear-gradient(145deg, #0B1020, #0F172A)', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
            <div className="absolute inset-0 arcade-grid opacity-10 pointer-events-none"></div>
            <div className="relative z-10">
              <div className="font-heading font-black text-xl mb-1" style={{ color: '#F8FAFC' }}>
                Scam<span style={{ color: '#38BDF8' }} className="drop-shadow-neon">IQ</span>
              </div>
              <div className="font-mono font-black text-6xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">
                {actualScore}
              </div>
              <div className={`text-sm font-black uppercase tracking-wider ${badgeColorClass}`}>{badge}</div>
            </div>
            <div className="text-right relative z-10">
              <div className="text-xs text-muted-foreground/60 mb-2 font-mono">SCAMIQ.APP</div>
              <div className="text-sm font-bold text-white/90">{correctCount}/8 CORRECT</div>
              <div className="mt-4 flex justify-end">
                <Shield className="w-8 h-8 text-primary/40" />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={handleShare} className="flex-1 min-w-0 h-12 rounded-xl bg-secondary border-2 border-border text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-secondary/80 transition-all active:translate-y-1">
              <Share2 className="w-4 h-4 text-primary" /> Share
            </button>
            <button onClick={handleCopyLink} className="flex-1 min-w-0 h-12 rounded-xl bg-secondary border-2 border-border text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-secondary/80 transition-all active:translate-y-1">
              <Copy className="w-4 h-4" /> Link
            </button>
            <button
              onClick={handleDownloadImage}
              disabled={isExporting}
              className="w-full h-12 rounded-xl bg-primary/10 border-2 border-primary/30 text-primary text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-primary/20 transition-all disabled:opacity-60 active:translate-y-1"
            >
              <Download className="w-4 h-4" />
              {isExporting ? 'Generating...' : 'Download (PNG + QR)'}
            </button>
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <Button 
            onClick={() => { resetGame(); startGame(); }}
            size="lg" 
            className="h-16 text-lg font-black bg-card hover:bg-secondary text-foreground border-2 border-border rounded-2xl border-b-8 active:border-b-0 active:translate-y-2 transition-all uppercase tracking-widest"
          >
            <Play className="w-6 h-6 mr-3" /> Replay
          </Button>
          
          <Button 
            onClick={playAIChallenges}
            size="lg" 
            disabled={generateScenarios.isPending}
            className="h-16 text-lg font-black bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl border-b-8 border-primary-foreground/20 active:border-b-0 active:translate-y-2 transition-all shadow-[0_10px_30px_rgba(56,189,248,0.4)] uppercase tracking-widest"
          >
            {generateScenarios.isPending ? (
              <span className="flex items-center"><Sparkles className="w-6 h-6 mr-3 animate-spin" /> Analyzing...</span>
            ) : (
              <span className="flex items-center"><Sparkles className="w-6 h-6 mr-3" /> AI Challenge</span>
            )}
          </Button>
        </div>

      </div>
    </div>
  );
}
