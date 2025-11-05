import { Link, useLocation } from "wouter";
import { useCart } from "../contexts/CartContext";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { ArrowLeft, CheckCircle, CreditCard, MapPin, Package, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Componente para o resumo do pedido no checkout
function OrderSummary() {
  const { cart, totalPrice } = useCart();

  return (
    <div className="retro-card p-6 h-fit">
      <h2 className="text-2xl font-bold uppercase mb-4 border-b-2 border-foreground pb-2">
        Resumo do Pedido
      </h2>
      <div className="space-y-3">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center text-sm">
            <span className="truncate pr-2">
              {item.quantity}x {item.name}
            </span>
            <span className="font-bold">
              R$ {(item.price * item.quantity).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
          </div>
        ))}
        <Separator className="my-4 bg-foreground" />
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>R$ {totalPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
        </div>
        <div className="flex justify-between">
          <span>Frete:</span>
          <span>Grátis</span>
        </div>
        <Separator className="my-4 bg-foreground" />
        <div className="flex justify-between text-xl font-bold uppercase">
          <span>Total:</span>
          <span>R$ {totalPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
        </div>
      </div>
    </div>
  );
}

// Componente para o formulário de informações pessoais
function PersonalInfoForm() {
  return (
    <div className="retro-card p-6">
      <h2 className="text-2xl font-bold uppercase mb-4 flex items-center gap-2 border-b-2 border-foreground pb-2">
        <User size={20} /> Informações Pessoais
      </h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Nome Completo</Label>
          <Input id="name" type="text" placeholder="Seu nome completo" className="retro-input" />
        </div>
        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" placeholder="seu.email@exemplo.com" className="retro-input" />
        </div>
        <div>
          <Label htmlFor="phone">Telefone</Label>
          <Input id="phone" type="tel" placeholder="(XX) XXXXX-XXXX" className="retro-input" />
        </div>
      </div>
    </div>
  );
}

// Componente para o formulário de endereço
function ShippingAddressForm() {
  return (
    <div className="retro-card p-6">
      <h2 className="text-2xl font-bold uppercase mb-4 flex items-center gap-2 border-b-2 border-foreground pb-2">
        <MapPin size={20} /> Endereço de Entrega
      </h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="cep">CEP</Label>
          <Input id="cep" type="text" placeholder="00000-000" className="retro-input" />
        </div>
        <div>
          <Label htmlFor="address">Endereço</Label>
          <Input id="address" type="text" placeholder="Rua, Avenida, etc." className="retro-input" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="number">Número</Label>
            <Input id="number" type="text" placeholder="123" className="retro-input" />
          </div>
          <div>
            <Label htmlFor="complement">Complemento (Opcional)</Label>
            <Input id="complement" type="text" placeholder="Apto, Bloco, etc." className="retro-input" />
          </div>
        </div>
        <div>
          <Label htmlFor="city">Cidade</Label>
          <Input id="city" type="text" placeholder="Sua cidade" className="retro-input" />
        </div>
        <div>
          <Label htmlFor="state">Estado</Label>
          <Select>
            <SelectTrigger className="retro-input">
              <SelectValue placeholder="Selecione o Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SP">São Paulo</SelectItem>
              <SelectItem value="RJ">Rio de Janeiro</SelectItem>
              <SelectItem value="MG">Minas Gerais</SelectItem>
              {/* Adicionar mais estados conforme necessário */}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

// Componente para o formulário de pagamento
function PaymentForm() {
  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  return (
    <div className="retro-card p-6">
      <h2 className="text-2xl font-bold uppercase mb-4 flex items-center gap-2 border-b-2 border-foreground pb-2">
        <CreditCard size={20} /> Pagamento
      </h2>
      <div className="space-y-4">
        <div>
          <Label>Método de Pagamento</Label>
          <div className="flex gap-4 mt-2">
            <Button
              variant={paymentMethod === "credit_card" ? "default" : "outline"}
              onClick={() => setPaymentMethod("credit_card")}
              className="retro-button"
            >
              Cartão de Crédito
            </Button>
            <Button
              variant={paymentMethod === "pix" ? "default" : "outline"}
              onClick={() => setPaymentMethod("pix")}
              className="retro-button"
            >
              Pix
            </Button>
          </div>
        </div>

        {paymentMethod === "credit_card" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="card-number">Número do Cartão</Label>
              <Input id="card-number" type="text" placeholder="XXXX XXXX XXXX XXXX" className="retro-input" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="expiry">Validade</Label>
                <Input id="expiry" type="text" placeholder="MM/AA" className="retro-input" />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" type="text" placeholder="123" className="retro-input" />
              </div>
              <div className="col-span-3 sm:col-span-1">
                <Label htmlFor="installments">Parcelas</Label>
                <Select>
                  <SelectTrigger className="retro-input">
                    <SelectValue placeholder="1x sem juros" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1x sem juros</SelectItem>
                    <SelectItem value="2">2x sem juros</SelectItem>
                    <SelectItem value="3">3x sem juros</SelectItem>
                    <SelectItem value="12">12x com juros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="card-name">Nome no Cartão</Label>
              <Input id="card-name" type="text" placeholder="Como está no cartão" className="retro-input" />
            </div>
          </div>
        )}

        {paymentMethod === "pix" && (
          <div className="retro-card p-4 border-dashed border-2 border-foreground text-center">
            <p className="text-lg font-bold mb-2">Pagamento via Pix</p>
            <p className="text-sm text-muted-foreground">
              Você será redirecionado para a página de pagamento após a confirmação do pedido.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const [, navigate] = useLocation();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
        <Package size={64} className="mb-4 text-muted-foreground" />
        <h1 className="text-3xl font-bold uppercase mb-2">Carrinho Vazio</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Adicione produtos ao carrinho para finalizar a compra.
        </p>
        <Link href="/catalogo">
          <Button className="retro-button flex items-center gap-2">
            <ArrowLeft size={16} />
            Voltar ao Catálogo
          </Button>
        </Link>
      </div>
    );
  }

  const handleFinalizePurchase = () => {
    // Simulação de finalização de compra
    toast.success("Compra finalizada com sucesso!");
    clearCart();
    navigate("/confirmacao");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Cabeçalho da página */}
      <section className="bg-card border-b-4 border-foreground py-8">
        <div className="container">
          <h1 className="text-4xl font-bold uppercase mb-2">Finalizar Compra</h1>
          <p className="text-muted-foreground font-mono">
            Revise seu pedido e preencha os dados para finalizar.
          </p>
        </div>
      </section>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulários */}
          <div className="lg:col-span-2 space-y-6">
            <PersonalInfoForm />
            <ShippingAddressForm />
            <PaymentForm />
          </div>

          {/* Resumo e Ação */}
          <div className="lg:col-span-1 space-y-6">
            <OrderSummary />
            <div className="retro-card p-6">
              <h2 className="text-2xl font-bold uppercase mb-4 border-b-2 border-foreground pb-2">
                Ação
              </h2>
              <Button
                className="w-full retro-button bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
                onClick={handleFinalizePurchase}
              >
                <CheckCircle size={20} />
                Confirmar e Pagar R$ {totalPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </Button>
              <Link href="/carrinho">
                <Button variant="outline" className="w-full retro-button mt-4 flex items-center gap-2">
                  <ArrowLeft size={16} />
                  Voltar ao Carrinho
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
