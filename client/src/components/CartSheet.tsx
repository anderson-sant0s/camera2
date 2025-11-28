import { Link } from "wouter";
import { ShoppingCart, X, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useCart } from "../contexts/CartContext";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";

export function CartSheet() {
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice } =
    useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="retro-button relative">
          <ShoppingCart size={20} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 retro-border-sm bg-destructive text-destructive-foreground px-2 py-0.5 text-xs font-bold rounded-full">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent
        aria-describedby={undefined}
        className="w-full sm:max-w-lg flex flex-col"
      >
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold uppercase border-b-2 border-foreground pb-2">
            Seu Carrinho ({totalItems})
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto space-y-4 py-4">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart
                size={48}
                className="mx-auto mb-4 text-muted-foreground"
              />
              <p className="text-lg text-muted-foreground">
                Seu carrinho está vazio.
              </p>
              <Link href="/carrinho">
                <Button className="mt-4 retro-button">Ver Produtos</Button>
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 retro-card p-3"
              >
                <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded">
                  <img
                    src={item.thumbnailUrl ?? item.images?.[0]}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold uppercase">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.category}
                  </p>
                  <p className="font-bold mt-1">
                    R${" "}
                    {(item.price * item.quantity).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-destructive hover:text-destructive/80"
                  >
                    <Trash2 size={18} />
                  </button>
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                    className="w-16 h-8 retro-input text-center"
                  />
                </div>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="pt-4 border-t-2 border-foreground">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold uppercase">Total:</span>
              <span className="text-2xl font-bold">
                R${" "}
                {totalPrice.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
            <Link href="/carrinho">
              <Button className="w-full retro-button mb-2">
                Ver Carrinho Completo
              </Button>
            </Link>
            <Link href="/checkout">
              <Button className="w-full retro-button bg-primary text-primary-foreground hover:bg-primary/90">
                Finalizar Compra
              </Button>
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
