import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import StatsCard from "@/components/StatsCard";
import { 
  TrendingUp, 
  Users, 
  BarChart3, 
  Eye,
  ArrowLeft,
  Download,
  Share
} from "lucide-react";
import { Link } from "react-router-dom";

const PublicAnalytics = () => {
  const performanceData = [
    {
      period: "Last 7 Days",
      return: "+18.4%",
      volume: "$1.2M",
      trades: "47",
      sharpe: "2.34"
    },
    {
      period: "Last 30 Days", 
      return: "+42.1%",
      volume: "$4.8M",
      trades: "186",
      sharpe: "1.89"
    },
    {
      period: "Last 90 Days",
      return: "+127.3%", 
      volume: "$12.4M",
      trades: "523",
      sharpe: "2.12"
    },
    {
      period: "All Time",
      return: "+284.7%",
      volume: "$28.9M", 
      trades: "1,247",
      sharpe: "1.94"
    }
  ];

  const topPerformers = [
    { strategy: "DeFi Yield Farming", return: "+156.2%", allocation: "32%" },
    { strategy: "Arbitrage Trading", return: "+89.4%", allocation: "28%" },
    { strategy: "Liquidity Provision", return: "+67.8%", allocation: "24%" },
    { strategy: "Options Strategy", return: "+45.3%", allocation: "16%" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          
          <div className="text-center mb-12">
            <Badge className="bg-accent/20 text-accent border-accent/30 px-4 py-2 mb-6">
              <Eye className="h-4 w-4 mr-2" />
              Publicly Verifiable Performance
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Public
              <br />
              <span className="bg-gradient-accent bg-clip-text text-transparent">
                Analytics
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Transparent performance data with zero-knowledge proofs. 
              Verify returns without exposing portfolio positions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="stealth" className="gap-2">
                <Download className="h-4 w-4" />
                Export Report
              </Button>
              <Button variant="outline" className="gap-2">
                <Share className="h-4 w-4" />
                Share Analytics
              </Button>
            </div>
          </div>

          {/* Performance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatsCard
              title="Total Return"
              value="+284.7%"
              change="All Time"
              changeType="positive"
              icon={TrendingUp}
              description="Verified performance"
            />
            <StatsCard
              title="Total Volume"
              value="$28.9M"
              change="+15.2% vs avg"
              changeType="positive"
              icon={BarChart3}
              description="Traded volume"
            />
            <StatsCard
              title="Sharpe Ratio"
              value="1.94"
              change="Above benchmark"
              changeType="positive"
              icon={Users}
              description="Risk-adjusted return"
            />
            <StatsCard
              title="Win Rate"
              value="73.2%"
              change="1,247 trades"
              changeType="positive"
              icon={Eye}
              description="Successful positions"
            />
          </div>

          {/* Performance History */}
          <Card className="p-6 bg-gradient-glass backdrop-blur-xl border-border/50 shadow-glass mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Performance History</h2>
              <Badge variant="outline" className="bg-accent/20 text-accent border-accent/30">
                Zero-Knowledge Verified
              </Badge>
            </div>

            <div className="space-y-4">
              {performanceData.map((period, index) => (
                <div 
                  key={period.period}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border/50"
                >
                  <div className="font-medium">{period.period}</div>
                  <div className="flex items-center gap-8 text-sm">
                    <div className="text-center">
                      <div className="text-accent font-semibold">{period.return}</div>
                      <div className="text-muted-foreground">Return</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">{period.volume}</div>
                      <div className="text-muted-foreground">Volume</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">{period.trades}</div>
                      <div className="text-muted-foreground">Trades</div>
                    </div>
                    <div className="text-center">
                      <div className="text-accent font-semibold">{period.sharpe}</div>
                      <div className="text-muted-foreground">Sharpe</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Strategies */}
          <Card className="p-6 bg-gradient-glass backdrop-blur-xl border-border/50 shadow-glass">
            <h2 className="text-xl font-semibold mb-6">Top Performing Strategies</h2>
            
            <div className="space-y-4">
              {topPerformers.map((strategy, index) => (
                <div 
                  key={strategy.strategy}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border/50"
                >
                  <div>
                    <div className="font-medium">{strategy.strategy}</div>
                    <div className="text-sm text-muted-foreground">
                      {strategy.allocation} of portfolio
                    </div>
                  </div>
                  <div className="text-accent font-semibold text-lg">
                    {strategy.return}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default PublicAnalytics;