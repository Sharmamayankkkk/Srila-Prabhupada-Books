
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import Index from "./pages/Index";
import BookPage from "./pages/BookPage";
import BookIndex from "./pages/BookIndex";
import AboutPage from "./pages/AboutPage";
import SearchPage from "./pages/SearchPage";
import NotFound from "./pages/NotFound";
import ComingSoon from "./pages/ComingSoon";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="prabhupada-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ComingSoon />} />
            <Route path="/books/:bookId" element={<BookPage />} />
            <Route path="/books/:bookId/:chapter" element={<BookPage />} />
            <Route path="/books/:bookId/:chapter/:verse" element={<BookPage />} />
            <Route path="/index" element={<BookIndex />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
