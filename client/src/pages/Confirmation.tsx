import { Link } from "wouter";
import { Button } from "../components/ui/button";
import { CheckCircle, Home, Package } from "lucide-react";

export default function Confirmation() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <CheckCircle size={96} className="text-green-500 mb-6" />
      <h1 className="text-4xl font-bold uppercase mb-2 text-center">
        Pedido Confirmado com Sucesso!
      </h1>
      <p className="text-lg text-muted-foreground mb-8 text-center">
        Obrigado por sua compra. Você receberá um e-mail de confirmação em breve.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/">
          <Button className="retro-button flex items-center gap-2">
            <Home size={16} />
            Voltar para a Home
          </Button>
        </Link>
        <Link href="/catalogo">
          <Button variant="outline" className="retro-button flex items-center gap-2">
            <Package size={16} />
            Continuar Comprando
          </Button>
        </Link>
      </div>
    </div>
  );
}
