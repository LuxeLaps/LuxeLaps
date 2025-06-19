
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingBag, Shirt, Heart, Search, Award, Upload, Sparkles } from "lucide-react";

export default function Index() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 backdrop-blur-sm -z-10">
          <img
            src="/bg.jpg"
            alt="Background"
            className="w-full h-full object-cover opacity-70"
          />
        </div>
        <div className="luxe-container py-16 md:py-24 lg:py-32 flex flex-col items-center text-center">
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-white">
            The Future of Fashion is <span className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-black">Personal</span> 
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Discover AI-powered outfit recommendations tailored to your style, skin tone, and body type.
            Own your look with Solana blockchain NFT technology.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">

          {/* Get Started Button */}
            <Button 
              asChild 
              size="lg" 
              className="flex-1 bg-luxe-purple hover:bg-luxe-purple-secondary text-white transition-all get-started-button"
            >
              <Link to="/upload">Get Started</Link>
            </Button>
            {/* -------------------------------------------------------------------------------------- */}

            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="flex-1 border-luxe-purple text-luxe-purple hover:bg-luxe-purple/10"
            >
              <Link to="/explore">Explore Styles</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="luxe-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Next-Gen Fashion Experience
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              LuxeLaps combines cutting-edge AI technology with blockchain to create a unique fashion experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Sparkles className="h-6 w-6 text-luxe-purple" />}
              title="AI Matching"
              description="Get personalized outfit recommendations based on your skin tone, body type, and style preferences."
            />
            <FeatureCard 
              icon={<Shirt className="h-6 w-6 text-luxe-purple" />}
              title="Digital Closet"
              description="Organize your wardrobe digitally and discover new combinations you never thought of."
            />
            <FeatureCard 
              icon={<ShoppingBag className="h-6 w-6 text-luxe-purple" />}
              title="NFT Fashion"
              description="Mint your favorite outfits as NFTs on the Solana blockchain and share or trade them."
            />
          </div>
        </div>
      </section>

      {/* App Sections Card Grid */}
      <section className="py-16 bg-accent/30">
        <div className="luxe-container">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
            Explore LuxeLaps
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AppSectionCard
              icon={<Upload className="h-6 w-6" />}
              title="Upload"
              description="Add your clothing items to build your digital closet."
              link="/upload"
            />
            <AppSectionCard
              icon={<Shirt className="h-6 w-6" />}
              title="Closet"
              description="Manage and organize your wardrobe efficiently."
              link="/closet"
            />
            <AppSectionCard
              icon={<Heart className="h-6 w-6" />}
              title="Match"
              description="Get AI-powered outfit recommendations tailored to you."
              link="/match"
            />
            <AppSectionCard
              icon={<Search className="h-6 w-6" />}
              title="Explore"
              description="Discover community styles and trending outfits."
              link="/explore"
            />
            <AppSectionCard
              icon={<Award className="h-6 w-6" />}
              title="Rewards"
              description="Earn LuxeTokens through engagement and activities."
              link="/rewards"
            />
            <AppSectionCard
              icon={<ShoppingBag className="h-6 w-6" />}
              title="Shop"
              description="Browse curated fashion items that match your style."
              link="/shop"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-luxe-purple text-white">
        <div className="luxe-container text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to Revolutionize Your Style?
          </h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-luxe-purple-light">
            Join thousands of fashion enthusiasts already using LuxeLaps to discover their unique style identity.
          </p>
          <Button 
            asChild 
            size="lg" 
            variant="outline" 
            className="mt-8 border-white text-white hover:bg-white/20"
          >
            <Link to="/upload">Start Your Fashion Journey</Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="luxe-card p-6 flex flex-col items-center text-center">
      <div className="h-12 w-12 rounded-full bg-luxe-purple/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-medium">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

interface AppSectionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

function AppSectionCard({ icon, title, description, link }: AppSectionCardProps) {
  return (
    <Link 
      to={link}
      className="luxe-card p-6 flex flex-col items-center text-center hover:border-luxe-purple/40 group"
    >
      <div className="mb-4 p-3 rounded-full bg-luxe-purple/10 group-hover:bg-luxe-purple/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </Link>
  );
}
