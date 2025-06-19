
import React from 'react';
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Tag, Truck, CreditCard } from 'lucide-react';

const ShopPage = () => {
  const featuredItems = [
    { 
      id: 1, 
      name: "Premium Silk Blouse", 
      price: 129.99, 
      image: "/placeholder.svg",
      designer: "LuxeLaps Exclusive" 
    },
    { 
      id: 2, 
      name: "Designer Denim Jeans", 
      price: 189.99, 
      image: "/placeholder.svg",
      designer: "Fashion Forward" 
    },
    { 
      id: 3, 
      name: "Statement Leather Jacket", 
      price: 299.99, 
      image: "/placeholder.svg", 
      designer: "Urban Luxe"
    },
    { 
      id: 4, 
      name: "Classic Trench Coat", 
      price: 249.99, 
      image: "/placeholder.svg",
      designer: "Timeless Collection" 
    },
  ];

  return (
    <MainLayout>
      <div className="luxe-container py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            LuxeLaps Shop
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover curated fashion items selected to match your style profile
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {featuredItems.map((item) => (
            <ShopItem key={item.id} item={item} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <FeatureCard 
            icon={<Tag className="h-6 w-6" />}
            title="Exclusive Discounts"
            description="Use your LuxeTokens for special discounts on premium items"
          />
          <FeatureCard 
            icon={<Truck className="h-6 w-6" />}
            title="Express Shipping"
            description="Free priority shipping for all purchases over $150"
          />
          <FeatureCard 
            icon={<CreditCard className="h-6 w-6" />}
            title="Secure Checkout"
            description="Pay with crypto, credit card or redeem your LuxeTokens"
          />
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-luxe-purple hover:bg-luxe-purple-secondary text-white"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Browse All Collections
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

interface ShopItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    image: string;
    designer: string;
  };
}

const ShopItem: React.FC<ShopItemProps> = ({ item }) => {
  return (
    <div className="luxe-card group overflow-hidden">
      <div className="aspect-square overflow-hidden bg-accent/20">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <p className="text-sm text-muted-foreground">{item.designer}</p>
        <h3 className="font-medium">{item.name}</h3>
        <div className="mt-2 flex justify-between items-center">
          <span className="font-bold">${item.price}</span>
          <Button 
            size="sm" 
            variant="outline"
            className="rounded-full"
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="luxe-card p-6">
      <div className="mb-4 p-3 w-12 h-12 flex items-center justify-center rounded-full bg-luxe-purple/10 text-luxe-purple">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default ShopPage;
