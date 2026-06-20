'use client';

import React from 'react';
import Image from 'next/image';
import { FaMapMarkerAlt, FaStar, FaUsers, FaShieldAlt, FaHandshake, FaTree } from 'react-icons/fa';
import Card from '@/components/ui/Card';

const coverageAreas = [
  { name: 'Porlamar', description: 'Centro urbano y zonas residenciales', icon: '🏙️' },
  { name: 'Pampatar', description: 'Zona comercial y residencial', icon: '🛍️' },
  { name: 'La Asunción', description: 'Centro cívico y áreas residenciales', icon: '🏛️' },
  { name: 'El Valle del Espíritu Santo', description: 'Zona tradicional y residencial', icon: '⛰️' },
  { name: 'Playa El Agua', description: 'Zona turística y hotelera', icon: '🏖️' },
  { name: 'Playa Caribe', description: 'Desarrollo turístico', icon: '🌊' },
  { name: 'Punta de Piedras', description: 'Puerto y zona comercial', icon: '⚓' },
  { name: 'Los Robles', description: 'Zona residencial en crecimiento', icon: '🌳' },
  { name: 'Bella Vista', description: 'Zona residencial exclusiva', icon: '🏡' },
  { name: 'Costa Azul', description: 'Zona turística y hotelera', icon: '🌴' },
];

const values = [
  {
    icon: FaShieldAlt,
    title: 'Confianza',
    description: 'Todo nuestro personal es verificado, capacitado y asegurado. Trabajamos con códigos de acceso y llaves digitales para máxima seguridad.',
  },
  {
    icon: FaHandshake,
    title: 'Compromiso',
    description: 'Nos comprometemos a dejar tu propiedad impecable. Si no estás satisfecho, volvemos sin costo adicional.',
  },
  {
    icon: FaStar,
    title: 'Calidad',
    description: 'Usamos productos profesionales y técnicas de limpieza avanzadas para garantizar resultados de 5 estrellas.',
  },
  {
    icon: FaTree,
    title: 'Sostenibilidad',
    description: 'Utilizamos productos de limpieza ecológicos e hipoalergénicos siempre que es posible.',
  },
];

export default function AboutPage() {
  return (
    <div className="pt-24 sm:pt-28">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white py-16 sm:py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-4">
            Nosotros
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
            Conoce la historia de The Cleaning Couple y nuestra misión en Isla de Margarita
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block text-sm font-semibold text-emerald-600 bg-emerald-100 px-4 py-1.5 rounded-full mb-4">
                  Nuestra Historia
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-6">
                  Una pareja apasionada por{' '}
                  <span className="gradient-text">la limpieza</span>
                </h2>

                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    The Cleaning Couple nació en 2018 de la necesidad de ofrecer 
                    un servicio de limpieza profesional y confiable para propiedades 
                    Airbnb en Isla de Margarita. Como anfitriones nosotros mismos, 
                    entendíamos los desafíos de mantener una propiedad impecable 
                    entre reservas.
                  </p>
                  <p>
                    Lo que comenzó como un servicio para nuestras propias propiedades, 
                    rápidamente se expandió a medida que otros anfitriones notaban la 
                    calidad y consistencia de nuestro trabajo. Hoy, atendemos a más 
                    de 50 propiedades en toda la isla.
                  </p>
                  <p>
                    Nuestra misión es simple: garantizar que cada huésped que llegue 
                    a una propiedad bajo nuestro cuidado encuentre un espacio 
                    impecable, fresco y acogedor. Porque sabemos que una experiencia 
                    de limpieza excepcional se traduce en reseñas de 5 estrellas.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border-4 border-emerald-200 shadow-lg">
                  <Image
                    src="/images/quita_la_persona_del_medio_202606201422.jpeg"
                    alt="The Cleaning Couple - Propietarios"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 288px, 320px"
                  />
                </div>
                <div className="text-center max-w-xs">
                  <p className="text-emerald-800 font-display text-2xl font-bold">The Cleaning</p>
                  <p className="text-emerald-600 font-display text-xl font-bold">Couple</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-gray-700 font-semibold text-sm">Fundadores &amp; Propietarios</p>
                    <p className="text-emerald-500 text-sm font-medium">Desde 2018</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-sm font-semibold text-emerald-600 bg-emerald-100 px-4 py-1.5 rounded-full mb-4">
              Nuestros Valores
            </span>
            <h2 className="section-title">
              Lo que nos{' '}
              <span className="gradient-text">distingue</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="text-center p-8">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="text-emerald-500 text-2xl" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Area */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-sm font-semibold text-emerald-600 bg-emerald-100 px-4 py-1.5 rounded-full mb-4">
              Cobertura
            </span>
            <h2 className="section-title">
              Área de{' '}
              <span className="gradient-text">cobertura</span>
            </h2>
            <p className="section-subtitle">
              Servicio profesional de limpieza en toda la Isla de Margarita, 
              Nueva Esparta, Venezuela.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {coverageAreas.map((area) => (
              <div
                key={area.name}
                className="flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-100 hover:shadow-md transition-shadow"
              >
                <span className="text-2xl">{area.icon}</span>
                <div>
                  <p className="font-semibold text-gray-900">{area.name}</p>
                  <p className="text-xs text-gray-500">{area.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500">
              ¿No encuentras tu zona?{' '}
              <a href="/contact" className="text-emerald-600 font-semibold hover:underline">
                Contáctanos
              </a>{' '}
              y te confirmaremos si tenemos cobertura.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl sm:text-5xl font-bold mb-2">50+</p>
              <p className="text-emerald-200">Propiedades atendidas</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-bold mb-2">4.9</p>
              <p className="text-emerald-200">Calificación promedio</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-bold mb-2">8+</p>
              <p className="text-emerald-200">Años de experiencia</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-bold mb-2">100%</p>
              <p className="text-emerald-200">Satisfacción garantizada</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
