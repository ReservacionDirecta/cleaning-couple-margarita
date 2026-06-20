'use client';

import React, { useState } from 'react';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'María González',
    role: 'Anfitriona Airbnb · Porlamar',
    avatar: 'MG',
    rating: 5,
    text: 'Desde que contratamos a The Cleaning Couple, nuestras reseñas de limpieza mejoraron drásticamente. Los huéspedes siempre destacan lo impecable que encuentran el apartamento. 100% recomendados.',
    date: 'Hace 2 semanas',
  },
  {
    name: 'Carlos Mendoza',
    role: 'Propietario · Pampatar',
    avatar: 'CM',
    rating: 5,
    text: 'Profesionales, puntuales y muy detallistas. Manejan 3 propiedades nuestras y nunca hemos tenido una queja. El servicio de coordinación post-checkout es excelente.',
    date: 'Hace 1 mes',
  },
  {
    name: 'Ana Lucía Rivas',
    role: 'Anfitriona · La Asunción',
    avatar: 'AL',
    rating: 5,
    text: 'Increíble servicio. Llegaron puntuales, trabajaron eficientemente y mi casa quedó perfecta. Mis huéspedes siempre quedan encantados con la limpieza. ¡Gracias equipo!',
    date: 'Hace 3 semanas',
  },
  {
    name: 'Roberto Sánchez',
    role: 'Host Airbnb · Playa El Agua',
    avatar: 'RS',
    rating: 4,
    text: 'Muy buen servicio. La comunicación es fluida y se adaptan a los horarios de check-in/check-out. La limpieza profunda que hicieron después de temporada alta fue espectacular.',
    date: 'Hace 2 meses',
  },
  {
    name: 'Laura Torres',
    role: 'Anfitriona · Isla de Margarita',
    avatar: 'LT',
    rating: 5,
    text: 'Lo mejor es la tranquilidad de saber que la propiedad quedará impecable para los huéspedes. El plan semanal es perfecto para mantener todo en orden sin preocupaciones.',
    date: 'Hace 1 mes',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-emerald-600 bg-emerald-100 px-4 py-1.5 rounded-full mb-4">
            Testimonios
          </span>
          <h2 className="section-title">
            Lo que dicen nuestros{' '}
            <span className="gradient-text">clientes</span>
          </h2>
          <p className="section-subtitle">
            Anfitriones de Airbnb en Isla de Margarita confían en nosotros 
            para mantener sus propiedades impecables.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-gray-50 rounded-3xl p-8 sm:p-12 lg:p-16">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 text-emerald-200">
              <FaQuoteLeft className="text-4xl sm:text-5xl" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-xl ${
                      i < t.rating ? 'text-yellow-400' : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>

              {/* Text */}
              <blockquote className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8 font-medium italic">
                &ldquo;{t.text}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-bold flex items-center justify-center text-lg">
                  {t.avatar}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>

              {/* Date */}
              <p className="text-sm text-gray-400 mt-4">{t.date}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:border-gray-300 transition-all"
              aria-label="Anterior"
            >
              <FaChevronLeft />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === current
                      ? 'bg-emerald-500 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Testimonio ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:border-gray-300 transition-all"
              aria-label="Siguiente"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Rating Summary */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 p-6 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">4.9</p>
              <div className="flex gap-0.5 mt-1 justify-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
              </div>
            </div>
            <div className="h-12 w-px bg-gray-200" />
            <div className="text-left">
              <p className="font-semibold text-gray-900">+50 reseñas verificadas</p>
              <p className="text-sm text-gray-500">En Google y Airbnb</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
