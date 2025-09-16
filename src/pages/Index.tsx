import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { Lock, Eye, BarChart3, Zap, ArrowRight, Users } from "lucide-react";
import { Link } from "react-router-dom";
import heroBackground from "@/assets/hero-bg.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <Badge className="bg-accent/20 text-accent border-accent/30 px-4 py-2">
              <Lock className="h-4 w-4 mr-2" />
              Zero-Knowledge Portfolio Management
            </Badge>
            
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Manage Assets
              <br />
              <span className="bg-gradient-accent bg-clip-text text-transparent">
                without Exposure
              </span>
            </h1>
            
            {/* Subheading */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Your DeFi portfolios are encrypted with zero-knowledge proofs, 
              while performance analytics remain publicly verifiable.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/stealth">
                <Button 
                  variant="hero" 
                  size="lg"
                  className="text-lg px-8 py-6"
                >
                  <Lock className="mr-2 h-5 w-5" />
                  Enter Stealth Mode
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link to="/analytics">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  View Public Analytics
                </Button>
              </Link>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <Card className="p-6 bg-gradient-glass backdrop-blur-xl border-border/50 shadow-glass">
                <div className="text-center space-y-4">
                  <div className="p-3 rounded-full bg-accent/20 w-fit mx-auto">
                    <Lock className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold">End-to-End Encryption</h3>
                  <p className="text-muted-foreground text-sm">
                    Your portfolio data is encrypted with military-grade security
                  </p>
                </div>
              </Card>
              
              <Card className="p-6 bg-gradient-glass backdrop-blur-xl border-border/50 shadow-glass">
                <div className="text-center space-y-4">
                  <div className="p-3 rounded-full bg-accent/20 w-fit mx-auto">
                    <Eye className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold">Public Verification</h3>
                  <p className="text-muted-foreground text-sm">
                    Prove your performance without revealing positions
                  </p>
                </div>
              </Card>
              
              <Card className="p-6 bg-gradient-glass backdrop-blur-xl border-border/50 shadow-glass">
                <div className="text-center space-y-4">
                  <div className="p-3 rounded-full bg-accent/20 w-fit mx-auto">
                    <Zap className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold">Real-Time Analytics</h3>
                  <p className="text-muted-foreground text-sm">
                    Advanced portfolio insights with instant updates
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose StealthFolio?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The only portfolio manager that combines complete privacy with transparent performance
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="p-3 rounded-full bg-accent/20 flex-shrink-0">
                  <Lock className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Complete Privacy</h3>
                  <p className="text-muted-foreground">
                    Your holdings, transactions, and strategies remain completely private 
                    while still enabling performance verification.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="p-3 rounded-full bg-accent/20 flex-shrink-0">
                  <BarChart3 className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Transparent Performance</h3>
                  <p className="text-muted-foreground">
                    Publicly verifiable returns and analytics without exposing 
                    any sensitive portfolio information.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="p-3 rounded-full bg-accent/20 flex-shrink-0">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Professional Grade</h3>
                  <p className="text-muted-foreground">
                    Enterprise-level security and analytics tools designed 
                    for serious DeFi portfolio management.
                  </p>
                </div>
              </div>
            </div>
            
            <Card className="p-8 bg-gradient-glass backdrop-blur-xl border-border/50 shadow-glass">
              <div className="text-center space-y-6">
                <div className="p-4 rounded-full bg-accent/20 w-fit mx-auto">
                  <Zap className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold">Ready to get started?</h3>
                <p className="text-muted-foreground">
                  Join thousands of DeFi investors who trust StealthFolio 
                  with their portfolio management.
                </p>
                <div className="space-y-3">
                  <Link to="/stealth" className="block">
                    <Button variant="stealth" size="lg" className="w-full">
                      Start Managing Privately
                    </Button>
                  </Link>
                  <Link to="/analytics" className="block">
                    <Button variant="outline" size="lg" className="w-full">
                      View Sample Analytics
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-border/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">StealthFolio</h4>
              <p className="text-muted-foreground text-sm">
                Advanced DeFi portfolio management with zero-knowledge privacy protection.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Features</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Private Portfolio Management</div>
                <div>Public Performance Analytics</div>
                <div>Zero-Knowledge Proofs</div>
                <div>Real-Time Tracking</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Security</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Military-Grade Encryption</div>
                <div>Non-Custodial Architecture</div>
                <div>Open Source Protocols</div>
                <div>Audited Smart Contracts</div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border/50 text-center">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Lock className="h-4 w-4" />
              <span>Secured by zero-knowledge cryptography</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;