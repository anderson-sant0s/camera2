import { Link } from "wouter";
import { useState, useEffect } from "react";
import { Product } from "../types/product";
import { Star, ShoppingCart, Eye, Filter, X } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { toast } from "sonner";

const categories = ["Todas", "Câmeras", "Lentes", "Acessórios", "Iluminação"];
const priceRanges = [
  { label: "Até R$ 500", min: 0, max: 500 },
  { label: "R$ 500 - R$ 2.000", min: 500, max: 2000 },
  { label: "R$ 2.000 - R$ 5.000", min: 2000, max: 5000 },
  { label: "Acima de R$ 5.000", min: 5000, max: 999999 },
];

export default function Catalog() {
  const { addToCart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedPrice, setSelectedPrice] = useState<{
    min: number;
    max: number;
  } | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("relevancia");

  // 🔥 BUSCA os produtos do backend MongoDB
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("http://localhost:3000/api/products");
        if (!res.ok) throw new Error("Erro ao carregar produtos");

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError("Não foi possível carregar os produtos.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // 📌 Loading visual
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Carregando catálogo...
      </div>
    );
  }

  // 📌 Erro visual
  if (error) {
    return (
      <div className="min-h-screen flex flex-col gap-4 items-center justify-center text-center">
        <p className="text-xl">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="retro-button"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  // 🔎 FILTROS
  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === "Todas" || product.category === selectedCategory;
    const priceMatch =
      !selectedPrice ||
      (product.price >= selectedPrice.min &&
        product.price <= selectedPrice.max);

    return categoryMatch && priceMatch;
  });

  // ↕️ ORDENAR
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "preco-asc":
        return a.price - b.price;
      case "preco-desc":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  // 🔥 A PARTIR DAQUI É O SEU CÓDIGO ORIGINAL

  return (
    <div className="min-h-screen bg-background">
      {/* Cabeçalho da página */}
      <section className="bg-card border-b-4 border-foreground py-8">
        <div className="container">
          <h1 className="text-4xl font-bold uppercase mb-2">
            Catálogo de Produtos
          </h1>
          <p className="text-muted-foreground font-mono">
            {filteredProducts.length} produtos encontrados
          </p>
        </div>
      </section>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filtros da barra lateral */}
          <aside
            className={`lg:col-span-1 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <div className="retro-card sticky top-4">
              <div className="flex items-center justify-between mb-4 lg:hidden">
                <h2 className="text-lg font-bold uppercase">Filtros</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-1 hover:bg-input rounded"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Filtro de Categoria */}
              <div className="mb-6">
                <h3 className="text-sm font-bold uppercase mb-3 border-b-2 border-foreground pb-2">
                  Categoria
                </h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="category"
                        value={cat}
                        checked={selectedCategory === cat}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 cursor-pointer"
                      />
                      <span className="text-sm">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filtro de Preço */}
              <div>
                <h3 className="text-sm font-bold uppercase mb-3 border-b-2 border-foreground pb-2">
                  Preço
                </h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label
                      key={range.label}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="price"
                        checked={
                          selectedPrice?.min === range.min &&
                          selectedPrice?.max === range.max
                        }
                        onChange={() =>
                          setSelectedPrice({ min: range.min, max: range.max })
                        }
                        className="w-4 h-4 cursor-pointer"
                      />
                      <span className="text-sm">{range.label}</span>
                    </label>
                  ))}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      checked={!selectedPrice}
                      onChange={() => setSelectedPrice(null)}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <span className="text-sm">Todos os preços</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Conteúdo Principal */}
          <div className="lg:col-span-3">
            {/* Barra de Ferramentas */}
            <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden retro-button flex items-center gap-2 text-sm"
              >
                <Filter size={16} />
                Filtros
              </button>

              <div className="flex items-center gap-2">
                <label className="text-sm font-bold uppercase">Ordenar:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="retro-input border-2 border-foreground py-2 px-3 text-sm"
                >
                  <option value="relevancia">Relevância</option>
                  <option value="preco-asc">Menor Preço</option>
                  <option value="preco-desc">Maior Preço</option>
                  <option value="rating">Melhor Avaliação</option>
                </select>
              </div>
            </div>

            {/* Grade de Produtos */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {sortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="retro-card group hover:shadow-xl transition relative"
                  >
                    {/* Selo */}
                    {product.badge && (
                      <div className="absolute -top-3 -right-3 retro-border-sm bg-destructive text-destructive-foreground px-3 py-1 text-xs font-bold uppercase">
                        {product.badge}
                      </div>
                    )}

                    {/* Imagem do Produto */}
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

                    {/* Informações do Produto */}
                    <h3 className="text-lg font-bold uppercase mb-2">
                      {product.name}
                    </h3>
                    <p className="text-xs text-muted-foreground uppercase mb-3 font-mono">
                      {product.category}
                    </p>

                    {/* Avaliação */}
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

                    {/* Preço */}
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

                    {/* Ações */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          addToCart(product);
                          toast.success(
                            `${product.name} adicionado ao carrinho!`
                          );
                        }}
                        className="flex-1 retro-button flex items-center justify-center gap-2 text-sm"
                      >
                        <ShoppingCart size={16} />
                        <span className="hidden sm:inline">Carrinho</span>
                      </button>
                      <Link href={`/produto/${product.id}`}>
                        <button className="retro-button flex items-center justify-center gap-2 text-sm border-foreground bg-input text-foreground hover:bg-accent hover:text-accent-foreground">
                          <Eye size={16} />
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="retro-card text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">
                  Nenhum produto encontrado
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("Todas");
                    setSelectedPrice(null);
                  }}
                  className="retro-button"
                >
                  Limpar Filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
