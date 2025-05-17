import * as React from "react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { 
  CheckCircle2, 
  Info, 
  Search, 
  Shield, 
  ShieldCheck, 
  Bell,
  Menu, 
  X,
  Settings,
  Home
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const factCheckingResources = [
  {
    title: "How We Verify News",
    description: "Learn about our fact-checking methodology",
    href: "/how-it-works",
    icon: <ShieldCheck className="h-6 w-6 text-truth mb-2" />,
  },
  {
    title: "Credibility Indicators",
    description: "Signs of reliable and unreliable information",
    href: "/how-it-works",
    icon: <CheckCircle2 className="h-6 w-6 text-reliable mb-2" />,
  },
  {
    title: "About Fact Checking",
    description: "Why verification matters in the digital age",
    href: "/about",
    icon: <Info className="h-6 w-6 text-neutral mb-2" />,
  },
  {
    title: "Research Tools",
    description: "Resources to help verify information yourself",
    href: "/how-it-works",
    icon: <Search className="h-6 w-6 text-truth-dark mb-2" />,
  },
];

interface NavMenuProps {
  className?: string;
}

export function NavMenu({ className }: NavMenuProps) {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [animateMenu, setAnimateMenu] = useState(false);
  const { toast } = useToast();
  
  // Handle scroll events to add a subtle background to the nav when scrolled
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle notifications demo
  const handleNotification = () => {
    toast({
      title: "Verification Update",
      description: "New fact-checking resources have been added to the platform.",
      variant: "default",
    });
  };

  // Toggle mobile menu with animation
  const toggleMobileMenu = () => {
    if (mobileMenuOpen) {
      setAnimateMenu(false);
      setTimeout(() => setMobileMenuOpen(false), 300); // Wait for animation to finish
    } else {
      setMobileMenuOpen(true);
      setTimeout(() => setAnimateMenu(true), 50); // Slight delay for animation
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className={cn(
        "hidden sm:block transition-all duration-300", 
        scrolled ? "bg-white/95 shadow-sm backdrop-blur-sm" : "",
        className
      )}>
        <NavigationMenu className="z-10 mx-auto max-w-screen-xl">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <NavLink to="/" className={({ isActive }) => 
                cn(navigationMenuTriggerStyle(), 
                  isActive ? "bg-truth/10 text-truth font-medium" : "")
              }>
                <Home className="h-4 w-4 mr-1" />
                Home
              </NavLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-accent/50 group">
                <span className="group-hover:text-truth transition-colors">Fact Checking</span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid grid-cols-2 gap-3 p-4 w-[600px]">
                  {factCheckingResources.map((resource) => (
                    <NavigationMenuLink asChild key={resource.title}>
                      <a
                        href={resource.href}
                        className="flex flex-col p-3 space-y-1 rounded-md hover:bg-accent transition-colors group"
                      >
                        <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                          <div className="group-hover:scale-110 transition-transform duration-200">
                            {resource.icon}
                          </div>
                          <div className="text-sm font-medium group-hover:text-truth transition-colors">
                            {resource.title}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {resource.description}
                          </div>
                        </div>
                      </a>
                    </NavigationMenuLink>
                  ))}
                </div>
                <div className="bg-truth/5 p-3 rounded-b-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-truth" />
                      <span className="text-sm font-medium">Verified by TrustSentry™ Technology</span>
                    </div>
                    <NavLink 
                      to="/how-it-works"
                      className="text-xs text-truth hover:text-truth-dark hover:underline"
                    >
                      Learn more
                    </NavLink>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavLink to="/about" className={({ isActive }) => 
                cn(navigationMenuTriggerStyle(), 
                  isActive ? "bg-truth/10 text-truth font-medium" : "")
              }>
                About
              </NavLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavLink to="/how-it-works" className={({ isActive }) => 
                cn(navigationMenuTriggerStyle(), 
                  isActive ? "bg-truth/10 text-truth font-medium" : "")
              }>
                How It Works
              </NavLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Action Buttons */}
        <div className="absolute right-4 top-5 hidden sm:flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full hover:bg-truth/10 hover:text-truth"
            onClick={handleNotification}
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full hover:bg-truth/10 hover:text-truth"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden">
        <div className={cn(
          "flex justify-between items-center p-4 transition-all duration-300",
          scrolled ? "bg-white/95 shadow-sm backdrop-blur-sm" : ""
        )}>
          <NavLink to="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-truth" />
            <span className="font-bold text-lg text-truth">TruthGuard</span>
          </NavLink>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-background">
            <div className={cn(
              "flex flex-col p-6 h-full transition-all duration-300 transform",
              animateMenu ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            )}>
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-truth" />
                  <span className="font-bold text-xl text-truth">TruthGuard</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full"
                  onClick={toggleMobileMenu}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <nav className="flex flex-col space-y-4">
                <NavLink 
                  to="/" 
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive ? "bg-truth/10 text-truth font-medium" : "hover:bg-accent"
                  )}
                  onClick={() => toggleMobileMenu()}
                >
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </NavLink>
                <NavLink 
                  to="/about" 
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive ? "bg-truth/10 text-truth font-medium" : "hover:bg-accent"
                  )}
                  onClick={() => toggleMobileMenu()}
                >
                  <Info className="h-5 w-5" />
                  <span>About</span>
                </NavLink>
                <NavLink 
                  to="/how-it-works" 
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive ? "bg-truth/10 text-truth font-medium" : "hover:bg-accent"
                  )}
                  onClick={() => toggleMobileMenu()}
                >
                  <ShieldCheck className="h-5 w-5" />
                  <span>How It Works</span>
                </NavLink>

                <div className="pt-4">
                  <p className="px-4 text-sm font-medium text-muted-foreground mb-3">
                    Fact-Checking Resources
                  </p>
                  {factCheckingResources.map((resource) => (
                    <NavLink 
                      key={resource.title}
                      to={resource.href}
                      className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent transition-colors"
                      onClick={() => toggleMobileMenu()}
                    >
                      <div className="h-5 w-5 text-neutral">{resource.icon}</div>
                      <span className="text-sm">{resource.title}</span>
                    </NavLink>
                  ))}
                </div>
              </nav>

              <div className="mt-auto pt-6 flex justify-center gap-6">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full hover:bg-truth/10 hover:text-truth"
                  onClick={handleNotification}
                >
                  <Bell className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full hover:bg-truth/10 hover:text-truth"
                >
                  <Settings className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full hover:bg-truth/10 hover:text-truth"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
