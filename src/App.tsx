import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { lazyLoad, PageLoader } from "@/lib/lazyLoad";
import ScrollToTop from "@/components/ScrollToTop";
import CookieConsent from "@/components/CookieConsent";
import ContactForm from "@/components/ContactForm";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AssessmentProvider } from "@/contexts/AssessmentContext";
import { LocaleWrapper } from "@/components/LocaleWrapper";

// Eager load critical pages
import Index from "./pages/Index";

// Lazy load non-critical pages
const About = lazyLoad(() => import("./pages/About"), { fallback: <PageLoader /> });
const Portfolio = lazyLoad(() => import("./pages/Portfolio"), { fallback: <PageLoader /> });
const Results = lazyLoad(() => import("./pages/Results"), { fallback: <PageLoader /> });
const AssessmentLanding = lazyLoad(() => import("./pages/AssessmentLanding"), { fallback: <PageLoader /> });
const AssessmentQuiz = lazyLoad(() => import("./pages/AssessmentQuiz"), { fallback: <PageLoader /> });
const AssessmentResults = lazyLoad(() => import("./pages/AssessmentResults"), { fallback: <PageLoader /> });
const AlgemeneVoorwaarden = lazyLoad(() => import("./pages/AlgemeneVoorwaarden"), { fallback: <PageLoader /> });
const Privacyverklaring = lazyLoad(() => import("./pages/Privacyverklaring"), { fallback: <PageLoader /> });
const Cookieverklaring = lazyLoad(() => import("./pages/Cookieverklaring"), { fallback: <PageLoader /> });
const Disclaimer = lazyLoad(() => import("./pages/Disclaimer"), { fallback: <PageLoader /> });
const Colophon = lazyLoad(() => import("./pages/Colophon"), { fallback: <PageLoader /> });
const NotFound = lazyLoad(() => import("./pages/NotFound"), { fallback: <PageLoader /> });
const Auth = lazyLoad(() => import("./pages/Auth"), { fallback: <PageLoader /> });
const Dashboard = lazyLoad(() => import("./pages/Dashboard"), { fallback: <PageLoader /> });

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AssessmentProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <LocaleWrapper>
              <ScrollToTop />
              <CookieConsent />
              <ContactForm showTrigger={false} />
              <Routes>
                {/* Dutch routes (default) */}
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/resultaten" element={<Results />} />
                <Route path="/video-readiness-assessment" element={<AssessmentLanding />} />
                <Route path="/assessment/quiz" element={<AssessmentQuiz />} />
                <Route path="/assessment/results" element={<AssessmentResults />} />
                <Route path="/algemene-voorwaarden" element={<AlgemeneVoorwaarden />} />
                <Route path="/privacyverklaring" element={<Privacyverklaring />} />
                <Route path="/cookieverklaring" element={<Cookieverklaring />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
                <Route path="/colophon" element={<Colophon />} />
                <Route path="/auth" element={<Auth />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />

                {/* English routes (with /en prefix) */}
                <Route path="/en" element={<Index />} />
                <Route path="/en/about" element={<About />} />
                <Route path="/en/portfolio" element={<Portfolio />} />
                <Route path="/en/resultaten" element={<Results />} />
                <Route path="/en/video-readiness-assessment" element={<AssessmentLanding />} />
                <Route path="/en/assessment/quiz" element={<AssessmentQuiz />} />
                <Route path="/en/assessment/results" element={<AssessmentResults />} />
                <Route path="/en/algemene-voorwaarden" element={<AlgemeneVoorwaarden />} />
                <Route path="/en/privacyverklaring" element={<Privacyverklaring />} />
                <Route path="/en/cookieverklaring" element={<Cookieverklaring />} />
                <Route path="/en/disclaimer" element={<Disclaimer />} />
                <Route path="/en/colophon" element={<Colophon />} />
                <Route path="/en/auth" element={<Auth />} />
                <Route
                  path="/en/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </LocaleWrapper>
          </BrowserRouter>
        </AssessmentProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
