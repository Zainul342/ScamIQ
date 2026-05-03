import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import { Shield, Trophy, Share2, Download, Copy, Play, Sparkles, BrainCircuit, Flame, CheckCircle2, XCircle } from 'lucide-react';
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

const BADGE_STYLE: Record<string, { color: string; bg: string }> = {
  'Human Firewall': { color: '#58cc02', bg: '#d7ffb8' },
  'Fraud Fighter': { color: '#1cb0f6', bg: '#ddf4ff' },
  'Scam Spotter': { color: '#ffc800', bg: '#fff3cd' },
  'Cautious Clicker': { color: '#ff9600', bg: '#fff0db' },
  'Easy Target': { color: '#ff4b4b', bg: '#ffdfe0' },
};

export default function Results() {
  const [, setLocation] = useLocation();
  const { score, bestStreak, answers, resetGame, startGame } = useGame();
  const { toast } = useToast();
  const shareCardRef = useRef<HTMLDivElement>(null);
  const [displayScore, setDisplayScore] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [biggestWeakness, setBiggestWeakness] = useState<string | null>(null);

  const normalizedScore = Math.min(100, Math.round((score / 850) * 100));
  const actualScore = Math.max(0, normalizedScore);
  const badge = getBadgeForScore(actualScore);
  const correctCount = answers.filter((a: any) => a.isCorrect).length;
  const badgeStyle = BADGE_STYLE[badge] ?? { color: '#1cb0f6', bg: '#ddf4ff' };

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
      const interval = setInterval(function() {
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
    return undefined;
  }, [correctCount]);

  // Auto-call AI Weakness Coach
  useEffect(() => {
    if (answers.length > 0) {
      const wrongAnswers = answers.filter((a: any) => !a.isCorrect);
      if (wrongAnswers.length > 0) {
        const categoryCounts: Record<string, number> = {};
        wrongAnswers.forEach((a: any) => {
          const cat = a.scenario.category;
          categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
        });
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
      const wrongAnswers = answers.filter((a: any) => !a.isCorrect).map((a: any) => ({
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
        backgroundColor: '#fff',
        skipAutoScale: false,
      });
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `ScamIQ-${badge.replace(/\s+/g, '-')}-${actualScore}.png`;
      link.click();
      toast({ title: 'Share card saved!' });
    } catch (_err) {
      toast({ title: 'Export failed', description: 'Could not generate image.', variant: 'destructive' });
    } finally {
      setIsExporting(false);
    }
  };

  const playAIChallenges = () => {
    generateScenarios.mutate({ data: { count: 8 } }, {
      onSuccess: (res: any) => { resetGame(); startGame(res.scenarios); },
      onError: () => {
        toast({ title: 'Failed to load AI scenarios', description: 'Falling back to standard challenges.', variant: 'destructive' });
        resetGame(); startGame();
      },
    });
  };

  return (
    <div
      className="min-h-[100dvh] flex flex-col items-center p-4 md:p-6 pb-24 overflow-x-hidden relative"
      style={{ background: '#fff', fontFamily: "'Nunito', sans-serif" }}
    >
      <ShareCard ref={shareCardRef} score={actualScore} badge={badge} correctCount={correctCount} />

      <div className="w-full max-w-2xl mx-auto flex flex-col gap-6 relative">
        
        {/* ── Score Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-8 flex flex-col items-center text-center relative overflow-hidden"
          style={{ background: badgeStyle.bg, border: `3px solid ${badgeStyle.color}20` }}
        >
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-4"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: badgeStyle.color, boxShadow: `0 8px 0 ${badgeStyle.color}cc` }}
            >
              <Shield className="w-10 h-10" style={{ color: '#fff' }} />
            </div>
          </motion.div>
          
          <h2 className="text-sm font-black uppercase tracking-widest mb-2" style={{ color: '#afafaf' }}>
            Your ScamIQ
          </h2>
          
          <div
            className="text-8xl md:text-9xl font-black mb-4"
            style={{ color: badgeStyle.color }}
          >
            {displayScore}
          </div>

          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.5, type: 'spring', stiffness: 180 }}
            className="px-6 py-3 rounded-2xl flex items-center gap-3"
            style={{ background: `${badgeStyle.color}20`, border: `2px solid ${badgeStyle.color}40` }}
          >
            <Trophy className="w-7 h-7" style={{ color: badgeStyle.color }} />
            <span className="text-xl font-black uppercase" style={{ color: badgeStyle.color }}>{badge}</span>
          </motion.div>
        </motion.div>

        {/* ── Stats Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'CORRECT', value: `${correctCount}/8`, color: '#58cc02' },
            { label: 'WRONG', value: `${8 - correctCount}`, color: '#ff4b4b' },
            { label: 'STREAK', value: bestStreak, color: '#ff9600', icon: true },
            { label: 'POINTS', value: score, color: '#1cb0f6' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl p-4 flex flex-col items-center text-center"
              style={{ background: '#f7f7f7', border: '2px solid #e5e5e5', borderBottomWidth: '4px' }}
            >
              <span className="text-[10px] font-black uppercase tracking-wider mb-1" style={{ color: '#afafaf' }}>
                {stat.label}
              </span>
              <span className="text-3xl font-black flex items-center gap-1" style={{ color: stat.color }}>
                {stat.value}
                {stat.icon && <Flame className="w-5 h-5" />}
              </span>
            </div>
          ))}
        </div>

        {/* ── Round Breakdown ── */}
        {answers.length > 0 && (
          <div
            className="rounded-2xl p-5"
            style={{ background: '#f7f7f7', border: '2px solid #e5e5e5', borderBottomWidth: '4px' }}
          >
            <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: '#afafaf' }}>
              Round Breakdown
            </p>
            <div className="flex gap-2 flex-wrap">
              {answers.map((a: any, i: number) => (
                <div
                  key={i}
                  title={`Round ${i + 1}: ${a.scenario.type} — ${a.isCorrect ? 'Correct' : 'Wrong'}`}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                  style={{
                    background: a.isCorrect ? '#d7ffb8' : '#ffdfe0',
                    border: `2px solid ${a.isCorrect ? '#58cc02' : '#ff4b4b'}`,
                    borderBottomWidth: '3px',
                    color: a.isCorrect ? '#58cc02' : '#ff4b4b',
                  }}
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
        <div
          className="rounded-3xl p-6 relative overflow-hidden"
          style={{ background: '#ddf4ff', border: '2px solid #1cb0f640', borderBottomWidth: '4px' }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3 font-black uppercase tracking-wider" style={{ color: '#1cb0f6' }}>
              <BrainCircuit className="w-6 h-6" />
              <h3 className="text-sm">AI Weakness Coach</h3>
            </div>
            {biggestWeakness && (
              <div
                className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
                style={{ background: '#ffdfe0', color: '#ff4b4b' }}
              >
                CRITICAL: {biggestWeakness}
              </div>
            )}
          </div>
          
          {correctCount === 8 ? (
            <p className="text-sm leading-relaxed" style={{ color: '#3c3c3c' }}>
              Flawless! You spotted every scam perfectly. You are a true Human Firewall. Challenge your friends to see if they can match your score.
            </p>
          ) : generateCoaching.isPending ? (
            <div className="flex flex-col gap-3 animate-pulse">
              <div className="h-4 rounded w-3/4" style={{ background: '#b8e6ff' }} />
              <div className="h-4 rounded w-full" style={{ background: '#b8e6ff' }} />
              <div className="h-4 rounded w-5/6" style={{ background: '#b8e6ff' }} />
            </div>
          ) : generateCoaching.data ? (
            <div className="flex flex-col gap-4">
              <p className="text-sm leading-relaxed" style={{ color: '#3c3c3c' }}>{generateCoaching.data.message}</p>
              {generateCoaching.data.tips?.length > 0 && (
                <ul className="space-y-3">
                  {generateCoaching.data.tips.map((tip: string, i: number) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-xs p-3 rounded-xl"
                      style={{ background: '#b8e6ff40', border: '1px solid #1cb0f620', color: '#3c3c3c' }}
                    >
                      <span className="font-black shrink-0" style={{ color: '#1cb0f6' }}>{">>"}</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <p className="text-xs" style={{ color: '#777' }}>Systems online. Awaiting data stream for deep analysis...</p>
          )}
        </div>

        {/* ── Share Card Preview ── */}
        <div
          className="rounded-2xl p-6"
          style={{ background: '#f7f7f7', border: '2px solid #e5e5e5', borderBottomWidth: '4px' }}
        >
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: '#afafaf' }}>
            Share Scorecard
          </p>
          
          <div
            className="rounded-2xl overflow-hidden mb-6"
            style={{
              background: `linear-gradient(135deg, ${badgeStyle.color}, ${badgeStyle.color}cc)`,
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div className="font-black text-xl mb-1" style={{ color: '#fff' }}>
                Scam<span style={{ color: '#ffffff90' }}>IQ</span>
              </div>
              <div className="font-black text-6xl mb-2" style={{ color: '#fff' }}>
                {actualScore}
              </div>
              <div className="text-sm font-black uppercase tracking-wider" style={{ color: '#ffffff90' }}>
                {badge}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs mb-2 font-bold" style={{ color: '#ffffff60' }}>SCAMIQ.APP</div>
              <div className="text-sm font-bold" style={{ color: '#fff' }}>{correctCount}/8 CORRECT</div>
              <div className="mt-4 flex justify-end">
                <Shield className="w-8 h-8" style={{ color: '#ffffff40' }} />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleShare}
              className="duo-btn flex-1 min-w-0 py-3 text-sm"
              style={{ color: '#1cb0f6', borderColor: '#1cb0f6', borderBottomWidth: '4px', background: '#fff' }}
            >
              <Share2 className="w-4 h-4 mr-2" /> Share
            </button>
            <button
              onClick={handleCopyLink}
              className="duo-btn flex-1 min-w-0 py-3 text-sm"
              style={{ color: '#afafaf', borderColor: '#e5e5e5', borderBottomWidth: '4px', background: '#fff' }}
            >
              <Copy className="w-4 h-4 mr-2" /> Link
            </button>
            <button
              onClick={handleDownloadImage}
              disabled={isExporting}
              className="duo-btn w-full py-3 text-sm"
              style={{ color: '#58cc02', borderColor: '#58cc02', borderBottomWidth: '4px', background: '#fff' }}
            >
              <Download className="w-4 h-4 mr-2" />
              {isExporting ? 'Generating...' : 'Download (PNG + QR)'}
            </button>
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <button
            onClick={() => { resetGame(); startGame(); }}
            className="duo-btn w-full py-4 text-base"
            style={{ background: '#fff', color: '#1cb0f6', borderColor: '#1cb0f6', borderBottomWidth: '6px' }}
          >
            <Play className="w-5 h-5 mr-2" /> REPLAY
          </button>
          
          <button
            onClick={playAIChallenges}
            disabled={generateScenarios.isPending}
            className="duo-btn w-full py-4 text-base"
            style={{ background: '#58cc02', color: '#fff', borderColor: '#58a700', borderBottomWidth: '6px' }}
          >
            {generateScenarios.isPending ? (
              <span className="flex items-center justify-center"><Sparkles className="w-5 h-5 mr-2 animate-spin" /> Analyzing...</span>
            ) : (
              <span className="flex items-center justify-center"><Sparkles className="w-5 h-5 mr-2" /> AI CHALLENGE</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
