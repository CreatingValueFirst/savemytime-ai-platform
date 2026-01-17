import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { lazy, Suspense } from "react";

// Eager load critical pages
import Index from "./pages/Index";

// Lazy load all other pages
const Voices = lazy(() => import("./pages/Voices"));
const ServicesIndex = lazy(() => import("./pages/services/ServicesIndex"));
const CustomerSupport = lazy(() => import("./pages/services/CustomerSupport"));
const InternalOperations = lazy(() => import("./pages/services/InternalOperations"));
const VoiceAgent = lazy(() => import("./pages/services/VoiceAgent"));
const LeadGeneration = lazy(() => import("./pages/services/LeadGeneration"));
const GEO = lazy(() => import("./pages/services/GEO"));
const CustomAI = lazy(() => import("./pages/services/CustomAI"));
const CustomApps = lazy(() => import("./pages/services/CustomApps"));
const Packages = lazy(() => import("./pages/services/Packages"));
const Cases = lazy(() => import("./pages/Cases"));
const Calculator = lazy(() => import("./pages/Calculator"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Contact = lazy(() => import("./pages/Contact"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
      <p className="text-muted-foreground">Зареждане...</p>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
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
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
