
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

export function WalletConnector() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    setIsConnecting(true);
    
    // Mock wallet connection for now - in real app, this would use Solana wallet adapter
    setTimeout(() => {
      // Mock phantom wallet address
      setWalletAddress("8xgy...4zqa");
      setIsConnecting(false);
    }, 1500);
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
  };

  if (walletAddress) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-green-500"></div>
        <span className="text-sm font-medium">{walletAddress}</span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={disconnectWallet}
          className="text-xs h-7 px-2"
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button 
      size="sm" 
      className="bg-luxe-purple hover:bg-luxe-purple-secondary"
      onClick={connectWallet}
      disabled={isConnecting}
    >
      <Wallet className="mr-2 h-4 w-4" />
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
}
