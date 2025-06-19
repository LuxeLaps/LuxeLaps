
import React from 'react';
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Award, CreditCard, Gift, Star } from 'lucide-react';

const RewardsPage = () => {
  return (
    <MainLayout>
      <div className="luxe-container py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            LuxeTokens Rewards Program
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Earn rewards for your fashion engagement, style uploads, and community interactions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <RewardCard 
            icon={<Star className="h-8 w-8 text-luxe-purple" />}
            title="Style Points"
            description="Earn points for each unique outfit upload and AI match"
            points={500}
          />
          <RewardCard 
            icon={<Award className="h-8 w-8 text-luxe-purple" />}
            title="Community Rewards"
            description="Get extra tokens for community interactions and style shares"
            points={250}
          />
          <RewardCard 
            icon={<Gift className="h-8 w-8 text-luxe-purple" />}
            title="Milestone Bonuses"
            description="Unlock special rewards for reaching fashion milestones"
            points={750}
          />
          <RewardCard 
            icon={<CreditCard className="h-8 w-8 text-luxe-purple" />}
            title="Redemption"
            description="Convert LuxeTokens into exclusive fashion discounts"
            points={1000}
          />
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-luxe-purple hover:bg-luxe-purple-secondary text-white"
          >
            View Rewards Catalog
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

interface RewardCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  points: number;
}

const RewardCard: React.FC<RewardCardProps> = ({ icon, title, description, points }) => {
  return (
    <div className="luxe-card p-6 flex flex-col items-center text-center">
      <div className="mb-4 p-4 rounded-full bg-luxe-purple/10">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="text-luxe-purple font-bold">
        {points} LuxeTokens
      </div>
    </div>
  );
};

export default RewardsPage;
