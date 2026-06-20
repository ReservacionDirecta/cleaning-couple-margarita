'use client';

import React from 'react';
import { FaCalendarCheck, FaHome, FaStar } from 'react-icons/fa';

const steps = [
  {
    icon: FaHome,
    title: 'Elige tu plan de limpieza',
    description:
      'Selecciona el tipo de limpieza que necesita tu propiedad: básica, profunda, especializada o add-ons adicionales. Cada plan está diseñado para diferentes necesidades.',
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-100',
  },
  {
    icon: FaCalendarCheck,
    title: 'Agenda tu visita',
    description:
      'Elige la fecha y horario que mejor se adapte a tu disponibilidad. Ofrecemos bloques de mañana, medio día, tarde y noche, todos los días de la semana.',
    color: 'from-accent-400 to-accent-500',
    bgColor: 'bg-accent-100',
  },
  {
    icon: FaStar,
    title: 'Disfruta de un espacio impecable',
    description:
      'Nuestro equipo profesional dejará tu propiedad impecable y lista para recibir a tus huéspedes. Reseñas de 5 estrellas garantizadas.',
    color: 'from-ocean-400 to-ocean-500',
    bgColor: 'bg-ocean-100',
  },
];

export default function HowItWorks() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-emerald-600 bg-emerald-100 px-4 py-1.5 rounded-full mb-4">
            Cómo Funciona
          </span>
          <h2 className="section-title">
            Tres pasos para un espacio{' '}
            <span className="gradient-text">impecable</span>
          </h2>
          <p className="section-subtitle">
            Proceso simple y rápido para que puedas dedicarte a lo que importa: 
            ofrecer una experiencia excepcional a tus huéspedes.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-gray-200 to-gray-200">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-emerald-400" />
                </div>
              )}

              {/* Step Card */}
              <div className="relative text-center p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Step Number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white text-sm font-bold flex items-center justify-center shadow-md">
                  {index + 1}
                </div>

                {/* Icon */}
                <div
                  className={`mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <step.icon className="text-white text-3xl" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-500">
            ¿Listo para comenzar?{' '}
            <a
              href="/book"
              className="text-emerald-600 font-semibold hover:text-emerald-700 underline underline-offset-2"
            >
              Reserva tu servicio ahora
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
