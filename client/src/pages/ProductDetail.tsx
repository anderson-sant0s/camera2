
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react";
import { useState } from "react";
import { useParams } from "wouter";
import { allProducts } from "../data/products";
import { Product } from "../types/product";
import { useCart } from "../contexts/CartContext";
import { toast } from "sonner";

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
}

// Dados de reviews para simulação
const productReviews: Record<number, Review[]> = {
  1: [
    {
      id: 1,
      author: "João Silva",
      rating: 5,
      date: "2024-10-15",
      title: "Excelente câmera!",
      comment:
        "Qualidade de imagem excepcional, construção robusta e muitos recursos. Recomendo para qualquer fotógrafo profissional.",
    },
    {
      id: 2,
      author: "Maria Santos",
      rating: 4,
      date: "2024-10-10",
      title: "Muito boa, mas cara",
      comment:
        "Ótima câmera com excelente desempenho, mas o preço é bem elevado. Vale a pena se você é profissional.",
    },
    {
      id: 3,
      author: "Pedro Costa",
      rating: 5,
      date: "2024-10-05",
      title: "Superou expectativas",
      comment:
        "Comprei pensando em aprender fotografia profissional e essa câmera é perfeita. Muito satisfeito com a compra.",
    },
  ],
  // Adicionar reviews para outros produtos se necessário
};

// Dados de especificações para simulação
const productSpecifications: Record<number, Record<string, string>> = {
  1: {
    "Sensor": "Full Frame CMOS 45.0 MP",
    "Processador": "DIGIC X",
    "Autofoco": "Detecção de fase de 1053 pontos",
    "Vídeo": "8K 24p, 4K 120p",
    "ISO": "100 - 51200 (expansível)",
    "Obturador": "Eletrônico 1/8000s",
    "Conectividade": "Wi-Fi 6E, Bluetooth 5.1",
    "Bateria": "LP-E6NH (até 320 disparos)",
  },
  // Adicionar especificações para outros produtos se necessário
};

// Dados de descrição para simulação
const productDescriptions: Record<number, string> = {
  1: "A Canon EOS R5 é uma câmera mirrorless profissional de alta resolução com 45 megapixels, perfeita para fotógrafos profissionais e entusiastas.",
  // Adicionar descrições para outros produtos se necessário
};

