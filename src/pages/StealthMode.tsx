import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import WalletConnect from "@/components/WalletConnect";
import PortfolioDashboard from "@/components/PortfolioDashboard";
import Header from "@/components/Header";
import { Lock, Zap, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const StealthMode = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          
          <Badge className="bg-accent/20 text-accent border-accent/30 px-4 py-2 mb-6">
            <Lock className="h-4 w-4 mr-2" />
            Private Portfolio Management
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Stealth Mode
            </span>
            <br />
            Activated
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Your portfolio is now encrypted with zero-knowledge proofs. 
            Manage your assets privately while maintaining verifiable performance.
          </p>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="p-6 bg-gradient-glass backdrop-blur-xl border-border/50 shadow-glass">
              <div className="text-center space-y-4">
                <div className="p-3 rounded-full bg-accent/20 w-fit mx-auto">
                  <Lock className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold">Complete Privacy</h3>
                <p className="text-muted-foreground text-sm">
                  Your holdings, transactions, and balances are fully encrypted
                </p>
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-glass backdrop-blur-xl border-border/50 shadow-glass">
              <div className="text-center space-y-4">
                <div className="p-3 rounded-full bg-accent/20 w-fit mx-auto">
                  <Zap className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold">Real-Time Tracking</h3>
                <p className="text-muted-foreground text-sm">
                  Monitor your portfolio performance across all DeFi protocols
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Portfolio Management */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Wallet Connection */}
            <div className="lg:col-span-1">
              <WalletConnect />
            </div>
            
            {/* Portfolio Dashboard */}
            <div className="lg:col-span-3">
              <PortfolioDashboard />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StealthMode;