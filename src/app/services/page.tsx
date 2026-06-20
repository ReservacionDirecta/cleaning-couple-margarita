'use client';

import React from 'react';
import Link from 'next/link';
import { FaCheck, FaClock, FaDollarSign, FaArrowRight, FaStar, FaHome, FaUsers } from 'react-icons/fa';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const services = [
  {
    id: 'basica',
    icon: '🧹',
    name: 'Limpieza Básica',
    description: 'Mantenimiento regular ideal para el cambio de huéspedes en tu Airbnb. Deja tu propiedad fresca y lista para recibir.',
    longDescription: 'Nuestro servicio de limpieza básica está diseñado para el mantenimiento regular entre huéspedes. Incluye limpieza completa de todas las áreas, cambio de ropa de cama, reposición de amenities básicos y una inspección general de la propiedad para asegurar que todo esté en orden.',
    price: 35,
    duration: '2 horas',
    isPopular: true,
    features: [
      'Aspirado y trapeado de pisos',
      'Limpieza completa de baños',
      'Limpieza de cocina y superficies',
      'Cambio de ropa de cama y toallas',
      'Sacudir y organizar muebles',
      'Limpieza de espejos y cristales',
      'Eliminación de polvo general',
      'Reposición de amenities',
    ],
  },
  {
    id: 'profunda',
    icon: '✨',
    name: 'Limpieza Profunda',
    description: 'Limpieza exhaustiva para propiedades que necesitan atención extra. Ideal después de temporada alta.',
    longDescription: 'Nuestra limpieza profunda es un servicio completo y detallado que va más allá de la limpieza regular. Incluye limpieza interior de electrodomésticos, lavado de paredes, desinfección profunda y tratamiento de áreas que normalmente no se cubren en una limpieza regular.',
    price: 75,
    duration: '4 horas',
    isPopular: false,
    features: [
      'Todo lo de limpieza básica',
      'Limpieza interior de electrodomésticos',
      'Lavado de paredes, puertas y zócalos',
      'Limpieza de ventanas interiores',
      'Desinfección profunda de superficies',
      'Limpieza de gabinetes y closets',
      'Tratamiento de manchas difíciles',
      'Limpieza de lámparas y ventiladores',
    ],
  },
  {
    id: 'especializada',
    icon: '🔧',
    name: 'Limpieza Especializada',
    description: 'Servicios específicos para necesidades particulares de tu propiedad.',
    longDescription: 'Servicios especializados para situaciones específicas como limpieza post-construcción, limpieza de mudanza, lavado de alfombras y tapicería, o desinfección profunda antes del check-in de huéspedes.',
    price: 55,
    duration: '3 horas',
    isPopular: false,
    features: [
      'Limpieza post-construcción o remodelación',
      'Limpieza de mudanza (entrada/salida)',
      'Lavado de alfombras y tapicería',
      'Limpieza de terrazas y balcones',
      'Desinfección completa pre-check-in',
      'Limpieza de áreas exteriores',
    ],
  },
  {
    id: 'comercial',
    icon: '🏢',
    name: 'Limpieza Comercial',
    description: 'Para oficinas, locales comerciales y espacios de trabajo en Isla de Margarita.',
    longDescription: 'Mantenemos tu espacio comercial impecable y profesional. Ideal para oficinas, clínicas, restaurantes y cualquier negocio que requiera altos estándares de limpieza.',
    price: 45,
    duration: '2-4 horas',
    isPopular: false,
    features: [
      'Limpieza de áreas comunes y oficinas',
      'Limpieza de baños comerciales',
      'Limpieza de pisos y superficies',
      'Desinfección de áreas de alto contacto',
      'Limpieza de vidrios y ventanas',
      'Servicio diario, semanal o mensual',
    ],
  },
  {
    id: 'addons',
    icon: '➕',
    name: 'Add-ons',
    description: 'Servicios adicionales que puedes agregar a cualquier plan de limpieza.',
    longDescription: 'Complementa tu servicio de limpieza con estos servicios adicionales diseñados para cubrir necesidades específicas de tu propiedad.',
    price: 15,
    duration: '30 min c/u',
    isPopular: false,
    features: [
      'Lavado y planchado de ropa de cama',
      'Limpieza de ventanas exteriores',
      'Limpieza de refrigerador',
      'Organización de closets',
      'Lavado de alfombras (por pieza)',
      'Desinfección adicional COVID',
      'Limpieza de horno y cocina',
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-24 sm:pt-28">
      {/* Hero */}
      <section className="bg-gradient-to-br from-sky-900 via-slate-900 to-slate-950 text-white py-16 sm:py-20 relative overflow-hidden">
        {/* Background Image Pattern Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay"
          style={{ backgroundImage: "url('/images/usa_esta_imagen_para_crear_202606201341.jpeg')" }}
          aria-hidden="true"
        />
        <div className="container-custom text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-4">
            Nuestros Servicios
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
            Ofrecemos una gama completa de servicios de limpieza profesional 
            diseñados para mantener tu propiedad Airbnb impecable.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding">
        <div className="container-custom space-y-12">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{service.icon}</span>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {service.name}
                    </h2>
                    {service.isPopular && (
                      <span className="inline-block mt-1 text-xs font-semibold text-sky-600 bg-sky-100 px-3 py-1 rounded-full">
                        Más Popular
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.longDescription}
                </p>

                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <FaDollarSign className="text-sky-500" />
                    <span className="text-2xl font-bold text-gray-900">
                      ${service.price}
                    </span>
                    <span className="text-gray-500 text-sm">USD</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock className="text-sky-500" />
                    <span className="text-gray-600">{service.duration}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="grid sm:grid-cols-2 gap-2 mb-6">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <FaCheck className="text-sky-500 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href={`/book?service=${service.id}`}>
                  <Button rightIcon={<FaArrowRight />} className="bg-sky-500 hover:bg-sky-600 text-white border-none shadow-md">
                    Reservar {service.name}
                  </Button>
                </Link>
              </div>

              {/* Visual */}
              <div
                className={`hidden lg:flex items-center justify-center ${
                  index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''
                }`}
              >
                <div className="relative w-80 h-80 rounded-3xl overflow-hidden shadow-lg border border-gray-100">
                  <img
                    src={
                      service.id === 'basica'
                        ? '/images/margarita_condo_clean.jpg'
                        : service.id === 'profunda'
                        ? '/images/margarita_kitchen_clean.jpg'
                        : service.id === 'especializada'
                        ? '/images/margarita_construction_clean.jpg'
                        : service.id === 'comercial'
                        ? '/images/margarita_office_clean.jpg'
                        : '/images/margarita_closet_clean.jpg'
                    }
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <div>
                      <span className="text-2xl mb-1 block">{service.icon}</span>
                      <p className="text-white font-bold">{service.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-title">
                ¿Por qué elegir{' '}
                <span className="gradient-text">The Cleaning Couple</span>?
              </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <Card className="text-center p-8">
                <div className="w-16 h-16 rounded-2xl bg-sky-100 flex items-center justify-center mx-auto mb-4">
                  <FaStar className="text-sky-500 text-2xl" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Calidad Garantizada</h3>
                <p className="text-sm text-gray-600">
                  Reseñas de 5 estrellas en todas las propiedades que servimos.
                </p>
              </Card>
              <Card className="text-center p-8">
                <div className="w-16 h-16 rounded-2xl bg-sky-100 flex items-center justify-center mx-auto mb-4">
                  <FaHome className="text-sky-500 text-2xl" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Cobertura Total</h3>
                <p className="text-sm text-gray-600">
                  Servicio en toda Isla de Margarita y zonas aledañas.
                </p>
              </Card>
              <Card className="text-center p-8">
                <div className="w-16 h-16 rounded-2xl bg-sky-155 bg-sky-100 flex items-center justify-center mx-auto mb-4">
                  <FaUsers className="text-sky-500 text-2xl" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Personal Confiable</h3>
                <p className="text-sm text-gray-600">
                  Equipo capacitado, verificado y comprometido con la excelencia.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding bg-white border-t border-gray-100">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-sm font-semibold text-sky-600 bg-sky-100 px-4 py-1.5 rounded-full mb-4">
              Galería de Resultados
            </span>
            <h2 className="section-title">
              Espacios reales, <span className="gradient-text">resultados impecables</span>
            </h2>
            <p className="section-subtitle">
              Inspecciona los detalles de nuestro trabajo profesional en condominios, casas y villas de la isla.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: '/images/margarita_bedroom_clean.jpg', label: 'Dormitorio Principal' },
              { src: '/images/margarita_bathroom_clean.jpg', label: 'Baño Principal' },
              { src: '/images/margarita_terrace_clean.jpg', label: 'Terraza y Balcón' },
              { src: '/images/margarita_window_clean.jpg', label: 'Ventanas y Vidrios' },
              { src: '/images/margarita_fridge_clean.jpg', label: 'Detalle de Nevera' },
              { src: '/images/margarita_dining_clean.jpg', label: 'Comedor y Estancia' },
              { src: '/images/margarita_pool_clean.jpg', label: 'Deck de Piscina' },
              { src: '/images/margarita_condo_clean.jpg', label: 'Sala de Estar' }
            ].map((item, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow aspect-[4/3] bg-gray-100">
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-white text-xs font-semibold tracking-wide uppercase">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
