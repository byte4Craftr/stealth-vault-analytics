import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
import { Activity, BarChart3, Home } from "lucide-react";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/">
              <Button 
                variant={isActive("/") ? "secondary" : "ghost"} 
                size="sm"
                className="gap-2"
              >
                <Home className="h-4 w-4" />
                Home
              </Button>
            </Link>
            
            <Link to="/stealth">
              <Button 
                variant={isActive("/stealth") ? "secondary" : "ghost"} 
                size="sm"
                className="gap-2"
              >
                <Activity className="h-4 w-4" />
                Stealth Mode
              </Button>
            </Link>
            
            <Link to="/analytics">
              <Button 
                variant={isActive("/analytics") ? "secondary" : "ghost"} 
                size="sm"
                className="gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                Public Analytics
              </Button>
            </Link>
          </nav>

          {/* Mobile menu could be added here if needed */}
        </div>
      </div>
    </header>
  );
};

export default Header;