import React, { useState } from 'react';
import { useRewards } from '@/contexts/RewardsContext';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRewardEffects } from '@/hooks/useRewardEffects';
import { Navbar } from '@/components/Navbar';
import { SEO } from '@/components/SEO';
import { TopBannerAd, BottomAd } from '@/components/GoogleAd';

const rewards = [
  // === THEMES (Affordable prices for the people!) ===
  {
    id: 'dark-mode-pro',
    name: 'Dark Mode Pro',
    description: 'Enhanced dark mode with OLED-optimized true black colors',
    cost: 50,
    icon: '🌙',
  },
  {
    id: 'rainbow-theme',
    name: 'Rainbow Theme',
    description: 'Vibrant rainbow color scheme with gradient effects',
    cost: 75,
    icon: '🌈',
  },
  {
    id: 'neon-theme',
    name: 'Neon Nights Theme',
    description: 'Electric neon theme with glowing purple/cyan effects',
    cost: 75,
    icon: '💜',
  },
  {
    id: 'retro-theme',
    name: 'Retro Arcade Theme',
    description: 'Classic 80s arcade aesthetic with orange accents',
    cost: 60,
    icon: '👾',
  },
  {
    id: 'ocean-theme',
    name: 'Ocean Breeze Theme',
    description: 'Calming blue ocean-inspired colors',
    cost: 50,
    icon: '🌊',
  },
  {
    id: 'custom-theme-editor',
    name: 'Theme Editor',
    description: 'Create your own custom color theme',
    cost: 100,
    icon: '🎨',
  },
];

const RewardsShop: React.FC = () => {
  const { points, purchaseItem, purchases } = useRewards();
  const rewardEffects = useRewardEffects();

  const handlePurchase = (itemId: string, cost: number, name: string) => {
    if (purchases.includes(itemId)) {
      toast.info('You already own this item!');
      return;
    }

    if (purchaseItem(itemId, cost)) {
      toast.success(`🎉 Purchased ${name}!`, {
        description: `Your theme is now available in settings!`,
      });
    } else {
      toast.error('Not enough points!', {
        description: `You need ${cost - points} more points.`,
      });
    }
  };

  return (
    <>
      <Navbar />
      <SEO title="Theme Shop | Tech Tips" description="Customize your experience with themes" />
      <div className="container mx-auto px-4 py-8 min-h-screen bg-gamer-bg">
        <TopBannerAd />
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-rowdies font-bold mb-2 text-gamer-text">Theme Shop 🎨</h1>
          <div className="text-2xl font-semibold text-gamer-accent flex items-center justify-center gap-2">
            <span className="text-3xl">🪙</span>
            {points} Points
          </div>
          <p className="mt-2 text-gamer-muted">
            {purchases.length} themes owned • Earn points by logging in daily!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {rewards.map((reward) => (
            <motion.div
              key={reward.id}
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card className="h-full flex flex-col bg-gamer-card border-gamer-border">
                <CardHeader>
                  <div className="text-4xl mb-2">{reward.icon}</div>
                  <CardTitle className="text-gamer-text">{reward.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gamer-muted">{reward.description}</p>
                  <p className="mt-2 text-gamer-accent font-semibold">
                    {reward.cost} Points
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handlePurchase(reward.id, reward.cost, reward.name)}
                    disabled={purchases.includes(reward.id)}
                    className={`w-full transition-all ${
                      purchases.includes(reward.id)
                        ? 'bg-accent/80 hover:bg-accent text-gamer-card cursor-default'
                        : 'bg-gamer-accent hover:bg-gamer-accent/90 text-gamer-card'
                    }`}
                  >
                    {purchases.includes(reward.id) ? '✓ Owned' : 'Purchase'}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        <BottomAd />
      </div>
    </>
  );
};

export default RewardsShop;
