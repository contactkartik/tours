import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "@/pages/HomePage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/experiences" component={() => <div className="p-8 text-center">Experiences page coming soon!</div>} />
      <Route path="/adventures" component={() => <div className="p-8 text-center">Adventures page coming soon!</div>} />
      <Route path="/cultural" component={() => <div className="p-8 text-center">Cultural tours page coming soon!</div>} />
      <Route path="/about" component={() => <div className="p-8 text-center">About page coming soon!</div>} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
