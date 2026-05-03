import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Shield, AlertTriangle, XCircle, Flame, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useGame } from '../lib/game-store';
import { ScenarioCard } from '../components/scenario-card';

export default function Game() {
  const [, setLocation] = useLocation();
  const { 
    phase, scenarios, currentRoundIndex, score, streak, answers,
    startGame, answerRound, nextRound, setPhase 
  } = useGame();
  
  const [countdown, setCountdown] = useState(3);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    if (scenarios.length === 0) {
      startGame();
    }
  }, [scenarios.length, startGame]);

  useEffect(() => {
    if (phase === 'intro') {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setPhase('playing');
      }
    }
  }, [phase, countdown, setPhase]);

  useEffect(() => {
    if (phase === 'results') {
      setLocation('/results');
    }
  }, [phase, setLocation]);

  useEffect(() => {
    if (phase === 'feedback') {
      const currentAnswer = answers[currentRoundIndex];
      if (currentAnswer?.isCorrect) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#34D399', '#38BDF8']
        });
      }
      
      const timer = setTimeout(() => {
        nextRound();
        setSelectedAnswer(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [phase, answers, currentRoundIndex, nextRound]);

  if (scenarios.length === 0) return null;

  const currentScenario = scenarios[currentRoundIndex];
  const progress = ((currentRoundIndex) / 8) * 100;

  if (phase === 'intro') {
    return (
      <div className="min-h-[100dvh] bg-background flex flex-col items-center justify-center p-6">
        <motion.div 
          key={countdown}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.5 }}
          className="text-8xl font-mono font-bold text-primary mb-8"
        >
          {countdown > 0 ? countdown : 'GO!'}
        </motion.div>
        <div className="text-xl font-heading text-muted-foreground text-center max-w-sm">
          8 Rounds. Spot the Scams. Get Your ScamIQ.
        </div>
      </div>
    );
  }

  const handleAnswer = (answer: string) => {
    if (phase !== 'playing') return;
    setSelectedAnswer(answer);
    answerRound(answer);
  };

  const isFeedback = phase === 'feedback';
  const currentAnswer = answers[currentRoundIndex];

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col items-center p-4 md:p-6 pb-24 overflow-x-hidden">
      <div className="w-full max-w-md mx-auto flex flex-col h-full relative">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-4 bg-card p-3 rounded-2xl border border-card-border">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Round {currentRoundIndex + 1}/8</span>
            <Progress value={progress} className="w-24 h-2 bg-secondary" indicatorClassName="bg-primary" />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-xs text-muted-foreground">SCORE</span>
              <span className="font-mono font-bold text-accent">{score}</span>
            </div>
            
            <div className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-lg">
              <Flame className={`w-4 h-4 ${streak >= 3 ? 'text-warning animate-pulse' : 'text-muted-foreground'}`} />
              <span className="font-mono font-bold text-foreground">{streak}</span>
            </div>
          </div>
        </div>

        {/* Scenario Card */}
        <div className="flex-1 flex flex-col justify-center relative z-10 w-full">
          <AnimatePresence mode="wait">
            {currentScenario && (
              <motion.div
                key={currentScenario.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <ScenarioCard scenario={currentScenario} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Answer Buttons */}
        <div className="mt-6 flex flex-col gap-3 z-10 relative">
          <Button 
            onClick={() => handleAnswer('safe')}
            disabled={isFeedback}
            className={`h-16 text-lg font-bold rounded-xl transition-all duration-200 border-b-4 
              ${selectedAnswer === 'safe' ? 'scale-95' : ''} 
              ${isFeedback && currentScenario.correctAnswer === 'safe' ? 'bg-success hover:bg-success border-success-foreground shadow-[0_0_20px_rgba(52,211,153,0.4)]' : ''}
              ${isFeedback && selectedAnswer === 'safe' && !currentAnswer?.isCorrect ? 'bg-destructive/50 hover:bg-destructive/50 border-destructive/20 opacity-50' : ''}
              ${!isFeedback ? 'bg-secondary hover:bg-secondary/80 text-foreground border-border hover:border-success/50' : 'opacity-80'}
            `}
            data-testid="btn-answer-safe"
          >
            <Shield className="w-5 h-5 mr-2" />
            SAFE
          </Button>
          
          <Button 
            onClick={() => handleAnswer('suspicious')}
            disabled={isFeedback}
            className={`h-16 text-lg font-bold rounded-xl transition-all duration-200 border-b-4 
              ${selectedAnswer === 'suspicious' ? 'scale-95' : ''}
              ${isFeedback && currentScenario.correctAnswer === 'suspicious' ? 'bg-warning text-warning-foreground hover:bg-warning border-warning-foreground shadow-[0_0_20px_rgba(251,191,36,0.4)]' : ''}
              ${isFeedback && selectedAnswer === 'suspicious' && !currentAnswer?.isCorrect ? 'bg-destructive/50 hover:bg-destructive/50 border-destructive/20 opacity-50' : ''}
              ${!isFeedback ? 'bg-secondary hover:bg-secondary/80 text-foreground border-border hover:border-warning/50' : 'opacity-80'}
            `}
            data-testid="btn-answer-suspicious"
          >
            <AlertTriangle className="w-5 h-5 mr-2" />
            SUSPICIOUS
          </Button>
          
          <Button 
            onClick={() => handleAnswer('scam')}
            disabled={isFeedback}
            className={`h-16 text-lg font-bold rounded-xl transition-all duration-200 border-b-4 
              ${selectedAnswer === 'scam' ? 'scale-95' : ''}
              ${isFeedback && currentScenario.correctAnswer === 'scam' ? 'bg-destructive hover:bg-destructive border-destructive-foreground shadow-[0_0_20px_rgba(255,77,109,0.4)]' : ''}
              ${isFeedback && selectedAnswer === 'scam' && !currentAnswer?.isCorrect ? 'bg-destructive/50 hover:bg-destructive/50 border-destructive/20 opacity-50' : ''}
              ${!isFeedback ? 'bg-secondary hover:bg-secondary/80 text-foreground border-border hover:border-destructive/50' : 'opacity-80'}
            `}
            data-testid="btn-answer-scam"
          >
            <XCircle className="w-5 h-5 mr-2" />
            SCAM
          </Button>
        </div>

        {/* Feedback Overlay */}
        <AnimatePresence>
          {isFeedback && currentAnswer && (
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-6 shadow-[0_-20px_40px_rgba(0,0,0,0.5)] z-50 rounded-t-3xl md:max-w-md md:mx-auto md:left-auto md:right-auto md:bottom-4 md:rounded-3xl md:border"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentAnswer.isCorrect ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}`}>
                    {currentAnswer.isCorrect ? <Shield className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                  </div>
                  <h3 className={`text-xl font-heading font-bold ${currentAnswer.isCorrect ? 'text-success' : 'text-destructive'}`}>
                    {currentAnswer.isCorrect ? 'Correct!' : 'Incorrect'}
                  </h3>
                </div>
                {currentAnswer.isCorrect && streak > 0 && streak % 3 === 0 && (
                  <div className="bg-warning/20 text-warning px-3 py-1 rounded-full text-xs font-bold animate-pulse flex items-center gap-1">
                    <Flame className="w-3 h-3" /> +25 STREAK
                  </div>
                )}
              </div>
              
              {currentScenario.redFlags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {currentScenario.redFlags.map(flag => (
                    <span key={flag} className="bg-destructive/10 text-destructive border border-destructive/20 px-2 py-1 rounded-md text-xs font-medium">
                      {flag}
                    </span>
                  ))}
                </div>
              )}
              
              <p className="text-sm text-foreground mb-3 font-medium">
                {currentScenario.explanation}
              </p>
              
              <div className="bg-accent/10 border border-accent/20 p-3 rounded-lg text-sm text-muted-foreground flex gap-3">
                <Shield className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <p>{currentScenario.safetyTip}</p>
              </div>

              <Button 
                onClick={() => {
                  nextRound();
                  setSelectedAnswer(null);
                }} 
                className="w-full mt-6 h-12 text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Next Round <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
