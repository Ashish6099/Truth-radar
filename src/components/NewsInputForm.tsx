
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Link2, Search, AlertCircle } from "lucide-react";
import UrlPreviewCard, { UrlPreviewData } from "./UrlPreviewCard";
import { analyzeUrl } from "@/services/urlService";

const NewsInputForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputType, setInputType] = useState<"text" | "url">("text");
  const [textInput, setTextInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [urlPreview, setUrlPreview] = useState<UrlPreviewData | null>(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Debounced URL preview fetching
  useEffect(() => {
    if (!urlInput || inputType !== "url") {
      setUrlPreview(null);
      return;
    }
    
    // Only try to fetch preview for valid URLs
    let isValid = false;
    try {
      new URL(urlInput);
      isValid = true;
    } catch (e) {
      isValid = false;
    }
    
    if (!isValid) {
      setUrlPreview(null);
      return;
    }
    
    const timer = setTimeout(() => {
      const fetchPreview = async () => {
        setIsLoadingPreview(true);
        try {
          const data = await analyzeUrl(urlInput);
          setUrlPreview(data);
          
          // Show warning toast if URL is suspicious or dangerous
          if (data.securityStatus === "dangerous") {
            toast({
              title: "Security Warning",
              description: "This URL appears to be unsafe. Use extreme caution.",
              variant: "destructive",
            });
          } else if (data.securityStatus === "suspicious") {
            toast({
              title: "Caution Advised",
              description: "This URL has some suspicious characteristics.",
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error("Failed to fetch URL preview:", error);
          setUrlPreview(null);
        } finally {
          setIsLoadingPreview(false);
        }
      };
      
      fetchPreview();
    }, 800); // Debounce for 800ms
    
    return () => clearTimeout(timer);
  }, [urlInput, inputType, toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = inputType === "text" ? textInput : urlInput;

    if (!input.trim()) {
      toast({
        title: "Input required",
        description: `Please enter ${inputType === "text" ? "text" : "a URL"} to analyze.`,
        variant: "destructive",
      });
      return;
    }

    if (inputType === "url") {
      // Validate URL format
      try {
        new URL(urlInput);
      } catch (error) {
        toast({
          title: "Invalid URL",
          description: "Please enter a valid URL including http:// or https://",
          variant: "destructive",
        });
        return;
      }
      
      // Add warning for suspicious URLs
      if (urlPreview && (urlPreview.securityStatus === "suspicious" || urlPreview.securityStatus === "dangerous")) {
        toast({
          title: "Security Warning",
          description: "The URL you're submitting may not be safe. Proceed with caution.",
          variant: "destructive",
        });
      }
    }

    // In a real app, we would send this to an API for processing
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Store input in sessionStorage to access on results page
      sessionStorage.setItem("newsInput", input);
      sessionStorage.setItem("inputType", inputType);
      
      // Store URL preview data if available
      if (urlPreview) {
        sessionStorage.setItem("urlPreviewData", JSON.stringify(urlPreview));
      } else {
        sessionStorage.removeItem("urlPreviewData");
      }
      
      // Navigate to the results page
      navigate("/results");
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <Tabs defaultValue="text" onValueChange={(value) => setInputType(value as "text" | "url")} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="text" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <span>Analyze Text</span>
          </TabsTrigger>
          <TabsTrigger value="url" className="flex items-center gap-2">
            <Link2 className="h-4 w-4" />
            <span>Analyze URL</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="text" className="space-y-4">
          <div>
            <Textarea
              placeholder="Paste the news article text here..."
              className="min-h-32 resize-none"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="url" className="space-y-4">
          <div>
            <Input
              type="url"
              placeholder="https://example.com/news-article"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
            />
            <p className="text-sm text-muted-foreground mt-2 flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" />
              Enter the full URL of a news article to analyze its content and check for security risks.
            </p>
          </div>
          
          {/* URL Preview */}
          {(isLoadingPreview || urlPreview) && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">URL Preview:</p>
              <UrlPreviewCard 
                previewData={urlPreview}
                isLoading={isLoadingPreview}
              />
            </div>
          )}
        </TabsContent>
        
        <Button 
          type="submit" 
          className="w-full mt-6 bg-truth hover:bg-truth-dark"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="animate-pulse">Analyzing...</span>
            </>
          ) : (
            <>Analyze</>
          )}
        </Button>
      </Tabs>
    </form>
  );
};

export default NewsInputForm;
