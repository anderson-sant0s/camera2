import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

interface Order {
  _id: string;
  date: string;
  total: number;
  items: number;
}

interface Address {
  street: string;
  number: string;
  city: string;
  state: string;
  zip: string;
}

export default function Perfil() {
  const { user, login } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [address, setAddress] = useState<Address | null>(null);

  const [editing, setEditing] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [stateUF, setStateUF] = useState("");
  const [zip, setZip] = useState("");

  useEffect(() => {
    if (!user) return;

    // Carrega dados iniciais do usuário no formulário
    setName(user.name);
    setEmail(user.email);

    // Simulação temporária — substituir por API real
    setOrders([
      { _id: "A123", date: "2025-02-01", total: 199.9, items: 3 },
      { _id: "B982", date: "2025-01-21", total: 89.5, items: 1 },
    ]);

    const fakeAddress = {
      street: "Rua Exemplo",
      number: "123",
      city: "São Paulo",
      state: "SP",
      zip: "01001-000",
    };

    setAddress(fakeAddress);

    setStreet(fakeAddress.street);
    setNumber(fakeAddress.number);
    setCity(fakeAddress.city);
    setStateUF(fakeAddress.state);
    setZip(fakeAddress.zip);
  }, [user]);

  if (!user) {
    return (
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-6">Meu Perfil</h1>
        <p className="text-lg">
          Você precisa estar logado para ver esta página.
        </p>
      </div>
    );
  }

  // Salvar perfil (simulado — depois ligamos com API)
  const handleSaveProfile = () => {
    const updatedUser = { ...user, name, email };
    login(updatedUser, localStorage.getItem("token") || "");
    setEditing(false);
  };

  // Salvar endereço (simulado)
  const handleSaveAddress = () => {
    const updated = { street, number, city, state: stateUF, zip };
    setAddress(updated);
    setEditingAddress(false);
  };

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-6">Meu Perfil</h1>

      <div className="space-y-10">
        {/* 🔹 Seção de Informações Pessoais */}
        <section className="retro-card p-6">
          <h2 className="text-2xl font-bold mb-4">Informações da Conta</h2>

          {!editing ? (
            <>
              <p>
                <strong>Nome:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <button
                onClick={() => setEditing(true)}
                className="mt-4 retro-border-sm bg-accent text-accent-foreground px-4 py-2 font-bold hover:opacity-80 transition"
              >
                Editar Perfil
              </button>
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="font-bold block">Nome:</label>
                <input
                  className="retro-input w-full p-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="font-bold block">Email:</label>
                <input
                  className="retro-input w-full p-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSaveProfile}
                  className="retro-border-sm bg-accent text-accent-foreground px-4 py-2 font-bold"
                >
                  Salvar
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="retro-border-sm bg-muted text-foreground px-4 py-2 font-bold"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </section>

        {/* 🔹 Seção de Endereço */}
        <section className="retro-card p-6">
          <h2 className="text-2xl font-bold mb-4">Endereço</h2>

          {!editingAddress ? (
            <>
              <p>
                {address?.street}, {address?.number}
              </p>
              <p>
                {address?.city} - {address?.state}
              </p>
              <p>CEP: {address?.zip}</p>

              <button
                onClick={() => setEditingAddress(true)}
                className="mt-4 retro-border-sm bg-accent text-accent-foreground px-4 py-2 font-bold hover:opacity-80 transition"
              >
                Editar Endereço
              </button>
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="font-bold block">Rua:</label>
                <input
                  className="retro-input w-full p-2"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>

              <div>
                <label className="font-bold block">Número:</label>
                <input
                  className="retro-input w-full p-2"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>

              <div>
                <label className="font-bold block">Cidade:</label>
                <input
                  className="retro-input w-full p-2"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div>
                <label className="font-bold block">Estado:</label>
                <input
                  className="retro-input w-full p-2"
                  value={stateUF}
                  onChange={(e) => setStateUF(e.target.value)}
                />
              </div>

              <div>
                <label className="font-bold block">CEP:</label>
                <input
                  className="retro-input w-full p-2"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSaveAddress}
                  className="retro-border-sm bg-accent text-accent-foreground px-4 py-2 font-bold"
                >
                  Salvar
                </button>
                <button
                  onClick={() => setEditingAddress(false)}
                  className="retro-border-sm bg-muted text-foreground px-4 py-2 font-bold"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </section>

        {/* 🔹 Seção de Pedidos anteriores */}
        <section className="retro-card p-6">
          <h2 className="text-2xl font-bold mb-4">Pedidos Anteriores</h2>

          {orders.length === 0 ? (
            <p>Você ainda não fez nenhum pedido.</p>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="border border-foreground p-4 flex justify-between"
                >
                  <div>
                    <p>
                      <strong>ID do pedido:</strong> {order._id}
                    </p>
                    <p>
                      <strong>Data:</strong> {order.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p>
                      <strong>Itens:</strong> {order.items}
                    </p>
                    <p>
                      <strong>Total:</strong> R$ {order.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
