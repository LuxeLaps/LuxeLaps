import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { AccountMenu } from "./AccountMenu";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    checkAuth();
  }, []);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Error signing out');
      console.error('Error:', error);
    }
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-white">
              LuxeLaps
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link to="/" className="text-white hover:text-purple-400 px-3 py-2">
                Home
              </Link>
              <Link to="/upload" className="text-white hover:text-purple-400 px-3 py-2">
                Upload
              </Link>
              <Link to="/closet" className="text-white hover:text-purple-400 px-3 py-2">
                Closet
              </Link>
              <Link to="/match" className="text-white hover:text-purple-400 px-3 py-2">
                Match
              </Link>
              <Link to="/explore" className="text-white hover:text-purple-400 px-3 py-2">
                Explore
              </Link>
              <Link to="/rewards" className="text-white hover:text-purple-400 px-3 py-2">
                Rewards
              </Link>
              <Link to="/shop" className="text-white hover:text-purple-400 px-3 py-2">
                Shop
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Button 
                onClick={handleSignOut}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Sign Out
              </Button>
            ) : (
              <>
                <Button className="bg-luxe-purple hover:bg-luxe-purple/90 text-white">
                  Connect Wallet
                </Button>
                <AccountMenu isAuthenticated={isAuthenticated} />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};