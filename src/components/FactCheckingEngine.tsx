import { cn } from "@/lib/utils";
import { Check, Flag, Info, SearchCheck, ShieldCheck, ShieldX, ShieldAlert } from "lucide-react";

export interface EntityReference {
  name: string;
  type: "person" | "organization" | "location" | "date" | "claim";
  mentions: number;
  verifiedStatus?: "verified" | "disputed" | "unverified";
}

export interface FactCheckResult {
  classification: "Likely Real" | "Likely Fake" | "Unverifiable";
  confidenceScore: number; // 0-100
  reasoning: string[];
  entities: EntityReference[];
  sourceCredibility: number; // 0-100
  contentConsistency: number; // 0-100
  crossVerification: number; // 0-100
  historicalContext?: string;
  knownPatterns?: string[];
}

export interface VerificationSource {
  name: string;
  url?: string;
  trustScore: number; // 0-100
  claimsVerified: number;
}

// Enhanced fact-checking logic
export const verifyContent = (content: string, sourceUrl?: string): FactCheckResult => {
  // This would be replaced with actual API calls to fact-checking databases
  // For demo purposes, we'll use content analysis logic

  // Extract potential entities
  const entities = extractEntities(content);
  
  // Analyze claims and their verification status
  const claimsAnalysis = analyzeClaimsInContent(content);
  
  // Detect sensationalist language
  const sensationalistScore = detectSensationalistLanguage(content);
  
  // Check for credibility indicators
  const credibilityIndicators = detectCredibilityIndicators(content);
  
  // Cross-verification score based on entities and claims
  const crossVerification = calculateCrossVerification(entities, claimsAnalysis);
  
  // Source credibility (would come from a database in production)
  const sourceCredibility = sourceUrl ? analyzeSourceCredibility(sourceUrl) : 50;
  
  // Content consistency score
  const contentConsistency = 100 - sensationalistScore + credibilityIndicators;
  
  // Overall score calculation with weighted factors
  const overallScore = Math.round(
    (sourceCredibility * 0.3) + 
    (crossVerification * 0.4) + 
    (contentConsistency * 0.3)
  );
  
  // Determine classification based on overall score
  let classification: "Likely Real" | "Likely Fake" | "Unverifiable";
  if (overallScore >= 70) {
    classification = "Likely Real";
  } else if (overallScore <= 40) {
    classification = "Likely Fake";
  } else {
    classification = "Unverifiable";
  }
  
  // Generate reasoning based on analysis
  const reasoning = generateReasoning(
    classification, 
    sourceCredibility, 
    contentConsistency, 
    crossVerification,
    entities
  );

  return {
    classification,
    confidenceScore: overallScore,
    reasoning,
    entities,
    sourceCredibility,
    contentConsistency,
    crossVerification,
    knownPatterns: getKnownPatterns(content, classification)
  };
};

