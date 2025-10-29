import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import ChatBot from "./components/ChatBot";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import FaceAnalysis from "./pages/FaceAnalysis";
import Packages from "./pages/Packages";
import NotFound from "./pages/NotFound";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/services" element={<Services />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/face-analysis" element={<FaceAnalysis />} />
        <Route path="/packages" element={<Packages />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ChatBot />
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
