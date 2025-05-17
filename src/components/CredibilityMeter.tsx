
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface CredibilityMeterProps {
  score: number;
  type: "authenticity" | "source" | "crossVerification" | "contentConsistency";
  showLabels?: boolean;
  size?: "small" | "medium" | "large";
}

const CredibilityMeter = ({ 
  score, 
  type, 
  showLabels = true, 
  size = "medium" 
}: CredibilityMeterProps) => {
  const getColor = () => {
    if (score >= 85) return "bg-reliable";
    if (score >= 70) return "bg-reliable-light";
    if (score >= 50) return "bg-neutral";
    if (score >= 30) return "bg-fake-light";
    return "bg-fake";
  };

  const getLabel = () => {
    if (type === "authenticity") {
      if (score >= 85) return "Highly Reliable";
      if (score >= 70) return "Likely Reliable";
      if (score >= 50) return "Needs Verification";
      if (score >= 30) return "Questionable";
      return "Highly Unreliable";
    } else if (type === "source") {
      if (score >= 85) return "Very Credible Source";
      if (score >= 70) return "Credible Source";
      if (score >= 50) return "Moderate Credibility";
      if (score >= 30) return "Low Credibility";
      return "Unreliable Source";
    } else if (type === "crossVerification") {
      if (score >= 85) return "Strongly Verified";
      if (score >= 70) return "Mostly Verified";
      if (score >= 50) return "Partially Verified";
      if (score >= 30) return "Minimally Verified";
      return "Unverified";
    } else if (type === "contentConsistency") {
      if (score >= 85) return "Very Consistent";
      if (score >= 70) return "Mostly Consistent";
      if (score >= 50) return "Somewhat Consistent";
      if (score >= 30) return "Inconsistent";
      return "Highly Inconsistent";
    }
    return "";
  };

  // Generate marker points for the meter
  const markers = showLabels ? [
    { position: 0, label: '0%' },
    { position: 25, label: '' },
    { position: 50, label: '50%' },
    { position: 75, label: '' },
    { position: 100, label: '100%' }
  ] : [];

  const heightClass = size === "small" ? "h-1.5" : size === "large" ? "h-3.5" : "h-2.5";
  const marginClass = size === "small" ? "mt-3 mb-1" : "mt-5 mb-2";
  const textSizeClass = size === "small" ? "text-xs" : "text-sm";

  return (
    <div className="w-full">
      {showLabels && (
        <div className="flex justify-between text-xs text-neutral-dark mb-1 relative">
          {markers.map((marker, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="absolute" style={{ left: `${marker.position}%` }}>
                {marker.label}
              </span>
            </div>
          ))}
        </div>
      )}
      
      <div className={marginClass}>
        <Progress 
          value={score} 
          className={cn(`${heightClass} rounded-full`, getColor())}
        />
        
        {showLabels && (
          <div className="flex justify-between text-xs text-neutral-dark mt-1 relative">
            <div className="absolute left-0">Unreliable</div>
            <div className="absolute right-0">Reliable</div>
          </div>
        )}
      </div>
      
      {showLabels && (
        <div className="mt-6 text-center">
          <span className={cn(
            `font-medium px-3 py-1 rounded-full ${textSizeClass}`,
            score >= 70 ? "bg-reliable/10 text-reliable-dark" : 
            score >= 50 ? "bg-neutral/10 text-neutral-dark" : 
            "bg-fake/10 text-fake-dark"
          )}>
            {getLabel()} ({score}%)
          </span>
        </div>
      )}
    </div>
  );
};

export default CredibilityMeter;
