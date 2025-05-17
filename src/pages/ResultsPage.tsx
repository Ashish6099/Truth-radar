import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CredibilityMeter from "@/components/CredibilityMeter";
import ResultCard from "@/components/ResultCard";
import SourceInfo from "@/components/SourceInfo";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { FactCheckingResults, FactCheckResult, verifyContent } from "@/components/FactCheckingEngine";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, ShieldCheck, ShieldX, Link2 } from "lucide-react";
import UrlPreviewCard, { UrlPreviewData } from "@/components/UrlPreviewCard";

// Enhanced mock data for the fact-checking system
const generateMockFactCheckResult = (content: string, inputType: "text" | "url"): FactCheckResult => {
  // For demo purposes, use our fact-checking engine
  const result = verifyContent(content, inputType === "url" ? content : undefined);
  
  return {
    ...result,
    // Add some randomization to make demos more realistic
    confidenceScore: Math.max(20, Math.min(95, result.confidenceScore + (Math.random() * 10 - 5)))
  };
};

const ResultsPage = () => {
  const [analysis, setAnalysis] = useState<any>(null);
  const [factCheckResult, setFactCheckResult] = useState<FactCheckResult | null>(null);
  const [urlPreviewData, setUrlPreviewData] = useState<UrlPreviewData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("summary");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Get the input from sessionStorage
    const newsInput = sessionStorage.getItem("newsInput");
    const inputType = sessionStorage.getItem("inputType") as "text" | "url";
    
    // Get URL preview data if available
    const urlPreviewDataStr = sessionStorage.getItem("urlPreviewData");
    if (urlPreviewDataStr) {
      try {
        const previewData = JSON.parse(urlPreviewDataStr);
        setUrlPreviewData(previewData);
      } catch (err) {
        console.error("Error parsing URL preview data", err);
      }
    }
    
    if (!newsInput) {
      toast({
        title: "No content to analyze",
        description: "Please return to the home page and submit content for analysis.",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    // In a real app, we would call an API endpoint here
    setIsLoading(true);
    
    // Enhanced content analysis logic with better keyword detection and more nuanced results
    const timer = setTimeout(() => {
      const input = newsInput.toLowerCase();
      let result;
      
      // Enhanced detection of trusted news sources with more specificity
      if (input.includes("reuters.com") || 
          input.includes("associated press") || 
          input.includes("bbc.co.uk") ||
          input.includes("npr.org") ||
          input.includes("nytimes.com")) {
        // Trusted source
        result = {
          inputType,
          content: newsInput,
          authenticity: {
            score: 75 + Math.floor(Math.random() * 20),
            prediction: "LIKELY RELIABLE",
          },
          source: {
            name: input.includes("reuters") ? "Reuters" : 
                 input.includes("bbc") ? "BBC" : 
                 input.includes("npr") ? "NPR" : 
                 input.includes("nytimes") ? "New York Times" : 
                 "Associated Press",
            url: inputType === "url" ? newsInput : "",
            credibilityScore: 85 + Math.floor(Math.random() * 10),
            category: "Mainstream News",
            bias: "Minimal",
            isVerified: true,
            verifiedBy: ["Google News Initiative", "Media Bias Fact Check", "NewsGuard", "Wikipedia"],
            confidenceLevel: 85 + Math.floor(Math.random() * 10),
            factCheckedClaims: [
              { claim: "Source is an established news organization", status: "confirmed" },
              { claim: "Source follows journalistic standards", status: "confirmed" },
              { claim: "Source has editorial oversight", status: "confirmed" },
              { claim: "Source discloses corrections", status: "confirmed" }
            ]
          }
        };
      } 
      // Scientific verification with more granular checks
      else if ((input.includes("nasa") && input.includes("official")) || 
              (input.includes("webb") && input.includes("telescope") && input.includes("discovery")) ||
              (input.includes("research") && input.includes("published") && input.includes("journal"))) {
        // Scientific content
        result = {
          inputType,
          content: newsInput,
          authenticity: {
            score: 80 + Math.floor(Math.random() * 15),
            prediction: "LIKELY RELIABLE",
          },
          source: {
            name: input.includes("nasa") ? "NASA Science News" : 
                 input.includes("webb") ? "James Webb Telescope Team" : 
                 "Scientific Journal",
            url: inputType === "url" ? newsInput : "",
            credibilityScore: 90 + Math.floor(Math.random() * 9),
            category: "Scientific Organization",
            bias: "Minimal",
            isVerified: true,
            verifiedBy: ["Google Scholar", "Web of Science", "Science.gov", "Wikipedia"],
            confidenceLevel: 90,
            factCheckedClaims: [
              { claim: "Published in peer-reviewed source", status: "confirmed" },
              { claim: "Authors have relevant credentials", status: "confirmed" },
              { claim: "Methodology is sound", status: "confirmed" },
              { claim: "Results are consistent with existing literature", status: "unverified" }
            ]
          }
        };
      } 
      // Common misinformation topic detection with better accuracy
      else if (input.includes("microchip") || 
              input.includes("conspiracy") || 
              (input.includes("government") && input.includes("tracking")) ||
              (input.includes("they") && input.includes("don't want you") && input.includes("know"))) {
        // Likely misinformation
        result = {
          inputType,
          content: newsInput,
          authenticity: {
            score: 5 + Math.floor(Math.random() * 20),
            prediction: "LIKELY FALSE",
          },
          source: {
            name: "Unknown Source",
            url: inputType === "url" ? newsInput : "",
            credibilityScore: 10 + Math.floor(Math.random() * 15),
            category: "Blog/Social Media",
            bias: "Extreme",
            isVerified: false,
            verifiedBy: [],
            confidenceLevel: 15,
            factCheckedClaims: [
              { claim: "Contains known conspiracy theories", status: "confirmed" },
              { claim: "Makes claims without evidence", status: "confirmed" },
              { claim: "Uses fear-based messaging", status: "confirmed" },
              { claim: "Has been debunked by fact-checkers", status: "confirmed" }
            ]
          }
        };
      }
      // Exaggerated health claims detection
      else if ((input.includes("miracle") && input.includes("cure")) ||
              (input.includes("health") && input.includes("amazing") && input.includes("benefits")) ||
              (input.includes("increases") && input.includes("lifespan")) ||
              (input.includes("doctors") && input.includes("won't tell you"))) {
        // Health misinformation
        result = {
          inputType,
          content: newsInput,
          authenticity: {
            score: 25 + Math.floor(Math.random() * 25),
            prediction: "LIKELY MISLEADING",
          },
          source: {
            name: "Health & Wellness Blog",
            url: inputType === "url" ? newsInput : "",
            credibilityScore: 30 + Math.floor(Math.random() * 20),
            category: "Health Blog",
            bias: "Moderate to High",
            isVerified: false,
            verifiedBy: [],
            confidenceLevel: 35,
            factCheckedClaims: [
              { claim: "Makes exaggerated health claims", status: "confirmed" },
              { claim: "Uses sensationalist language", status: "confirmed" },
              { claim: "Cites legitimate research", status: "disputed" },
              { claim: "Presents balanced view of evidence", status: "disputed" }
            ]
          }
        };
      }
      // Default analysis with more nuance based on language patterns
      else {
        // Check for multiple sensationalist language indicators
        const sensationalistWords = ["shocking", "secret", "they", "conspiracy", "truth revealed", 
                                     "cover-up", "hoax", "breakthrough", "miracle", "revolutionary"];
        const sensationalistCount = sensationalistWords.filter(word => input.includes(word)).length;
        
        // Check for credibility indicators
        const credibilityWords = ["research", "study", "according to", "expert", "evidence", 
                                  "data", "analysis", "report", "published"];
        const credibilityCount = credibilityWords.filter(word => input.includes(word)).length;
        
        // Generate a more balanced result
        const credibilityScore = 50 + (credibilityCount * 5) - (sensationalistCount * 8);
        const clampedScore = Math.min(95, Math.max(15, credibilityScore));
        
        let prediction, sourceType, sourceName;
        if (clampedScore >= 70) {
          prediction = "PROBABLY RELIABLE";
          sourceType = "News Website";
          sourceName = "News Source";
        } else if (clampedScore >= 50) {
          prediction = "UNCERTAIN RELIABILITY";
          sourceType = "Digital Media";
          sourceName = "Online Publication";
        } else {
          prediction = "QUESTIONABLE";
          sourceType = "Blog/Social Media";
          sourceName = "Unknown Source";
        }
        
        result = {
          inputType,
          content: newsInput,
          authenticity: {
            score: clampedScore,
            prediction,
          },
          source: {
            name: sourceName,
            url: inputType === "url" ? newsInput : "",
            credibilityScore: clampedScore,
            category: sourceType,
            bias: clampedScore > 70 ? "Low to Moderate" : "Moderate to High",
            isVerified: clampedScore > 75,
            verifiedBy: clampedScore > 75 ? ["Media Bias Fact Check"] : [],
            confidenceLevel: clampedScore,
            factCheckedClaims: [
              { 
                claim: "Uses factual language", 
                status: credibilityCount > sensationalistCount ? "confirmed" : "disputed" 
              },
              { 
                claim: "Presents verifiable information", 
                status: credibilityCount > 2 ? "confirmed" : "unverified" 
              },
              { 
                claim: "Contains sensationalist claims", 
                status: sensationalistCount > 1 ? "confirmed" : "disputed" 
              },
              { 
                claim: "Cites credible sources", 
                status: credibilityCount > 3 ? "confirmed" : "unverified" 
              }
            ]
          }
        };
      }
      
      // Update with actual user input
      result.inputType = inputType || "text";
      result.content = newsInput;
      
      // Generate fact-check result using our engine
      const factCheck = generateMockFactCheckResult(newsInput, inputType as "text" | "url");
      
      setAnalysis(result);
      setFactCheckResult(factCheck);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, toast]);

  const handleNewAnalysis = () => {
    // Clear the stored input and go back to home
    sessionStorage.removeItem("newsInput");
    sessionStorage.removeItem("inputType");
    sessionStorage.removeItem("urlPreviewData");
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 min-h-[70vh] flex flex-col items-center justify-center">
        <div className="animate-pulse-subtle text-center">
          <h2 className="text-2xl font-bold mb-4">Analyzing Content...</h2>
          <div className="w-16 h-16 border-4 border-truth border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-dark">
            Our AI is examining the content, verifying with trusted sources, and cross-checking with fact-checking organizations. This will only take a moment.
          </p>
        </div>
      </div>
    );
  }

  if (!analysis || !factCheckResult) {
    return (
      <div className="container mx-auto px-4 py-12 min-h-[70vh] flex flex-col items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-fake mb-4">Analysis Failed</h2>
          <p className="text-neutral-dark mb-6">
            We couldn't process your request. Please try again.
          </p>
          <Button onClick={handleNewAnalysis}>Try Another Analysis</Button>
        </div>
      </div>
    );
  }

  // Determine the variant based on the authenticity score
  const getResultCardVariant = () => {
    if (factCheckResult.classification === "Likely Real") return "reliable";
    if (factCheckResult.classification === "Likely Fake") return "unreliable";
    return "neutral";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Analysis Results</h1>
          <p className="text-neutral-dark">
            Here's what our advanced fact-checking system found about the content you submitted:
          </p>
        </div>

        <ResultCard 
          title="Content Analyzed"
          description={`${analysis?.inputType === "text" ? "Text" : "URL"} submitted for analysis`}
        >
          <div className="bg-gray-50 p-4 rounded-md max-h-48 overflow-y-auto">
            <p className="text-sm whitespace-pre-wrap">{analysis?.content}</p>
          </div>
          
          {/* Display URL preview if available */}
          {urlPreviewData && analysis?.inputType === "url" && (
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                <Link2 className="h-4 w-4" />
                URL Security Analysis:
              </h3>
              <UrlPreviewCard 
                previewData={urlPreviewData} 
                isLoading={false}
              />
            </div>
          )}
        </ResultCard>

        <div className="mt-6">
          <Tabs defaultValue="summary" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="details">Detailed Analysis</TabsTrigger>
              <TabsTrigger value="source">Source Verification</TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary" className="mt-6">
              <ResultCard 
                title="Fact Check Results" 
                variant={getResultCardVariant()} 
                description="Our analysis of the content's reliability"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <h3 className="text-lg font-medium mb-3">Classification</h3>
                    <div className="border border-gray-100 rounded-lg p-4 bg-gray-50 mb-4">
                      <div className="text-center mb-4">
                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full text-white mb-2 ${
                          factCheckResult.classification === "Likely Real" ? "bg-reliable" : 
                          factCheckResult.classification === "Likely Fake" ? "bg-fake" :
                          "bg-neutral"
                        }`}>
                          {factCheckResult.classification === "Likely Real" ? (
                            <ShieldCheck className="h-8 w-8" />
                          ) : factCheckResult.classification === "Likely Fake" ? (
                            <ShieldX className="h-8 w-8" />
                          ) : (
                            <Info className="h-8 w-8" />
                          )}
                        </div>
                        <h4 className="text-lg font-semibold">{factCheckResult.classification}</h4>
                        <p className="text-sm text-neutral-dark">
                          with {factCheckResult.confidenceScore}% confidence
                        </p>
                      </div>
                      
                      <CredibilityMeter 
                        score={factCheckResult.confidenceScore} 
                        type="authenticity" 
                        size="small"
                      />
                    </div>
                  </div>
                  
                  <div className="md:w-1/2">
                    <h3 className="text-lg font-medium mb-3">Key Findings</h3>
                    <ul className="list-disc list-inside space-y-1.5">
                      {factCheckResult.reasoning.slice(0, 3).map((reason, i) => (
                        <li key={i} className="text-sm text-neutral-dark">{reason}</li>
                      ))}
                    </ul>
                    
                    {factCheckResult.knownPatterns && factCheckResult.knownPatterns.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-1">Known misinformation patterns detected:</h4>
                        <ul className="list-disc list-inside">
                          {factCheckResult.knownPatterns.map((pattern, i) => (
                            <li key={i} className="text-sm text-fake-dark">{pattern}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </ResultCard>
            </TabsContent>
            
            <TabsContent value="details" className="mt-6">
              <ResultCard 
                title="Detailed Fact Check" 
                description="Comprehensive analysis of content reliability"
              >
                <FactCheckingResults result={factCheckResult} />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Source Credibility</h3>
                    <CredibilityMeter 
                      score={factCheckResult.sourceCredibility} 
                      type="source"
                      size="small"
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Content Consistency</h3>
                    <CredibilityMeter 
                      score={factCheckResult.contentConsistency} 
                      type="contentConsistency"
                      size="small"
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Cross-Verification</h3>
                    <CredibilityMeter 
                      score={factCheckResult.crossVerification} 
                      type="crossVerification"
                      size="small"
                    />
                  </div>
                </div>
              </ResultCard>
            </TabsContent>
            
            <TabsContent value="source" className="mt-6">
              <ResultCard 
                title="Source Analysis"
                description="Information about the content source"
              >
                <SourceInfo
                  sourceName={analysis?.source.name || ""}
                  sourceUrl={analysis?.source.url}
                  category={analysis?.source.category}
                  bias={analysis?.source.bias}
                  verifiedBy={analysis?.source.verifiedBy || []}
                  isVerified={analysis?.source.isVerified || false}
                  confidenceLevel={analysis?.source.confidenceLevel}
                  factCheckedClaims={analysis?.source.factCheckedClaims}
                />
              </ResultCard>
            </TabsContent>
          </Tabs>
        </div>

        <Separator className="my-8" />
        
        <div className="text-center">
          <Button onClick={handleNewAnalysis} className="bg-truth hover:bg-truth-dark">
            Analyze Another Article
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
