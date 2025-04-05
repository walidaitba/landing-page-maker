'use client';

import { useState, useEffect } from 'react';
import { Slide } from '../types/slider';

type SliderProps = {
  slides: Slide[];
  autoplaySpeed?: number;
};

export default function Slider({ slides, autoplaySpeed = 3000 }: SliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoplaySpeed);

    return () => clearInterval(interval);
  }, [slides.length, autoplaySpeed]);

  if (!slides.length) {
    return null;
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative overflow-hidden rounded-xl">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
          width: `${slides.length * 100}%`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="relative w-full"
            style={{ width: `${100 / slides.length}%` }}
          >
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
              <div className="text-center text-white p-4">
                <h3 className="text-2xl font-bold mb-2">{slide.title}</h3>
                <p className="text-lg">{slide.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2"
          >
            →
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}