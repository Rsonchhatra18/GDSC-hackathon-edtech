import React, { useState, useEffect } from 'react';
import { Sun, Moon, BookOpen, Award, BarChart3, User, LogOut } from 'lucide-react';
import QuizSection from './components/QuizSection';
import StudyPlan from './components/StudyPlan';
import Leaderboard from './components/Leaderboard';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { UserData, QuizResult } from './types';

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [lowBandwidth, setLowBandwidth] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);

  // Effect to check system preferences for dark mode
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

  // Effect to track sustainable habits
  useEffect(() => {
    if (userData && (darkMode || lowBandwidth)) {
      // In a real app, this would update the user's sustainability score in the backend
      console.log('Sustainable habits tracked:', { darkMode, lowBandwidth });
    }
  }, [darkMode, lowBandwidth, userData]);

  const handleLogin = (user: UserData) => {
    setIsLoggedIn(true);
    setUserData(user);
    // Mock quiz results - in a real app, these would come from the backend
    setQuizResults([
      { id: 1, subject: 'Mathematics', score: 75, areas: ['Algebra', 'Geometry'] },
      { id: 2, subject: 'Science', score: 85, areas: ['Physics', 'Chemistry'] },
    ]);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    setActiveTab('dashboard');
  };

  const handleQuizSubmit = (result: QuizResult) => {
    setQuizResults([...quizResults, result]);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} transition-colors duration-200`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold">EcoLearn</h1>
          </div>
          
          {isLoggedIn && userData && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="font-medium">{userData.name}</span>
                <User className="h-5 w-5" />
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-1 text-red-500 hover:text-red-700"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span>Low Bandwidth</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={lowBandwidth} 
                  onChange={() => setLowBandwidth(!lowBandwidth)} 
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!isLoggedIn ? (
          <Login onLogin={handleLogin} darkMode={darkMode} />
        ) : (
          <>
            {/* Navigation Tabs */}
            <div className={`flex border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} mb-6`}>
              <button 
                onClick={() => setActiveTab('dashboard')} 
                className={`py-2 px-4 font-medium ${activeTab === 'dashboard' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => setActiveTab('quiz')} 
                className={`py-2 px-4 font-medium ${activeTab === 'quiz' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
              >
                Take Quiz
              </button>
              <button 
                onClick={() => setActiveTab('study-plan')} 
                className={`py-2 px-4 font-medium ${activeTab === 'study-plan' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
              >
                Study Plan
              </button>
              <button 
                onClick={() => setActiveTab('leaderboard')} 
                className={`py-2 px-4 font-medium ${activeTab === 'leaderboard' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
              >
                Eco Leaderboard
              </button>
            </div>

            {/* Tab Content */}
            <div className="mt-6">
              {activeTab === 'dashboard' && <Dashboard userData={userData} quizResults={quizResults} darkMode={darkMode} />}
              {activeTab === 'quiz' && <QuizSection onQuizSubmit={handleQuizSubmit} darkMode={darkMode} lowBandwidth={lowBandwidth} />}
              {activeTab === 'study-plan' && <StudyPlan quizResults={quizResults} darkMode={darkMode} lowBandwidth={lowBandwidth} />}
              {activeTab === 'leaderboard' && <Leaderboard darkMode={darkMode} />}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className={`${darkMode ? 'bg-gray-800' : 'bg-gray-200'} py-6`}>
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 EcoLearn - Sustainable Learning Platform</p>
          <p className="text-sm mt-2">
            {darkMode ? 'Dark mode enabled - saving energy! 🌱' : 'Consider enabling dark mode to save energy and reduce eye strain.'}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;