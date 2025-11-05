import frete from '../assets/icons/frete.png';
import devolucao from '../assets/icons/devolucao.png';
import compra from '../assets/icons/compra.png';

export const ShippingIcon = ({ className = "" }: { className?: string }) => (
  <img
    src={frete}
    alt="Ícone Frete Grátis"
    className={`w-6 h-6 object-contain ${className}`}
    loading="lazy"
  />
);

export const ReturnIcon = ({ className = "" }: { className?: string }) => (
  <img
    src={devolucao}
    alt="Ícone Devolução"
    className={`w-6 h-6 object-contain ${className}`}
    loading="lazy"
  />
);

export const SecureIcon = ({ className = "" }: { className?: string }) => (
  <img
    src={compra}
    alt="Ícone Compra Segura"
    className={`w-6 h-6 object-contain ${className}`}
    loading="lazy"
  />
);