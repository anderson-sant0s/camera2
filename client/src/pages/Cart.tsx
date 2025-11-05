import { Link } from "wouter";
import { useCart } from "../contexts/CartContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";
import { ShoppingCart, Trash2, ArrowLeft } from "lucide-react";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  return (
    <div className="min-h-screen bg-background">
      {/* Cabeçalho da página */}
      <section className="bg-card border-b-4 border-foreground py-8">
        <div className="container">
          <h1 className="text-4xl font-bold uppercase mb-2">Seu Carrinho</h1>
          <p className="text-muted-foreground font-mono">
            {cart.length} {cart.length === 1 ? "item" : "itens"} no carrinho
          </p>
        </div>
      </section>

      <div className="container py-8">
        {cart.length === 0 ? (
          <div className="retro-card text-center py-12">
            <ShoppingCart size={64} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-xl text-muted-foreground mb-6">Seu carrinho está vazio.</p>
            <Link href="/catalogo">
              <Button className="retro-button flex items-center gap-2">
                <ArrowLeft size={16} />
                Voltar ao Catálogo
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de Itens */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="retro-card flex items-center gap-4 p-4">
                  <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded">
                    <img
                      src={item.thumbnailUrl ?? item.images?.[0]}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1">
                    <Link href={`/produto/${item.id}`}>
                      <h3 className="text-lg font-bold uppercase hover:text-accent transition cursor-pointer">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                    <p className="font-bold mt-1 text-xl">
                      R$ {item.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <Trash2 size={20} />
                    </button>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      className="w-20 h-10 retro-input text-center"
                    />
                    <p className="text-sm font-bold">
                      Total: R$ {(item.price * item.quantity).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center pt-4">
                <Link href="/catalogo">
                  <Button variant="outline" className="retro-button flex items-center gap-2">
                    <ArrowLeft size={16} />
                    Continuar Comprando
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  className="retro-button flex items-center gap-2"
                  onClick={clearCart}
                >
                  <Trash2 size={16} />
                  Limpar Carrinho
                </Button>
              </div>
            </div>

            {/* Resumo do Pedido */}
            <div className="lg:col-span-1 retro-card p-6 sticky top-4 h-fit">
              <h2 className="text-2xl font-bold uppercase mb-4 border-b-2 border-foreground pb-2">
                Resumo do Pedido
              </h2>
              <div className="space-y-3">
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
              <Link href="/checkout">
                <Button className="w-full retro-button mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
                  Finalizar Compra
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
