export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  stock: number;
  rating: number;
  reviews: number;
  images: string[];  // Array de URLs das imagens
  thumbnailUrl: string; // URL da imagem em miniatura
  badge?: string;
}
