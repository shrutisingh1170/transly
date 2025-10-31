import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  GraduationCap, 
  Brain,
  BookOpen,
  Trophy,
  Star,
  CheckCircle2,
  XCircle,
  Zap,
  Target
} from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const InteractiveLearning = () => {
  const [currentXP, setCurrentXP] = useState(450);
  const [level, setLevel] = useState(3);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const xpToNextLevel = 500;
  const progressPercent = (currentXP / xpToNextLevel) * 100;

  const questions: Question[] = [
    {
      id: 1,
      question: 'What is the correct translation of "नमस्ते"?',
      options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
      correct: 0,
      explanation: '"नमस्ते" (Namaste) is a traditional greeting meaning "Hello" or "I bow to you"'
    },
    {
      id: 2,
      question: 'Which word means "Education" in Nepali?',
      options: ['शिक्षा', 'किताब', 'विद्यालय', 'अध्ययन'],
      correct: 0,
      explanation: '"शिक्षा" (Shiksha) directly translates to "Education"'
    },
    {
      id: 3,
      question: 'Arrange these words to form: "I am from Nepal"',
      options: [
        'म नेपालबाट हुँ',
        'नेपाल म हुँ बाट',
        'हुँ म नेपालबाट',
        'बाट नेपाल म हुँ'
      ],
      correct: 0,
      explanation: 'The correct order in Nepali is: म (I) नेपालबाट (from Nepal) हुँ (am)'
    },
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (index: number) => {
    if (!showResult) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmit = () => {
    setShowResult(true);
    if (selectedAnswer === currentQuestion.correct) {
      setScore(score + 1);
      setCurrentXP(currentXP + 50);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const flashcards = [
    { nepali: 'नमस्ते', english: 'Hello', category: 'Greetings' },
    { nepali: 'धन्यवाद', english: 'Thank you', category: 'Greetings' },
    { nepali: 'शिक्षा', english: 'Education', category: 'Academic' },
    { nepali: 'पुस्तक', english: 'Book', category: 'Academic' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2>Interactive Learning Companion</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Gamified language learning with quizzes and flashcards
            </p>
          </div>
        </div>
      </motion.div>

      {/* Progress Tracker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 border-none">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-violet-600 rounded-xl">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Current Level</p>
                  <p className="text-2xl font-medium">Level {level}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">XP Progress</p>
                <p className="text-2xl font-medium">{currentXP} / {xpToNextLevel}</p>
              </div>
            </div>
            <Progress value={progressPercent} className="h-3" />
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 text-center">
              {xpToNextLevel - currentXP} XP to next level
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Learning Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardContent className="pt-6">
            <Tabs defaultValue="quizzes" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="quizzes" className="gap-2">
                  <Brain className="h-4 w-4" />
                  Quizzes
                </TabsTrigger>
                <TabsTrigger value="flashcards" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  Flashcards
                </TabsTrigger>
                <TabsTrigger value="cultural" className="gap-2">
                  <Target className="h-4 w-4" />
                  Cultural Notes
                </TabsTrigger>
              </TabsList>

              {/* Quizzes Tab */}
              <TabsContent value="quizzes" className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3>Translation Challenge</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </p>
                  </div>
                  <Badge className="bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300">
                    Score: {score}/{questions.length}
                  </Badge>
                </div>

                <Progress 
                  value={((currentQuestionIndex + 1) / questions.length) * 100} 
                  className="h-2"
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuestion.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    {/* Question */}
                    <div className="p-6 bg-violet-50 dark:bg-violet-950/30 rounded-xl">
                      <p className="text-xl font-medium">{currentQuestion.question}</p>
                    </div>

                    {/* Options */}
                    <div className="grid gap-3">
                      {currentQuestion.options.map((option, index) => {
                        const isSelected = selectedAnswer === index;
                        const isCorrect = index === currentQuestion.correct;
                        const showCorrect = showResult && isCorrect;
                        const showIncorrect = showResult && isSelected && !isCorrect;

                        return (
                          <motion.button
                            key={index}
                            onClick={() => handleAnswerSelect(index)}
                            disabled={showResult}
                            className={`p-4 rounded-lg border-2 transition-all text-left ${
                              showCorrect
                                ? 'border-green-500 bg-green-50 dark:bg-green-950/30'
                                : showIncorrect
                                ? 'border-red-500 bg-red-50 dark:bg-red-950/30'
                                : isSelected
                                ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/30'
                                : 'border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-700'
                            }`}
                            whileHover={{ scale: showResult ? 1 : 1.02 }}
                            whileTap={{ scale: showResult ? 1 : 0.98 }}
                          >
                            <div className="flex items-center justify-between">
                              <span className={`font-${option.length > 10 ? '' : ''}['Noto_Sans_Devanagari'] text-lg`}>
                                {option}
                              </span>
                              {showCorrect && (
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                              )}
                              {showIncorrect && (
                                <XCircle className="h-5 w-5 text-red-600" />
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {showResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-lg ${
                          selectedAnswer === currentQuestion.correct
                            ? 'bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800'
                            : 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {selectedAnswer === currentQuestion.correct ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                          )}
                          <div>
                            <p className="font-medium mb-1">
                              {selectedAnswer === currentQuestion.correct ? 'Correct!' : 'Incorrect'}
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              {currentQuestion.explanation}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      {!showResult ? (
                        <Button
                          onClick={handleSubmit}
                          disabled={selectedAnswer === null}
                          className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600"
                        >
                          Submit Answer
                        </Button>
                      ) : (
                        <Button
                          onClick={handleNext}
                          disabled={currentQuestionIndex === questions.length - 1}
                          className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600"
                        >
                          {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next Question'}
                        </Button>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </TabsContent>

              {/* Flashcards Tab */}
              <TabsContent value="flashcards" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {flashcards.map((card, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.03 }}
                      className="cursor-pointer"
                    >
                      <Card className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 border-violet-200 dark:border-violet-800">
                        <CardContent className="pt-6">
                          <Badge className="mb-3 bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300">
                            {card.category}
                          </Badge>
                          <div className="text-center py-8">
                            <p className="font-['Noto_Sans_Devanagari'] text-3xl mb-4">
                              {card.nepali}
                            </p>
                            <div className="h-px bg-violet-200 dark:bg-violet-800 mx-8 mb-4"></div>
                            <p className="text-xl text-gray-700 dark:text-gray-300">
                              {card.english}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Cultural Notes Tab */}
              <TabsContent value="cultural" className="space-y-4">
                <div className="space-y-4">
                  {[
                    {
                      title: 'Greetings & Respect',
                      content: 'In Nepali culture, "नमस्ते" (Namaste) is more than a greeting. It represents recognition of the divine spark in every person and is often accompanied by a respectful bow.'
                    },
                    {
                      title: 'Educational Values',
                      content: 'Education ("शिक्षा") is highly valued in Nepali society. The guru-student relationship is considered sacred, and teachers are treated with great respect.'
                    },
                  ].map((note, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                              <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <p className="font-medium mb-2">{note.title}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {note.content}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-600" />
              <h3>Recent Achievements</h3>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              {['First Quiz', 'Fast Learner', 'Week Streak'].map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="flex-1 p-4 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 rounded-lg text-center border border-amber-200 dark:border-amber-800"
                >
                  <Trophy className="h-8 w-8 mx-auto mb-2 text-amber-600" />
                  <p className="text-sm font-medium">{achievement}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
