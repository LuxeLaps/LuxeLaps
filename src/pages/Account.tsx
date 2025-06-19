// Add Navbar import
import { Navbar } from '@/components/layout/Navbar';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

export default function Account() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [profile, setProfile] = useState({
    username: '',
    full_name: '',
    avatar_url: '',
    email: user?.email || '' // Initialize email from user state
  });

  useEffect(() => {
    async function getProfile() {
      try {
        setIsProfileLoading(true);
        if (!user?.id) return;

        let { data, error } = await supabase
          .from('profiles')
          .select('username, full_name, avatar_url')
          .eq('id', user.id)
          .single();

        if (error && error.code === 'PGRST116') {
          // Profile doesn't exist, create it
          const { data: newProfile, error: insertError } = await supabase
            .from('profiles')
            .insert([
              {
                id: user.id,
                username: '',
                full_name: '',
                avatar_url: '',
                updated_at: new Date().toISOString()
              }
            ])
            .select()
            .single();

          if (insertError) throw insertError;
          data = newProfile;
        } else if (error) {
          throw error;
        }

        if (data) {
          setProfile(prevProfile => ({
            ...prevProfile,
            username: data.username || '',
            full_name: data.full_name || '',
            avatar_url: data.avatar_url || '',
            email: user?.email || '' // Maintain email from user
          }));
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        toast.error('Error loading profile');
      } finally {
        setIsProfileLoading(false);
      }
    }

    getProfile();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          ...profile,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      
      toast.success('Profile updated successfully!');
      // Navigate after a short delay
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 500);
      
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  if (isProfileLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Account Settings</h1>

          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  value={profile.email || user?.email || ''}
                  disabled
                  className="bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Username</label>
                <Input
                  type="text"
                  value={profile.username}
                  onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <Input
                  type="text"
                  value={profile.full_name}
                  onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </form>

            <div className="mt-8 pt-8 border-t">
              <h2 className="text-xl font-semibold mb-4">Danger Zone</h2>
              <Button
                variant="destructive"
                onClick={() => {
                  toast.error('Account deletion not implemented yet');
                }}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}