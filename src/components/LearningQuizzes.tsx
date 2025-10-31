import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { mockQuizzes, Quiz, Question } from '../lib/mockData';
import { ArrowRight, Trophy, Star, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export const LearningQuizzes = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');

  const startQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    setScore(0);
    setUserAnswer('');
  };

  const handleAnswer = (answer: string) => {
    if (!selectedQuiz) return;

    const currentQuestion = selectedQuiz.questions[currentQuestionIndex];
    const isCorrect = answer.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase().trim();

    setAnswers({ ...answers, [currentQuestion.id]: answer });

    if (isCorrect) {
      setScore(score + currentQuestion.points);
      toast.success('Correct! +' + currentQuestion.points + ' points');
    } else {
      toast.error('Incorrect. The answer was: ' + currentQuestion.correctAnswer);
    }

    setTimeout(() => {
      if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setUserAnswer('');
      } else {
        setShowResults(true);
      }
    }, 1500);
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      easy: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
      medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
      hard: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
    };
    return colors[difficulty as keyof typeof colors] || colors.easy;
  };

  if (showResults && selectedQuiz) {
    const percentage = (score / selectedQuiz.points) * 100;
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-10 w-10 text-white" />
            </div>
            <CardTitle>Quiz Completed!</CardTitle>
            <CardDescription>{selectedQuiz.title}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">
                {score} / {selectedQuiz.points}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Points Earned</p>
              <Progress value={percentage} className="h-3" />
              <p className="text-sm text-gray-500 mt-2">{percentage.toFixed(0)}% Accuracy</p>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <div className="text-2xl mb-1">{selectedQuiz.questions.length}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Questions</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                <div className="text-2xl mb-1">
                  {Object.keys(answers).filter(
                    (id) => answers[id].toLowerCase() === selectedQuiz.questions.find((q) => q.id === id)?.correctAnswer.toLowerCase()
                  ).length}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Correct</p>
              </div>
              <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                <div className="text-2xl mb-1">{score}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Points</p>
              </div>
            </div>

            {percentage >= 80 && (
              <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 rounded-lg border-2 border-yellow-200 dark:border-yellow-800">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-yellow-600" />
                  <h4 className="text-yellow-800 dark:text-yellow-300">Badge Earned!</h4>
                </div>
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  Quiz Master - Scored above 80%!
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <Button onClick={() => setSelectedQuiz(null)} variant="outline" className="flex-1">
                Back to Quizzes
              </Button>
              <Button onClick={() => startQuiz(selectedQuiz)} className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (selectedQuiz) {
    const currentQuestion = selectedQuiz.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100;

    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <CardTitle>{selectedQuiz.title}</CardTitle>
              <Badge className={getDifficultyColor(selectedQuiz.difficulty)}>
                {selectedQuiz.difficulty}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}</span>
                <span>Score: {score} pts</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg">
              <p className="text-lg">{currentQuestion.question}</p>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-600 dark:text-gray-400">
                <Trophy className="h-4 w-4" />
                <span>{currentQuestion.points} points</span>
              </div>
            </div>

            {currentQuestion.type === 'multiple-choice' && currentQuestion.options ? (
              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option)}
                    className="w-full p-4 text-left border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <Input
                  placeholder="Type your answer..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && userAnswer.trim() && handleAnswer(userAnswer)}
                />
                <Button
                  onClick={() => handleAnswer(userAnswer)}
                  disabled={!userAnswer.trim()}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  Submit Answer
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="mb-2">Learning Quizzes</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Test your knowledge and earn points with gamified quizzes
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockQuizzes.map((quiz) => (
          <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <CardTitle className="text-lg">{quiz.title}</CardTitle>
                <Badge className={getDifficultyColor(quiz.difficulty)}>
                  {quiz.difficulty}
                </Badge>
              </div>
              <CardDescription>
                {quiz.language.charAt(0).toUpperCase() + quiz.language.slice(1)} → English
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{quiz.questions.length} Questions</span>
                </div>
                <div className="flex items-center gap-2 text-yellow-600">
                  <Trophy className="h-4 w-4" />
                  <span>{quiz.points} pts</span>
                </div>
              </div>
              <Button
                onClick={() => startQuiz(quiz)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
              >
                Start Quiz
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl mb-2">8</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Quizzes Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl mb-2">1,250</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Points</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl mb-2">87%</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Avg Accuracy</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl mb-2">🏆</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Rank #1</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
