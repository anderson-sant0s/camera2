import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t-4 border-foreground mt-12">
      <div className="container py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Sobre */}
          <div>
            <h3 className="text-lg font-bold uppercase mb-4">Sobre</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              LightFrame é sua loja especializada em câmeras e acessórios fotográficos de qualidade.
            </p>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="text-lg font-bold uppercase mb-4">Categorias</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categoria/cameras" className="text-sm hover:text-accent transition">
                  Câmeras
                </Link>
              </li>
              <li>
                <Link href="/categoria/lentes" className="text-sm hover:text-accent transition">
                  Lentes
                </Link>
              </li>
              <li>
                <Link href="/categoria/acessorios" className="text-sm hover:text-accent transition">
                  Acessórios
                </Link>
              </li>
              <li>
                <Link href="/categoria/iluminacao" className="text-sm hover:text-accent transition">
                  Iluminação
                </Link>
              </li>
            </ul>
          </div>

          {/* Atendimento */}
          <div>
            <h3 className="text-lg font-bold uppercase mb-4">Atendimento</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-sm hover:text-accent transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/envios" className="text-sm hover:text-accent transition">
                  Envios
                </Link>
              </li>
              <li>
                <Link href="/trocas" className="text-sm hover:text-accent transition">
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-sm hover:text-accent transition">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-bold uppercase mb-4">Contato</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:+5511999999999" className="hover:text-accent transition">
                  (11) 99999-9999
                </a>
              </li>
              <li>
                <a href="mailto:contato@lightframe.com" className="hover:text-accent transition">
                  contato@lightframe.com
                </a>
              </li>
              <li className="text-muted-foreground">
                Seg-Sex: 9h às 18h
              </li>
            </ul>
          </div>
        </div>

  {/* Divisor */}
        <div className="border-t-2 border-foreground pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 LightFrame. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs uppercase font-bold">Pagamento Seguro:</span>
              <div className="flex gap-2">
                <span className="retro-border-sm border-foreground bg-input px-2 py-1 text-xs font-bold">💳</span>
                <span className="retro-border-sm border-foreground bg-input px-2 py-1 text-xs font-bold">PIX</span>
                <span className="retro-border-sm border-foreground bg-input px-2 py-1 text-xs font-bold">📋</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

