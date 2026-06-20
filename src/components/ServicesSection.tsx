'use client';

import React from 'react';
import Link from 'next/link';
import { FaCheck, FaTimes, FaClock, FaDollarSign, FaArrowRight } from 'react-icons/fa';
import Button from '@/components/ui/Button';

interface ServiceCardProps {
  name: string;
  description: string;
  price: number;
  duration: number;
  includes: string[];
  notIncludes: string[];
  isPopular: boolean;
  icon: string;
  slug: string;
}

const serviceData: ServiceCardProps[] = [
  {
    name: 'Limpieza Básica',
    description: 'Perfecta para el mantenimiento regular de tu propiedad Airbnb entre huéspedes.',
    price: 35,
    duration: 120,
    includes: [
      'Aspirado y trapeado de pisos',
      'Limpieza de baños completos',
      'Limpieza de cocina',
      'Cambio de ropa de cama',
      'Sacudir muebles',
      'Limpieza de espejos y superficies',
      'Eliminación de polvo',
    ],
    notIncludes: [
      'Limpieza profunda de electrodomésticos',
      'Lavado de ventanas exteriores',
      'Limpieza de alfombras a vapor',
    ],
    isPopular: true,
    icon: '🧹',
    slug: 'basica',
  },
  {
    name: 'Limpieza Profunda',
    description: 'Limpieza exhaustiva ideal para propiedades que necesitan atención extra o después de temporada alta.',
    price: 75,
    duration: 240,
    includes: [
      'Todo lo de limpieza básica',
      'Limpieza interior de electrodomésticos',
      'Lavado de paredes y zócalos',
      'Limpieza de ventanas interiores',
      'Desinfección profunda',
      'Limpieza de gabinetes y closets',
      'Tratamiento de manchas difíciles',
    ],
    notIncludes: [
      'Lavado de alfombras a vapor',
      'Limpieza exterior de ventanas',
    ],
    isPopular: false,
    icon: '✨',
    slug: 'profunda',
  },
  {
    name: 'Limpieza Especializada',
    description: 'Servicios específicos para necesidades particulares de tu propiedad.',
    price: 55,
    duration: 180,
    includes: [
      'Limpieza post-construcción',
      'Limpieza de mudanza',
      'Lavado de alfombras y tapicería',
      'Limpieza de terrazas y balcones',
      'Limpieza de piscinas (área)',
      'Desinfección por check-in',
    ],
    notIncludes: [
      'Limpieza regular de habitaciones',
      'Limpieza de exteriores',
    ],
    isPopular: false,
    icon: '🔧',
    slug: 'especializada',
  },
  {
    name: 'Add-ons',
    description: 'Servicios adicionales que puedes agregar a cualquier plan de limpieza.',
    price: 15,
    duration: 30,
    includes: [
      'Lavado y planchado de ropa de cama',
      'Limpieza de ventanas exteriores',
      'Limpieza de refrigerador',
      'Organización de closets',
      'Lavado de alfombras (por pieza)',
      'Desinfección adicional',
    ],
    notIncludes: [
      'Servicio completo de limpieza',
    ],
    isPopular: false,
    icon: '➕',
    slug: 'addons',
  },
];

function ServiceCard({ name, description, price, duration, includes, notIncludes, isPopular, icon, slug }: ServiceCardProps) {
  return (
    <div
      className={`relative rounded-2xl bg-white border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        isPopular
          ? 'border-sky-500 shadow-lg ring-2 ring-sky-500/20'
          : 'border-gray-100 shadow-sm'
      }`}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-sky-500 to-cyan-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md">
          Más Popular
        </div>
      )}

      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{icon}</span>
          <h3 className="text-xl font-bold text-gray-900">{name}</h3>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-6">{description}</p>

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-2">
          <FaDollarSign className="text-sky-500 text-lg" />
          <span className="text-4xl font-bold text-gray-900">{price}</span>
          <span className="text-gray-500 text-sm">USD</span>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <FaClock className="text-sky-500" />
          <span>{duration} minutos</span>
        </div>

        {/* Includes */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Incluye:</h4>
          <ul className="space-y-2">
            {includes.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <FaCheck className="text-sky-500 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Not Includes */}
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">No incluye:</h4>
          <ul className="space-y-2">
            {notIncludes.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
                <FaTimes className="text-red-400 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <Link href={`/book?service=${slug}`}>
          <Button
            variant={isPopular ? 'primary' : 'outline'}
            fullWidth
            rightIcon={<FaArrowRight />}
            className={isPopular ? 'bg-sky-500 hover:bg-sky-600 text-white border-none shadow-md' : 'border-gray-200 text-gray-700 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-500'}
          >
            Reservar
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section className="section-padding bg-white" id="services">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-sky-600 bg-sky-100 px-4 py-1.5 rounded-full mb-4">
            Nuestros Servicios
          </span>
          <h2 className="section-title">
            Servicios de limpieza{' '}
            <span className="gradient-text">profesional</span>
          </h2>
          <p className="section-subtitle">
            Ofrecemos una gama completa de servicios de limpieza diseñados 
            específicamente para propiedades Airbnb y alojamientos turísticos 
            en Isla de Margarita.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {serviceData.map((service) => (
            <ServiceCard key={service.slug} {...service} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link href="/services">
            <Button variant="ghost" size="lg" rightIcon={<FaArrowRight />}>
              Ver todos los servicios y detalles
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
