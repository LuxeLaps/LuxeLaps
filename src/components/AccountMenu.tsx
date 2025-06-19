import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { User2 } from "lucide-react";
import { toast } from "sonner";

export function AccountMenu({ isAuthenticated }: { isAuthenticated: boolean }) {
  const navigate = useNavigate();

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
    // Instead of nesting buttons, use a div or other appropriate element as the container
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="hover:bg-accent rounded-full cursor-pointer">
          <lord-icon
            className="glowing-effect"
            src="https://cdn.lordicon.com/rzsnbiaw.json"
            trigger="hover"
            stroke="bold"
            state="hover-looking-around"
            colors="primary:#ff7295,secondary:#0000f8"
            style={{ width: '20px', height: '20px' }}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 mt-2"
        sideOffset={5}
      >
        {isAuthenticated ? (
          <>
            <DropdownMenuItem 
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={handleSignOut}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Sign Out
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem 
              onClick={() => navigate('/signin')}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Sign In
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => navigate('/signup')}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Sign Up
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}