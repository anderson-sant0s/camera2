import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/catalogo"} component={Catalog} />
      <Route path={"/produto/:id"} component={ProductDetail} />
      <Route path={"/carrinho"} component={Cart} />
      <Route path={"/checkout"} component={Checkout} />
      <Route path={"/confirmacao"} component={Confirmation} />
      <Route path={"/sobre"} component={About} />
      <Route path={"/contato"} component={Contact} />
      <Route path={"/404"} component={NotFound} />
  {/* Rota fallback final */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // alternável
      >
        <CartProvider>
        <TooltipProvider>
          <Toaster />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
          </div>
        </TooltipProvider>
      </CartProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

