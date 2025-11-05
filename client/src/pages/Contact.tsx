import { Mail, Phone, MapPin, Send } from "lucide-react";
import { APP_TITLE } from "@/const";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mensagem enviada com sucesso! Em breve entraremos em contato.");
    // Aqui você adicionaria a lógica real de envio de formulário
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Cabeçalho da página */}
      <section className="bg-card border-b-4 border-foreground py-8">
        <div className="container">
          <h1 className="text-4xl font-bold uppercase mb-2">Fale Conosco</h1>
          <p className="text-muted-foreground font-mono">
            Estamos aqui para ajudar.
          </p>
        </div>
      </section>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário de Contato */}
          <div className="lg:col-span-2 retro-card p-6">
            <h2 className="text-2xl font-bold uppercase mb-4 border-b-2 border-foreground pb-2">
              Envie uma Mensagem
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input id="name" type="text" placeholder="Seu nome" className="retro-input" required />
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="seu.email@exemplo.com" className="retro-input" required />
              </div>
              <div>
                <Label htmlFor="subject">Assunto</Label>
                <Input id="subject" type="text" placeholder="Assunto da mensagem" className="retro-input" required />
              </div>
              <div>
                <Label htmlFor="message">Mensagem</Label>
                <Textarea id="message" placeholder="Sua mensagem..." className="retro-input" rows={5} required />
              </div>
              <Button type="submit" className="retro-button flex items-center gap-2">
                <Send size={16} />
                Enviar Mensagem
              </Button>
            </form>
          </div>

          {/* Informações de Contato */}
          <div className="lg:col-span-1 retro-card p-6 h-fit">
            <h2 className="text-2xl font-bold uppercase mb-4 border-b-2 border-foreground pb-2">
              Nossos Contatos
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-accent" />
                <div>
                  <p className="font-bold">E-mail</p>
                  <p className="text-sm text-muted-foreground">contato@{APP_TITLE.toLowerCase()}.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-accent" />
                <div>
                  <p className="font-bold">Telefone</p>
                  <p className="text-sm text-muted-foreground">(11) 98765-4321</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-accent" />
                <div>
                  <p className="font-bold">Endereço</p>
                  <p className="text-sm text-muted-foreground">Rua das Câmeras, 123 - São Paulo, SP</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
