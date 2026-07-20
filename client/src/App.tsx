/**
 * Schuur 80 Guest Companion — "Barn Light" design.
 * Routes per Build Bible: Home, House (+room/device), Garden, Cats,
 * Guide (+detail/area/faqs), Story, Arrival, Checkout, Emergency,
 * Help, Pending Register, Settings, Search, Offline, 404.
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import AppShell from "./components/companion/AppShell";
import Home from "./pages/Home";
import House from "./pages/House";
import RoomDetail from "./pages/RoomDetail";
import DeviceDetail from "./pages/DeviceDetail";
import Garden from "./pages/Garden";
import { CatDirectory, CatDetail } from "./pages/Cats";
import Guide from "./pages/Guide";
import GuideDetail from "./pages/GuideDetail";
import Area from "./pages/Area";
import Faqs from "./pages/Faqs";
import Story from "./pages/Story";
import Arrival from "./pages/Arrival";
import Help from "./pages/Help";
import Emergency from "./pages/Emergency";
import PendingRegister from "./pages/PendingRegister";
import OwnerQuestions from "./pages/OwnerQuestions";
import SettingsPage from "./pages/SettingsPage";
import SearchPage from "./pages/SearchPage";
import PrintQrCard from "./pages/PrintQrCard";
import Onboarding, { shouldShowOnboarding } from "./components/companion/Onboarding";
import OfflinePage from "./pages/OfflinePage";
import NotFound from "./pages/NotFound";

/**
 * Base path support: on GitHub Pages the app is served from
 * /schuur80-guest-companion/, locally and on root domains from "/".
 * Vite injects BASE_URL at build time; strip the trailing slash for wouter.
 */
const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, "");

function Router() {
  return (
    <AppShell>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/house" component={House} />
        <Route path="/house/room/:id" component={RoomDetail} />
        <Route path="/house/device/:id" component={DeviceDetail} />
        <Route path="/garden" component={Garden} />
        <Route path="/cats" component={CatDirectory} />
        <Route path="/cats/:id" component={CatDetail} />
        <Route path="/guide" component={Guide} />
        <Route path="/guide/area" component={Area} />
        <Route path="/guide/faqs" component={Faqs} />
        <Route path="/guide/:id" component={GuideDetail} />
        <Route path="/story" component={Story} />
        <Route path="/arrival" component={Arrival} />
        <Route path="/checkout">
          {() => <GuideDetailRedirect id="checkout-guide" />}
        </Route>
        <Route path="/help" component={Help} />
        <Route path="/emergency" component={Emergency} />
        <Route path="/help/pending" component={PendingRegister} />
        <Route path="/help/owner-questions" component={OwnerQuestions} />
        <Route path="/settings" component={SettingsPage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/print/qr-card" component={PrintQrCard} />
        <Route path="/offline" component={OfflinePage} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </AppShell>
  );
}

/** /checkout is an alias that renders the checkout guide directly. */
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
function GuideDetailRedirect({ id }: { id: string }) {
  const [, navigate] = useLocation();
  useEffect(() => {
    navigate(`/guide/${id}`, { replace: true });
  }, [navigate, id]);
  return null;
}

/** Shows the first-visit install onboarding once, unless already installed. */
function OnboardingGate() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (shouldShowOnboarding()) setShow(true);
  }, []);
  if (!show) return null;
  return <Onboarding onClose={() => setShow(false)} />;
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <WouterRouter base={BASE_PATH}>
              <Router />
              <OnboardingGate />
            </WouterRouter>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
