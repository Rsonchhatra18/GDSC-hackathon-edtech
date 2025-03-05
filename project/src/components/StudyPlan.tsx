import React, { useState, useEffect } from 'react';
import { QuizResult, StudyResource } from '../types';
import { BookOpen, Video, FileText, Clock, Zap, BarChart3 } from 'lucide-react';

interface StudyPlanProps {
  quizResults: QuizResult[];
  darkMode: boolean;
  lowBandwidth: boolean;
}

const StudyPlan: React.FC<StudyPlanProps> = ({ quizResults, darkMode, lowBandwidth }) => {
  const [resources, setResources] = useState<StudyResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedResourceType, setSelectedResourceType] = useState<string>('all');

  // Generate study resources based on quiz results
  useEffect(() => {
    // Simulate API call to generate personalized study plan
    setTimeout(() => {
      // In a real app, this would be an API call that analyzes quiz results
      // and returns personalized resources
      
      // Extract weak areas from quiz results
      const weakAreas = quizResults.flatMap(result => 
        result.weakAreas || []
      );
      
      // Generate mock resources based on quiz results
      const mockResources: StudyResource[] = [
        {
          id: 1,
          title: 'Algebra Fundamentals',
          type: 'video',
          subject: 'Mathematics',
          area: 'Algebra',
          difficulty: 'beginner',
          duration: 15,
          url: 'https://example.com/algebra-fundamentals',
          lowBandwidth: true
        },
        {
          id: 2,
          title: 'Geometry Mastery',
          type: 'article',
          subject: 'Mathematics',
          area: 'Geometry',
          difficulty: 'intermediate',
          duration: 20,
          url: 'https://example.com/geometry-mastery',
          lowBandwidth: true
        },
        {
          id: 3,
          title: 'Advanced Algebra Concepts',
          type: 'practice',
          subject: 'Mathematics',
          area: 'Algebra',
          difficulty: 'advanced',
          duration: 30,
          url: 'https://example.com/advanced-algebra',
          lowBandwidth: true
        },
        {
          id: 4,
          title: 'Physics Principles',
          type: 'video',
          subject: 'Science',
          area: 'Physics',
          difficulty: 'beginner',
          duration: 25,
          url: 'https://example.com/physics-principles',
          lowBandwidth: false
        },
        {
          id: 5,
          title: 'Chemistry Basics',
          type: 'interactive',
          subject: 'Science',
          area: 'Chemistry',
          difficulty: 'beginner',
          duration: 40,
          url: 'https://example.com/chemistry-basics',
          lowBandwidth: false
        },
        {
          id: 6,
          title: 'Advanced Physics Problems',
          type: 'practice',
          subject: 'Science',
          area: 'Physics',
          difficulty: 'advanced',
          duration: 45,
          url: 'https://example.com/advanced-physics',
          lowBandwidth: true
        }
      ];
      
      // Filter resources based on low bandwidth preference
      const filteredResources = lowBandwidth 
        ? mockResources.filter(resource => resource.lowBandwidth)
        : mockResources;
      
      setResources(filteredResources);
      setLoading(false);
    }, 1500);
  }, [quizResults, lowBandwidth]);

  // Get unique subjects from resources
  const subjects = ['all', ...new Set(resources.map(resource => resource.subject))];
  
  // Get unique resource types
  const resourceTypes = ['all', ...new Set(resources.map(resource => resource.type))];

  // Filter resources based on selected filters
  const filteredResources = resources.filter(resource => {
    const matchesSubject = selectedSubject === 'all' || resource.subject === selectedSubject;
    const matchesType = selectedResourceType === 'all' || resource.type === selectedResourceType;
    return matchesSubject && matchesType;
  });

  // Get resource icon based on type
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-5 w-5 text-red-500" />;
      case 'article':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'practice':
        return <Zap className="h-5 w-5 text-yellow-500" />;
      case 'interactive':
        return <BarChart3 className="h-5 w-5 text-purple-500" />;
      default:
        return <BookOpen className="h-5 w-5 text-green-500" />;
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
        <h2 className="text-2xl font-bold mb-2">Your Personalized Study Plan</h2>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Based on your quiz results, we've created a customized study plan to help you improve.
          {lowBandwidth && (
            <span className="ml-2 text-green-500 font-medium">
              Low bandwidth mode active - showing optimized resources.
            </span>
          )}
        </p>
      </div>

      {/* Filters */}
      <div className={`p-4 rounded-lg mb-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className={`rounded-md px-3 py-1.5 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-700'
              } border`}
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>
                  {subject === 'all' ? 'All Subjects' : subject}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Resource Type</label>
            <select
              value={selectedResourceType}
              onChange={(e) => setSelectedResourceType(e.target.value)}
              className={`rounded-md px-3 py-1.5 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-700'
              } border`}
            >
              {resourceTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Resources */}
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredResources.map(resource => (
            <div 
              key={resource.id} 
              className={`p-5 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className="flex items-start">
                <div className={`p-2 rounded-md mr-4 ${
                  resource.type === 'video' ? 'bg-red-100' :
                  resource.type === 'article' ? 'bg-blue-100' :
                  resource.type === 'practice' ? 'bg-yellow-100' :
                  'bg-purple-100'
                }`}>
                  {getResourceIcon(resource.type)}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{resource.title}</h3>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {resource.subject}
                    </span>
                    
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      darkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {resource.area}
                    </span>
                    
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      resource.difficulty === 'beginner' 
                        ? (darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800')
                        : resource.difficulty === 'intermediate'
                          ? (darkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800')
                          : (darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800')
                    }`}>
                      {resource.difficulty.charAt(0).toUpperCase() + resource.difficulty.slice(1)}
                    </span>
                    
                    {resource.lowBandwidth && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
                      }`}>
                        Low Bandwidth
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center text-sm mb-4">
                    <Clock className="h-4 w-4 mr-1 text-gray-500" />
                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {resource.duration} minutes
                    </span>
                  </div>
                  
                  <a 
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                  >
                    {resource.type === 'video' ? 'Watch Video' :
                     resource.type === 'article' ? 'Read Article' :
                     resource.type === 'practice' ? 'Practice Now' :
                     'Start Learning'}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={`p-8 rounded-lg text-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-medium mb-2">No resources found</h3>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Try adjusting your filters or take more quizzes to get personalized recommendations.
          </p>
        </div>
      )}
    </div>
  );
};

export default StudyPlan;