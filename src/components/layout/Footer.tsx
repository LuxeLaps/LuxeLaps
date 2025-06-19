import { Link } from "react-router-dom";
import { Youtube, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="luxe-container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent luxe-gradient">LuxeLaps</h3>
            <p className="text-sm text-muted-foreground">
              Elevating fashion through AI and Solana blockchain technology.
            </p>
            <div className="flex space-x-4 pt-2">
              <SocialIcon href="#" label="YouTube" Icon={Youtube} />
              <SocialIcon href="#" label="Twitter" Icon={Twitter} />
              <SocialIcon href="#" label="LinkedIn" Icon={Linkedin} />
            </div>
          </div>
          <FooterColumn 
            title="App" 
            links={[
              { label: "Home", href: "/" },
              { label: "Upload", href: "/upload" },
              { label: "My Closet", href: "/closet" },
              { label: "Match", href: "/match" },
            ]}
          />
          <FooterColumn 
            title="Community" 
            links={[
              { label: "Explore", href: "/explore" },
              { label: "Rewards", href: "/rewards" },
              { label: "Shop", href: "/shop" },
              { label: "NFT Gallery", href: "/nfts" },
            ]}
          />
          <FooterColumn 
            title="Support" 
            links={[
              { label: "About Us", href: "/about" },
              { label: "FAQ", href: "/faq" },
              { label: "Contact", href: "/contact" },
              { label: "Privacy Policy", href: "/privacy" },
            ]}
          />
        </div>
        <div className="mt-8 border-t pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} LuxeLaps. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2 md:mt-0">
            Powered by Solana Blockchain
          </p>
        </div>
      </div>
    </footer>
  );
}

interface FooterColumnProps {
  title: string;
  links: { label: string; href: string }[];
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="space-y-3">
      <h4 className="font-medium text-luxe-dark">{title}</h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link 
              to={link.href}
              className="text-sm text-gray-600 hover:text-luxe-purple transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface SocialIconProps {
  href: string;
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

function SocialIcon({ href, label, Icon }: SocialIconProps) {
  return (
    <a
      href={href}
      aria-label={label}
      className="h-8 w-8 flex items-center justify-center rounded-full bg-accent hover:bg-accent/70 transition-colors shadow-lg hover:shadow-[0_0_10px_2px_rgba(255,0,0,0.7)]"
    >
      <Icon className="h-5 w-5 text-red-500" />
    </a>
  );
}
