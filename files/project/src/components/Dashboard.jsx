import React from 'react';
import { BarChart3, BookOpen, Clock, Award } from 'lucide-react';

function Dashboard({ userData, quizResults, darkMode }) {
  // Calculate average score
  const averageScore = quizResults.length > 0
    ? quizResults.reduce((sum, result) => sum + result.score, 0) / quizResults.length
    : 0;

  // Get recent quiz results
  const recentQuizzes = [...quizResults].sort((a, b) => {
    return (b.timestamp ? new Date(b.timestamp).getTime() : 0) - 
           (a.timestamp ? new Date(a.timestamp).getTime() : 0);
  }).slice(0, 3);

  // Identify weak areas across all quizzes
  const allAreas = quizResults.flatMap(result => result.areas);
  const areaFrequency = {};
  
  allAreas.forEach(area => {
    areaFrequency[area] = (areaFrequency[area] || 0) + 1;
  });

  const weakAreas = Object.entries(areaFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([area]) => area);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {userData.name}!</h2>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Your sustainability score: <span className="font-semibold text-green-500">{userData.sustainabilityScore}</span>
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center mb-4">
            <BarChart3 className="h-6 w-6 text-blue-500 mr-2" />
            <h3 className="text-lg font-semibold">Quiz Performance</h3>
          </div>
          <div className="text-3xl font-bold mb-2">{averageScore.toFixed(1)}%</div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Average score across all quizzes</p>
        </div>

        <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center mb-4">
            <BookOpen className="h-6 w-6 text-purple-500 mr-2" />
            <h3 className="text-lg font-semibold">Study Areas</h3>
          </div>
          <div className="text-3xl font-bold mb-2">{quizResults.length}</div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Subjects you've studied</p>
        </div>

        <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center mb-4">
            <Award className="h-6 w-6 text-green-500 mr-2" />
            <h3 className="text-lg font-semibold">Eco Impact</h3>
          </div>
          <div className="text-3xl font-bold mb-2">{userData.sustainabilityScore}</div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Your sustainability score</p>
        </div>
      </div>

      {/* Recent Quizzes */}
      <div className={`mb-8 p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h3 className="text-xl font-semibold mb-4">Recent Quiz Results</h3>
        {recentQuizzes.length > 0 ? (
          <div className="space-y-4">
            {recentQuizzes.map((quiz) => (
              <div key={quiz.id} className={`p-4 rounded-md ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{quiz.subject}</h4>
                  <span className={`px-2 py-1 rounded text-sm font-medium ${
                    quiz.score >= 80 ? 'bg-green-100 text-green-800' : 
                    quiz.score >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {quiz.score}%
                  </span>
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Areas: {quiz.areas.join(', ')}
                </div>
                {quiz.timestamp && (
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {new Date(quiz.timestamp).toLocaleDateString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className={`text-center py-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            No quiz results yet. Take a quiz to see your performance!
          </p>
        )}
      </div>

      {/* Recommended Focus Areas */}
      <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h3 className="text-xl font-semibold mb-4">Recommended Focus Areas</h3>
        {weakAreas.length > 0 ? (
          <div className="space-y-2">
            {weakAreas.map((area, index) => (
              <div key={index} className={`p-3 rounded ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                <p className="font-medium">{area}</p>
              </div>
            ))}
            <p className="mt-4 text-sm text-blue-500">
              View your personalized study plan for detailed recommendations →
            </p>
          </div>
        ) : (
          <p className={`text-center py-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Complete more quizzes to get personalized recommendations.
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;