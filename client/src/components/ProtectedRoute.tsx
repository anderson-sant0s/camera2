import { ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Redirect } from "wouter";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth();

  if (!user) {
    alert("Você precisa estar logado para acessar esta página!");
    return <Redirect to="/login" />;
  }

  return <>{children}</>;
}