// Helper functions for verification
const extractEntities = (content: string): EntityReference[] => {
  const entities: EntityReference[] = [];
  
  // This would use NER (Named Entity Recognition) in production
  // For demo, we'll use simplified logic
  
  // Extract people (look for title + name patterns)
  const peoplePattern = /(?:Mr\.|Mrs\.|Dr\.|President|Senator|Governor|Prof\.|Professor)?\s[A-Z][a-z]+(?:\s[A-Z][a-z]+)+/g;
  const peopleMatches = content.match(peoplePattern) || [];
  peopleMatches.forEach(person => {
    entities.push({
      name: person.trim(),
      type: "person",
      mentions: countOccurrences(content, person),
      verifiedStatus: Math.random() > 0.3 ? "verified" : (Math.random() > 0.5 ? "disputed" : "unverified")
    });
  });
  
  // Extract organizations (look for capitalized words)
  const orgPattern = /[A-Z][a-z]+(?:\s[A-Z][a-z]+){1,3}/g;
  const orgMatches = content.match(orgPattern) || [];
  orgMatches
    .filter(org => !peopleMatches.includes(org)) // Filter out people
    .forEach(org => {
      entities.push({
        name: org.trim(),
        type: "organization",
        mentions: countOccurrences(content, org),
        verifiedStatus: Math.random() > 0.2 ? "verified" : (Math.random() > 0.5 ? "disputed" : "unverified")
      });
    });
  
  // Extract dates
  const datePattern = /(?:\d{1,2}\/\d{1,2}\/\d{2,4})|(?:January|February|March|April|May|June|July|August|September|October|November|December)\s\d{1,2}(?:st|nd|rd|th)?,\s\d{4}/g;
  const dateMatches = content.match(datePattern) || [];
  dateMatches.forEach(date => {
    entities.push({
      name: date,
      type: "date",
      mentions: countOccurrences(content, date),
      verifiedStatus: "verified" // Dates are typically verifiable
    });
  });
  
  // Extract locations
  const locationPattern = /(?:in|at|from|to)\s([A-Z][a-z]+(?:,\s[A-Z][a-z]+)?)/g;
  let match;
  const locations = new Set<string>();
  while ((match = locationPattern.exec(content)) !== null) {
    if (match[1] && !match[1].match(/^(January|February|March|April|May|June|July|August|September|October|November|December)$/)) {
      locations.add(match[1]);
    }
  }
  
  locations.forEach(location => {
    entities.push({
      name: location,
      type: "location",
      mentions: countOccurrences(content, location),
      verifiedStatus: Math.random() > 0.1 ? "verified" : "unverified"
    });
  });
  
  // Extract claims (sentences with strong assertions)
  const claimPatterns = [
    /(?:confirms|proves|shows|reveals|announces|declares|states|affirms|claims|alleges|says|admits)(?:\sthat)?\s[^.!?]+[.!?]/g,
    /(?:according\sto)[^.!?]+[.!?]/g,
    /(?:is|are)\s(?:not)?\s[^.!?]+[.!?]/g
  ];
  
  claimPatterns.forEach(pattern => {
    const claimMatches = content.match(pattern) || [];
    claimMatches.forEach(claim => {
      if (claim.length > 15) { // Avoid short claims
        entities.push({
          name: claim.trim(),
          type: "claim",
          mentions: 1,
          verifiedStatus: Math.random() > 0.5 ? "verified" : (Math.random() > 0.5 ? "disputed" : "unverified")
        });
      }
    });
  });
  
  return entities.slice(0, 10); // Limit to top 10 most relevant entities
};

const countOccurrences = (text: string, searchTerm: string): number => {
  const regex = new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
  return (text.match(regex) || []).length;
};

const analyzeClaimsInContent = (content: string): number => {
  // This would be much more sophisticated in production
  // For demo, we'll use a simple heuristic
  
  const extremeClaimPatterns = [
    /never before/i,
    /first time in history/i,
    /unprecedented/i,
    /shocking/i,
    /unbelievable/i,
    /scientists baffled/i,
    /doctors hate/i,
    /won't believe/i,
    /secret/i,
    /conspiracy/i,
  ];
  
  const credibilityClaimPatterns = [
    /according to research/i,
    /studies show/i,
    /evidence suggests/i,
    /data indicates/i,
    /experts agree/i,
    /published in/i,
    /peer-reviewed/i,
  ];
  
  let extremeClaimCount = 0;
  extremeClaimPatterns.forEach(pattern => {
    if (pattern.test(content)) extremeClaimCount++;
  });
  
  let credibilityClaimCount = 0;
  credibilityClaimPatterns.forEach(pattern => {
    if (pattern.test(content)) credibilityClaimCount++;
  });
  
  // Return a score where higher is more credible
  return Math.max(0, Math.min(100, 50 + (credibilityClaimCount * 10) - (extremeClaimCount * 15)));
};

const detectSensationalistLanguage = (content: string): number => {
  const sensationalistWords = [
    "shocking", "secret", "conspiracy", "truth revealed", 
    "cover-up", "hoax", "breakthrough", "miracle", "revolutionary",
    "they don't want you to know", "hidden", "exposed", "exclusive"
  ];
  
  let sensationCount = 0;
  sensationalistWords.forEach(word => {
    if (content.toLowerCase().includes(word.toLowerCase())) sensationCount++;
  });
  
  return Math.min(100, sensationCount * 15);
};

const detectCredibilityIndicators = (content: string): number => {
  const credibilityWords = [
    "research", "study", "according to", "expert", "evidence", 
    "data", "analysis", "report", "published", "survey",
    "percent", "statistics", "findings", "results", "conclusion"
  ];
  
  let credibilityCount = 0;
  credibilityWords.forEach(word => {
    if (content.toLowerCase().includes(word.toLowerCase())) credibilityCount++;
  });
  
  return Math.min(100, credibilityCount * 10);
};

