import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import imageCompression from "browser-image-compression";

export default function Upload() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    brand: "",
    color: "",
    season: ""
  });
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const { toast } = useToast();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleFile = async (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setOriginalFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      const fileSizeMB = file.size / (1024 * 1024);
      toast({
        title: "Image selected",
        description: `Original size: ${fileSizeMB.toFixed(2)} MB`,
      });
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
    }
  };

  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleProcessImage = async () => {
    if (!uploadedImage || !originalFile) return;
    setProcessing(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error("Please sign in to add items");
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(originalFile, options);
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('closet-items')
        .upload(`${session.user.id}/${fileName}`, compressedFile);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage
        .from('closet-items')
        .getPublicUrl(`${session.user.id}/${fileName}`);
      // Save item to database (no id field, let DB auto-generate)
      const { error: dbError } = await supabase
        .from('closet_items')
        .insert({
          user_id: session.user.id,
          image_url: publicUrl,
          name: formData.name,
          type: formData.type,
          tags: tags,
          metadata: {
            brand: formData.brand,
            color: formData.color,
            season: formData.season
          }
        });
      if (dbError) throw dbError;
      toast({
        title: "Success!",
        description: "Item added to your closet",
      });
      setUploadedImage(null);
      setOriginalFile(null);
      setFormData({ name: "", type: "", brand: "", color: "", season: "" });
      setTags([]);
    } catch (error) {
      console.error("Error processing image:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process image",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <MainLayout>
      <div className="luxe-container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Add to Your Closet</h1>
          {!uploadedImage ? (
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <Input type="file" accept="image/*" onChange={handleFileInput} />
              <p className="mt-4">Drag and drop or click to select an image</p>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-lg font-medium">Item Details</h2>
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                <Label>Type</Label>
                <Input value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} />
                <Label>Brand</Label>
                <Input value={formData.brand} onChange={e => setFormData({ ...formData, brand: e.target.value })} />
                <Label>Color</Label>
                <Input value={formData.color} onChange={e => setFormData({ ...formData, color: e.target.value })} />
                <Label>Season</Label>
                <Input value={formData.season} onChange={e => setFormData({ ...formData, season: e.target.value })} />
                <Label>Tags</Label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Add tags (e.g., casual, favorite)" 
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} disabled={!tagInput}>Add</Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map(tag => (
                      <span key={tag} className="bg-gray-200 px-2 py-1 rounded-full">{tag} <button onClick={() => removeTag(tag)}>x</button></span>
                    ))}
                  </div>
                )}
              </div>
              <Button className="w-full mt-8" size="lg" onClick={handleProcessImage} disabled={processing}>
                {processing ? "Processing..." : 'Add to Closet'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}