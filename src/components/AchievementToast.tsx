import { useEffect } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const rarityColors = {
  common: 'from-gray-500 to-gray-600',
  rare: 'from-blue-500 to-blue-600',
  epic: 'from-purple-500 to-purple-600',
  legendary: 'from-yellow-500 to-orange-600'
};

export const showAchievement = (achievement: Achievement) => {
  toast.custom((t) => (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={`
        bg-gradient-to-r ${rarityColors[achievement.rarity]}
        text-white rounded-lg shadow-2xl p-4 min-w-[300px]
        border-2 border-white/20
      `}
    >
      <div className="flex items-center gap-3">
        <div className="text-4xl">{achievement.emoji}</div>
        <div className="flex-1">
          <div className="font-bold text-sm uppercase tracking-wide opacity-90">
            Achievement Unlocked!
          </div>
          <div className="font-bold text-lg">{achievement.title}</div>
          <div className="text-sm opacity-90">{achievement.description}</div>
        </div>
      </div>
    </motion.div>
  ), {
    duration: 5000,
    position: 'top-center'
  });
};

export const ACHIEVEMENTS: Record<string, Achievement> = {
  FIRST_VISIT: {
    id: 'FIRST_VISIT',
    title: 'Welcome!',
    description: 'Started your gaming journey',
    emoji: '🎮',
    rarity: 'common'
  },
  WEEK_STREAK: {
    id: 'WEEK_STREAK',
    title: 'Dedicated Gamer',
    description: 'Visited 7 days in a row!',
    emoji: '🌟',
    rarity: 'rare'
  },
  MONTH_STREAK: {
    id: 'MONTH_STREAK',
    title: 'Gaming Royalty',
    description: '30 day streak achieved!',
    emoji: '👑',
    rarity: 'epic'
  },
  HUNDRED_STREAK: {
    id: 'HUNDRED_STREAK',
    title: 'Ultimate Legend',
    description: '100 days! Unstoppable!',
    emoji: '🚀',
    rarity: 'legendary'
  },
  GAME_MASTER: {
    id: 'GAME_MASTER',
    title: 'Game Master',
    description: 'Played 10 different games',
    emoji: '🏆',
    rarity: 'rare'
  },
  EXPLORER: {
    id: 'EXPLORER',
    title: 'Explorer',
    description: 'Visited all sections of the site',
    emoji: '🧭',
    rarity: 'rare'
  },
  TOOL_USER: {
    id: 'TOOL_USER',
    title: 'Tech Savvy',
    description: 'Used 5 different utilities',
    emoji: '🛠️',
    rarity: 'common'
  }
};

export const checkAchievements = (streakCount: number, gamesPlayed: number, unlockedAchievements: string[]) => {
  const newAchievements: Achievement[] = [];

  // Streak achievements
  if (streakCount === 1 && !unlockedAchievements.includes('FIRST_VISIT')) {
    newAchievements.push(ACHIEVEMENTS.FIRST_VISIT);
  }
  if (streakCount === 7 && !unlockedAchievements.includes('WEEK_STREAK')) {
    newAchievements.push(ACHIEVEMENTS.WEEK_STREAK);
  }
  if (streakCount === 30 && !unlockedAchievements.includes('MONTH_STREAK')) {
    newAchievements.push(ACHIEVEMENTS.MONTH_STREAK);
  }
  if (streakCount === 100 && !unlockedAchievements.includes('HUNDRED_STREAK')) {
    newAchievements.push(ACHIEVEMENTS.HUNDRED_STREAK);
  }

  // Game achievements
  if (gamesPlayed === 10 && !unlockedAchievements.includes('GAME_MASTER')) {
    newAchievements.push(ACHIEVEMENTS.GAME_MASTER);
  }

  return newAchievements;
};
