
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom"; // Remove BrowserRouter from here
import Index from "./pages/Index";
import Upload from "./pages/Upload";
import Closet from "./pages/Closet";
import Match from "./pages/Match";
import Explore from "./pages/Explore";
import Rewards from "./pages/Rewards";
import Shop from "./pages/Shop";
import NotFound from "./pages/NotFound";
import SignIn from './pages/SignIn';
import SignUp from '@/pages/SignUp';
import { Dashboard } from './pages/Dashboard';
import LocationServices from './pages/LocationServices';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/closet" element={<Closet />} />
        <Route path="/match" element={<Match />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/location" element={<LocationServices />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
