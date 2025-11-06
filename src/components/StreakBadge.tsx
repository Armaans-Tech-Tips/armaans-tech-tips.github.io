import { useUserPrefs } from '@/contexts/UserPrefsContext';
import { Badge } from './ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { motion } from 'framer-motion';

interface StreakTier {
  min: number;
  max: number;
  emoji: string;
  title: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
}

const STREAK_TIERS: StreakTier[] = [
  { 
    min: 1, max: 2, 
    emoji: '🔥', title: 'Newbie', 
    color: 'text-amber-400', 
    bgColor: 'bg-amber-500/20', 
    borderColor: 'border-amber-500/40',
    description: 'Just getting started!'
  },
  { 
    min: 3, max: 6, 
    emoji: '⚡', title: 'Regular', 
    color: 'text-yellow-400', 
    bgColor: 'bg-yellow-500/20', 
    borderColor: 'border-yellow-500/40',
    description: 'Building the habit!'
  },
  { 
    min: 7, max: 13, 
    emoji: '🌟', title: 'Dedicated', 
    color: 'text-blue-400', 
    bgColor: 'bg-blue-500/20', 
    borderColor: 'border-blue-500/40',
    description: 'A full week streak!'
  },
  { 
    min: 14, max: 29, 
    emoji: '💎', title: 'Champion', 
    color: 'text-purple-400', 
    bgColor: 'bg-purple-500/20', 
    borderColor: 'border-purple-500/40',
    description: 'Two weeks strong!'
  },
  { 
    min: 30, max: 59, 
    emoji: '👑', title: 'Royalty', 
    color: 'text-pink-400', 
    bgColor: 'bg-pink-500/20', 
    borderColor: 'border-pink-500/40',
    description: 'A full month dedicated!'
  },
  { 
    min: 60, max: 99, 
    emoji: '🏆', title: 'Legend', 
    color: 'text-orange-400', 
    bgColor: 'bg-orange-500/20', 
    borderColor: 'border-orange-500/40',
    description: 'Two months of consistency!'
  },
  { 
    min: 100, max: Infinity, 
    emoji: '🚀', title: 'Ultimate', 
    color: 'text-red-400', 
    bgColor: 'bg-gradient-to-r from-red-500/20 to-yellow-500/20', 
    borderColor: 'border-red-500/40',
    description: '100+ days! You are legendary!'
  }
];

export function StreakBadge() {
  const { prefs } = useUserPrefs();
  const streakCount = prefs.settings.streakCount || 0;
  
  if (!streakCount) return null;
  
  const currentTier = STREAK_TIERS.find(tier => 
    streakCount >= tier.min && streakCount <= tier.max
  ) || STREAK_TIERS[0];
  
  const nextTier = STREAK_TIERS.find(tier => tier.min > streakCount);
  const daysToNextTier = nextTier ? nextTier.min - streakCount : 0;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Badge 
              className={`
                ${currentTier.bgColor} ${currentTier.color} ${currentTier.borderColor}
                border px-3 py-1 text-sm font-semibold cursor-pointer
                transition-all duration-300 hover:shadow-lg
                animate-pulse-subtle
              `}
            >
              <span className="mr-1.5 text-base">{currentTier.emoji}</span>
              <span>{streakCount} day streak</span>
            </Badge>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent className="bg-gamer-card border-gamer-border text-gamer-text">
          <div className="space-y-2">
            <div className="font-bold text-lg">
              {currentTier.emoji} {currentTier.title} Status
            </div>
            <p className="text-sm text-gamer-muted">{currentTier.description}</p>
            <div className="pt-2 border-t border-gamer-border">
              <div className="text-xs text-gamer-muted">
                {nextTier ? (
                  <>
                    <span className="font-semibold">{daysToNextTier} more day{daysToNextTier !== 1 ? 's' : ''}</span> until <span className="font-semibold">{nextTier.emoji} {nextTier.title}</span>
                  </>
                ) : (
                  <span className="font-semibold text-gamer-accent">🎉 Max level reached!</span>
                )}
              </div>
            </div>
            <div className="pt-2 border-t border-gamer-border text-xs">
              <div className="font-semibold mb-1">All Ranks:</div>
              <div className="grid grid-cols-2 gap-1">
                {STREAK_TIERS.map(tier => (
                  <div 
                    key={tier.title} 
                    className={`text-xs ${streakCount >= tier.min ? 'opacity-100' : 'opacity-40'}`}
                  >
                    {tier.emoji} {tier.title} ({tier.min}+)
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