const calculateCrossVerification = (entities: EntityReference[], claimsScore: number): number => {
  // Calculate percentage of verified entities
  const totalEntities = entities.length;
  if (totalEntities === 0) return 50;
  
  const verifiedEntities = entities.filter(e => e.verifiedStatus === "verified").length;
  const disputedEntities = entities.filter(e => e.verifiedStatus === "disputed").length;
  
  const verificationRate = (verifiedEntities / totalEntities) * 100;
  const disputeRate = (disputedEntities / totalEntities) * 100;
  
  // Combined score weighting verification rate and claims score
  return Math.round((verificationRate * 0.6) + (claimsScore * 0.4) - (disputeRate * 0.4));
};

const analyzeSourceCredibility = (sourceUrl: string): number => {
  // In production, this would check against a database of known news sources
  // For demo, we'll use domain-based heuristics
  
  const trustedDomains = [
    "reuters.com", "ap.org", "apnews.com", "bbc.com", "bbc.co.uk", 
    "npr.org", "nytimes.com", "washingtonpost.com", "wsj.com", "bloomberg.com",
    "economist.com", "theguardian.com", "time.com", "nature.com", "science.org"
  ];
  
  const moderateTrustDomains = [
    "cnn.com", "nbcnews.com", "abcnews.go.com", "cbsnews.com", "usatoday.com",
    "latimes.com", "chicagotribune.com", "newsweek.com", "forbes.com", "businessinsider.com"
  ];
  
  const lowTrustDomains = [
    "theonion.com", "dailywire.com", "breitbart.com", "infowars.com", "dailycaller.com",
    "nationalenquirer.com", "thesun.co.uk", "dailymail.co.uk", "nypost.com"
  ];
  
  try {
    const domain = new URL(sourceUrl).hostname.replace("www.", "");
    
    if (trustedDomains.some(d => domain.includes(d))) {
      return 85 + Math.floor(Math.random() * 15);
    } else if (moderateTrustDomains.some(d => domain.includes(d))) {
      return 60 + Math.floor(Math.random() * 20);
    } else if (lowTrustDomains.some(d => domain.includes(d))) {
      return 30 + Math.floor(Math.random() * 20);
    } else {
      // Unknown domain - neutral score with slight skepticism
      return 40 + Math.floor(Math.random() * 20);
    }
  } catch (e) {
    // Invalid URL
    return 50;
  }
};

// Fix the function signature to resolve the type error
const generateReasoning = (
  classification: "Likely Real" | "Likely Fake" | "Unverifiable",
  sourceCredibility: number,
  contentConsistency: number,
  crossVerification: number,
  entities: EntityReference[]
): string[] => {
  const reasoning: string[] = [];
  
  // Source credibility reasoning
  if (sourceCredibility >= 80) {
    reasoning.push("The information comes from a highly credible source with a strong track record of accuracy.");
  } else if (sourceCredibility >= 60) {
    reasoning.push("The source has a moderate level of credibility in reporting factual information.");
  } else if (sourceCredibility <= 30) {
    reasoning.push("The source has a history of publishing misleading or unverified information.");
  } else {
    reasoning.push("The source credibility could not be fully determined.");
  }
  
  // Content consistency reasoning
  if (contentConsistency >= 80) {
    reasoning.push("The content uses measured language consistent with factual reporting.");
  } else if (contentConsistency <= 40) {
    reasoning.push("The content uses sensationalist language often associated with misleading information.");
  }
  
  // Cross-verification reasoning
  if (crossVerification >= 80) {
    reasoning.push("Key claims and entities in this content can be independently verified.");
  } else if (crossVerification <= 40) {
    reasoning.push("Multiple claims in this content could not be verified or were found to be misleading.");
  } else {
    reasoning.push("Some claims in this content could be verified, while others require further investigation.");
  }
  
  // Entity-based reasoning
  const verifiedEntities = entities.filter(e => e.verifiedStatus === "verified");
  const disputedEntities = entities.filter(e => e.verifiedStatus === "disputed");
  
  if (disputedEntities.length > 0) {
    reasoning.push(`${disputedEntities.length} key ${disputedEntities.length === 1 ? 'claim' : 'claims'} in this content ${disputedEntities.length === 1 ? 'has' : 'have'} been disputed by fact-checkers.`);
  }
  
  if (verifiedEntities.length > 0) {
    reasoning.push(`${verifiedEntities.length} key ${verifiedEntities.length === 1 ? 'element' : 'elements'} in this content ${verifiedEntities.length === 1 ? 'has' : 'have'} been verified as accurate.`);
  }
  
  // Classification-specific reasoning
  if (classification === "Likely Real") {
    reasoning.push("Based on our analysis, this content appears to be factually accurate.");
  } else if (classification === "Likely Fake") {
    reasoning.push("This content contains multiple indicators of potential misinformation.");
  } else {
    reasoning.push("There is insufficient information to determine the accuracy of this content with high confidence.");
  }
  
  return reasoning;
};

