
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Info, Shield, ShieldCheck, ShieldX, ShieldAlert } from "lucide-react";

interface ResultCardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "reliable" | "unreliable" | "neutral";
  headerExtra?: React.ReactNode;
  confidenceScore?: number; // Added confidence score prop
}

const ResultCard = ({ 
  title, 
  description, 
  children, 
  className,
  variant = "default",
  headerExtra,
  confidenceScore
}: ResultCardProps) => {
  // Get appropriate icon based on variant
  const getIcon = () => {
    switch(variant) {
      case "reliable": return <ShieldCheck className="h-5 w-5 text-reliable" />;
      case "unreliable": return <ShieldX className="h-5 w-5 text-fake" />;
      case "neutral": return <ShieldAlert className="h-5 w-5 text-neutral" />;
      default: return <Info className="h-5 w-5 text-neutral" />;
    }
  };

  // Get badge text based on variant and confidence
  const getBadgeText = () => {
    if (variant === "reliable") return confidenceScore ? `Verified (${confidenceScore}%)` : "Verified";
    if (variant === "unreliable") return confidenceScore ? `Unreliable (${confidenceScore}%)` : "Unreliable";
    if (variant === "neutral") return confidenceScore ? `Uncertain (${confidenceScore}%)` : "Uncertain";
    return "";
  };
  
  // Show pulsing animation only if confidence is high or low
  const shouldPulse = confidenceScore !== undefined && 
    ((variant === "reliable" && confidenceScore > 85) || 
     (variant === "unreliable" && confidenceScore < 30));
  
  return (
    <Card className={cn(
      "animate-fade-in shadow-sm hover:shadow-md transition-shadow duration-200", 
      variant === "reliable" && "border-l-4 border-l-reliable",
      variant === "unreliable" && "border-l-4 border-l-fake",
      variant === "neutral" && "border-l-4 border-l-neutral",
      className
    )}>
      <CardHeader className={cn(
        "rounded-t-lg",
        variant === "reliable" && "bg-reliable-light/10",
        variant === "unreliable" && "bg-fake-light/10",
        variant === "neutral" && "bg-neutral-light/10"
      )}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {getIcon()}
            <CardTitle>{title}</CardTitle>
          </div>
          {variant !== "default" ? (
            <Badge variant={
              variant === "reliable" ? "default" : 
              variant === "unreliable" ? "destructive" : 
              "outline"
            } className={cn(
              shouldPulse ? "animate-pulse-subtle" : "",
              variant === "reliable" && "bg-reliable",
              variant === "unreliable" && "bg-fake",
              variant === "neutral" && "border-neutral text-neutral-dark"
            )}>
              {getBadgeText()}
            </Badge>
          ) : headerExtra}
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="p-5">{children}</CardContent>
    </Card>
  );
};

export default ResultCard;
