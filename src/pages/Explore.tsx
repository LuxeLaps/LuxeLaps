
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  TrendingUp, 
  Users, 
  Sparkles,
  Award,
  Filter,
  ArrowUpDown,
  Shirt,
  Bookmark,
  MoreHorizontal
} from "lucide-react";

// Mock data for explore feed
const mockPosts = [
  {
    id: 1,
    user: {
      name: "Sofia Chen",
      username: "@sofiafashion",
      avatar: "https://i.pravatar.cc/100?img=5"
    },
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=986",
    caption: "Summer vibes with this new sustainable outfit. What do you think?",
    likes: 243,
    comments: 18,
    time: "2 hours ago",
    isNFT: true
  },
  {
    id: 2,
    user: {
      name: "Alex Morgan",
      username: "@alexstyle",
      avatar: "https://i.pravatar.cc/100?img=12"
    },
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=987",
    caption: "Monochrome outfit for today's fashion event. Minimal and elegant.",
    likes: 187,
    comments: 24,
    time: "5 hours ago",
    isNFT: false
  },
  {
    id: 3,
    user: {
      name: "Marcus Lee",
      username: "@marcusfashion",
      avatar: "https://i.pravatar.cc/100?img=4"
    },
    image: "https://images.unsplash.com/photo-1517191297489-48c463380e8f?q=80&w=2080",
    caption: "Streetwear essentials that never go out of style. #urbanfashion",
    likes: 431,
    comments: 36,
    time: "12 hours ago",
    isNFT: true
  }
];

type FeedFilter = "trending" | "latest" | "following" | "nfts";

export default function Explore() {
  const [activeFilter, setActiveFilter] = useState<FeedFilter>("trending");
  
  return (
    <MainLayout>
      <div className="luxe-container py-12 max-w-5xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Explore</h1>
            <p className="text-muted-foreground mt-1">Discover trending styles from the community</p>
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            <FilterButton 
              active={activeFilter === "trending"} 
              onClick={() => setActiveFilter("trending")}
              icon={<TrendingUp className="h-4 w-4" />}
              label="Trending"
            />
            <FilterButton 
              active={activeFilter === "latest"} 
              onClick={() => setActiveFilter("latest")}
              icon={<Sparkles className="h-4 w-4" />}
              label="Latest"
            />
            <FilterButton 
              active={activeFilter === "following"} 
              onClick={() => setActiveFilter("following")}
              icon={<Users className="h-4 w-4" />}
              label="Following"
            />
            <FilterButton 
              active={activeFilter === "nfts"} 
              onClick={() => setActiveFilter("nfts")}
              icon={<Award className="h-4 w-4" />}
              label="NFT Outfits"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Sort
            </Button>
          </div>
        </div>
        
        {/* Post Feed */}
        <div className="space-y-6">
          {mockPosts.map((post) => (
            <ExplorePost key={post.id} post={post} />
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Button variant="outline" size="lg">
            Load More
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function FilterButton({ active, onClick, icon, label }: FilterButtonProps) {
  return (
    <Button
      variant={active ? "default" : "outline"}
      size="sm"
      onClick={onClick}
      className={active ? "bg-luxe-purple hover:bg-luxe-purple-secondary" : ""}
    >
      {icon}
      <span className="ml-1">{label}</span>
    </Button>
  );
}

interface PostProps {
  post: {
    id: number;
    user: {
      name: string;
      username: string;
      avatar: string;
    };
    image: string;
    caption: string;
    likes: number;
    comments: number;
    time: string;
    isNFT: boolean;
  };
}

function ExplorePost({ post }: PostProps) {
  return (
    <div className="luxe-card overflow-hidden">
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src={post.user.avatar}
            alt={post.user.name}
            className="h-9 w-9 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-sm">{post.user.name}</p>
            <p className="text-xs text-muted-foreground">{post.user.username}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {post.isNFT && (
            <span className="bg-luxe-purple/10 text-luxe-purple text-xs font-medium px-2 py-1 rounded-full">
              NFT Outfit
            </span>
          )}
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Post Image */}
      <div className="relative">
        <img 
          src={post.image} 
          alt="Fashion post"
          className="w-full object-cover max-h-[70vh]"
        />
        {post.isNFT && (
          <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 text-xs font-medium border">
            <Award className="h-3 w-3 text-luxe-purple" />
            <span>Minted on Solana</span>
          </div>
        )}
      </div>
      
      {/* Post Actions */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <MessageCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Bookmark className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Post Content */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-1 mb-2">
          <p className="text-sm font-medium">{post.likes} likes</p>
          <span>•</span>
          <p className="text-sm font-medium">{post.comments} comments</p>
        </div>
        <p className="text-sm mb-1">{post.caption}</p>
        <p className="text-xs text-muted-foreground">{post.time}</p>
      </div>
    </div>
  );
}
