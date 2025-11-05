interface CategoryIconProps {
  category: string;
  className?: string;
}
import camera from '../assets/icons/camera.png';
import lentes from '../assets/icons/lentes.png';
import acessorios from '../assets/icons/assesorios.png';
import iluminacao from '../assets/icons/iluminaçao.png';

export const CategoryIcon = ({ category, className = "" }: CategoryIconProps) => {
  const normalized = category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const map: Record<string, string> = {
    cameras: camera,
    lentes: lentes,
    acessorios: acessorios,
    iluminacao: iluminacao,
  };

  const src = map[normalized] ?? camera;

  return (
    <img
      src={src}
      alt={`Ícone ${category}`}
      className={`w-6 h-6 object-contain ${className}`}
      loading="lazy"
    />
  );
};