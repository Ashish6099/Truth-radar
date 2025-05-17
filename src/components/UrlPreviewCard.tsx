
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Link, ShieldAlert, Unlink } from "lucide-react";
import { cn } from "@/lib/utils";

export interface UrlPreviewData {
  url: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  securityStatus: "safe" | "suspicious" | "dangerous" | "unknown";
  securityScore: number; // 0-100
  threatTypes?: string[];
}

interface UrlPreviewCardProps {
  previewData: UrlPreviewData | null;
  isLoading: boolean;
}

export const UrlPreviewCard: React.FC<UrlPreviewCardProps> = ({ previewData, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="w-full animate-pulse">
        <CardHeader className="h-12 bg-gray-100 rounded-t-lg"></CardHeader>
        <CardContent className="space-y-2 p-4">
          <div className="h-4 bg-gray-100 rounded w-3/4"></div>
          <div className="h-4 bg-gray-100 rounded w-1/2"></div>
          <div className="h-32 bg-gray-100 rounded mt-4"></div>
        </CardContent>
      </Card>
    );
  }

  if (!previewData) {
    return (
      <Card className="w-full border-dashed border-2">
        <CardContent className="flex flex-col items-center justify-center p-6 text-neutral-dark">
          <Unlink className="h-12 w-12 mb-2 text-neutral" />
          <p>No URL preview available</p>
        </CardContent>
      </Card>
    );
  }

  const { url, title, description, imageUrl, securityStatus, securityScore, threatTypes } = previewData;

  const getSecurityBadge = () => {
    switch (securityStatus) {
      case "safe":
        return <Badge className="bg-reliable">Safe</Badge>;
      case "suspicious":
        return <Badge className="bg-neutral">Suspicious</Badge>;
      case "dangerous":
        return <Badge className="bg-fake">Dangerous</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getSecurityIcon = () => {
    switch (securityStatus) {
      case "safe":
        return <CheckCircle className="h-5 w-5 text-reliable" />;
      case "suspicious":
        return <AlertTriangle className="h-5 w-5 text-neutral" />;
      case "dangerous":
        return <ShieldAlert className="h-5 w-5 text-fake" />;
      default:
        return <Link className="h-5 w-5 text-neutral" />;
    }
  };

  return (
    <Card className={cn(
      "w-full transition-shadow hover:shadow-md",
      securityStatus === "safe" && "border-l-4 border-l-reliable",
      securityStatus === "suspicious" && "border-l-4 border-l-neutral",
      securityStatus === "dangerous" && "border-l-4 border-l-fake"
    )}>
      <CardHeader className="flex flex-row justify-between items-center py-3 px-4 border-b">
        <div className="flex items-center gap-2">
          {getSecurityIcon()}
          <span className="text-sm font-medium truncate max-w-[200px]">{url.replace(/^https?:\/\//, '')}</span>
        </div>
        {getSecurityBadge()}
      </CardHeader>

      <CardContent className="p-0">
        {imageUrl && (
          <div className="relative w-full h-40">
            <img 
              src={imageUrl} 
              alt={title || "URL preview"} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="p-4">
          {title && <h3 className="font-medium mb-1">{title}</h3>}
          {description && <p className="text-sm text-neutral-dark mb-3">{description}</p>}
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <span className="text-xs text-neutral-dark mr-2">Security score:</span>
              <div className="w-24 h-2 bg-gray-100 rounded-full">
                <div 
                  className={cn(
                    "h-full rounded-full",
                    securityScore >= 70 ? "bg-reliable" : 
                    securityScore >= 40 ? "bg-neutral" : 
                    "bg-fake"
                  )} 
                  style={{ width: `${securityScore}%` }}
                ></div>
              </div>
              <span className="text-xs ml-2">{securityScore}%</span>
            </div>
          </div>

          {threatTypes && threatTypes.length > 0 && (
            <div className="mt-3">
              <div className="flex items-center gap-1 text-xs text-fake-dark">
                <ShieldAlert className="h-3 w-3" />
                <span>Detected threats:</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {threatTypes.map((threat, index) => (
                  <Badge key={index} variant="outline" className="text-[10px] bg-fake/10 text-fake-dark">
                    {threat}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UrlPreviewCard;
