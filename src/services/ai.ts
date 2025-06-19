// Removed: import { supabase } from '@/lib/supabase';

interface ClothingItem {
  id: string;
  user_id: string;
  image_url: string;
  metadata: any;
}

interface UserPreferences {
  style_preferences: string[];
  favorite_colors: string[];
  occasions: string[];
}

interface AIAnalysisResponse {
  style: string;
  color: string;
  pattern: string;
  occasions: string[];
  confidence: number;
}

interface OutfitRecommendation {
  outfits: Array<{
    id: number;
    title: string;
    items: Array<{
      id: number;
      name: string;
      type: string;
      image: string;
    }>;
    occasion: string;
    matchScore: number;
    description: string;
  }>;
}

// Analyze clothing item (stub, since analysis is not handled by backend in your api.py)
export async function analyzeClothingItem(imageUrl: string): Promise<AIAnalysisResponse> {
  // Mocked AI analysis response
  return {
    style: "casual",
    color: "blue",
    pattern: "solid",
    occasions: ["everyday"],
    confidence: 0.9
  };
}

// Generate image for an outfit item using your FastAPI backend
export async function generateItemImage(prompt: string): Promise<string> {
  const response = await fetch('http://localhost:8000/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });
  const data = await response.json();
  return data.image; // base64 string
}

// Generate outfit recommendations (logic remains in frontend)
export async function getOutfitRecommendations({ occasion, weather }: { occasion: string; weather: string; }): Promise<OutfitRecommendation> {
  const response = await fetch('http://localhost:8000/recommend', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ occasion, weather })
  });
  return await response.json();
}
// export async function getOutfitRecommendations({
//   userId = '',
//   occasion,
//   weather,
//   closetItems = [],
//   preferences = {},
//   profile = {}
// }: {
//   userId?: string;
//   occasion: string;
//   weather: string;
//   closetItems?: any[];
//   preferences?: any;
//   profile?: any;
// }): Promise<OutfitRecommendation> {
//   // Example: simple recommendation logic (replace with your own or move to backend)
//   const outfits = [
//     {
//       id: 1,
//       title: `Outfit for ${occasion} (${weather})`,
//       items: closetItems.slice(0, 3).map((item: any, idx: number) => ({
//         id: item.id || idx,
//         name: item.metadata?.name || `Item ${idx + 1}`,
//         type: item.metadata?.type || 'Unknown',
//         image: '' // will be filled below
//       })),
//       occasion,
//       matchScore: 90,
//       description: `A recommended outfit for ${occasion} in ${weather} weather.`
//     }
//   ];

//   // Generate images for each item
//   for (const outfit of outfits) {
//     for (const item of outfit.items) {
//       item.image = await generateItemImage(`${item.name} ${item.type}`);
//     }
//   }

//   return { outfits };
// }