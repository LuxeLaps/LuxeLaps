import { supabase } from '@/lib/supabase';
import { analyzeClothingItem } from './ai';

interface ClosetItem {
  id?: string;
  user_id: string;
  image_url: string;
  metadata: {
    name: string;
    description: string;
    category: string;
    brand?: string;
    size?: string;
  };
  tags: string[];
  ai_analysis?: any;
  created_at?: string;
}

export async function addItemToCloset(
  userId: string, 
  imageFile: File, 
  metadata: ClosetItem['metadata'],
  tags: string[] = []
): Promise<ClosetItem> {
  try {
    // Upload image
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('closet-items')
      .upload(fileName, imageFile);

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('closet-items')
      .getPublicUrl(fileName);

    // Analyze with AI
    const aiAnalysis = await analyzeClothingItem(publicUrl);

    // Save to database
    const { data, error } = await supabase
      .from('closet_items')
      .insert({
        user_id: userId,
        image_url: publicUrl,
        metadata,
        tags,
        ai_analysis: aiAnalysis
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding item to closet:', error);
    throw error;
  }
}

export async function getClosetItems(userId: string): Promise<ClosetItem[]> {
  const { data, error } = await supabase
    .from('closet_items')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

// New function to add tags to an item
export async function addTagsToItem(itemId: string, tags: string[]): Promise<void> {
  const { data: existingItem, error: fetchError } = await supabase
    .from('closet_items')
    .select('tags')
    .eq('id', itemId)
    .single();

  if (fetchError) throw fetchError;
  
  // Combine existing tags with new ones, removing duplicates
  const existingTags = existingItem.tags || [];
  const updatedTags = [...new Set([...existingTags, ...tags])];
  
  const { error } = await supabase
    .from('closet_items')
    .update({ tags: updatedTags })
    .eq('id', itemId);

  if (error) throw error;
}

// New function to remove a tag from an item
export async function removeTagFromItem(itemId: string, tag: string): Promise<void> {
  const { data: existingItem, error: fetchError } = await supabase
    .from('closet_items')
    .select('tags')
    .eq('id', itemId)
    .single();

  if (fetchError) throw fetchError;
  
  const existingTags = existingItem.tags || [];
  const updatedTags = existingTags.filter(t => t !== tag);
  
  const { error } = await supabase
    .from('closet_items')
    .update({ tags: updatedTags })
    .eq('id', itemId);

  if (error) throw error;
}

// New function to get all unique tags for a user
export async function getUserTags(userId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('closet_items')
    .select('tags')
    .eq('user_id', userId);

  if (error) throw error;
  
  // Extract all tags and remove duplicates
  const allTags = data?.flatMap(item => item.tags || []) || [];
  return [...new Set(allTags)];
}