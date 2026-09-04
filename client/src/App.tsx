import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./lib/contexts/AuthContext";
import { InvestorRoute, OpsRoute } from "./lib/components/ProtectedRoute";
import { PORTAL_ENABLED } from "./lib/featureFlags";
import ScrollToTop from "@/components/ScrollToTop";

// Public Site Pages
import PublicLayout from "@/layouts/PublicLayout";
import Home from "@/pages/public/Home";
import About from "@/pages/public/About";
import HowItWorks from "@/pages/public/HowItWorks";
import Properties from "@/pages/public/Properties";
import MarketUpdates from "@/pages/public/MarketUpdates";
import MarketUpdatePost from "@/pages/public/MarketUpdatePost";
import Contact from "@/pages/public/Contact";
import RequestAccess from "@/pages/public/RequestAccess";
import Privacy from "@/pages/public/Privacy";
import Terms from "@/pages/public/Terms";
import RiskDisclaimer from "@/pages/public/RiskDisclaimer";
import PortalComingSoon from "@/pages/public/PortalComingSoon";
import Login from "@/pages/public/Login";
import Register from "@/pages/public/Register";

// Investor App Pages
import InvestorLayout from "@/layouts/InvestorLayout";
import InvestorDashboard from "@/pages/investor/Dashboard";
import InvestorPortfolio from "@/pages/investor/Portfolio";
import InvestorProperties from "@/pages/investor/Properties";
import InvestorDocuments from "@/pages/investor/Documents";
import InvestorDistributions from "@/pages/investor/Distributions";
import InvestorSupport from "@/pages/investor/Support";
import InvestorSettings from "@/pages/investor/Settings";

// Ops Portal Pages
import OpsLayout from "@/layouts/OpsLayout";
import OpsDashboard from "@/pages/ops/Dashboard";
import OpsInvestors from "@/pages/ops/Investors";
import OpsProperties from "@/pages/ops/Properties";
import OpsReports from "@/pages/ops/Reports";
import OpsDistributions from "@/pages/ops/Distributions";
import OpsMessages from "@/pages/ops/Messages";
import OpsSettings from "@/pages/ops/Settings";

import NotFound from "@/pages/NotFound";

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        {/* INVESTOR APP — must come before "/" catch-all */}
        <Route path="/app" nest>
          {PORTAL_ENABLED ? (
            <InvestorRoute>
              <InvestorLayout>
                <Switch>
                  <Route path="/dashboard" component={InvestorDashboard} />
                  <Route path="/portfolio" component={InvestorPortfolio} />
                  <Route path="/properties" component={InvestorProperties} />
                  <Route path="/documents" component={InvestorDocuments} />
                  <Route path="/distributions" component={InvestorDistributions} />
                  <Route path="/support" component={InvestorSupport} />
                  <Route path="/settings" component={InvestorSettings} />
                  <Route path="/" component={InvestorDashboard} />
                </Switch>
              </InvestorLayout>
            </InvestorRoute>
          ) : (
            <PublicLayout>
              <PortalComingSoon />
            </PublicLayout>
          )}
        </Route>

        {/* OPS PORTAL — must come before "/" catch-all */}
        <Route path="/ops" nest>
          {PORTAL_ENABLED ? (
            <OpsRoute>
              <OpsLayout>
                <Switch>
                  <Route path="/dashboard" component={OpsDashboard} />
                  <Route path="/investors" component={OpsInvestors} />
                  <Route path="/properties" component={OpsProperties} />
                  <Route path="/reports" component={OpsReports} />
                  <Route path="/distributions" component={OpsDistributions} />
                  <Route path="/messages" component={OpsMessages} />
                  <Route path="/settings" component={OpsSettings} />
                  <Route path="/" component={OpsDashboard} />
                </Switch>
              </OpsLayout>
            </OpsRoute>
          ) : (
            <NotFound />
          )}
        </Route>

        {/* PUBLIC SITE — "/" with nest matches everything, so must be last */}
        <Route path="/" nest>
          <PublicLayout>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/how-it-works" component={HowItWorks} />
              <Route path="/properties" component={Properties} />
              <Route path="/market-updates" component={MarketUpdates} />
              <Route path="/market-updates/:slug" component={MarketUpdatePost} />
              <Route path="/contact" component={Contact} />
              <Route path="/request-access" component={RequestAccess} />
              <Route path="/privacy" component={Privacy} />
              <Route path="/terms" component={Terms} />
              <Route path="/disclaimer" component={RiskDisclaimer} />
              <Route path="/login">
                {PORTAL_ENABLED ? <Login /> : <PortalComingSoon />}
              </Route>
              <Route path="/register">
                {PORTAL_ENABLED ? <Register /> : <PortalComingSoon />}
              </Route>
              {/* Catch-all — without this, any unmatched path under "/" rendered blank
                  (header/footer, empty body) instead of a 404, since the outer nested
                  Route above already "claims" every "/..." path. */}
              <Route component={NotFound} />
            </Switch>
          </PublicLayout>
        </Route>

        {/* 404 */}
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
