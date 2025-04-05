'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormField, FormSection } from '@/app/types/form';
import { Slide, SliderSection } from '@/app/types/slider';
import { themes } from '@/app/themes';

type Feature = {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  imagePosition: 'left' | 'right';
};

type Section = {
  id: string;
  type: 'hero' | 'features' | 'form' | 'slider';
  title: string;
  content: string;
  isActive: boolean;
  order: number;
  fields?: FormField[];
  whatsappNumber?: string;
  slides?: Slide[];
  autoplaySpeed?: number;
  productImage?: string;
  description?: string;
  originalPrice?: number;
  newPrice?: number;
  currency?: 'USD' | 'EUR' | 'MAD';
  shape?: 'star' | 'square' | 'circle' | 'hexagon' | 'wave' | 'none';
  features?: Feature[];
};

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    const storedSections = localStorage.getItem('landingPageSections');
    if (storedSections) {
      setSections(JSON.parse(storedSections));
    } else {
      const initialSections = [
        {
          id: '1',
          type: 'hero',
          title: 'Hero Section',
          content: 'Transform Your Business with Our Product',
          isActive: true,
          order: 0
        }
      ];
      setSections(initialSections);
      localStorage.setItem('landingPageSections', JSON.stringify(initialSections));
    }
  }, []);

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (status === 'unauthenticated') {
    router.push('/admin/login');
    return null;
  }

  const handleSectionToggle = (id: string) => {
    const updatedSections = sections.map(section =>
      section.id === id ? { ...section, isActive: !section.isActive } : section
    );
    setSections(updatedSections);
    localStorage.setItem('landingPageSections', JSON.stringify(updatedSections));
  };

  const handleSectionEdit = (id: string, updates: Partial<Section>) => {
    const updatedSections = sections.map(section => {
      if (section.id === id) {
        if ('order' in updates) {
          const newOrder = updates.order as number;
          const otherSection = sections.find(s => s.order === newOrder);
          if (otherSection) {
            const updatedOtherSection = { ...otherSection, order: section.order };
            const updatedCurrentSection = { ...section, ...updates };
            return updatedCurrentSection;
          }
        }
        return { ...section, ...updates };
      }
      if ('order' in updates) {
        const newOrder = updates.order as number;
        const targetSection = sections.find(s => s.id === id);
        if (targetSection && section.order === newOrder) {
          return { ...section, order: targetSection.order };
        }
      }
      return section;
    });
    setSections(updatedSections);
    localStorage.setItem('landingPageSections', JSON.stringify(updatedSections));
  };

  const handleAddField = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (section?.type !== 'form') return;

    const newField: FormField = {
      id: Date.now().toString(),
      type: 'text',
      label: 'New Field',
      placeholder: 'Enter value',
      required: false
    };

    const updatedSections = sections.map(s =>
      s.id === sectionId
        ? { ...s, fields: [...(s.fields || []), newField] }
        : s
    );
    setSections(updatedSections);
    localStorage.setItem('landingPageSections', JSON.stringify(updatedSections));
  };

  const handleFieldEdit = (sectionId: string, fieldId: string, updates: Partial<FormField>) => {
    const updatedSections = sections.map(section =>
      section.id === sectionId && section.type === 'form'
        ? {
            ...section,
            fields: (section.fields || []).map(field =>
              field.id === fieldId ? { ...field, ...updates } : field
            )
          }
        : section
    );
    setSections(updatedSections);
    localStorage.setItem('landingPageSections', JSON.stringify(updatedSections));
  };

  const handleDeleteField = (sectionId: string, fieldId: string) => {
    const updatedSections = sections.map(section =>
      section.id === sectionId && section.type === 'form'
        ? {
            ...section,
            fields: (section.fields || []).filter(field => field.id !== fieldId)
          }
        : section
    );
    setSections(updatedSections);
    localStorage.setItem('landingPageSections', JSON.stringify(updatedSections));
  };

  const handleAddFeature = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (section?.type !== 'features') return;

    const newFeature: Feature = {
      id: Date.now().toString(),
      title: 'New Feature',
      content: '',
      imageUrl: '',
      imagePosition: section.features?.length % 2 === 0 ? 'left' : 'right'
    };

    const updatedSections = sections.map(s =>
      s.id === sectionId
        ? { ...s, features: [...(s.features || []), newFeature] }
        : s
    );
    setSections(updatedSections);
    localStorage.setItem('landingPageSections', JSON.stringify(updatedSections));
  };

  const handleFeatureEdit = (sectionId: string, featureId: string, updates: Partial<Feature>) => {
    const updatedSections = sections.map(section =>
      section.id === sectionId && section.type === 'features'
        ? {
            ...section,
            features: (section.features || []).map(feature =>
              feature.id === featureId ? { ...feature, ...updates } : feature
            )
          }
        : section
    );
    setSections(updatedSections);
    localStorage.setItem('landingPageSections', JSON.stringify(updatedSections));
  };

  const handleDeleteFeature = (sectionId: string, featureId: string) => {
    const updatedSections = sections.map(section =>
      section.id === sectionId && section.type === 'features'
        ? {
            ...section,
            features: (section.features || []).filter(feature => feature.id !== featureId)
          }
        : section
    );
    setSections(updatedSections);
    localStorage.setItem('landingPageSections', JSON.stringify(updatedSections));
  };

  const handleAddSection = (type: Section['type']) => {
    const maxOrder = Math.max(...sections.map(s => s.order), -1);
    const newSection: Section = {
      id: Date.now().toString(),
      type,
      title: `New ${type} Section`,
      content: '',
      isActive: true,
      order: maxOrder + 1,
      ...(type === 'form' && {
        fields: [],
        whatsappNumber: ''
      }),
      ...(type === 'slider' && {
        slides: [],
        autoplaySpeed: 3000
      }),
      ...(type === 'features' && {
        features: []
      })
    };
    const updatedSections = [...sections, newSection];
    setSections(updatedSections);
    localStorage.setItem('landingPageSections', JSON.stringify(updatedSections));
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-secondary-900">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-secondary-600">{session?.user?.name}</span>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-secondary-900">Select Theme</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className="border rounded-lg p-4 hover:border-primary-500 cursor-pointer transition-colors"
                onClick={() => {
                  if (confirm('Are you sure you want to apply this theme? This will replace your current sections.')) {
                    setSections(theme.sections);
                    localStorage.setItem('landingPageSections', JSON.stringify(theme.sections));
                  }
                }}
              >
                <img
                  src={theme.preview}
                  alt={theme.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-medium text-secondary-900 mb-2">{theme.name}</h3>
                <p className="text-secondary-600 text-sm">{theme.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-secondary-900">Page Sections</h2>
            <div className="flex gap-2">
              <button
                onClick={() => handleAddSection('hero')}
                className="btn-secondary"
              >
                Add Hero Section
              </button>
              <button
                onClick={() => handleAddSection('features')}
                className="btn-secondary"
              >
                Add Features Section
              </button>
              <button
                onClick={() => handleAddSection('form')}
                className="btn-secondary"
              >
                Add Form Section
              </button>
              <button
                onClick={() => handleAddSection('slider')}
                className="btn-secondary"
              >
                Add Slider Section
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {sections.sort((a, b) => a.order - b.order).map(section => (
              <div
                key={section.id}
                className="border rounded-lg p-4 bg-white"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <h3 className="text-lg font-medium text-secondary-900">{section.title}</h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const currentOrder = section.order;
                          const prevSection = sections.find(s => s.order === currentOrder - 1);
                          if (prevSection) {
                            handleSectionEdit(section.id, { order: currentOrder - 1 });
                            handleSectionEdit(prevSection.id, { order: currentOrder });
                          }
                        }}
                        disabled={section.order === 0}
                        className="btn-secondary disabled:opacity-50"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => {
                          const currentOrder = section.order;
                          const nextSection = sections.find(s => s.order === currentOrder + 1);
                          if (nextSection) {
                            handleSectionEdit(section.id, { order: currentOrder + 1 });
                            handleSectionEdit(nextSection.id, { order: currentOrder });
                          }
                        }}
                        disabled={section.order === sections.length - 1}
                        className="btn-secondary disabled:opacity-50"
                      >
                        ↓
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSectionToggle(section.id)}
                      className={`btn ${section.isActive ? 'btn-primary' : 'btn-secondary'}`}
                    >
                      {section.isActive ? 'Active' : 'Inactive'}
                    </button>
                    <button
                      onClick={() => handleSectionEdit(section.id, { title: prompt('Enter new title') || section.title })}
                      className="btn-secondary"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this section?')) {
                          setSections(sections.filter(s => s.id !== section.id));
                          localStorage.setItem('landingPageSections', JSON.stringify(
                            sections.filter(s => s.id !== section.id)
                          ));
                        }
                      }}
                      className="btn bg-red-100 text-red-900 hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {section.type === 'hero' ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Product Image
                        </label>
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={section.productImage || ''}
                            onChange={(e) => handleSectionEdit(section.id, { productImage: e.target.value })}
                            className="w-full p-2 border rounded-md"
                            placeholder="Enter product image URL"
                          />
                          <div className="flex items-center gap-2">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (event) => {
                                    handleSectionEdit(section.id, { productImage: event.target?.result as string });
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="hidden"
                              id={`image-upload-${section.id}`}
                            />
                            <label
                              htmlFor={`image-upload-${section.id}`}
                              className="btn-secondary cursor-pointer"
                            >
                              Upload Image
                            </label>
                          </div>
                          {section.productImage && (
                            <div className="mt-2">
                              <img
                                src={section.productImage}
                                alt="Product preview"
                                className="max-w-full h-32 object-cover rounded-md"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={section.content}
                          onChange={(e) => handleSectionEdit(section.id, { content: e.target.value })}
                          className="w-full p-2 border rounded-md"
                          placeholder="Enter title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Description
                        </label>
                        <textarea
                          value={section.description || ''}
                          onChange={(e) => handleSectionEdit(section.id, { description: e.target.value })}
                          className="w-full h-32 p-2 border rounded-md"
                          placeholder="Enter description"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-secondary-700 mb-1">
                            Original Price
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="number"
                              value={section.originalPrice || ''}
                              onChange={(e) => handleSectionEdit(section.id, { originalPrice: parseFloat(e.target.value) })}
                              className="w-full p-2 border rounded-md"
                              placeholder="Enter original price"
                              min="0"
                              step="0.01"
                            />
                            <select
                              value={section.currency || 'USD'}
                              onChange={(e) => handleSectionEdit(section.id, { currency: e.target.value as 'USD' | 'EUR' | 'MAD' })}
                              className="p-2 border rounded-md"
                            >
                              <option value="USD">USD</option>
                              <option value="EUR">EUR</option>
                              <option value="MAD">MAD</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-secondary-700 mb-1">
                            New Price
                          </label>
                          <input
                            type="number"
                            value={section.newPrice || ''}
                            onChange={(e) => handleSectionEdit(section.id, { newPrice: parseFloat(e.target.value) })}
                            className="w-full p-2 border rounded-md"
                            placeholder="Enter new price"
                            min="0"
                            step="0.01"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Shape Decoration
                        </label>
                        <select
                          value={section.shape || 'none'}
                          onChange={(e) => handleSectionEdit(section.id, { shape: e.target.value as 'star' | 'square' | 'circle' | 'hexagon' | 'wave' | 'none' })}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="none">None</option>
                          <option value="star">Star</option>
                          <option value="square">Square</option>
                          <option value="circle">Circle</option>
                          <option value="hexagon">Hexagon</option>
                          <option value="wave">Wave</option>
                        </select>
                      </div>
                    </div>
                  ) : section.type === 'features' ? (
                    <div className="space-y-6">
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleAddFeature(section.id)}
                          className="btn-secondary"
                        >
                          Add Feature
                        </button>
                      </div>
                      {section.features?.map((feature, index) => (
                        <div key={feature.id} className="border rounded-lg p-4 space-y-4">
                          <div className="flex justify-between items-center">
                            <h4 className="text-lg font-medium">Feature {index + 1}</h4>
                            <button
                              onClick={() => handleDeleteFeature(section.id, feature.id)}
                              className="btn bg-red-100 text-red-900 hover:bg-red-200"
                            >
                              Delete
                            </button>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-secondary-700 mb-1">
                              Title
                            </label>
                            <input
                              type="text"
                              value={feature.title}
                              onChange={(e) => handleFeatureEdit(section.id, feature.id, { title: e.target.value })}
                              className="w-full p-2 border rounded-md"
                              placeholder="Enter feature title"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-secondary-700 mb-1">
                              Content
                            </label>
                            <textarea
                              value={feature.content}
                              onChange={(e) => handleFeatureEdit(section.id, feature.id, { content: e.target.value })}
                              className="w-full h-32 p-2 border rounded-md"
                              placeholder="Enter feature content..."
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-secondary-700 mb-1">
                              Image
                            </label>
                            <div className="space-y-2">
                              <input
                                type="text"
                                value={feature.imageUrl}
                                onChange={(e) => handleFeatureEdit(section.id, feature.id, { imageUrl: e.target.value })}
                                className="w-full p-2 border rounded-md"
                                placeholder="Enter image URL"
                              />
                              <div className="flex items-center gap-2">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onload = (event) => {
                                        handleFeatureEdit(section.id, feature.id, { imageUrl: event.target?.result as string });
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                  className="hidden"
                                  id={`feature-image-upload-${feature.id}`}
                                />
                                <label
                                  htmlFor={`feature-image-upload-${feature.id}`}
                                  className="btn-secondary cursor-pointer"
                                >
                                  Upload Image
                                </label>
                              </div>
                              {feature.imageUrl && (
                                <div className="mt-2">
                                  <img
                                    src={feature.imageUrl}
                                    alt={feature.title}
                                    className="max-w-full h-32 object-cover rounded-md"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-secondary-700 mb-1">
                              Image Position
                            </label>
                            <select
                              value={feature.imagePosition}
                              onChange={(e) => handleFeatureEdit(section.id, feature.id, { imagePosition: e.target.value as 'left' | 'right' })}
                              className="w-full p-2 border rounded-md"
                            >
                              <option value="left">Left</option>
                              <option value="right">Right</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <textarea
                      value={section.content}
                      onChange={(e) => handleSectionEdit(section.id, { content: e.target.value })}
                      className="w-full h-32 p-2 border rounded-md"
                      placeholder="Enter section content..."
                    />
                  )}

                  {section.type === 'slider' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Autoplay Speed (ms)
                        </label>
                        <input
                          type="number"
                          value={section.autoplaySpeed || 3000}
                          onChange={(e) => handleSectionEdit(section.id, { autoplaySpeed: parseInt(e.target.value) })}
                          className="w-full p-2 border rounded-md"
                          min="1000"
                          step="500"
                        />
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-lg font-medium">Slides</h4>
                          <button
                            onClick={() => {
                              const newSlide: Slide = {
                                id: Date.now().toString(),
                                imageUrl: '',
                                title: 'New Slide',
                                description: '',
                                animation: 'fade'
                              };
                              handleSectionEdit(section.id, {
                                slides: [...(section.slides || []), newSlide]
                              });
                            }}
                            className="btn-secondary"
                          >
                            Add Slide
                          </button>
                        </div>

                        <div className="space-y-4">
                          {section.slides?.map((slide, index) => (
                            <div key={slide.id} className="border p-4 rounded-md">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                                    Image
                                  </label>
                                  <div className="space-y-2">
                                    <input
                                      type="text"
                                      value={slide.imageUrl}
                                      onChange={(e) => {
                                        const updatedSlides = [...(section.slides || [])];
                                        updatedSlides[index] = { ...slide, imageUrl: e.target.value };
                                        handleSectionEdit(section.id, { slides: updatedSlides });
                                      }}
                                      className="w-full p-2 border rounded-md"
                                      placeholder="Enter image URL"
                                    />
                                    <div className="flex items-center gap-2">
                                      <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (file) {
                                            const reader = new FileReader();
                                            reader.onload = (event) => {
                                              const updatedSlides = [...(section.slides || [])];
                                              updatedSlides[index] = { ...slide, imageUrl: event.target?.result as string };
                                              handleSectionEdit(section.id, { slides: updatedSlides });
                                            };
                                            reader.readAsDataURL(file);
                                          }
                                        }}
                                        className="hidden"
                                        id={`image-upload-${slide.id}`}
                                      />
                                      <label
                                        htmlFor={`image-upload-${slide.id}`}
                                        className="btn-secondary cursor-pointer"
                                      >
                                        Upload Image
                                      </label>
                                    </div>
                                    {slide.imageUrl && (
                                      <div className="mt-2">
                                        <img
                                          src={slide.imageUrl}
                                          alt={slide.title}
                                          className="max-w-full h-32 object-cover rounded-md"
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                                    Title
                                  </label>
                                  <input
                                    type="text"
                                    value={slide.title}
                                    onChange={(e) => {
                                      const updatedSlides = [...(section.slides || [])];
                                      updatedSlides[index] = { ...slide, title: e.target.value };
                                      handleSectionEdit(section.id, { slides: updatedSlides });
                                    }}
                                    className="w-full p-2 border rounded-md"
                                  />
                                </div>
                                <div className="col-span-2">
                                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                                    Description
                                  </label>
                                  <textarea
                                    value={slide.description}
                                    onChange={(e) => {
                                      const updatedSlides = [...(section.slides || [])];
                                      updatedSlides[index] = { ...slide, description: e.target.value };
                                      handleSectionEdit(section.id, { slides: updatedSlides });
                                    }}
                                    className="w-full p-2 border rounded-md"
                                    rows={3}
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                                    Animation
                                  </label>
                                  <select
                                    value={slide.animation}
                                    onChange={(e) => {
                                      const updatedSlides = [...(section.slides || [])];
                                      updatedSlides[index] = { ...slide, animation: e.target.value as 'fade' | 'slide' | 'zoom' };
                                      handleSectionEdit(section.id, { slides: updatedSlides });
                                    }}
                                    className="w-full p-2 border rounded-md"
                                  >
                                    <option value="fade">Fade</option>
                                    <option value="slide">Slide</option>
                                    <option value="zoom">Zoom</option>
                                  </select>
                                </div>
                                <div className="flex items-center justify-end">
                                  <button
                                    onClick={() => {
                                      if (confirm('Are you sure you want to delete this slide?')) {
                                        const updatedSlides = (section.slides || []).filter(s => s.id !== slide.id);
                                        handleSectionEdit(section.id, { slides: updatedSlides });
                                      }
                                    }}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    Delete Slide
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {section.type === 'form' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          WhatsApp Number
                        </label>
                        <input
                          type="text"
                          value={section.whatsappNumber || ''}
                          onChange={(e) => handleSectionEdit(section.id, { whatsappNumber: e.target.value })}
                          placeholder="Enter WhatsApp number with country code (e.g., +1234567890)"
                          className="w-full p-2 border rounded-md"
                        />
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-lg font-medium">Form Fields</h4>
                          <button
                            onClick={() => handleAddField(section.id)}
                            className="btn-secondary"
                          >
                            Add Field
                          </button>
                        </div>

                        <div className="space-y-4">
                          {section.fields?.map(field => (
                            <div key={field.id} className="border p-4 rounded-md">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                                    Label
                                  </label>
                                  <input
                                    type="text"
                                    value={field.label}
                                    onChange={(e) => handleFieldEdit(section.id, field.id, { label: e.target.value })}
                                    className="w-full p-2 border rounded-md"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                                    Type
                                  </label>
                                  <select
                                    value={field.type}
                                    onChange={(e) => handleFieldEdit(section.id, field.id, { type: e.target.value as FormFieldType })}
                                    className="w-full p-2 border rounded-md"
                                  >
                                    <option value="text">Text</option>
                                    <option value="number">Number</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                                    Placeholder
                                  </label>
                                  <input
                                    type="text"
                                    value={field.placeholder || ''}
                                    onChange={(e) => handleFieldEdit(section.id, field.id, { placeholder: e.target.value })}
                                    className="w-full p-2 border rounded-md"
                                  />
                                </div>
                                <div className="flex items-center space-x-4">
                                  <label className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      checked={field.required}
                                      onChange={(e) => handleFieldEdit(section.id, field.id, { required: e.target.checked })}
                                      className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                                    />
                                    <span className="text-sm font-medium text-secondary-700">Required</span>
                                  </label>
                                  <button
                                    onClick={() => handleDeleteField(section.id, field.id)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}