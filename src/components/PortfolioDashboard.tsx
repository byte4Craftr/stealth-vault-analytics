import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StatsCard from "./StatsCard";
import { 
  TrendingUp, 
  DollarSign, 
  Shield, 
  Eye, 
  EyeOff,
  PieChart,
  Activity
} from "lucide-react";

const PortfolioDashboard = () => {
  const portfolioData = [
    {
      name: "Ethereum",
      symbol: "ETH",
      value: "$89,420",
      allocation: "36.1%",
      change: "+5.2%",
      encrypted: true
    },
    {
      name: "Bitcoin", 
      symbol: "BTC",
      value: "$67,890",
      allocation: "27.4%", 
      change: "+2.8%",
      encrypted: true
    },
    {
      name: "Solana",
      symbol: "SOL", 
      value: "$45,230",
      allocation: "18.2%",
      change: "+12.1%",
      encrypted: true
    },
    {
      name: "Chainlink",
      symbol: "LINK",
      value: "$28,950",
      allocation: "11.7%",
      change: "-1.4%",
      encrypted: true
    },
    {
      name: "Polygon",
      symbol: "MATIC",
      value: "$16,402",
      allocation: "6.6%",
      change: "+8.9%",
      encrypted: true
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Portfolio Value"
          value="$247,892"
          change="+12.4%"
          changeType="positive"
          icon={DollarSign}
          description="Encrypted balance"
        />
        <StatsCard
          title="24h Performance"
          value="+$27,341"
          change="+12.4%"
          changeType="positive"
          icon={TrendingUp}
          description="All positions tracked"
        />
        <StatsCard
          title="Privacy Score"
          value="100%"
          change="Fully Stealth"
          changeType="positive"
          icon={Shield}
          description="Zero exposure"
        />
        <StatsCard
          title="Active Positions"
          value="23"
          change="5 protocols"
          changeType="neutral"
          icon={PieChart}
          description="Cross-chain tracking"
        />
      </div>

      {/* Portfolio Holdings */}
      <Card className="p-6 bg-gradient-glass backdrop-blur-xl border-border/50 shadow-glass">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Activity className="h-5 w-5 text-accent" />
            Portfolio Holdings
          </h2>
          <Badge variant="outline" className="bg-accent/20 text-accent border-accent/30">
            <Shield className="h-3 w-3 mr-1" />
            Encrypted
          </Badge>
        </div>

        <div className="space-y-4">
          {portfolioData.map((asset, index) => (
            <div 
              key={asset.symbol}
              className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border/50 hover:bg-secondary/40 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center text-accent-foreground font-bold text-sm">
                  {asset.symbol.slice(0, 2)}
                </div>
                <div>
                  <div className="font-medium">{asset.name}</div>
                  <div className="text-sm text-muted-foreground">{asset.symbol}</div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="font-medium">{asset.value}</div>
                  <div className="text-sm text-muted-foreground">{asset.allocation}</div>
                </div>
                <div className={`text-sm font-medium ${
                  asset.change.startsWith('+') ? 'text-accent' : 'text-destructive'
                }`}>
                  {asset.change}
                </div>
                <div className="p-1">
                  {asset.encrypted ? (
                    <EyeOff className="h-4 w-4 text-accent" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-accent" />
            <span>All holdings are encrypted with zero-knowledge proofs</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PortfolioDashboard;