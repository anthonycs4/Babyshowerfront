import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { X, Camera } from 'lucide-react';
import babyShowerDecor from 'figma:asset/70e4977e4c4a30c06a351c1c8fa6d0a0194cbce6.png';

const galleryImages = [
  {
    id: 1,
    url: babyShowerDecor,
    alt: 'Baby shower decorations'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1704241135858-2e10153afaec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwZ2lybCUyMG51cnNlcnl8ZW58MXx8fHwxNzY3MzE4OTEzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Baby girl nursery'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1624958797025-b119e2fa2b53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwY2xvdGhlcyUyMHBpbmt8ZW58MXx8fHwxNzY3MzE4OTk1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Baby clothes'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1766918780916-228d10b071be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwdG95cyUyMHBhc3RlbHxlbnwxfHx8fDE3NjczNjkyOTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Baby toys'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1579736283361-4008b21c7ed6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwc2hvd2VyJTIwY2FrZXxlbnwxfHx8fDE3NjczNjkyOTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Baby shower cake'
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1624958797025-b119e2fa2b53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwc2hvZXMlMjBnaXJsfGVufDF8fHx8MTc2NzM2OTI5NXww&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Baby shoes'
  }
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  return (
    <div className="w-full">
      <div className="text-center mb-8 fade-in">
        <Camera className="w-12 h-12 text-[#bd7b6a] mx-auto mb-3" />
        <h2 className="text-4xl md:text-5xl text-[#bd7b6a] mb-4" style={{ fontFamily: 'Dancing Script, cursive' }}>
          Galería de Recuerdos
        </h2>
        <p className="text-lg text-[#99926b]" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Momentos especiales preparando la llegada de Miranda
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image, index) => (
          <div
            key={image.id}
            className="gallery-item fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => setSelectedImage(image)}
          >
            <div className="relative overflow-hidden rounded-2xl border-4 border-[#bd7b6a] cursor-pointer group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-[#af732f]">
              <ImageWithFallback
                src={image.url}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#99926b]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <p className="text-white text-lg" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                  Ver imagen
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 modal-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 bg-white rounded-full p-3 hover:bg-[#f5ede9] transition-colors transform hover:scale-110"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6 text-[#bd7b6a]" />
          </button>
          
          <div className="max-w-4xl w-full modal-scale-in" onClick={(e) => e.stopPropagation()}>
            <ImageWithFallback
              src={selectedImage.url}
              alt={selectedImage.alt}
              className="w-full h-auto rounded-2xl shadow-2xl border-4 border-white"
            />
          </div>
        </div>
      )}
    </div>
  );
}