import React, { useState, useEffect } from 'react';
import { QuizResult } from '../types';
import { BookOpen, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface QuizSectionProps {
  onQuizSubmit: (result: QuizResult) => void;
  darkMode: boolean;
  lowBandwidth: boolean;
}

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface Quiz {
  id: number;
  subject: string;
  description: string;
  questions: Question[];
  duration: number; // in minutes
}

const QuizSection: React.FC<QuizSectionProps> = ({ onQuizSubmit, darkMode, lowBandwidth }) => {
  const [availableQuizzes, setAvailableQuizzes] = useState<Quiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch available quizzes
  useEffect(() => {
    // Simulate API call to fetch quizzes
    setTimeout(() => {
      const mockQuizzes: Quiz[] = [
        {
          id: 1,
          subject: 'Mathematics',
          description: 'Test your knowledge of basic algebra and geometry concepts',
          duration: 10,
          questions: [
            {
              id: 1,
              text: 'What is the value of x in the equation 2x + 5 = 15?',
              options: ['5', '7.5', '10', '5.5'],
              correctAnswer: 0
            },
            {
              id: 2,
              text: 'What is the area of a circle with radius 4 units?',
              options: ['16π square units', '8π square units', '4π square units', '12π square units'],
              correctAnswer: 0
            },
            {
              id: 3,
              text: 'Which of the following is a quadratic equation?',
              options: ['y = 2x + 3', 'y = x² + 2x + 1', 'y = 3/x', 'y = √x'],
              correctAnswer: 1
            },
            {
              id: 4,
              text: 'What is the Pythagorean theorem?',
              options: ['a² + b² = c²', 'a + b = c', 'a × b = c', '(a + b)² = c²'],
              correctAnswer: 0
            },
            {
              id: 5,
              text: 'What is the slope of a line with points (2,3) and (4,7)?',
              options: ['1', '2', '3', '4'],
              correctAnswer: 1
            }
          ]
        },
        {
          id: 2,
          subject: 'Science',
          description: 'Test your knowledge of basic physics and chemistry concepts',
          duration: 15,
          questions: [
            {
              id: 1,
              text: 'What is the chemical symbol for gold?',
              options: ['Go', 'Gd', 'Au', 'Ag'],
              correctAnswer: 2
            },
            {
              id: 2,
              text: 'Which of the following is Newton\'s First Law of Motion?',
              options: [
                'Force equals mass times acceleration',
                'For every action, there is an equal and opposite reaction',
                'An object at rest stays at rest unless acted upon by an external force',
                'Energy cannot be created or destroyed'
              ],
              correctAnswer: 2
            },
            {
              id: 3,
              text: 'What is the pH of a neutral solution?',
              options: ['0', '7', '14', '10'],
              correctAnswer: 1
            },
            {
              id: 4,
              text: 'Which of the following is NOT a state of matter?',
              options: ['Solid', 'Liquid', 'Gas', 'Energy'],
              correctAnswer: 3
            },
            {
              id: 5,
              text: 'What is the speed of light in a vacuum?',
              options: ['300,000 km/s', '150,000 km/s', '3,000 km/s', '30,000 km/s'],
              correctAnswer: 0
            }
          ]
        }
      ];
      setAvailableQuizzes(mockQuizzes);
      setLoading(false);
    }, 1000);
  }, []);

  // Set up timer when quiz is selected
  useEffect(() => {
    if (selectedQuiz && !quizCompleted) {
      setTimeLeft(selectedQuiz.duration * 60);
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleQuizSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [selectedQuiz, quizCompleted]);

  const handleQuizSelect = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setAnswers(new Array(quiz.questions.length).fill(-1));
    setQuizCompleted(false);
    setQuizResult(null);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (selectedQuiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleQuizSubmit();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleQuizSubmit = () => {
    if (!selectedQuiz) return;
    
    // Calculate score
    let correctCount = 0;
    const weakAreas: string[] = [];
    const strongAreas: string[] = [];
    
    selectedQuiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctCount++;
        // In a real app, we would categorize questions by area
        if (index % 2 === 0) {
          strongAreas.push(`Topic ${index + 1}`);
        }
      } else {
        // In a real app, we would categorize questions by area
        if (index % 2 === 0) {
          weakAreas.push(`Topic ${index + 1}`);
        }
      }
    });
    
    const score = Math.round((correctCount / selectedQuiz.questions.length) * 100);
    
    const result: QuizResult = {
      id: Date.now(),
      subject: selectedQuiz.subject,
      score: score,
      areas: selectedQuiz.subject === 'Mathematics' ? ['Algebra', 'Geometry'] : ['Physics', 'Chemistry'],
      timestamp: new Date().toISOString(),
      weakAreas,
      strongAreas
    };
    
    setQuizResult(result);
    setQuizCompleted(true);
    onQuizSubmit(result);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      {!selectedQuiz ? (
        // Quiz Selection Screen
        <div>
          <h2 className="text-2xl font-bold mb-6">Available Quizzes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableQuizzes.map(quiz => (
              <div 
                key={quiz.id} 
                className={`p-6 rounded-lg shadow cursor-pointer transition-transform hover:scale-105 ${
                  darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                }`}
                onClick={() => handleQuizSelect(quiz)}
              >
                <div className="flex items-center mb-3">
                  <BookOpen className="h-6 w-6 text-blue-500 mr-2" />
                  <h3 className="text-xl font-semibold">{quiz.subject}</h3>
                </div>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{quiz.description}</p>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-1 text-gray-500" />
                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {quiz.duration} minutes • {quiz.questions.length} questions
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : quizCompleted && quizResult ? (
        // Quiz Results Screen
        <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
          
          <div className="mb-6">
            <h3 className="text-xl mb-2">{selectedQuiz.subject}</h3>
            <div className="flex items-center">
              <div className={`text-2xl font-bold ${
                quizResult.score >= 80 ? 'text-green-500' : 
                quizResult.score >= 60 ? 'text-yellow-500' : 
                'text-red-500'
              }`}>
                {quizResult.score}%
              </div>
              <div className="ml-4 text-sm">
                {quizResult.score >= 80 ? (
                  <div className="flex items-center text-green-500">
                    <CheckCircle className="h-5 w-5 mr-1" />
                    Excellent!
                  </div>
                ) : quizResult.score >= 60 ? (
                  <div className="flex items-center text-yellow-500">
                    <AlertCircle className="h-5 w-5 mr-1" />
                    Good effort!
                  </div>
                ) : (
                  <div className="flex items-center text-red-500">
                    <AlertCircle className="h-5 w-5 mr-1" />
                    Needs improvement
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className={`p-4 rounded ${darkMode ? 'bg-gray-700' : 'bg-red-50'}`}>
              <h4 className="font-medium mb-2">Areas to Improve</h4>
              {quizResult.weakAreas && quizResult.weakAreas.length > 0 ? (
                <ul className="list-disc list-inside">
                  {quizResult.weakAreas.map((area, index) => (
                    <li key={index} className="text-sm">{area}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm">Great job! No specific weak areas identified.</p>
              )}
            </div>
            
            <div className={`p-4 rounded ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
              <h4 className="font-medium mb-2">Strong Areas</h4>
              {quizResult.strongAreas && quizResult.strongAreas.length > 0 ? (
                <ul className="list-disc list-inside">
                  {quizResult.strongAreas.map((area, index) => (
                    <li key={index} className="text-sm">{area}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm">Keep practicing to develop your strengths!</p>
              )}
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={() => setSelectedQuiz(null)}
              className={`px-4 py-2 rounded ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Back to Quizzes
            </button>
            
            <button
              onClick={() => {
                setSelectedQuiz(null);
                // In a real app, this would navigate to the study plan
              }}
              className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
            >
              View Study Plan
            </button>
          </div>
        </div>
      ) : (
        // Quiz Taking Screen
        <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">{selectedQuiz.subject} Quiz</h2>
            <div className={`px-3 py-1 rounded-full ${
              timeLeft > selectedQuiz.duration * 60 * 0.5 
                ? 'bg-green-100 text-green-800' 
                : timeLeft > selectedQuiz.duration * 60 * 0.25 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-red-100 text-red-800'
            }`}>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}</span>
              <span>{Math.round(((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {selectedQuiz.questions[currentQuestionIndex].text}
            </h3>
            
            <div className="space-y-3">
              {selectedQuiz.questions[currentQuestionIndex].options.map((option, index) => (
                <div 
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`p-3 rounded-md cursor-pointer ${
                    answers[currentQuestionIndex] === index
                      ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 border-2 border-blue-500')
                      : (darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200')
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`h-5 w-5 rounded-full mr-3 flex items-center justify-center ${
                      answers[currentQuestionIndex] === index
                        ? 'bg-blue-500 text-white'
                        : (darkMode ? 'bg-gray-600' : 'bg-white border border-gray-300')
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
              className={`px-4 py-2 rounded ${
                currentQuestionIndex === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : (darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300')
              }`}
            >
              Previous
            </button>
            
            <button
              onClick={handleNextQuestion}
              className={`px-4 py-2 rounded ${
                answers[currentQuestionIndex] === -1
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
              disabled={answers[currentQuestionIndex] === -1}
            >
              {currentQuestionIndex === selectedQuiz.questions.length - 1 ? 'Submit' : 'Next'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizSection;