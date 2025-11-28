import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      // const data = await res.json();
      let data;
      try {
        data = await res.json();
      } catch (_) {
        data = null;
      }
      if (!res.ok) throw new Error(data?.msg || "Erro no cadastro");

      setSuccess("Cadastro realizado com sucesso! Faça login.");
      setError("");
      setName("");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setError(err.message);
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-8 border rounded shadow-lg w-80"
      >
        <h2 className="text-2xl font-bold mb-4">Cadastrar</h2>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-accent-foreground text-accent p-2 rounded"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
