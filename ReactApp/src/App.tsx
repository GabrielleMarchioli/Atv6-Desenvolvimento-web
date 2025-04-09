
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TodoPage from "./pages/TodoPage";
import CounterPage from "./pages/CounterPage";
import TicTacToePage from "./pages/TicTacToePage";
import CalculatorPage from "./pages/CalculatorPage";
import ZipCodePage from "./pages/ZipCodePage";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />
          <main className="flex-1 container mx-auto py-8 px-4">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/todo" element={<TodoPage />} />
              <Route path="/counter" element={<CounterPage />} />
              <Route path="/tictactoe" element={<TicTacToePage />} />
              <Route path="/calculator" element={<CalculatorPage />} />
              <Route path="/zipcode" element={<ZipCodePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <footer className="py-4 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} React Playground
          </footer>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
