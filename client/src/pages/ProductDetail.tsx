import { Star, ShoppingCart, Heart, Share2, Truck, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "wouter";
import { useCart } from "../contexts/CartContext";
import { toast } from "sonner";
import { Product } from "../types/product";

// interface Product {
//   _id: string;
//   name: string;
//   price: number;
//   category: string;
//   stock: number;
//   rating: number;
//   reviews: number;
//   thumbnailUrl: string;
//   images?: string[];
//   originalPrice?: number;
//   badge?: string;
// }

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // 🔥 Carregar produto do backend
  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`http://localhost:3000/api/products/${id}`);
        if (!res.ok) throw new Error("Erro ao carregar produto");

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl font-bold">Carregando produto...</h1>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <h1 className="text-3xl font-bold uppercase">Produto Não Encontrado</h1>
      </div>
    );
  }

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.thumbnailUrl];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    toast.success(`${quantity}x ${product.name} adicionados ao carrinho!`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* topo */}
      <div className="bg-card border-b-2 border-foreground py-3">
        <div className="container">
          <p className="text-sm font-mono text-muted-foreground">
            <span className="hover:text-accent cursor-pointer">Início</span>
            {" > "}
            <span className="hover:text-accent cursor-pointer">
              {product.category}
            </span>
            {" > "}
            <span className="text-foreground font-bold">{product.name}</span>
          </p>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* IMAGENS */}
          <div>
            <div className="retro-border bg-input p-4 mb-4 text-center flex items-center justify-center">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-[420px] object-contain"
              />
            </div>

            <div className="grid grid-cols-4 gap-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`retro-border-sm p-1 transition overflow-hidden rounded ${
                    selectedImage === idx
                      ? "ring-2 ring-accent"
                      : "hover:opacity-90"
                  }`}
                >
                  <img src={img} className="w-full h-20 object-cover" alt="" />
                </button>
              ))}
            </div>
          </div>

          {/* INFO */}
          <div>
            <h1 className="text-4xl font-bold uppercase mb-2">
              {product.name}
            </h1>

            {/* rating */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b-2 border-foreground">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < Math.floor(product.rating)
                        ? "fill-accent text-accent"
                        : "text-muted"
                    }
                  />
                ))}
              </div>
              <span className="font-bold">{product.rating}</span>
              <span className="text-muted-foreground">
                ({product.reviews} avaliações)
              </span>
            </div>

            {/* preços */}
            <div className="mb-6">
              <span className="text-4xl font-bold">
                R$ {product.price.toLocaleString("pt-BR")}
              </span>
            </div>

            {/* estoque */}
            <p
              className={`text-sm font-bold mb-6 pb-6 border-b-2 border-foreground ${
                product.stock > 0 ? "text-accent" : "text-destructive"
              }`}
            >
              {product.stock > 0
                ? `${product.stock} em estoque`
                : "Fora de estoque"}
            </p>

            {/* quantidade */}
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <label className="text-sm font-bold uppercase">
                  Quantidade:
                </label>

                <div className="flex items-center retro-border-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 font-bold"
                  >
                    −
                  </button>

                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, Number(e.target.value)))
                    }
                    className="w-12 text-center border-l-2 border-r-2 border-foreground bg-transparent"
                  />

                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="retro-button w-full flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Adicionar ao carrinho
              </button>
            </div>

            {/* Selos */}
            <div className="space-y-3 pt-6 border-t-2 border-foreground">
              <div className="flex items-center gap-3">
                <Truck size={20} className="text-accent" />
                <div>
                  <p className="text-sm font-bold">Frete Grátis</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Shield size={20} className="text-accent" />
                <div>
                  <p className="text-sm font-bold">Compra Segura</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* fim */}
      </div>
    </div>
  );
}
