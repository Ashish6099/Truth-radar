
import { UrlPreviewData } from "@/components/UrlPreviewCard";

// This is a mock implementation. In a real app, you'd call a backend service
// that would use security APIs like Google Safe Browsing, PhishTank, etc.
export const analyzeUrl = async (url: string): Promise<UrlPreviewData> => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, we'll use simple heuristics
    const isHttps = url.startsWith('https://');
    const domainParts = new URL(url).hostname.split('.');
    const domain = domainParts.slice(domainParts.length - 2).join('.');
    
    // Known trusted domains (this would be a more extensive database in production)
    const trustedDomains = [
      'reuters.com', 'ap.org', 'bbc.com', 'nytimes.com', 'washingtonpost.com',
      'wsj.com', 'npr.org', 'theguardian.com', 'economist.com'
    ];
    
    // Known problematic domains (for demo purposes)
    const suspiciousDomains = ['example.org', 'temp-site.net', 'clickbait-news.com'];
    const maliciousDomains = ['malware-site.com', 'phishing-example.net', 'fake-login.com'];
    
    // Determine security status
    let securityStatus: "safe" | "suspicious" | "dangerous" | "unknown";
    let securityScore: number;
    let threatTypes: string[] = [];
    
    if (trustedDomains.some(d => url.includes(d))) {
      securityStatus = "safe";
      securityScore = 90 + Math.floor(Math.random() * 10);
    } else if (suspiciousDomains.some(d => url.includes(d))) {
      securityStatus = "suspicious";
      securityScore = 40 + Math.floor(Math.random() * 30);
      threatTypes = ["Unverified Content", "Clickbait"];
    } else if (maliciousDomains.some(d => url.includes(d))) {
      securityStatus = "dangerous";
      securityScore = 10 + Math.floor(Math.random() * 20);
      threatTypes = ["Phishing", "Malware", "Data Collection"];
    } else {
      // For unknown domains, use a combination of heuristics
      if (isHttps) {
        securityStatus = url.includes('blog') || url.includes('news') ? "suspicious" : "unknown";
        securityScore = 50 + Math.floor(Math.random() * 20);
      } else {
        // Not using HTTPS is a red flag
        securityStatus = "suspicious";
        securityScore = 30 + Math.floor(Math.random() * 20);
        threatTypes = ["Insecure Connection"];
      }
    }
    
    // Mock metadata extraction (in a real app, this would fetch actual metadata)
    const mockTitles: Record<string, string> = {
      'reuters.com': 'Reuters | Breaking International News & Views',
      'bbc.com': 'BBC - Homepage',
      'phishing-example.net': 'Login to Your Account - Security Verification',
    };
    
    const mockDescriptions: Record<string, string> = {
      'reuters.com': 'Reuters provides business, financial, national and international news to professionals.',
      'bbc.com': 'Breaking news, sport, TV, radio and a whole lot more. The BBC informs, educates and entertains.',
      'phishing-example.net': 'Verify your account details to continue to our secure platform.',
    };
    
    // Generate mock preview data based on the URL
    return {
      url,
      title: mockTitles[domain] || `Website at ${new URL(url).hostname}`,
      description: mockDescriptions[domain] || 'No description available',
      imageUrl: trustedDomains.some(d => url.includes(d)) ? 
        `https://picsum.photos/seed/${domain}/600/400` : undefined,
      securityStatus,
      securityScore,
      threatTypes: threatTypes.length > 0 ? threatTypes : undefined
    };
  } catch (error) {
    console.error("Error analyzing URL:", error);
    // Return unknown status if URL analysis fails
    return {
      url,
      securityStatus: "unknown",
      securityScore: 0
    };
  }
};
