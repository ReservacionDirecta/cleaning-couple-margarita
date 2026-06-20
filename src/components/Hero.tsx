'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { FaArrowRight, FaShieldAlt, FaStar, FaUsers } from 'react-icons/fa';

export default function Hero() {
  const words = ['Airbnb', 'casa', 'apartamento', 'local', 'negocio', 'oficina', 'almacen'];
  const [wordIndex, setWordIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-900 via-slate-900 to-slate-950" />

      {/* Background Image Pattern Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-overlay"
        style={{ backgroundImage: "url('/images/usa_esta_imagen_para_crear_202606201341.jpeg')" }}
        aria-hidden="true"
      />

      {/* Decorative Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-400/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative container-custom pt-20 pb-10 sm:pt-32 sm:pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-6 backdrop-blur-sm">
              <FaShieldAlt className="text-sky-300" />
              Profesionales de confianza en Isla de Margarita
            </div>

            {/* Headline */}
            <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white leading-[1.15] tracking-tight">
              Limpieza Profesional
              <br />
              <span className="whitespace-nowrap">
                para tu{' '}
                <span key={wordIndex} className="text-sky-300 inline-block animate-fade-in">
                  {words[wordIndex]}
                </span>
              </span>
              <br />
              en Isla de Margarita
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Garantiza reseñas de 5 estrellas con nuestro servicio de limpieza 
              especializado para alojamientos turísticos. Deja tu propiedad 
              impecable para cada huésped.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/book">
                <Button size="lg" rightIcon={<FaArrowRight />} className="bg-sky-500 hover:bg-sky-600 text-white border-none shadow-md">
                  Reservar Ahora
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Ver Servicios
                </Button>
              </Link>
            </div>

            {/* Trust Stats */}
            <div className="mt-12 flex flex-wrap items-center gap-8 justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-300 to-cyan-300 border-2 border-sky-700 flex items-center justify-center text-xs font-bold text-sky-900"
                    >
                      {['M', 'C', 'L', 'A'][i - 1]}
                    </div>
                  ))}
                </div>
                <span className="text-white/70 text-sm">+150 clientes</span>
              </div>
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <FaStar className="text-yellow-400" />
                <span className="font-semibold text-white">4.9</span>
                <span>calificación promedio</span>
              </div>
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <FaUsers className="text-sky-300" />
                <span className="font-semibold text-white">8</span>
                <span>años de experiencia</span>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative">
              {/* Main Circle */}
              <div className="w-96 h-96 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl relative">
                <img
                  src="/images/margarita_condo_clean.jpg"
                  alt="Propiedad limpia en Isla de Margarita"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-8">
                  <div className="text-center">
                    <p className="text-white font-display text-2xl font-bold">The Cleaning</p>
                    <p className="text-sky-300 font-display text-2xl font-bold">Couple</p>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-400" />
                  <span className="text-white text-sm font-semibold">4.9 ★</span>
                </div>
                <p className="text-white/70 text-xs mt-1">Reseñas verificadas</p>
              </div>

              <div className="absolute -bottom-2 -left-6 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                <p className="text-white text-sm font-semibold">✨ Sin esperas</p>
                <p className="text-white/70 text-xs mt-1">Reserva en línea</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