export default function ProductDetail() {
  const { id } = useParams();
  const productId = id ? parseInt(id) : null;
  const product = allProducts.find((p) => p.id === productId);
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showReviews, setShowReviews] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <h1 className="text-3xl font-bold uppercase">Produto Não Encontrado</h1>
      </div>
    );
  }

  const images = (product.images && product.images.length > 0) ? product.images : [product.thumbnailUrl];
  const specifications = productSpecifications[product.id] || {};
  const description = productDescriptions[product.id] || "Descrição não disponível.";
  const reviews = productReviews[product.id] || [];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`${quantity}x ${product.name} adicionado(s) ao carrinho!`);
  };

  return (
    <div className="min-h-screen bg-background">
  {/* Navegação (Breadcrumb) */}
      <div className="bg-card border-b-2 border-foreground py-3">
        <div className="container">
          <p className="text-sm font-mono text-muted-foreground">
            <span className="hover:text-accent cursor-pointer">Início</span>
            {" > "}
            <span className="hover:text-accent cursor-pointer">{product.category}</span>
            {" > "}
            <span className="text-foreground font-bold">{product.name}</span>
          </p>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Imagens do Produto */}
          <div>
            <div className="retro-border bg-input p-4 mb-4 text-center flex items-center justify-center">
              <img
                src={images[selectedImage]}
                alt={`${product.name} - Imagem ${selectedImage + 1}`}
                className="w-full h-[420px] object-contain"
                loading="lazy"
              />
            </div>

            <div className="grid grid-cols-4 gap-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`retro-border-sm p-1 transition overflow-hidden rounded ${
                    selectedImage === idx ? "ring-2 ring-accent" : "hover:opacity-90"
                  }`}
                >
                  <img src={img} alt={`${product.name} - Miniatura ${idx + 1}`} className="w-full h-20 object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          {/* Informações do Produto */}
          <div>
            <div className="mb-4">
              {product.badge && (
                <span className="retro-border-sm bg-destructive text-destructive-foreground px-3 py-1 text-xs font-bold uppercase inline-block mb-3">
                  {product.badge}
                </span>
              )}
              <h1 className="text-4xl font-bold uppercase mb-2">{product.name}</h1>
              <p className="text-sm text-muted-foreground uppercase font-mono mb-4">
                {product.category}
              </p>
            </div>

            {/* Avaliação */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b-2 border-foreground">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted"}
                  />
                ))}
              </div>
              <span className="font-bold">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviews} avaliações)</span>
            </div>

            {/* Preço */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold">
                  R$ {product.price.toLocaleString("pt-BR")}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    R$ {product.originalPrice.toLocaleString("pt-BR")}
                  </span>
                )}
              </div>
              <p className="text-sm text-accent font-bold">
                Economize R$ {(product.originalPrice! - product.price).toLocaleString("pt-BR")}
              </p>
            </div>

            {/* Status de Estoque */}
            <div className="mb-6 pb-6 border-b-2 border-foreground">
              <p className={`text-sm font-bold mb-2 ${product.stock > 0 ? "text-accent" : "text-destructive"}`}>
                {product.stock > 0 ? `${product.stock} em estoque` : "Fora de estoque"}
              </p>
            </div>

            {/* Descrição */}
            <div className="mb-6">
              <h3 className="text-lg font-bold uppercase mb-3">Descrição</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>

            {/* Quantidade e Ações */}
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <label className="text-sm font-bold uppercase">Quantidade:</label>
                <div className="flex items-center retro-border-sm border-foreground">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 font-bold hover:bg-input"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 text-center border-l-2 border-r-2 border-foreground bg-transparent outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 font-bold hover:bg-input"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="retro-button w-full flex items-center justify-center gap-2 mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={20} />
                Adicionar ao Carrinho
              </button>

              <div className="flex gap-2">
                <button className="flex-1 retro-button flex items-center justify-center gap-2 border-foreground bg-input text-foreground hover:bg-accent hover:text-accent-foreground">
                  <Heart size={18} />
                  <span className="hidden sm:inline">Favoritar</span>
                </button>
                <button className="flex-1 retro-button flex items-center justify-center gap-2 border-foreground bg-input text-foreground hover:bg-accent hover:text-accent-foreground">
                  <Share2 size={18} />
                  <span className="hidden sm:inline">Compartilhar</span>
                </button>
              </div>
            </div>

            {/* Selos de Confiança */}
            <div className="space-y-3 pt-6 border-t-2 border-foreground">
              <div className="flex items-center gap-3">
                <Truck size={20} className="text-accent" />
                <div>
                  <p className="text-sm font-bold">Frete Grátis</p>
                  <p className="text-xs text-muted-foreground">Acima de R$ 200</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-accent" />
                <div>
                  <p className="text-sm font-bold">Compra Segura</p>
                  <p className="text-xs text-muted-foreground">100% protegido</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw size={20} className="text-accent" />
                <div>
                  <p className="text-sm font-bold">Devolução Fácil</p>
                  <p className="text-xs text-muted-foreground">30 dias para devolver</p>
                </div>
              </div>
            </div>
          </div>
        </div>

  {/* Especificações */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold uppercase mb-6">Especificações Técnicas</h2>
          <div className="retro-card">
            {Object.keys(specifications).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-start pb-4 border-b border-border">
                    <span className="font-bold text-sm uppercase">{key}</span>
                    <span className="text-sm text-muted-foreground text-right">{value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-sm text-muted-foreground">Sem especificações técnicas disponíveis para este produto.</div>
            )}
          </div>
        </section>

  {/* Seção de Avaliações */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold uppercase">Avaliações</h2>
            <button
              onClick={() => setShowReviews(!showReviews)}
              className="retro-button text-sm"
            >
              {showReviews ? "Ocultar" : "Ver Todas"}
            </button>
          </div>

          {showReviews && (
            <div className="space-y-4">
              {reviews.length > 0 ? (
                reviews.map((review: Review) => (
                  <div key={review.id} className="retro-card">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-bold text-sm">{review.author}</p>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < review.rating ? "fill-accent text-accent" : "text-muted"}
                          />
                        ))}
                      </div>
                    </div>
                    <h4 className="font-bold text-sm uppercase mb-2">{review.title}</h4>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                ))
              ) : (
                <div className="retro-card p-6 text-sm text-muted-foreground">Ainda não há avaliações para este produto.</div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

