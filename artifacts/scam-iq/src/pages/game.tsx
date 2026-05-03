import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Shield, AlertTriangle, XCircle, Flame, ArrowRight, X } from 'lucide-react';
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
    return undefined;
  }, [phase, countdown, setPhase]);

  useEffect(() => {
    if (phase === 'results') {
      setLocation('/results');
    }
    return undefined;
  }, [phase, setLocation]);

  useEffect(() => {
    if (phase === 'feedback') {
      const currentAnswer = answers[currentRoundIndex];
      if (currentAnswer?.isCorrect) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#58cc02', '#1cb0f6', '#ffc800']
        });
      }
      
      const timer = setTimeout(() => {
        nextRound();
        setSelectedAnswer(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [phase, answers, currentRoundIndex, nextRound]);

  if (scenarios.length === 0) return null;

  const currentScenario = scenarios[currentRoundIndex];
  const progress = ((currentRoundIndex) / 8) * 100;

  if (phase === 'intro') {
    return (
      <div
        className="min-h-[100dvh] flex flex-col items-center justify-center p-6"
        style={{ background: '#fff', fontFamily: "'Nunito', sans-serif" }}
      >
        <motion.div 
          key={countdown}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.5 }}
          className="text-8xl font-black mb-8"
          style={{ color: '#58cc02' }}
        >
          {countdown > 0 ? countdown : 'GO!'}
        </motion.div>
        <div className="text-xl font-bold text-center max-w-sm" style={{ color: '#777' }}>
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
    <div
      className="min-h-[100dvh] flex flex-col items-center p-4 md:p-6 pb-24 overflow-x-hidden relative"
      style={{ background: '#fff', fontFamily: "'Nunito', sans-serif" }}
    >
      <div className="w-full max-w-md mx-auto flex flex-col h-full relative">
        
        {/* ── TOP BAR (Duolingo style) ── */}
        <div className="flex items-center gap-3 mb-6">
          {/* Close / Exit button */}
          <button
            onClick={() => setLocation('/')}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ color: '#afafaf' }}
            aria-label="Exit game"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Progress bar */}
          <div
            className="flex-1 h-4 rounded-full overflow-hidden"
            style={{ background: '#e5e5e5' }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
              className="h-full rounded-full"
              style={{ background: '#58cc02' }}
            />
          </div>

          {/* Score */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Flame
                className="w-5 h-5"
                style={{ color: streak >= 3 ? '#ff9600' : '#e5e5e5' }}
              />
              <span className="font-extrabold text-sm" style={{ color: streak >= 3 ? '#ff9600' : '#afafaf' }}>
                {streak}
              </span>
            </div>
          </div>
        </div>

        {/* Round indicator */}
        <div className="text-center mb-4">
          <span className="text-sm font-bold" style={{ color: '#afafaf' }}>
            ROUND {currentRoundIndex + 1} OF 8
          </span>
        </div>

        {/* ── SCENARIO CARD ── */}
        <div className="flex-1 flex flex-col justify-center relative w-full">
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
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    border: '2px solid #e5e5e5',
                    borderBottomWidth: '4px',
                    background: '#fff',
                  }}
                >
                  <ScenarioCard scenario={currentScenario} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── ANSWER BUTTONS (Duolingo 3D style) ── */}
        <div className="mt-8 flex flex-col gap-3 relative">
          <p className="text-center text-sm font-bold mb-1" style={{ color: '#777' }}>
            What is this message?
          </p>

          {/* SAFE */}
          <button
            onClick={() => handleAnswer('safe')}
            disabled={isFeedback}
            id="btn-safe"
            data-testid="btn-answer-safe"
            className="duo-btn w-full py-4 text-base"
            style={{
              background: isFeedback && currentScenario.correctAnswer === 'safe'
                ? '#58cc02' : isFeedback && selectedAnswer === 'safe' && !currentAnswer?.isCorrect
                ? '#ff4b4b' : '#fff',
              color: isFeedback && (currentScenario.correctAnswer === 'safe' || (selectedAnswer === 'safe' && !currentAnswer?.isCorrect))
                ? '#fff' : '#58cc02',
              borderColor: isFeedback && currentScenario.correctAnswer === 'safe'
                ? '#58a700' : '#58cc02',
              borderBottomWidth: '6px',
              opacity: isFeedback && selectedAnswer !== 'safe' && currentScenario.correctAnswer !== 'safe' ? 0.4 : 1,
            }}
          >
            <Shield className="w-5 h-5 mr-2" />
            SAFE
          </button>

          {/* SUSPICIOUS */}
          <button
            onClick={() => handleAnswer('suspicious')}
            disabled={isFeedback}
            id="btn-suspicious"
            data-testid="btn-answer-suspicious"
            className="duo-btn w-full py-4 text-base"
            style={{
              background: isFeedback && currentScenario.correctAnswer === 'suspicious'
                ? '#ffc800' : isFeedback && selectedAnswer === 'suspicious' && !currentAnswer?.isCorrect
                ? '#ff4b4b' : '#fff',
              color: isFeedback && (currentScenario.correctAnswer === 'suspicious' || (selectedAnswer === 'suspicious' && !currentAnswer?.isCorrect))
                ? '#fff' : '#ffc800',
              borderColor: isFeedback && currentScenario.correctAnswer === 'suspicious'
                ? '#e5b400' : '#ffc800',
              borderBottomWidth: '6px',
              opacity: isFeedback && selectedAnswer !== 'suspicious' && currentScenario.correctAnswer !== 'suspicious' ? 0.4 : 1,
            }}
          >
            <AlertTriangle className="w-5 h-5 mr-2" />
            SUSPICIOUS
          </button>

          {/* SCAM */}
          <button
            onClick={() => handleAnswer('scam')}
            disabled={isFeedback}
            id="btn-scam"
            data-testid="btn-answer-scam"
            className="duo-btn w-full py-4 text-base"
            style={{
              background: isFeedback && currentScenario.correctAnswer === 'scam'
                ? '#ff4b4b' : isFeedback && selectedAnswer === 'scam' && !currentAnswer?.isCorrect
                ? '#ff4b4b' : '#fff',
              color: isFeedback && (currentScenario.correctAnswer === 'scam' || (selectedAnswer === 'scam' && !currentAnswer?.isCorrect))
                ? '#fff' : '#ff4b4b',
              borderColor: isFeedback && currentScenario.correctAnswer === 'scam'
                ? '#ea2b2b' : '#ff4b4b',
              borderBottomWidth: '6px',
              opacity: isFeedback && selectedAnswer !== 'scam' && currentScenario.correctAnswer !== 'scam' ? 0.4 : 1,
            }}
          >
            <XCircle className="w-5 h-5 mr-2" />
            SCAM
          </button>
        </div>

        {/* ── FEEDBACK OVERLAY (Duolingo bottom sheet) ── */}
        <AnimatePresence>
          {isFeedback && currentAnswer && (
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed bottom-0 left-0 right-0 p-6 z-50 rounded-t-3xl md:max-w-md md:mx-auto"
              style={{
                background: currentAnswer.isCorrect ? '#d7ffb8' : '#ffdfe0',
                borderTop: `3px solid ${currentAnswer.isCorrect ? '#58cc02' : '#ff4b4b'}`,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: currentAnswer.isCorrect ? '#58cc02' : '#ff4b4b',
                      color: '#fff',
                    }}
                  >
                    {currentAnswer.isCorrect
                      ? <Shield className="w-5 h-5" />
                      : <XCircle className="w-5 h-5" />}
                  </div>
                  <h3
                    className="text-2xl font-black"
                    style={{ color: currentAnswer.isCorrect ? '#58a700' : '#ea2b2b' }}
                  >
                    {currentAnswer.isCorrect ? 'Correct!' : 'Incorrect'}
                  </h3>
                </div>
                {currentAnswer.isCorrect && streak > 0 && streak % 3 === 0 && (
                  <div
                    className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
                    style={{ background: '#fff3cd', color: '#ff9600' }}
                  >
                    <Flame className="w-3 h-3" /> +25 STREAK
                  </div>
                )}
              </div>
              
              {currentScenario.redFlags.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {currentScenario.redFlags.map((flag: string) => (
                    <span
                      key={flag}
                      className="px-2 py-1 rounded-full text-xs font-bold"
                      style={{
                        background: currentAnswer.isCorrect ? '#c2f0a0' : '#ffcccf',
                        color: currentAnswer.isCorrect ? '#3a7d0a' : '#b91c1c',
                      }}
                    >
                      {flag}
                    </span>
                  ))}
                </div>
              )}
              
              <p className="text-sm mb-3 font-semibold" style={{ color: '#3c3c3c' }}>
                {currentScenario.explanation}
              </p>
              
              <div
                className="p-3 rounded-xl text-sm flex gap-3 mb-4"
                style={{
                  background: currentAnswer.isCorrect ? '#c2f0a0' : '#ffcccf',
                  color: '#3c3c3c',
                }}
              >
                <Shield className="w-4 h-4 shrink-0 mt-0.5" style={{ color: currentAnswer.isCorrect ? '#58a700' : '#ea2b2b' }} />
                <p>{currentScenario.safetyTip}</p>
              </div>

              <button
                onClick={() => {
                  nextRound();
                  setSelectedAnswer(null);
                }} 
                className="duo-btn w-full py-4 text-base"
                style={{
                  background: currentAnswer.isCorrect ? '#58cc02' : '#ff4b4b',
                  color: '#fff',
                  borderColor: currentAnswer.isCorrect ? '#58a700' : '#ea2b2b',
                  borderBottomWidth: '6px',
                }}
              >
                CONTINUE <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
