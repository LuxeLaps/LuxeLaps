import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  ShirtIcon, 
  Sparkles, 
  Camera,
  Palette, 
  User, 
  Clock,
  Loader2,
  Wand2
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getOutfitRecommendations } from "@/services/ai";

const mockRecommendations = [
  {
    id: 1,
    title: "Casual Weekend",
    items: [
      { id: 1, name: "Gray Hoodie", type: "outerwear", image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=1072" },
      { id: 2, name: "Blue Denim Jeans", type: "bottom", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1026" },
      { id: 3, name: "White Sneakers", type: "shoes", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=987" },
    ],
    occasion: "casual",
    matchScore: 92,
    description: "A comfortable weekend outfit perfect for running errands or casual meetups."
  }
];

type MatchType = "outfit" | "skin" | "body";

export default function Match() {
  const [activeTab, setActiveTab] = useState<MatchType>("outfit");
  const [isGenerating, setIsGenerating] = useState(false);
  const [matchComplete, setMatchComplete] = useState(false);
  const [occasion, setOccasion] = useState("");
  const [weather, setWeather] = useState("");
  const [recommendations, setRecommendations] = useState(mockRecommendations);

  const handleGenerate = async () => {
    if (!occasion) {
      alert("Please select an occasion");
      return;
    }
    setIsGenerating(true);
    try {
      // Replace with your backend call
      const response = await getOutfitRecommendations({ occasion, weather });
      if (!response?.outfits?.length) {
        throw new Error('No outfit recommendations received');
      }
      setRecommendations(response.outfits.map(outfit => ({
        ...outfit,
        id: outfit.id || Math.random(),
        matchScore: outfit.matchScore || 85,
      })));
      setMatchComplete(true);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to generate outfits. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <MainLayout>
      <div className="luxe-container py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Match</h1>
            <p className="text-muted-foreground mt-1">AI-powered outfit recommendations tailored to you</p>
          </div>
        </div>
        <Tabs 
          defaultValue="outfit" 
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value as MatchType);
            setMatchComplete(false);
          }}
          className="space-y-8"
        >
          <TabsList className="grid grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="outfit" className="flex items-center gap-2">
              <ShirtIcon className="h-4 w-4" />
              <span>Outfit Match</span>
            </TabsTrigger>
            <TabsTrigger value="skin" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span>Skin Tone</span>
            </TabsTrigger>
            <TabsTrigger value="body" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Body Type</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="outfit" className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-2">
                <div className="luxe-card p-6">
                  <h2 className="text-xl font-medium mb-4">Generate Your Outfit</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Occasion</label>
                      <select 
                        className="w-full luxe-input"
                        value={occasion}
                        onChange={(e) => setOccasion(e.target.value)}
                      >
                        <option value="">Select occasion...</option>
                        <option value="casual">Casual Day</option>
                        <option value="work">Work / Office</option>
                        <option value="evening">Evening Out</option>
                        <option value="formal">Formal Event</option>
                        <option value="athletic">Athletic / Sports</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Weather</label>
                      <select className="w-full p-2 rounded-md border border-input bg-background" value={weather} onChange={e => setWeather(e.target.value)}>
                        <option value="">Select weather...</option>
                        <option value="hot">Hot (80°F+)</option>
                        <option value="warm">Warm (65-80°F)</option>
                        <option value="cool">Cool (50-65°F)</option>
                        <option value="cold">Cold (Below 50°F)</option>
                        <option value="rainy">Rainy</option>
                      </select>
                    </div>
                    <div className="pt-2">
                      <Button 
                        className="w-full bg-luxe-purple hover:bg-luxe-purple-secondary"
                        onClick={handleGenerate}
                        disabled={isGenerating}
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Generate Outfit
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-3">
                {matchComplete ? (
                  <div className="luxe-card overflow-hidden animate-scale-in">
                    <div className="p-6 pb-3 border-b">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-medium">Recommended Outfits</h3>
                        <span className="text-xs bg-luxe-purple/10 text-luxe-purple-vivid px-2 py-1 rounded-full">
                          AI Generated
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Based on your preferences and wardrobe
                      </p>
                    </div>
                    <div className="divide-y">
                      {recommendations.map((outfit) => (
                        <div key={outfit.id} className="p-6 flex gap-6">
                          <div className="flex gap-4">
                            {outfit.items.map((item: any) => (
                              <div key={item.id} className="flex flex-col items-center">
                                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md mb-2" />
                                <div className="text-sm font-medium">{item.name}</div>
                                <div className="text-xs text-muted-foreground">{item.type}</div>
                              </div>
                            ))}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-lg mb-1">{outfit.title}</div>
                            <div className="text-sm mb-2">{outfit.description}</div>
                            <div className="text-xs text-muted-foreground">Occasion: {outfit.occasion} | Match Score: {outfit.matchScore}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 bg-accent/30 text-center">
                      <Button 
                        variant="outline" 
                        className="border-luxe-purple text-luxe-purple hover:bg-luxe-purple/10"
                        onClick={() => setMatchComplete(false)}
                      >
                        <Wand2 className="mr-2 h-4 w-4" />
                        Generate More Outfits
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-12 luxe-card">
                    <div className="h-16 w-16 rounded-full bg-luxe-purple/10 flex items-center justify-center mb-4">
                      <Sparkles className="h-8 w-8 text-luxe-purple" />
                    </div>
                    <h3 className="text-xl font-medium">Ready to Get Matched</h3>
                    <p className="text-muted-foreground mt-2 max-w-md">
                      Our AI will analyze your wardrobe and preferences to create the perfect outfit combinations for any occasion.
                    </p>
                    <div className="grid grid-cols-3 gap-4 mt-8 w-full max-w-md">
                      <div className="flex flex-col items-center">
                        <Clock className="h-6 w-6 text-luxe-purple mb-1" />
                        <span className="text-sm">Quick</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Sparkles className="h-6 w-6 text-luxe-purple mb-1" />
                        <span className="text-sm">Precise</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <User className="h-6 w-6 text-luxe-purple mb-1" />
                        <span className="text-sm">Personal</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}