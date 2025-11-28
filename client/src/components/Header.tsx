import { Link } from "wouter";
import { CartSheet } from "./CartSheet";
import { ShoppingCart, Search } from "lucide-react";
import { APP_TITLE } from "@/const";
import { CategoryIcon } from "./CategoryIcon";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-card text-card-foreground border-b-4 border-foreground">
      <div className="container py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition"
          >
            <div className="retro-border-sm bg-accent text-accent-foreground p-2 w-12 h-12 flex items-center justify-center">
              <CategoryIcon category="Câmeras" className="w-8 h-8" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold uppercase tracking-wider">
                {APP_TITLE}
              </h1>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Câmeras & Acessórios
              </p>
            </div>
          </Link>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/catalogo"
              className="uppercase text-sm font-bold hover:text-accent"
            >
              Catálogo
            </Link>

            <Link
              href="/sobre"
              className="uppercase text-sm font-bold hover:text-accent"
            >
              Sobre
            </Link>

            <Link
              href="/contato"
              className="uppercase text-sm font-bold hover:text-accent"
            >
              Contato
            </Link>

            {/* Se usuário estiver logado */}
            {user ? (
              <>
                <Link
                  href="/perfil"
                  className="uppercase text-sm font-bold hover:text-accent transition"
                >
                  Meu Perfil
                </Link>

                <button
                  onClick={logout}
                  className="uppercase text-sm font-bold hover:text-red-500 transition"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="uppercase text-sm font-bold hover:text-accent"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="uppercase text-sm font-bold hover:text-accent"
                >
                  Cadastrar
                </Link>
              </>
            )}
          </nav>

          {/* Busca + Carrinho */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center retro-border-sm border-foreground bg-input px-3 py-2">
              <input
                type="text"
                placeholder="Buscar..."
                className="bg-transparent text-foreground placeholder-muted-foreground outline-none text-sm w-32"
              />
              <Search size={16} className="text-muted-foreground" />
            </div>

            <CartSheet />
          </div>
        </div>

        {/* Navegação mobile */}
        <nav className="md:hidden flex items-center gap-4 mt-4 pt-4 border-t-2 border-foreground">
          <Link
            href="/catalogo"
            className="uppercase text-xs font-bold hover:text-accent"
          >
            Catálogo
          </Link>
          <Link
            href="/sobre"
            className="uppercase text-xs font-bold hover:text-accent"
          >
            Sobre
          </Link>
          <Link
            href="/contato"
            className="uppercase text-xs font-bold hover:text-accent"
          >
            Contato
          </Link>
        </nav>
      </div>
    </header>
  );
}
