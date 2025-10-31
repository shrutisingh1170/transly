export type UserRole = 'general' | 'educator' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  points: number;
  rank: number;
  quizzesCompleted: number;
  translationsCount: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

export interface Translation {
  id: string;
  userId: string;
  sourceLanguage: 'nepali' | 'sinhalese';
  targetLanguage: 'english';
  sourceText: string;
  translatedText: string;
  timestamp: string;
  isFavorite: boolean;
}

export interface Quiz {
  id: string;
  title: string;
  language: 'nepali' | 'sinhalese';
  questions: Question[];
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'listening';
  question: string;
  options?: string[];
  correctAnswer: string;
  points: number;
  audioUrl?: string;
}

export interface QuizResult {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  totalPoints: number;
  completedAt: string;
  answers: { questionId: string; userAnswer: string; correct: boolean }[];
}

export interface Document {
  id: string;
  userId: string;
  name: string;
  type: string;
  uploadedAt: string;
  sourceLanguage: 'nepali' | 'sinhalese';
  translatedText?: string;
  originalText?: string;
  status: 'processing' | 'completed' | 'error';
}
