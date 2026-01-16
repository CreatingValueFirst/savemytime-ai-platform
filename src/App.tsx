import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Voices from "./pages/Voices";
import ServicesIndex from "./pages/services/ServicesIndex";
import CustomerSupport from "./pages/services/CustomerSupport";
import InternalOperations from "./pages/services/InternalOperations";
import VoiceAgent from "./pages/services/VoiceAgent";
import LeadGeneration from "./pages/services/LeadGeneration";
import GEO from "./pages/services/GEO";
import CustomAI from "./pages/services/CustomAI";
import CustomApps from "./pages/services/CustomApps";
import Packages from "./pages/services/Packages";
import Cases from "./pages/Cases";
import Calculator from "./pages/Calculator";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/voices" element={<Voices />} />
          <Route path="/services" element={<ServicesIndex />} />
          <Route path="/services/customer-support" element={<CustomerSupport />} />
          <Route path="/services/internal-operations" element={<InternalOperations />} />
          <Route path="/services/voice-agent" element={<VoiceAgent />} />
          <Route path="/services/lead-generation" element={<LeadGeneration />} />
          <Route path="/services/geo" element={<GEO />} />
          <Route path="/services/custom-ai" element={<CustomAI />} />
          <Route path="/services/custom-apps" element={<CustomApps />} />
          <Route path="/services/packages" element={<Packages />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
