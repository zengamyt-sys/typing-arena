// Type definitions for API responses and requests

// ==================== Auth Types ====================

export interface AuthPayload {
  id: string;
  email: string;
  username: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
}

export interface AuthResponse {
  token: string;
  user: AuthPayload;
}

// ==================== User Types ====================

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  profileImage?: string;
  bio?: string;
  level: number;
  totalExp: bigint;
  wins: number;
  losses: number;
  gamesPlayed: number;
  bestWpm: number;
  averageWpm: number;
  bestAccuracy: number;
  averageAccuracy: number;
  rank: string;
  rankPoints: number;
  selectedTitle?: string;
  totalCombo: number;
  createdAt: Date;
  lastLoginAt?: Date;
}

export interface GameStats {
  wpm: number;
  accuracy: number;
  mistakes: number;
  timeSpent: number;
  combo: number;
  expGained: number;
}

// ==================== Game Types ====================

export interface TypingProblemResponse {
  id: string;
  problemText: string;
  category: string;
  difficulty: string;
  minLevel: number;
}

export interface GameResultRequest {
  gameId: string;
  problemId: string;
  wpm: number;
  accuracy: number;
  mistakes: number;
  timeSpent: number;
  combo: number;
}

export interface GameResultResponse {
  id: string;
  userId: string;
  gameId: string;
  wpm: number;
  accuracy: number;
  mistakes: number;
  timeSpent: number;
  expGained: number;
  comboAchieved: number;
  rank: number;
  levelUp?: boolean;
  newLevel?: number;
}

// ==================== Room Types ====================

export interface CreateRoomRequest {
  difficulty: string;
  category: string;
}

export interface RoomResponse {
  id: string;
  code: string;
  hostId: string;
  maxPlayers: number;
  currentPlayers: number;
  difficulty: string;
  category: string;
  isActive: boolean;
  createdAt: Date;
}

export interface RoomPlayerResponse {
  id: string;
  username: string;
  profileImage?: string;
  isReady: boolean;
  level: number;
  joinedAt: Date;
}

// ==================== Ranking Types ====================

export interface RankingResponse {
  position: number;
  userId: string;
  username: string;
  level: number;
  totalExp: bigint;
  wins: number;
  losses: number;
  bestWpm: number;
  averageWpm: number;
  bestAccuracy: number;
  averageAccuracy: number;
  rank: string;
  rankPoints: number;
}

// ==================== Achievement Types ====================

export interface AchievementResponse {
  id: string;
  name: string;
  description: string;
  icon?: string;
  condition: string;
  isUnlocked: boolean;
  unlockedAt?: Date;
}

// ==================== Mission Types ====================

export interface MissionResponse {
  id: string;
  name: string;
  description: string;
  missionType: string;
  targetValue: number;
  progress: number;
  isCompleted: boolean;
  rewardExp: number;
  completedAt?: Date;
}

// ==================== Admin Types ====================

export interface AdminUserResponse {
  id: string;
  email: string;
  username: string;
  role: string;
  level: number;
  isBanned: boolean;
  createdAt: Date;
  lastLoginAt?: Date;
}

export interface AdminProblemRequest {
  problemText: string;
  category: string;
  difficulty: string;
  minLevel: number;
}

export interface EventResponse {
  id: string;
  name: string;
  description?: string;
  eventType: string;
  multiplier: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

// ==================== Error Types ====================

export interface ErrorResponse {
  success: false;
  message: string;
  code?: string;
}

export interface SuccessResponse<T> {
  success: true;
  data: T;
}
