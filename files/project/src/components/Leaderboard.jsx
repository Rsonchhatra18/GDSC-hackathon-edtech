import React, { useState, useEffect } from 'react';
import { Award, Moon, Wifi, User } from 'lucide-react';

function Leaderboard({ darkMode }) {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('week');

  useEffect(() => {
    // Simulate API call to fetch leaderboard data
    setLoading(true);
    setTimeout(() => {
      const mockLeaderboardData = [
        {
          id: '1',
          name: 'Alex Johnson',
          sustainabilityScore: 95,
          rank: 1,
          badges: ['Energy Saver', 'Night Owl'],
          darkModeHours: 42,
          lowBandwidthHours: 28
        },
        {
          id: '2',
          name: 'Jamie Smith',
          sustainabilityScore: 88,
          rank: 2,
          badges: ['Bandwidth Hero'],
          darkModeHours: 30,
          lowBandwidthHours: 45
        },
        {
          id: '3',
          name: 'Taylor Wilson',
          sustainabilityScore: 82,
          rank: 3,
          badges: ['Night Owl'],
          darkModeHours: 38,
          lowBandwidthHours: 15
        },
        {
          id: '4',
          name: 'Morgan Lee',
          sustainabilityScore: 79,
          rank: 4,
          badges: ['Energy Saver'],
          darkModeHours: 35,
          lowBandwidthHours: 10
        },
        {
          id: '5',
          name: 'Casey Brown',
          sustainabilityScore: 75,
          rank: 5,
          badges: ['Bandwidth Hero'],
          darkModeHours: 20,
          lowBandwidthHours: 30
        }
      ];

      // Adjust data based on timeframe
      if (timeframe === 'month') {
        mockLeaderboardData.forEach(user => {
          user.sustainabilityScore = Math.max(50, user.sustainabilityScore - 5);
          user.darkModeHours *= 4;
          user.lowBandwidthHours *= 4;
        });
      } else if (timeframe === 'allTime') {
        mockLeaderboardData.forEach(user => {
          user.sustainabilityScore = Math.max(40, user.sustainabilityScore - 10);
          user.darkModeHours *= 12;
          user.lowBandwidthHours *= 12;
        });
        // Shuffle the order a bit for all-time
        mockLeaderboardData.sort((a, b) => b.sustainabilityScore - a.sustainabilityScore);
        mockLeaderboardData.forEach((user, index) => {
          user.rank = index + 1;
        });
      }

      setLeaderboardData(mockLeaderboardData);
      setLoading(false);
    }, 1000);
  }, [timeframe]);

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Energy Saver':
        return darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800';
      case 'Night Owl':
        return darkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800';
      case 'Bandwidth Hero':
        return darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800';
      default:
        return darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800';
    }
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
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Sustainability Leaderboard</h2>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          See who's leading the way in sustainable study habits
        </p>
      </div>

      {/* Timeframe Selector */}
      <div className="flex space-x-2 mb-6">
        {['week', 'month', 'allTime'].map((period) => (
          <button
            key={period}
            onClick={() => setTimeframe(period)}
            className={`px-4 py-2 rounded-md ${
              timeframe === period
                ? 'bg-blue-600 text-white'
                : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {period === 'allTime' ? 'All Time' : `This ${period.charAt(0).toUpperCase() + period.slice(1)}`}
          </button>
        ))}
      </div>

      {/* Top 3 Users */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {leaderboardData.slice(0, 3).map((user, index) => (
          <div 
            key={user.id} 
            className={`p-6 rounded-lg shadow text-center ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } ${index === 0 ? 'border-2 border-yellow-400' : ''}`}
          >
            <Award className={`h-12 w-12 mx-auto mb-4 ${
              index === 0 ? 'text-yellow-400' : 
              index === 1 ? 'text-gray-400' : 
              'text-amber-600'
            }`} />
            
            <h3 className="text-xl font-bold mb-2">{user.name}</h3>
            
            <div className="flex justify-center space-x-2 mb-4">
              {user.badges.map((badge, badgeIndex) => (
                <span 
                  key={badgeIndex} 
                  className={`text-xs px-2 py-0.5 rounded-full ${getBadgeColor(badge)}`}
                >
                  {badge}
                </span>
              ))}
            </div>
            
            <div className="text-3xl font-bold mb-4 text-green-500">
              {user.sustainabilityScore}
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className={`p-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <Moon className="h-4 w-4 mx-auto mb-1 text-purple-500" />
                <div className="text-sm font-medium">{user.darkModeHours}h</div>
              </div>
              
              <div className={`p-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <Wifi className="h-4 w-4 mx-auto mb-1 text-blue-500" />
                <div className="text-sm font-medium">{user.lowBandwidthHours}h</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Leaderboard Table */}
      <div className={`rounded-lg shadow overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <table className="min-w-full">
          <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Score</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Dark Mode</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Low Bandwidth</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {leaderboardData.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center text-sm ${
                    user.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                    user.rank === 2 ? 'bg-gray-100 text-gray-800' :
                    user.rank === 3 ? 'bg-amber-100 text-amber-800' :
                    darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.rank}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <User className="h-8 w-8 text-gray-400 mr-3" />
                    <span className="font-medium">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-lg font-bold text-green-500">{user.sustainabilityScore}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Moon className="h-4 w-4 text-purple-500 mr-2" />
                    {user.darkModeHours}h
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Wifi className="h-4 w-4 text-blue-500 mr-2" />
                    {user.lowBandwidthHours}h
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;