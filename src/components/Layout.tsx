
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <footer className="bg-white py-6 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center text-neutral-dark text-sm">
            <p>© {new Date().getFullYear()} TruthRadar. All rights reserved.</p>
            <p className="mt-2">
              TruthRadar is an educational tool to help identify potentially misleading information.
              Results should be verified with additional sources.
            </p>
          </div>
        </div>
      </footer>
      
      <Toaster />
    </div>
  );
};

export default Layout;
