
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingBag, Shirt, Heart, UploadCloud, Compass, Gift, ShoppingCart } from "lucide-react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "lord-icon": any;
    }
  }
}
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom'  // Using React Router's navigation hook instead of Next.js

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useIsMobile();
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-sm bg-gradient-to-r from-[#f8f9fa] to-[#e9ecef]">
      <div className="luxe-container flex h-16 items-center justify-between">
        {/* Logo section */}
        <div className="flex items-center gap-2 md:gap-4">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          )}
          
          <Link 
            to="/"
            className="flex items-center space-x-2 font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="url(#luxelaps-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <defs>
                <linearGradient id="luxelaps-gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#5a189a" />
                  <stop offset="100%" stopColor="#3c096c" />
                </linearGradient>
              </defs>
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">Luxelaps</span>
          </Link>
        </div>

        {/* Desktop Nav Links - adjusted spacing and hover effects */}
        <nav className="hidden md:flex items-center space-x-2 text-luxe-dark">
          <NavLinks className="flex mx-8 text-luxe-dark gap-4" />
        </nav>

        {/* Action Icons - adjusted spacing and added hover effects */}
        <div className="flex items-center gap-3">
          {!isSearchOpen && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-accent"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search"
            >
              <lord-icon
                src="https://cdn.lordicon.com/vgxjrbxm.json"
                trigger="hover"
                colors="primary:#ff7295,secondary:#0000f8"
                style={{ width: '20px', height: '20px' }}
                stroke="bold"
              ></lord-icon>
            </Button>
          )}
          
          {isSearchOpen && (
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                placeholder="Search..."
                className="w-48 rounded-md border border-input bg-background px-3 py-1 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-luxe-purple focus:ring-offset-1"
                onBlur={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
              />
              <lord-icon
                src="https://cdn.lordicon.com/vgxjrbxm.json"
                trigger="hover"
                colors="primary:#ff7295,secondary:#0000f8"
                style={{ width: '16px', height: '16px' }}
                className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground"
              ></lord-icon>
            </div>
          )}

          {/* Profile Button - updated styling */}
          <Button 
            className="hover:bg-purple-500/10 rounded-full transition-all duration-300"
            onClick={() => navigate('/dashboard')}
          >
            <lord-icon
              className="glowing-effect"
              src="https://cdn.lordicon.com/rzsnbiaw.json"
              trigger="hover"
              stroke="bold"
              state="hover-looking-around"
              colors="primary:#ff7295,secondary:#0000f8"
              style={{ width: '20px', height: '20px' }}
            />
          </Button>

          {/* Connect Wallet - updated styling */}
          <Button 
            variant="default" 
            size="sm" 
            className="hidden md:flex bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-300"
          >
            Connect Wallet
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background animate-fade-in">
          <nav className="luxe-container py-6 flex flex-col space-y-3">
            <NavLinks className="flex flex-col space-y-3" />
            <div className="mt-4 space-y-2">
              <Button 
                variant="default" 
                className="w-full bg-luxe-purple hover:bg-luxe-purple-secondary"
              >
                Connect Wallet
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

interface NavLinksProps {
  className?: string;
}

function NavLinks({ className }: NavLinksProps) {
    const links = [
      { href: "/", label: "Home", icon: (
        <lord-icon
          src="https://cdn.lordicon.com/jeuxydnh.json"
          trigger="hover"
          stroke="bold"
          state="hover-partial-roll"
          colors="primary:#e4e4e4,secondary:#a866ee"
          style={{ width: '24px', height: '24px' }}
        ></lord-icon>
      ) },
      { href: "/upload", label: "Upload", icon: <UploadCloud className="w-4 h-4" /> },
      { href: "/closet", label: "Closet", icon: <Shirt className="w-4 h-4" /> },
      { href: "/match", label: "Match", icon: <Heart className="w-4 h-4" /> },
      { href: "/explore", label: "Explore", icon: <Compass className="w-4 h-4" /> },
      { href: "/rewards", label: "Rewards", icon: <Gift className="w-4 h-4" /> },
      { href: "/shop", label: "Shop", icon: <ShoppingCart className="w-4 h-4" /> },
    ];
  
    return (
      <div className={className}>
        {links.map((link) => {
          const isExplore = link.href === "/explore";
          return (
            <Link
              key={link.href}
              to={link.href}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors text-luxe-dark ${
                isExplore
                ? "bg-luxe-purple/10 text-luxe-purple-vivid"
                : "hover:bg-accent/50"
              }`}
            >

              {/* Home icon */}

              {link.icon && (
                <span className="mr-2 group">
                  {link.href === "/" ? (
                    <lord-icon
                      src="https://cdn.lordicon.com/jeuxydnh.json"
                      stroke="bold"
                      colors="primary:#fff,secondary:#fff"
                      style={{ width: '24px', height: '24px' }}
                    ></lord-icon>
                  ) : (
                    link.icon
                  )}
                </span>
              )}
              {link.label}
            </Link>
          );
        })}
      </div>
    );
  }
