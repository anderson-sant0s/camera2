import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { CategoryIcon } from "@/components/CategoryIcon";
import { ShippingIcon, ReturnIcon, SecureIcon } from "@/components/ShopIcons";
import { useCart } from "@/contexts/CartContext";

const categories = [
  { name: "Câmeras", count: 45 },
  { name: "Lentes", count: 128 },
  { name: "Acessórios", count: 342 },
  { name: "Iluminação", count: 67 },
];

export default function Home() {
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const res = await fetch("http://localhost:3000/api/products/featured");
        const data = await res.json();
        setFeaturedProducts(data);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
      } finally {
        setLoading(false);
      }
    }

    loadFeatured();
  }, []);

  return (
    <div className="min-h-screen">
      {/* SEÇÃO PRINCIPAL */}
      <section className="bg-gradient-to-br from-accent via-secondary to-accent text-accent-foreground py-16 md:py-24 retro-pattern">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold uppercase mb-4 leading-tight">
                Capture
                <br />
                Momentos
                <br />
                <span className="text-accent-foreground drop-shadow-lg">
                  Perfeitos
                </span>
              </h1>

              <p className="text-lg mb-6 font-mono opacity-90">
                Câmeras, lentes e acessórios fotográficos de qualidade
                profissional.
              </p>

              <div className="flex gap-4">
                <Link href="/catalogo">
                  <button className="retro-button bg-accent-foreground text-accent border-2 border-accent-foreground">
                    Ver Catálogo
                  </button>
                </Link>
                <button className="retro-button border-2 border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent">
                  Saiba Mais
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="retro-border bg-accent-foreground text-accent p-12">
                <CategoryIcon category="Câmeras" className="w-24 h-24" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container">
          <h2 className="text-4xl font-bold uppercase mb-8 text-center">
            Categorias
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={`/categoria/${cat.name.toLowerCase()}`}
              >
                <div className="retro-card hover:shadow-lg transition cursor-pointer group">
                  <div className="mb-4 text-center group-hover:scale-110 transition">
                    <CategoryIcon
                      category={cat.name}
                      className="w-12 h-12 mx-auto"
                    />
                  </div>
                  <h3 className="text-lg font-bold uppercase text-center mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-center text-muted-foreground">
                    {cat.count} produtos
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUTOS EM DESTAQUE */}
      <section className="py-12 md:py-16 bg-card">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold uppercase">
              Produtos em Destaque
            </h2>
            <Link href="/catalogo">
              <button className="retro-button text-sm">Ver Todos</button>
            </Link>
          </div>

          {loading ? (
            <p>Carregando...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product: any) => (
                <div
                  key={product._id}
                  className="retro-card group hover:shadow-xl transition"
                >
                  {product.badge && (
                    <div className="absolute -top-3 -right-3 retro-border-sm bg-destructive text-destructive-foreground px-3 py-1 text-xs font-bold uppercase">
                      {product.badge}
                    </div>
                  )}

                  <div className="bg-input retro-border-sm p-4 text-center mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition">
                    <div className="w-full h-48 flex items-center justify-center overflow-hidden">
                      <img
                        src={product.thumbnailUrl ?? product.images?.[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold uppercase mb-2">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground uppercase mb-3 font-mono">
                    {product.category}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < Math.floor(product.rating)
                              ? "fill-accent text-accent"
                              : "text-muted"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      ({product.reviews})
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">
                        R$ {product.price.toLocaleString("pt-BR")}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          R$ {product.originalPrice.toLocaleString("pt-BR")}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 retro-button flex items-center justify-center gap-2 text-sm"
                    >
                      <ShoppingCart size={16} />
                      <span className="hidden sm:inline">Carrinho</span>
                    </button>

                    <Link href={`/produto/${product._id}`}>
                      <button className="retro-button flex items-center justify-center gap-2 text-sm border-foreground bg-input text-foreground hover:bg-accent hover:text-accent-foreground">
                        <Eye size={16} />
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-12 md:py-16 bg-accent text-accent-foreground retro-pattern">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold uppercase mb-4">
              Fique por Dentro
            </h2>
            <p className="text-lg mb-6 font-mono">
              Ofertas e novidades direto no seu e-mail.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="seu@email.com"
                className="flex-1 retro-input bg-accent-foreground text-accent placeholder-accent/50"
              />
              <button className="retro-button bg-accent-foreground text-accent border-2 border-accent-foreground font-bold">
                Inscrever
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CONFIANÇA */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="retro-card text-center">
              <ShippingIcon className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-lg font-bold uppercase mb-2">Frete Grátis</h3>
              <p className="text-sm text-muted-foreground">
                Acima de R$ 200 em compras
              </p>
            </div>

            <div className="retro-card text-center">
              <SecureIcon className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-lg font-bold uppercase mb-2">
                Compra Segura
              </h3>
              <p className="text-sm text-muted-foreground">
                Pagamento 100% criptografado
              </p>
            </div>

            <div className="retro-card text-center">
              <ReturnIcon className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-lg font-bold uppercase mb-2">
                Devolução Fácil
              </h3>
              <p className="text-sm text-muted-foreground">
                30 dias para devolver
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
