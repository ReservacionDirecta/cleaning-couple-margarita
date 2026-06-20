'use client';

import React, { useState } from 'react';
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqItems: FAQItem[] = [
  // Booking & Process
  {
    category: 'Reservas y Proceso',
    question: '¿Cómo hago una reserva?',
    answer: 'Puedes reservar directamente a través de nuestro formulario en línea en la página de Reservas. Simplemente selecciona el tipo de servicio, fecha, horario y completa tus datos de contacto. También puedes reservar vía WhatsApp al +58 412-1234567.',
  },
  {
    category: 'Reservas y Proceso',
    question: '¿Con cuánta anticipación debo reservar?',
    answer: 'Recomendamos reservar con al menos 24-48 horas de anticipación para garantizar disponibilidad. Sin embargo, aceptamos reservas de último momento según disponibilidad. Para propiedades Airbnb, coordinamos con tus check-ins y check-outs.',
  },
  {
    category: 'Reservas y Proceso',
    question: '¿Puedo cancelar o modificar mi reserva?',
    answer: 'Sí, puedes cancelar sin costo hasta 24 horas antes del servicio. Modificaciones están sujetas a disponibilidad. Cancelaciones con menos de 24 horas de aviso pueden tener un cargo del 50%.',
  },
  {
    category: 'Reservas y Proceso',
    question: '¿Cómo funcionan los pagos?',
    answer: 'Aceptamos pagos en efectivo (Bolívares o USD), transferencias bancarias y pagos móviles. Para planes semanales ofrecemos descuentos por pago adelantado. Todos los precios están en USD, pero aceptamos pago en Bolívares al tipo de cambio del día.',
  },

  // Services
  {
    category: 'Servicios',
    question: '¿Qué incluye una limpieza básica?',
    answer: 'Nuestra limpieza básica incluye: aspirar y trapear pisos, limpieza completa de baños, limpieza de cocina, cambio de ropa de cama, sacudir muebles, limpieza de espejos y superficies, y eliminación de polvo. Es perfecta para el mantenimiento regular entre huéspedes.',
  },
  {
    category: 'Servicios',
    question: '¿Qué diferencia hay entre limpieza básica y profunda?',
    answer: 'La limpieza profunda incluye todo lo de la básica más: limpieza interior de electrodomésticos, lavado de paredes y zócalos, limpieza de ventanas interiores, desinfección profunda, limpieza de gabinetes y closets, y tratamiento de manchas difíciles. Recomendada después de temporada alta o para propiedades nuevas.',
  },
  {
    category: 'Servicios',
    question: '¿Ofrecen servicios de lavandería?',
    answer: 'Sí, ofrecemos lavado y planchado de ropa de cama como servicio adicional (add-on). También podemos coordinar el lavado de toallas y sábanas para tus huéspedes.',
  },
  {
    category: 'Servicios',
    question: '¿Usan sus propios productos de limpieza?',
    answer: 'Sí, nuestro equipo lleva todos los productos de limpieza y equipos necesarios. Usamos productos profesionales e hipoalergénicos. Si prefieres productos específicos para tu propiedad, estamos happy de usarlos.',
  },

  // Coverage Area
  {
    category: 'Cobertura',
    question: '¿En qué zonas de Isla de Margarita prestan servicio?',
    answer: 'Cubrimos toda la Isla de Margarita: Porlamar, Pampatar, La Asunción, El Valle del Espíritu Santo, Playa El Agua, Playa Caribe, Punta de Piedras, Los Robles, Bella Vista, Costa Azul, Urbanización San José, y sectores aledaños. Si tienes una ubicación específica, consúltanos.',
  },
  {
    category: 'Cobertura',
    question: '¿Cobran extra por zonas lejanas?',
    answer: 'Para la mayoría de las zonas urbanas no hay cargo adicional. Para propiedades en zonas más alejadas como Juan Griego o Punta de Piedras, puede aplicar un pequeño recargo por transporte. Contáctanos para cotizar tu ubicación específica.',
  },

  // Safety & Trust
  {
    category: 'Confianza y Seguridad',
    question: '¿Su personal está asegurado?',
    answer: 'Sí, todo nuestro personal está debidamente asegurado y capacitado. Realizamos verificaciones de antecedentes y todas nuestras cleaner passan por un proceso de entrenamiento riguroso antes de comenzar.',
  },
  {
    category: 'Confianza y Seguridad',
    question: '¿Qué pasa si algo se daña durante la limpieza?',
    answer: 'Contamos con un seguro de responsabilidad civil que cubre cualquier daño accidental. Sin embargo, tomamos todas las precauciones necesarias y usamos técnicas profesionales para evitar cualquier incidente.',
  },
  {
    category: 'Confianza y Seguridad',
    question: '¿Puedo estar presente durante la limpieza?',
    answer: 'Por supuesto, eres bienvenido a estar presente. Muchos de nuestros clientes nos dan acceso remoto a sus propiedades mediante códigos de entrada o llaves digitales, lo que facilita la coordinación con los horarios de check-in/check-out.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('Todas');

  const categories = ['Todas', ...Array.from(new Set(faqItems.map((item) => item.category)))];

  const filtered =
    activeCategory === 'Todas'
      ? faqItems
      : faqItems.filter((item) => item.category === activeCategory);

  return (
    <section className="section-padding bg-gray-50" id="faq">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-sm font-semibold text-emerald-600 bg-emerald-100 px-4 py-1.5 rounded-full mb-4">
            FAQ
          </span>
          <h2 className="section-title">
            Preguntas{' '}
            <span className="gradient-text">frecuentes</span>
          </h2>
          <p className="section-subtitle">
            Todo lo que necesitas saber sobre nuestros servicios de limpieza 
            profesional en Isla de Margarita.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(null);
              }}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                activeCategory === cat
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          {filtered.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
                aria-expanded={openIndex === index}
              >
                <div className="flex items-start gap-3 pr-4">
                  <FaQuestionCircle
                    className={`mt-0.5 shrink-0 ${
                      openIndex === index
                        ? 'text-emerald-500'
                        : 'text-gray-300'
                    }`}
                  />
                  <span className="font-medium text-gray-900">
                    {item.question}
                  </span>
                </div>
                <FaChevronDown
                  className={cn(
                    'shrink-0 text-gray-400 transition-transform duration-200',
                    openIndex === index && 'rotate-180'
                  )}
                />
              </button>

              <div
                className={cn(
                  'grid transition-all duration-200',
                  openIndex === index
                    ? 'grid-rows-[1fr] opacity-100'
                    : 'grid-rows-[0fr] opacity-0'
                )}
              >
                <div className="overflow-hidden">
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-50">
                    <p className="pt-4">{item.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="text-center mt-12 p-8 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
          <h3 className="text-2xl font-bold mb-2">¿Aún tienes preguntas?</h3>
          <p className="text-emerald-100 mb-6">
            Estamos aquí para ayudarte. Contáctanos directamente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/+584121234567"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-base px-6 py-3 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-emerald-50 shadow-lg"
            >
              WhatsApp
            </a>
            <a
              href="/contact"
              className="btn-base px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 border border-white/30"
            >
              Formulario de Contacto
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
