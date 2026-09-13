import { z } from 'zod';

// ==================== Auth Schemas ====================

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain alphanumeric characters, underscore, and hyphen'),
});

// ==================== Game Schemas ====================

export const gameResultSchema = z.object({
  gameId: z.string().cuid(),
  problemId: z.string().cuid(),
  wpm: z.number().min(0).max(500),
  accuracy: z.number().min(0).max(100),
  mistakes: z.number().min(0),
  timeSpent: z.number().min(1),
  combo: z.number().min(0),
});

// ==================== Room Schemas ====================

export const createRoomSchema = z.object({
  difficulty: z.enum(['VERY_EASY', 'EASY', 'NORMAL', 'HARD', 'VERY_HARD']),
  category: z.enum([
    'HIRAGANA',
    'WORD',
    'SHORT_TEXT',
    'LONG_TEXT',
    'ENGLISH_WORD',
    'NUMBER',
    'SYMBOL',
    'KANJI',
  ]),
});

// ==================== Admin Schemas ====================

export const createProblemSchema = z.object({
  problemText: z.string().min(1).max(500),
  category: z.enum([
    'HIRAGANA',
    'WORD',
    'SHORT_TEXT',
    'LONG_TEXT',
    'ENGLISH_WORD',
    'NUMBER',
    'SYMBOL',
    'KANJI',
  ]),
  difficulty: z.enum(['VERY_EASY', 'EASY', 'NORMAL', 'HARD', 'VERY_HARD']),
  minLevel: z.number().min(1).max(100),
});

export const updateUserSchema = z.object({
  level: z.number().min(1).max(100).optional(),
  totalExp: z.bigint().optional(),
  rank: z.string().optional(),
});
