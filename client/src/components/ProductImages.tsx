import { useState } from 'react';

interface ProductImagesProps {
  images: string[];
  productName: string;
}

export const ProductImages = ({ images, productName }: ProductImagesProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      {/* Imagem Principal */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-input">
        <img
          src={images[selectedImage]}
          alt={`${productName} - Imagem ${selectedImage + 1}`}
          className="h-full w-full object-cover object-center"
          loading="lazy"
        />
      </div>

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`relative aspect-square overflow-hidden rounded-md border-2 transition-all
                ${selectedImage === idx 
                  ? 'border-accent' 
                  : 'border-transparent hover:border-muted'
                }`}
            >
              <img
                src={image}
                alt={`${productName} - Miniatura ${idx + 1}`}
                className="h-full w-full object-cover object-center"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};