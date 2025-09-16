import logoImage from "@/assets/logo.png";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const Logo = ({ className = "", size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10", 
    lg: "h-12 w-12"
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img 
        src={logoImage} 
        alt="Stealth Portfolio" 
        className={`${sizeClasses[size]} object-contain`}
      />
      <span className="text-xl font-bold bg-gradient-accent bg-clip-text text-transparent">
        StealthFolio
      </span>
    </div>
  );
};

export default Logo;