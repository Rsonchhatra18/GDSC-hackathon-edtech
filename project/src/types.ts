export interface UserData {
  id: string;
  name: string;
  email: string;
  sustainabilityScore: number;
  joinDate: string;
}

export interface QuizResult {
  id: number;
  subject: string;
  score: number;
  areas: string[];
  timestamp?: string;
  weakAreas?: string[];
  strongAreas?: string[];
}

export interface StudyResource {
  id: number;
  title: string;
  type: 'video' | 'article' | 'practice' | 'interactive';
  subject: string;
  area: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  url: string;
  lowBandwidth: boolean;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  sustainabilityScore: number;
  rank: number;
  badges: string[];
  darkModeHours: number;
  lowBandwidthHours: number;
}