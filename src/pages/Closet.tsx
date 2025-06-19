import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Grid, List, Search, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function Closet() {
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [clothingItems, setClothingItems] = useState<any[]>([]);

  useEffect(() => {
    async function fetchItems() {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;
      if (!user) return;
      const { data, error } = await supabase
        .from("closet_items")
        .select("id, name, type, image_url, metadata, tags")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (!error && data) setClothingItems(data);
    }
    fetchItems();
  }, []);

  const filteredItems = clothingItems.filter(item => {
    const name = item.name || item.metadata?.name || "";
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <MainLayout>
      <div className="luxe-container py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Closet</h1>
            <p className="text-muted-foreground mt-1">Manage your wardrobe with ease</p>
          </div>
          <Button asChild className="bg-luxe-purple hover:bg-luxe-purple-secondary">
            <Link to="/upload">
              <Plus className="mr-2 h-4 w-4" />
              Add New Item
            </Link>
          </Button>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search your closet..." 
              className="pl-9 luxe-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="icon" onClick={() => setViewMode("grid")}> <Grid className="h-4 w-4" /> </Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} size="icon" onClick={() => setViewMode("list")}> <List className="h-4 w-4" /> </Button>
          </div>
        </div>
        {filteredItems.length > 0 ? (
          <>
            {viewMode === "grid" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredItems.map((item) => (
                  <ClothingItemCard key={item.id} item={item} />
                ))}
              </div>
            )}
            {viewMode === "list" && (
              <div className="space-y-3">
                {filteredItems.map((item) => (
                  <ClothingItemList key={item.id} item={item} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg font-medium">No items found</p>
            <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

function ClothingItemCard({ item }: { item: any }) {
  return (
    <div className="luxe-card group overflow-hidden">
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={item.image_url} 
          alt={item.name || item.metadata?.name}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-3">
        <h3 className="font-medium truncate">{item.name || item.metadata?.name}</h3>
        <div className="flex items-center text-xs text-muted-foreground mt-1 space-x-2">
          <span className="capitalize">{item.metadata?.color || "-"}</span>
          <span>•</span>
          <span className="capitalize">{item.metadata?.season || "-"}</span>
        </div>
      </div>
    </div>
  );
}

function ClothingItemList({ item }: { item: any }) {
  return (
    <div className="luxe-card p-3 flex items-center gap-4">
      <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
        <img
          src={item.image_url || item.image_url || item.image || '/placeholder.svg'}
          alt={item.name || item.metadata?.name || 'Clothing Item'}
          className="h-40 w-full object-cover rounded-t-lg"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium truncate">{item.name || item.metadata?.name}</h3>
        <div className="flex items-center text-xs text-muted-foreground mt-1">
          <span className="capitalize">{item.type || item.metadata?.type}</span>
          <span className="mx-1">•</span>
          <span className="capitalize">{item.metadata?.color || "-"}</span>
          <span className="mx-1">•</span>
          <span className="capitalize">{item.metadata?.season || "-"}</span>
        </div>
      </div>
    </div>
  );
}