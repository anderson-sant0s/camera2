import { Link } from "wouter";
import { APP_TITLE } from "@/const";
import { Camera, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Cabeçalho da página */}
      <section className="bg-card border-b-4 border-foreground py-8">
        <div className="container">
          <h1 className="text-4xl font-bold uppercase mb-2">Sobre a {APP_TITLE}</h1>
          <p className="text-muted-foreground font-mono">
            Nossa missão, visão e valores.
          </p>
        </div>
      </section>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="retro-card p-6">
              <h2 className="text-2xl font-bold uppercase mb-4 flex items-center gap-2 border-b-2 border-foreground pb-2">
                <Camera size={20} /> Nossa História
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A {APP_TITLE} nasceu da paixão pela fotografia e pelo desejo de tornar equipamentos de alta qualidade acessíveis a todos. Fundada em 2024, nossa loja virtual rapidamente se tornou um ponto de referência para fotógrafos amadores e profissionais que buscam as últimas novidades em câmeras, lentes e acessórios.
              </p>
            </div>

            <div className="retro-card p-6">
              <h2 className="text-2xl font-bold uppercase mb-4 flex items-center gap-2 border-b-2 border-foreground pb-2">
                <Users size={20} /> Missão e Valores
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Nossa **missão** é inspirar e capacitar a comunidade de fotógrafos, fornecendo os melhores produtos e o conhecimento necessário para capturar momentos inesquecíveis.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Nossos **valores** são: **Qualidade** (oferecer apenas produtos de excelência), **Inovação** (estar sempre à frente das tendências tecnológicas) e **Atendimento** (colocar o cliente em primeiro lugar).
              </p>
            </div>

            <div className="retro-card p-6">
              <h2 className="text-2xl font-bold uppercase mb-4 flex items-center gap-2 border-b-2 border-foreground pb-2">
                <Zap size={20} /> Por Que Escolher a {APP_TITLE}?
              </h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>**Produtos Selecionados:** Curadoria rigorosa dos melhores equipamentos do mercado.</li>
                <li>**Preços Competitivos:** Garantimos o melhor custo-benefício.</li>
                <li>**Suporte Especializado:** Nossa equipe é formada por fotógrafos experientes.</li>
                <li>**Entrega Rápida:** Receba seu equipamento com agilidade e segurança.</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1 retro-card p-6 h-fit">
            <h2 className="text-2xl font-bold uppercase mb-4 border-b-2 border-foreground pb-2">
              Fale Conosco
            </h2>
            <p className="text-muted-foreground mb-4">
              Tem alguma dúvida ou sugestão? Entre em contato!
            </p>
            <Link href="/contato">
              <Button className="w-full retro-button">
                Ir para Contato
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
