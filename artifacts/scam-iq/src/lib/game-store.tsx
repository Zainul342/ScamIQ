import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Scenario } from '@workspace/api-client-react';
import { SCENARIOS } from '../data/scenarios';

type GamePhase = 'intro' | 'playing' | 'feedback' | 'results';

interface UserAnswer {
  scenarioId: string;
  scenario: Scenario;
  answer: string;
  isCorrect: boolean;
}

interface GameState {
  phase: GamePhase;
  scenarios: Scenario[];
  currentRoundIndex: number;
  answers: UserAnswer[];
  score: number;
  streak: number;
  bestStreak: number;
  setPhase: (phase: GamePhase) => void;
  startGame: (aiScenarios?: Scenario[]) => void;
  answerRound: (answer: string) => void;
  nextRound: () => void;
  resetGame: () => void;
}

const GameContext = createContext<GameState | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const startGame = useCallback((aiScenarios?: Scenario[]) => {
    if (aiScenarios && aiScenarios.length >= 8) {
      setScenarios(aiScenarios.slice(0, 8));
    } else {
      // Pick 8 random scenarios from static dataset
      // Ensure at least 1 safe and 4 different types
      const shuffled = [...SCENARIOS].sort(() => Math.random() - 0.5);
      const safeScenarios = shuffled.filter(s => s.correctAnswer === 'safe');
      
      let selected: Scenario[] = [];
      if (safeScenarios.length > 0) {
        selected.push(safeScenarios[0]);
        shuffled.splice(shuffled.findIndex(s => s.id === safeScenarios[0].id), 1);
      }
      
      const needed = 8 - selected.length;
      selected = [...selected, ...shuffled.slice(0, needed)].sort(() => Math.random() - 0.5);
      setScenarios(selected);
    }
    
    setCurrentRoundIndex(0);
    setAnswers([]);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setPhase('intro');
  }, []);

  const answerRound = useCallback((answer: string) => {
    const scenario = scenarios[currentRoundIndex];
    const isCorrect = answer === scenario.correctAnswer;
    
    let newScore = score;
    let newStreak = streak;
    let newBestStreak = bestStreak;
    
    if (isCorrect) {
      newScore += 100;
      newStreak += 1;
      if (newStreak > newBestStreak) {
        newBestStreak = newStreak;
      }
      if (newStreak >= 3 && newStreak % 3 === 0) {
        newScore += 25; // Streak bonus
      }
    } else {
      newStreak = 0;
    }
    
    setScore(newScore);
    setStreak(newStreak);
    setBestStreak(newBestStreak);
    
    setAnswers(prev => [...prev, {
      scenarioId: scenario.id,
      scenario,
      answer,
      isCorrect
    }]);
    
    setPhase('feedback');
  }, [scenarios, currentRoundIndex, score, streak, bestStreak]);

  const nextRound = useCallback(() => {
    if (currentRoundIndex >= 7) {
      setPhase('results');
    } else {
      setCurrentRoundIndex(prev => prev + 1);
      setPhase('playing');
    }
  }, [currentRoundIndex]);

  const resetGame = useCallback(() => {
    setPhase('intro');
    setScenarios([]);
    setCurrentRoundIndex(0);
    setAnswers([]);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
  }, []);

  const value = {
    phase,
    scenarios,
    currentRoundIndex,
    answers,
    score,
    streak,
    bestStreak,
    setPhase,
    startGame,
    answerRound,
    nextRound,
    resetGame
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
