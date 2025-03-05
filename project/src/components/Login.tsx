import React, { useState } from 'react';
import { UserData } from '../types';

interface LoginProps {
  onLogin: (userData: UserData) => void;
  darkMode: boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin, darkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      // In a real app, this would be an API call to authenticate
      if (email && password) {
        const mockUserData: UserData = {
          id: '1',
          name: 'Alex Johnson',
          email: email,
          sustainabilityScore: 75,
          joinDate: new Date().toISOString(),
        };
        onLogin(mockUserData);
      } else {
        setError('Please enter both email and password');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className={`w-full max-w-md p-8 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome to EcoLearn</h2>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            The sustainable learning platform that adapts to your needs
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`w-full px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className={`w-full px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md font-medium ${
              isLoading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white transition duration-200`}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="mt-4 text-center">
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Don't have an account?{' '}
              <button type="button" className="text-blue-500 hover:underline">
                Sign up
              </button>
            </p>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t text-center">
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            By signing in, you're helping the environment! Our platform tracks sustainable study habits.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;