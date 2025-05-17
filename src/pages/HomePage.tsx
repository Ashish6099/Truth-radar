
import NewsInputForm from "@/components/NewsInputForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast.error("Please enter a search query");
      return;
    }
    
    // Open Google search with the query
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery.trim())}`;
    window.open(googleSearchUrl, "_blank", "noopener,noreferrer");
    setSearchQuery("");
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-truth mb-4 md:text-5xl lg:text-6xl">
          TruthRadar: Fake News Detector
        </h1>
        <p className="text-xl text-neutral-dark max-w-3xl mx-auto">
          Analyze news articles and determine their credibility with our advanced AI-powered tool.
          Simply paste the text or enter a URL to get started.
        </p>
      </div>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mb-12">
        <NewsInputForm />
      </div>

      {/* Quick Search Section */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Quick Web Search</h2>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input 
              placeholder="Search the web..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" className="bg-truth hover:bg-truth-dark">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center mb-4">
              <div className="h-12 w-12 rounded-full bg-truth-light flex items-center justify-center mx-auto mb-2">
                <span className="text-white text-xl">🔍</span>
              </div>
              <h3 className="font-bold text-lg">Analyze Content</h3>
            </div>
            <p className="text-neutral-dark text-center">
              Our AI analyzes news content to identify patterns and language associated with misinformation.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center mb-4">
              <div className="h-12 w-12 rounded-full bg-truth-light flex items-center justify-center mx-auto mb-2">
                <span className="text-white text-xl">✅</span>
              </div>
              <h3 className="font-bold text-lg">Verify Sources</h3>
            </div>
            <p className="text-neutral-dark text-center">
              We check the reliability of sources against our database of trusted and untrusted publishers.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center mb-4">
              <div className="h-12 w-12 rounded-full bg-truth-light flex items-center justify-center mx-auto mb-2">
                <span className="text-white text-xl">📊</span>
              </div>
              <h3 className="font-bold text-lg">Get Results</h3>
            </div>
            <p className="text-neutral-dark text-center">
              Receive credibility scores, source information, and recommendations in seconds.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
