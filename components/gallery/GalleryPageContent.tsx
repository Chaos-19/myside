'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Image as ImageIcon, X } from 'lucide-react';
import { PageHero } from '@/components/shared';
import { galleryImages } from '@/data/galleryData';

export default function GalleryPageContent() {
  const t = useTranslations('gallery');
  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Extract unique categories from gallery data
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    galleryImages.forEach(img => {
      if (img.category) {
        uniqueCategories.add(img.category);
      }
    });
    return ['All', ...Array.from(uniqueCategories).sort()];
  }, []);

  // Filter images based on selected category
  const filteredImages = useMemo(() => {
    if (filter === 'All') {
      return galleryImages;
    }
    return galleryImages.filter(img => img.category === filter);
  }, [filter]);

  // Get translated category name
  const getCategoryLabel = (category: string) => {
    if (category === 'All') {
      return t('categories.all');
    }
    return category;
  };

  return (
    <div className="animate-fadeIn">
      <PageHero
        title={t('title')}
        subtitle={t('subtitle')}
        bgImage="/assets/image/photo_19_2025-11-01_10-44-47.jpg"
      />

      <section className="py-20 bg-white min-h-screen">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          
          {/* Filter Controls */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  filter === cat
                    ? 'bg-brand-teal text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredImages.map((img) => (
              <div 
                key={img.id} 
                className="group relative overflow-hidden rounded-2xl shadow-md bg-gray-100 aspect-[4/3] cursor-pointer"
                onClick={() => setSelectedImage(img.src)}
              >
                <Image 
                  src={img.src} 
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  {img.category && (
                    <span className="text-brand-teal text-xs font-bold uppercase tracking-wider mb-2 bg-white/90 inline-block px-2 py-1 rounded w-fit">
                      {img.category}
                    </span>
                  )}
                  {img.caption && (
                    <h3 className="text-white font-bold text-xl">{img.caption}</h3>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {filteredImages.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <ImageIcon size={48} className="mx-auto mb-4 opacity-50" />
              <p>{t('noImages')}</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>
          <div 
            className="relative max-w-full max-h-[90vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image 
              src={selectedImage} 
              alt="Gallery image enlarged view"
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </div>
  );
}
