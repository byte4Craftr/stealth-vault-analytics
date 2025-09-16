import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  description?: string;
}

const StatsCard = ({ 
  title, 
  value, 
  change, 
  changeType = "neutral", 
  icon: Icon,
  description 
}: StatsCardProps) => {
  const changeColor = {
    positive: "text-accent",
    negative: "text-destructive",
    neutral: "text-muted-foreground"
  }[changeType];

  return (
    <Card className="p-6 bg-gradient-glass backdrop-blur-xl border-border/50 shadow-glass hover:shadow-glow transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-accent/20">
          <Icon className="h-5 w-5 text-accent" />
        </div>
        {change && (
          <span className={`text-sm font-medium ${changeColor}`}>
            {change}
          </span>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-2xl font-bold">{value}</h3>
        <p className="text-sm text-muted-foreground">{title}</p>
        {description && (
          <p className="text-xs text-muted-foreground/70">{description}</p>
        )}
      </div>
    </Card>
  );
};

export default StatsCard;