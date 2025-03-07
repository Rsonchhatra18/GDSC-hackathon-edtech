import React, { useState, useEffect } from 'react';
import { Sun, Moon, BookOpen, Award, BarChart3, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import QuizSection from './components/QuizSection';
import StudyPlan from './components/StudyPlan';
import Leaderboard from './components/Leaderboard';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [lowBandwidth, setLowBandwidth] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [quizResults, setQuizResults] = useState([]);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

  useEffect(() => {
    if (userData && (darkMode || lowBandwidth)) {
      console.log('Sustainable habits tracked:', { darkMode, lowBandwidth });
    }
  }, [darkMode, lowBandwidth, userData]);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUserData(user);
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

  const handleQuizSubmit = (result) => {
    setQuizResults([...quizResults, result]);
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-200`}>
      <motion.header 
        className={`${darkMode ? 'bg-gray-800/50 backdrop-blur-lg' : 'bg-white/50 backdrop-blur-lg'} shadow-lg sticky top-0 z-50`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EcoLearn
            </h1>
          </motion.div>
          
          {isLoggedIn && userData && (
            <div className="flex items-center space-x-4">
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
              >
                <span className="font-medium">{userData.name}</span>
                <User className="h-5 w-5" />
              </motion.div>
              <motion.button 
                onClick={handleLogout}
                className="flex items-center space-x-1 text-red-500 hover:text-red-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </motion.button>
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
                <motion.div 
                  className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                  whileHover={{ scale: 1.05 }}
                ></motion.div>
              </label>
            </div>
            <motion.button 
              onClick={() => setDarkMode(!darkMode)} 
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {!isLoggedIn ? (
            <motion.div key="login" {...fadeIn}>
              <Login onLogin={handleLogin} darkMode={darkMode} />
            </motion.div>
          ) : (
            <motion.div key="content" {...fadeIn}>
              <div className={`flex border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} mb-6 overflow-x-auto`}>
                {['dashboard', 'quiz', 'study-plan', 'leaderboard'].map((tab) => (
                  <motion.button 
                    key={tab}
                    onClick={() => setActiveTab(tab)} 
                    className={`py-2 px-4 font-medium whitespace-nowrap ${
                      activeTab === tab 
                        ? 'border-b-2 border-blue-500 text-blue-500' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </motion.button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === 'dashboard' && <Dashboard userData={userData} quizResults={quizResults} darkMode={darkMode} />}
                  {activeTab === 'quiz' && <QuizSection onQuizSubmit={handleQuizSubmit} darkMode={darkMode} lowBandwidth={lowBandwidth} />}
                  {activeTab === 'study-plan' && <StudyPlan quizResults={quizResults} darkMode={darkMode} lowBandwidth={lowBandwidth} />}
                  {activeTab === 'leaderboard' && <Leaderboard darkMode={darkMode} />}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <motion.footer 
        className={`${darkMode ? 'bg-gray-800/50 backdrop-blur-lg' : 'bg-gray-200/50 backdrop-blur-lg'} py-6`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold mb-2">© 2025 EcoLearn - Sustainable Learning Platform</p>
          <p className="text-sm">
            {darkMode ? 'Dark mode enabled - saving energy! 🌱' : 'Consider enabling dark mode to save energy and reduce eye strain.'}
          </p>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;