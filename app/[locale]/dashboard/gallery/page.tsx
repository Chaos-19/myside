'use client';

import { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Image as ImageIcon, X, Upload, FolderOpen } from 'lucide-react';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  caption: string;
}

const DEFAULT_CATEGORIES = ['Events', 'Programs', 'Team', 'Activities', 'Community'];

export default function GalleryManagementPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [formData, setFormData] = useState({
    src: '',
    alt: '',
    category: 'Events',
    caption: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('dashboard_gallery');
    if (stored) {
      setImages(JSON.parse(stored));
    }
  }, []);

  const saveImages = (newImages: GalleryImage[]) => {
    setImages(newImages);
    localStorage.setItem('dashboard_gallery', JSON.stringify(newImages));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // For demo purposes, we'll create a data URL
      // In production, you'd upload to a server/CDN
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, src: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const openModal = () => {
    setFormData({ src: '', alt: '', category: 'Events', caption: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ src: '', alt: '', category: 'Events', caption: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.src) {
      alert('Please provide an image URL or upload an image');
      return;
    }

    const newImage: GalleryImage = {
      id: `img-${Date.now()}`,
      src: formData.src,
      alt: formData.alt || formData.caption || 'Gallery image',
      category: formData.category,
      caption: formData.caption,
    };
    
    saveImages([...images, newImage]);
    closeModal();
  };

  const deleteImage = (id: string) => {
    if (confirm('Are you sure you want to remove this image from the gallery?')) {
      saveImages(images.filter(img => img.id !== id));
    }
  };

  const categories = ['all', ...DEFAULT_CATEGORIES];
  const filteredImages = filter === 'all' 
    ? images 
    : images.filter(img => img.category === filter);

  const categoryCounts = DEFAULT_CATEGORIES.reduce((acc, cat) => {
    acc[cat] = images.filter(img => img.category === cat).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gallery Management</h1>
          <p className="text-gray-500 mt-1">Add and manage gallery images</p>
        </div>
        <button
          onClick={openModal}
          className="flex items-center gap-2 bg-brand-teal hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus size={20} />
          Add Image
        </button>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === cat
                ? 'bg-brand-teal text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat === 'all' ? 'All' : cat} 
            {cat !== 'all' && ` (${categoryCounts[cat] || 0})`}
          </button>
        ))}
      </div>

      {/* Images Grid */}
      {filteredImages.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
          <ImageIcon className="mx-auto text-gray-300 mb-4" size={64} />
          <p className="text-gray-500 mb-4">
            {filter === 'all' 
              ? 'No images in the gallery yet. Add your first image!'
              : `No images in the "${filter}" category.`}
          </p>
          <button
            onClick={openModal}
            className="inline-flex items-center gap-2 bg-brand-teal hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Plus size={20} />
            Add Your First Image
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map(img => (
            <div key={img.id} className="group relative bg-gray-100 rounded-xl overflow-hidden aspect-square">
              <img 
                src={img.src} 
                alt={img.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                <div className="flex justify-end">
                  <button
                    onClick={() => deleteImage(img.id)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    title="Remove image"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div>
                  <span className="inline-block px-2 py-1 bg-brand-teal/90 text-white text-xs rounded mb-1">
                    {img.category}
                  </span>
                  {img.caption && (
                    <p className="text-white text-sm font-medium line-clamp-2">{img.caption}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Add New Image</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Image Preview / Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                {formData.src ? (
                  <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-2">
                    <img src={formData.src} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, src: '' })}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <ImageIcon className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-500 mb-4">Upload an image or provide a URL</p>
                    <div className="flex flex-col gap-3">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        <Upload size={18} />
                        Upload Image
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileSelect}
                      />
                      <div className="text-gray-400 text-sm">or</div>
                      <input
                        type="text"
                        placeholder="Enter image URL (e.g., /assets/image/photo.jpg)"
                        value={formData.src}
                        onChange={(e) => setFormData({ ...formData, src: e.target.value })}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none"
                >
                  {DEFAULT_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
                <input
                  type="text"
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none"
                  placeholder="e.g., Community Event 2026"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
                <input
                  type="text"
                  value={formData.alt}
                  onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none"
                  placeholder="Describe the image for accessibility"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-3 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-brand-teal text-white rounded-lg font-medium hover:bg-teal-700 transition-colors"
                >
                  Add Image
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
