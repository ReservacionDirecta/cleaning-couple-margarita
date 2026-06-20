'use client';

import React, { Suspense } from 'react';
import BookingForm from '@/components/BookingForm';

function BookPageContent() {
  return (
    <div className="pt-24 sm:pt-28">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white py-16 sm:py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-4">
            Reserva tu Servicio
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
            Completa el formulario y en breve nos pondremos en contacto para 
            confirmar los detalles de tu servicio de limpieza.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="section-padding">
        <div className="container-custom">
          <BookingForm />
        </div>
      </section>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="pt-24 text-center p-8">Cargando...</div>}>
      <BookPageContent />
    </Suspense>
  );
}
