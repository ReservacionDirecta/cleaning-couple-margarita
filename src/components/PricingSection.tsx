'use client';

import React from 'react';
import Link from 'next/link';
import { FaCheck, FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Button from '@/components/ui/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface PricingTier {
  name: string;
  daysPerWeek: number;
  description: string;
  pricePerVisit: number;
  monthlyPrice: number;
  savings: number;
  isPopular: boolean;
  features: string[];
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Semanal',
    daysPerWeek: 1,
    description: 'Perfecto para propiedades con baja rotación de huéspedes.',
    pricePerVisit: 35,
    monthlyPrice: 140,
    savings: 0,
    isPopular: false,
    features: [
      'Limpieza básica completa',
      'Cambio de ropa de cama',
      'Reposición de amenities',
      'Inspección de la propiedad',
      'Reporte fotográfico',
    ],
  },
  {
    name: 'Bi-Semanal',
    daysPerWeek: 2,
    description: 'Ideal para propiedades con rotación moderada de huéspedes.',
    pricePerVisit: 30,
    monthlyPrice: 240,
    savings: 40,
    isPopular: true,
    features: [
      'Todo lo del plan semanal',
      'Limpieza profunda alternada',
      'Lavado de pisos profundos',
      'Desinfección adicional',
      'Prioridad en agenda',
    ],
  },
  {
    name: 'Frecuente',
    daysPerWeek: 3,
    description: 'Para propiedades de alta rotación que requieren atención constante.',
    pricePerVisit: 28,
    monthlyPrice: 336,
    savings: 84,
    isPopular: false,
    features: [
      'Todo lo del plan bi-semanal',
      'Limpieza profunda semanal',
      'Lavado de ventanas interiores',
      'Limpieza de electrodomésticos',
      'Atención VIP',
      'Kit de limpieza incluido',
    ],
  },
  {
    name: 'Premium',
    daysPerWeek: 5,
    description: 'Máxima frecuencia para propiedades premium y hoteles boutique.',
    pricePerVisit: 25,
    monthlyPrice: 500,
    savings: 200,
    isPopular: false,
    features: [
      'Todo lo del plan frecuente',
      'Limpieza diaria completa',
      'Lavandería incluida',
      'Limpieza de ventanas exterior',
      'Coordinador asignado',
      'Reporte semanal detallado',
      'Soporte 24/7',
    ],
  },
];

export default function PricingSection() {
  return (
    <section className="section-padding bg-gray-50 relative overflow-hidden" id="pricing">
      <div className="container-custom relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-sm font-semibold text-sky-600 bg-sky-100 px-4 py-1.5 rounded-full mb-4">
            Planes y Precios
          </span>
          <h2 className="section-title">
            Planes flexibles para <span className="gradient-text">tu propiedad</span>
          </h2>
          <p className="section-subtitle">
            Elige la frecuencia que mejor se adapte a la rotación de tu Airbnb. Desliza para comparar las opciones.
          </p>
        </div>

        {/* Slider Controls Container */}
        <div className="relative px-4 sm:px-12">
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next-pricing',
              prevEl: '.swiper-button-prev-pricing',
            }}
            pagination={{
              el: '.swiper-pagination-pricing',
              clickable: true,
              bulletClass: 'swiper-pagination-bullet bg-gray-300 !opacity-100 !w-2.5 !h-2.5 !mx-1 transition-all duration-300',
              bulletActiveClass: '!bg-sky-500 !w-6 !rounded-full',
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-4"
          >
            {pricingTiers.map((tier) => (
              <SwiperSlide key={tier.name} className="h-auto">
                <div
                  className={`relative rounded-2xl transition-all duration-300 hover:shadow-xl h-full flex flex-col justify-between ${
                    tier.isPopular
                      ? 'bg-white shadow-lg ring-2 ring-sky-500/20 border border-sky-400'
                      : 'bg-white border border-gray-100 shadow-sm'
                  }`}
                >
                  {/* Popular Badge */}
                  {tier.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-sky-500 to-cyan-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md whitespace-nowrap z-20">
                      Más Popular
                    </div>
                  )}

                  <div className="p-6 lg:p-8 flex flex-col h-full justify-between">
                    <div>
                      {/* Header */}
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{tier.name}</h3>
                      <p className="text-sm text-gray-500 mb-4">{tier.description}</p>

                      {/* Days */}
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-sm font-medium text-gray-700 mb-6">
                        {tier.daysPerWeek} día{tier.daysPerWeek > 1 ? 's' : ''} / semana
                      </div>

                      {/* Price */}
                      <div className="mb-6">
                        <div className="flex items-baseline gap-1">
                          <span className="text-sm text-gray-500">Desde</span>
                          <span className="text-4xl font-bold text-gray-900">${tier.pricePerVisit}</span>
                          <span className="text-gray-500 text-sm">/ visita</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          ~${tier.monthlyPrice}/mes
                        </p>
                      </div>

                      {/* Savings */}
                      {tier.savings > 0 && (
                        <div className="bg-sky-50 border border-sky-100 rounded-xl px-4 py-2 mb-6">
                          <p className="text-sm font-semibold text-sky-700 text-center">
                            Ahorra ${tier.savings}/mes
                          </p>
                        </div>
                      )}

                      {/* Features */}
                      <ul className="space-y-3 mb-8">
                        {tier.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <FaCheck className="text-sky-500 mt-0.5 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <Link href={`/book?plan=${tier.daysPerWeek}`} className="mt-auto block">
                      <Button
                        variant={tier.isPopular ? 'primary' : 'outline'}
                        fullWidth
                        rightIcon={<FaArrowRight />}
                        className={tier.isPopular ? 'bg-sky-500 hover:bg-sky-600 text-white border-none shadow-md' : 'border-gray-250 text-gray-750 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-500'}
                      >
                        Elegir Plan
                      </Button>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination Container */}
          <div className="swiper-pagination-pricing flex justify-center items-center gap-1 mt-4 mb-8" />

          {/* Navigation Arrows */}
          <button className="swiper-button-prev-pricing absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-150 bg-white flex items-center justify-center text-gray-600 hover:text-sky-500 hover:border-sky-500 hover:shadow-md transition-all z-10 hidden sm:flex">
            <FaChevronLeft className="text-sm" />
          </button>
          <button className="swiper-button-next-pricing absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-150 bg-white flex items-center justify-center text-gray-600 hover:text-sky-500 hover:border-sky-500 hover:shadow-md transition-all z-10 hidden sm:flex">
            <FaChevronRight className="text-sm" />
          </button>
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Todos los precios en USD. Pagos en Bolívares al tipo de cambio del día.{' '}
            <Link href="/contact" className="text-sky-600 font-semibold hover:underline">
              Contáctanos para planes personalizados
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

