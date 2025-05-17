
import { Badge } from "@/components/ui/badge";
import { Link } from "@/components/ui/link";
import { Info, ShieldCheck, ShieldX, ShieldAlert, HelpCircle, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface SourceInfoProps {
  sourceName: string;
  sourceUrl?: string;
  category?: string;
  bias?: string;
  verifiedBy?: string[];
  isVerified: boolean;
  confidenceLevel?: number;
  factCheckedClaims?: Array<{claim: string, status: "confirmed" | "disputed" | "unverified"}>;
}

const SourceInfo = ({ 
  sourceName, 
  sourceUrl, 
  category, 
  bias, 
  verifiedBy = [],
  isVerified,
  confidenceLevel = 0,
  factCheckedClaims = []
}: SourceInfoProps) => {
  // Enhanced trust level determination with weighted verification
  const verificationWeight = verifiedBy.length > 0 
    ? verifiedBy.reduce((weight, source) => {
        // Give more weight to established fact-checking organizations
        if (["Reuters", "Associated Press", "BBC", "FactCheck.org", "Snopes", "PolitiFact"].includes(source)) {
          return weight + 15;
        } else if (["Google Knowledge Graph", "Wikipedia"].includes(source)) {
          return weight + 10;
        }
        return weight + 5;
      }, 0)
    : 0;
    
  // Calculate adjusted confidence with verification weight
  const adjustedConfidence = Math.min(100, Math.max(0, 
    confidenceLevel + (verificationWeight / 10) - (verifiedBy.length === 0 ? 20 : 0)
  ));
  
  // Determine trust level message with more granularity
  let trustMessage;
  let trustIcon;
  let trustColor;
  
  if (isVerified && verifiedBy.length >= 3 && adjustedConfidence >= 85) {
    trustMessage = "Highly Trusted Source";
    trustIcon = <ShieldCheck className="h-5 w-5" />;
    trustColor = "text-reliable";
  } else if (isVerified && adjustedConfidence >= 70) {
    trustMessage = "Verified Source";
    trustIcon = <ShieldCheck className="h-5 w-5" />;
    trustColor = "text-reliable";
  } else if (verifiedBy.length > 0 && adjustedConfidence >= 50) {
    trustMessage = "Partially Verified";
    trustIcon = <ShieldAlert className="h-5 w-5" />;
    trustColor = "text-neutral";
  } else if (verifiedBy.length > 0 && adjustedConfidence >= 30) {
    trustMessage = "Minimally Verified";
    trustIcon = <ShieldAlert className="h-5 w-5" />;
    trustColor = "text-fake-light";
  } else {
    trustMessage = "Unverified Source";
    trustIcon = <ShieldX className="h-5 w-5" />;
    trustColor = "text-fake";
  }

  // Enhanced calculation of verified claims with weighting by importance
  const totalClaims = factCheckedClaims.length;
  const confirmedClaims = factCheckedClaims.filter(claim => claim.status === "confirmed").length;
  const disputedClaims = factCheckedClaims.filter(claim => claim.status === "disputed").length;
  
  const claimsVerificationRate = totalClaims > 0 
    ? Math.round(((confirmedClaims * 1.0) + (totalClaims - confirmedClaims - disputedClaims) * 0.5) / totalClaims * 100) 
    : 0;

  // Cross-verification score (new)
  const crossVerificationScore = Math.min(100, Math.round((verifiedBy.length * 15) + adjustedConfidence * 0.7));

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-medium text-lg">{sourceName}</div>
          {sourceUrl && (
            <a 
              href={sourceUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-truth hover:text-truth-dark text-sm flex items-center gap-1"
            >
              {sourceUrl}
              <Info className="h-3 w-3" />
            </a>
          )}
        </div>
        <div className={`flex items-center gap-2 ${trustColor}`}>
          {trustIcon}
          <span className="font-medium">{trustMessage}</span>
        </div>
      </div>
      
      <div className="flex gap-2 flex-wrap">
        {category && (
          <Badge variant="outline" className="border-neutral">
            Category: {category}
          </Badge>
        )}
        
        {bias && (
          <Badge variant="outline" className="border-neutral">
            Bias: {bias}
          </Badge>
        )}
        
        <Badge 
          variant={crossVerificationScore >= 80 ? "default" : "outline"} 
          className={cn(
            crossVerificationScore >= 80 ? "bg-reliable text-white" : 
            crossVerificationScore >= 50 ? "border-neutral" : "border-fake text-fake-dark"
          )}
        >
          Cross-verification: {crossVerificationScore}%
        </Badge>
      </div>
      
      {/* Enhanced fact-checked claims section */}
      {factCheckedClaims.length > 0 && (
        <div className="mt-2 border border-neutral-100 rounded-md p-3 bg-gray-50">
          <p className="text-sm font-medium mb-2">Fact-checked claims:</p>
          <div className="space-y-2.5">
            {factCheckedClaims.map((claim, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm">
                {claim.status === "confirmed" ? (
                  <CheckCircle2 className="h-4 w-4 text-reliable shrink-0 mt-0.5" />
                ) : claim.status === "disputed" ? (
                  <XCircle className="h-4 w-4 text-fake shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-neutral shrink-0 mt-0.5" />
                )}
                <span className={cn(
                  claim.status === "confirmed" ? "text-reliable-dark" : 
                  claim.status === "disputed" ? "text-fake-dark" : "text-neutral-dark"
                )}>
                  {claim.claim}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-xs text-neutral-dark">
              <span>Claims verification</span>
              <span>{confirmedClaims}/{totalClaims} verified ({claimsVerificationRate}%)</span>
            </div>
            <Progress value={claimsVerificationRate} className="h-1.5" 
              color={
                claimsVerificationRate >= 70 ? "bg-reliable" : 
                claimsVerificationRate >= 40 ? "bg-neutral" : "bg-fake"
              }
            />
          </div>
        </div>
      )}
      
      {verifiedBy.length > 0 && (
        <div className="mt-2">
          <p className="text-sm font-medium">Verified by:</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {verifiedBy.map((source, index) => (
              <Badge key={index} variant="secondary" className="bg-reliable-light text-reliable-dark">
                {source}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      <div className="text-sm text-neutral-dark mt-2">
        <p>
          This analysis is based on cross-verification with trusted news sources, fact-checking organizations, 
          Google Knowledge Graph, and Wikipedia information. Results are more accurate for sources with multiple verifications.
        </p>
        {!isVerified && (
          <p className="mt-1 text-neutral">
            Note: Lack of verification doesn't automatically mean the content is false, just that additional fact-checking is recommended.
          </p>
        )}
      </div>
    </div>
  );
};

export default SourceInfo;
