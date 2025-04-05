'use client';

import { useState, useEffect } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { FormField, FormSection } from './types/form';
import { Slide } from './types/slider';
import Slider from './components/Slider';
import Hero from './components/Hero';

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
};

export default function LandingPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [formData, setFormData] = useState<Record<string, string>>({});

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

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>, section: Section) => {
    e.preventDefault();
    if (!section.whatsappNumber) return;

    const message = Object.entries(formData)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');

    const whatsappUrl = `https://wa.me/${section.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  return (
    <main>
      {sections
        .sort((a, b) => a.order - b.order)
        .map((section) => (
          section.isActive && (
            <section key={section.id} className="section bg-gradient-to-b from-primary-50 to-white">
              <div className="container">
                {section.type === 'hero' ? (
                  <Hero
                    productImage={section.productImage || '/hero-image.jpg'}
                    title={section.content}
                    description={section.description || 'Experience the next generation of business solutions. Our product helps you streamline operations, boost productivity, and drive growth.'}
                    originalPrice={section.originalPrice || 0}
                    newPrice={section.newPrice || 0}
                    currency={section.currency || 'USD'}
                    shape={section.shape || 'none'}
                  />
                ) : section.type === 'features' ? (
                  <div className="container mx-auto px-4 py-12">
                    <h2 className="heading-2 text-center mb-12">{section.content}</h2>
                    <div className="space-y-16">
                      {section.features?.map((feature) => (
                        <div key={feature.id} className={`flex flex-col ${feature.imagePosition === 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8`}>
                          <div className="w-full lg:w-1/2">
                            <img
                              src={feature.imageUrl || '/placeholder.jpg'}
                              alt={feature.title}
                              className="w-full h-auto rounded-lg shadow-lg"
                            />
                          </div>
                          <div className="w-full lg:w-1/2 space-y-4">
                            <h3 className="heading-3">{feature.title}</h3>
                            <div className="prose prose-lg text-secondary-600">{feature.content}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : section.type === 'slider' && section.slides ? (
                  <div className="max-w-6xl mx-auto">
                    <h2 className="heading-2 text-center mb-8">{section.content}</h2>
                    <Slider slides={section.slides} autoplaySpeed={section.autoplaySpeed} />
                  </div>
                ) : section.type === 'form' ? (
                  <div id="form" className="max-w-lg mx-auto">
                    <h2 className="heading-2 text-center mb-8">{section.content}</h2>
                    <form
                      onSubmit={(e) => handleFormSubmit(e, section)}
                      className="space-y-6 bg-white p-8 rounded-xl shadow-lg"
                    >
                      {section.fields?.map((field) => (
                        <div key={field.id}>
                          <label className="block text-sm font-medium text-secondary-700 mb-1">
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                          </label>
                          <input
                            type={field.type}
                            placeholder={field.placeholder}
                            required={field.required}
                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                            className="w-full p-2 border border-secondary-300 rounded-md"
                          />
                        </div>
                      ))}
                      <button type="submit" className="w-full btn-primary">
                        Submit
                      </button>
                    </form>
                  </div>
                ) : null}
              </div>
            </section>
          )
        ))}
    </main>
  );
}