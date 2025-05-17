
import { Link } from "react-router-dom";
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Search, Info, HelpCircle, Home, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
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
    setSearchOpen(false);
  };
  
  return (
    <nav className="bg-gradient-to-r from-white to-gray-50 shadow-sm py-3 px-6 sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-truth to-truth-light flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">🕵️</span>
          </div>
          <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-truth-dark via-truth to-truth-light">
            TruthRadar
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Home className="mr-2 h-4 w-4" />
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Info className="mr-2 h-4 w-4" />
                  About
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] gap-3 p-4">
                    <div className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/about"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-truth-light/30 to-truth/50 p-6 no-underline outline-none focus:shadow-md"
                        >
                          <div className="mt-4 mb-2 text-lg font-medium text-truth-dark">
                            About TruthRadar
                          </div>
                          <p className="text-sm leading-tight text-truth-dark/80">
                            Learn how our platform helps verify news and combat misinformation using advanced AI and fact-checking.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/how-it-works"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">How It Works</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Our verification methodology explained
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/how-it-works">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    How It Works
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        {/* Search Button with Dialog */}
        <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" className="hidden md:flex items-center gap-2 hover:bg-truth-light/10 hover:text-truth">
              <Search className="h-4 w-4" />
              <span>Search</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Search</DialogTitle>
              <DialogDescription>
                Search for information across the web
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSearch} className="flex items-center space-x-2 mt-2">
              <Input
                placeholder="Type your search query..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </form>
          </DialogContent>
        </Dialog>
        
        {/* Mobile Menu Toggle */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="md:hidden" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Mobile Navigation */}
      <div className={cn(
        "md:hidden absolute w-full bg-white shadow-md transition-all duration-200 ease-in-out",
        isMobileMenuOpen ? "opacity-100 max-h-[300px]" : "opacity-0 max-h-0 overflow-hidden"
      )}>
        <div className="container mx-auto px-4 py-3 space-y-2">
          <Link 
            to="/" 
            className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Link>
          <Link 
            to="/about" 
            className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Info className="mr-2 h-4 w-4" />
            About
          </Link>
          <Link 
            to="/how-it-works" 
            className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <HelpCircle className="mr-2 h-4 w-4" />
            How It Works
          </Link>
          {/* Add search for mobile */}
          <Button 
            variant="ghost" 
            className="flex items-center w-full justify-start px-3 py-2 rounded-md hover:bg-gray-100"
            onClick={() => {
              setIsMobileMenuOpen(false);
              setSearchOpen(true);
            }}
          >
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
