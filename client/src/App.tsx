import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
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
import ProtectedRoute from "./components/ProtectedRoute";
import Perfil from "./pages/Perfil";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/catalogo" component={Catalog} />
      <Route path="/produto/:id" component={ProductDetail} />

      <Route
        path="/carrinho"
        component={() => (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        )}
      />

      <Route
        path="/checkout"
        component={() => (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        )}
      />

      {/* Nova rota protegida */}
      <Route
        path="/perfil"
        component={() => (
          <ProtectedRoute>
            <Perfil />
          </ProtectedRoute>
        )}
      />

      <Route path="/confirmacao" component={Confirmation} />
      <Route path="/sobre" component={About} />
      <Route path="/contato" component={Contact} />
      <Route path="/404" component={NotFound} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <AuthProvider>
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
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