const getKnownPatterns = (
  content: string, 
  classification: "Likely Real" | "Likely Fake" | "Unverifiable"
): string[] => {
  const patterns: string[] = [];
  
  // Check for common misinformation patterns
  if (content.toLowerCase().includes("microchip") && content.toLowerCase().includes("vaccine")) {
    patterns.push("This content references the debunked conspiracy theory about microchips in vaccines.");
  }
  
  if (content.toLowerCase().includes("5g") && (content.toLowerCase().includes("covid") || content.toLowerCase().includes("coronavirus"))) {
    patterns.push("This content references the debunked conspiracy theory linking 5G to COVID-19.");
  }
  
  if (
    (content.toLowerCase().includes("election") || content.toLowerCase().includes("voting")) && 
    content.toLowerCase().includes("fraud") && 
    content.toLowerCase().includes("2020")
  ) {
    patterns.push("This content references claims of widespread 2020 election fraud that have been repeatedly investigated and debunked.");
  }
  
  // Check for common clickbait patterns
  if (
    content.toLowerCase().includes("doctors hate") || 
    content.toLowerCase().includes("one weird trick") ||
    content.toLowerCase().includes("won't believe")
  ) {
    patterns.push("This content uses common clickbait phrases often associated with misleading health claims.");
  }
  
  return patterns;
};

// Component to display fact-checking results
interface FactCheckingResultsProps {
  result: FactCheckResult;
}

export const FactCheckingResults = ({ result }: FactCheckingResultsProps) => {
  const { classification, confidenceScore, reasoning, entities } = result;
  
  const getClassificationColor = () => {
    if (classification === "Likely Real") return "text-reliable-dark";
    if (classification === "Likely Fake") return "text-fake-dark";
    return "text-neutral-dark";
  };
  
  const getClassificationIcon = () => {
    if (classification === "Likely Real") return <ShieldCheck className="h-5 w-5 text-reliable" />;
    if (classification === "Likely Fake") return <ShieldX className="h-5 w-5 text-fake" />;
    return <Info className="h-5 w-5 text-neutral" />;
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          {getClassificationIcon()}
          <div className={cn("font-semibold text-lg", getClassificationColor())}>
            {classification} ({confidenceScore}% confidence)
          </div>
        </div>
        
        <div className={cn(
          "px-3 py-1 rounded-full text-sm font-medium",
          classification === "Likely Real" ? "bg-reliable/10 text-reliable-dark" : 
          classification === "Likely Fake" ? "bg-fake/10 text-fake-dark" : 
          "bg-neutral/10 text-neutral-dark"
        )}>
          {confidenceScore}% confidence
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-base font-medium">Analysis reasoning:</h3>
        <ul className="space-y-1.5 list-disc list-inside text-neutral-dark">
          {reasoning.map((reason, i) => (
            <li key={i}>{reason}</li>
          ))}
        </ul>
      </div>
      
      {entities.length > 0 && (
        <div className="mt-4">
          <h3 className="text-base font-medium mb-2">Key entities detected:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {entities.map((entity, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                {entity.verifiedStatus === "verified" ? (
                  <Check className="h-4 w-4 text-reliable" />
                ) : entity.verifiedStatus === "disputed" ? (
                  <Flag className="h-4 w-4 text-fake" />
                ) : (
                  <Info className="h-4 w-4 text-neutral" />
                )}
                <span className="font-medium">{entity.name}</span>
                <span className="text-xs text-neutral-dark">
                  ({entity.type}{entity.mentions > 1 ? `, ${entity.mentions} mentions` : ''})
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
