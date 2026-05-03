import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { Shield, Trophy, Share2, Download, Copy, Play, Sparkles, BrainCircuit, Flame } from 'lucide-react';
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

export default function Results() {
  const { score, bestStreak, answers, resetGame, startGame } = useGame();
  const { toast } = useToast();
  const shareCardRef = useRef<HTMLDivElement>(null);
  const [displayScore, setDisplayScore] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  const maxPossibleScore = 800 + (Math.floor(8 / 3) * 25);
  const normalizedScore = Math.min(100, Math.round((score / 850) * 100)); // normalized roughly
  const actualScore = Math.max(0, normalizedScore);
  const badge = getBadgeForScore(actualScore);
  const correctCount = answers.filter(a => a.isCorrect).length;

  const generateCoaching = useGenerateCoaching();
  const generateScenarios = useGenerateScenarios();

  useEffect(() => {
    // Count up animation
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

  useEffect(() => {
    if (answers.length > 0 && generateCoaching.isIdle) {
      const wrongAnswers = answers.filter(a => !a.isCorrect).map(a => ({
        type: a.scenario.type,
        redFlags: a.scenario.redFlags,
        correctAnswer: a.scenario.correctAnswer,
        userAnswer: a.answer
      }));
      
      if (wrongAnswers.length > 0) {
        generateCoaching.mutate({
          data: {
            wrongAnswers,
            score: actualScore,
            badge
          }
        });
      }
    }
  }, [answers, actualScore, badge, generateCoaching]);

  const handleShare = async () => {
    const text = `I scored ${actualScore} on ScamIQ and earned the "${badge}" badge! 🛡️ Can you spot the scam before it spots you? Play now at scamiq.app`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My ScamIQ Score',
          text: text,
          url: 'https://scamiq.app',
        });
        return;
      } catch (err) {
        console.log('Error sharing', err);
      }
    }
    
    // Fallback to twitter
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://scamiq.app');
    toast({
      title: "Link copied!",
      description: "Challenge your friends to beat your score.",
    });
  };

  const handleDownloadImage = async () => {
    if (!shareCardRef.current || isExporting) return;
    setIsExporting(true);
    
    try {
      toast({ title: "Generating image..." });
      // Short delay to ensure rendering
      await new Promise(r => setTimeout(r, 100));
      
      const canvas = await html2canvas(shareCardRef.current, {
        scale: 2,
        backgroundColor: '#0B1020',
        logging: false,
      });
      
      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.href = image;
      link.download = `ScamIQ-${badge.replace(/\s+/g, '-')}-${actualScore}.png`;
      link.click();
      
      toast({ title: "Image saved!" });
    } catch (error) {
      console.error('Export failed:', error);
      toast({ 
        title: "Export failed", 
        description: "Could not generate image.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const playAIChallenges = () => {
    generateScenarios.mutate({ data: { count: 8 } }, {
      onSuccess: (res) => {
        resetGame();
        startGame(res.scenarios);
      },
      onError: () => {
        toast({
          title: "Failed to load AI scenarios",
          description: "Falling back to standard challenges.",
          variant: "destructive"
        });
        resetGame();
        startGame();
      }
    });
  };

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col items-center p-4 md:p-6 pb-24 overflow-x-hidden">
      
      <ShareCard ref={shareCardRef} score={actualScore} badge={badge} />

      <div className="w-full max-w-2xl mx-auto flex flex-col gap-6 relative z-10">
        
        {/* Score Header */}
        <div className="bg-card border border-card-border rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
          
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-4"
          >
            <Shield className="w-16 h-16 text-primary drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]" />
          </motion.div>
          
          <h2 className="text-muted-foreground uppercase tracking-widest font-bold text-sm mb-2">Your ScamIQ</h2>
          
          <div className="text-8xl md:text-9xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary to-accent mb-6">
            {displayScore}
          </div>
          
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.5, type: 'spring' }}
            className="bg-secondary/50 border border-secondary-foreground/10 px-6 py-3 rounded-full flex items-center gap-3"
          >
            <Trophy className="w-6 h-6 text-warning" />
            <span className="text-xl font-heading font-bold text-foreground">{badge}</span>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card border border-card-border rounded-2xl p-4 flex flex-col items-center text-center">
            <span className="text-muted-foreground text-sm font-medium mb-1">Correct</span>
            <span className="text-2xl font-mono font-bold text-success">{correctCount}/8</span>
          </div>
          <div className="bg-card border border-card-border rounded-2xl p-4 flex flex-col items-center text-center">
            <span className="text-muted-foreground text-sm font-medium mb-1">Wrong</span>
            <span className="text-2xl font-mono font-bold text-destructive">{8 - correctCount}</span>
          </div>
          <div className="bg-card border border-card-border rounded-2xl p-4 flex flex-col items-center text-center">
            <span className="text-muted-foreground text-sm font-medium mb-1">Best Streak</span>
            <span className="text-2xl font-mono font-bold text-warning flex items-center gap-1">
              {bestStreak} <Flame className="w-4 h-4" />
            </span>
          </div>
          <div className="bg-card border border-card-border rounded-2xl p-4 flex flex-col items-center text-center">
            <span className="text-muted-foreground text-sm font-medium mb-1">Points</span>
            <span className="text-2xl font-mono font-bold text-foreground">{score}</span>
          </div>
        </div>

        {/* AI Coaching Section */}
        <div className="bg-card border border-card-border rounded-3xl p-6 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-4 text-accent font-bold">
            <BrainCircuit className="w-5 h-5" />
            <h3>AI Weakness Coach</h3>
          </div>
          
          {correctCount === 8 ? (
            <p className="text-foreground">Flawless victory! You spotted every scam perfectly.</p>
          ) : generateCoaching.isPending ? (
            <div className="flex flex-col gap-3 animate-pulse">
              <div className="h-4 bg-secondary rounded w-3/4"></div>
              <div className="h-4 bg-secondary rounded w-full"></div>
              <div className="h-4 bg-secondary rounded w-5/6"></div>
            </div>
          ) : generateCoaching.data ? (
            <div className="flex flex-col gap-4">
              <p className="text-sm text-foreground leading-relaxed">
                {generateCoaching.data.message}
              </p>
              {generateCoaching.data.tips && generateCoaching.data.tips.length > 0 && (
                <div className="bg-secondary p-4 rounded-xl">
                  <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                    {generateCoaching.data.tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Coach is analyzing your performance...</p>
          )}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Button 
            onClick={() => { resetGame(); startGame(); }}
            size="lg" 
            className="h-14 text-base font-bold bg-secondary hover:bg-secondary/80 text-foreground border border-border"
          >
            <Play className="w-5 h-5 mr-2" /> Play Again
          </Button>
          
          <Button 
            onClick={playAIChallenges}
            size="lg" 
            disabled={generateScenarios.isPending}
            className="h-14 text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(56,189,248,0.3)]"
          >
            {generateScenarios.isPending ? (
              <span className="flex items-center"><Sparkles className="w-5 h-5 mr-2 animate-spin" /> Loading...</span>
            ) : (
              <span className="flex items-center"><Sparkles className="w-5 h-5 mr-2" /> Try AI Challenges</span>
            )}
          </Button>
        </div>

        {/* Share Section */}
        <div className="mt-8 border-t border-border pt-8 flex flex-col items-center">
          <h3 className="font-heading font-bold text-lg mb-4 text-foreground">Share Your Score</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={handleShare} variant="outline" className="h-12 px-6 rounded-full bg-card hover:bg-secondary">
              <Share2 className="w-4 h-4 mr-2 text-primary" /> X / Twitter
            </Button>
            <Button onClick={handleCopyLink} variant="outline" className="h-12 px-6 rounded-full bg-card hover:bg-secondary">
              <Copy className="w-4 h-4 mr-2" /> Copy Link
            </Button>
            <Button onClick={handleDownloadImage} disabled={isExporting} variant="outline" className="h-12 px-6 rounded-full bg-card hover:bg-secondary">
              <Download className="w-4 h-4 mr-2" /> {isExporting ? 'Saving...' : 'Save Image'}
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
