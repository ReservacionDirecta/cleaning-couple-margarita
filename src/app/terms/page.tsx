import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos y Condiciones | The Cleaning Couple Isla de Margarita',
  description: 'Conoce los términos y condiciones de uso del servicio de limpieza profesional de The Cleaning Couple.',
};

export default function TermsPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-16">
      <div className="container-custom max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-6">
          Términos y Condiciones de Servicio
        </h1>
        <div className="prose prose-sky text-gray-700 space-y-6">
          <p className="text-sm text-gray-500">Última actualización: 2026-06-20</p>
          
          <p>
            Bienvenido a <strong>The Cleaning Couple</strong>. Al reservar nuestros servicios de limpieza en Isla de Margarita, aceptas cumplir con los siguientes términos y condiciones de servicio.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">1. Reservas y Confirmación</h2>
          <p>
            Todas las reservas realizadas a través de nuestro sitio web están sujetas a confirmación de disponibilidad y precio final. Nos pondremos en contacto contigo en un plazo máximo de 12 horas para coordinar los detalles.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">2. Suministro de Agua y Electricidad</h2>
          <p>
            Dada la situación de servicios públicos en la Isla de Margarita, el cliente se compromete a garantizar el acceso a electricidad y reservas de agua en tanque dentro de la propiedad. En caso de ausencia total de agua corriente, se aplicará nuestro protocolo de limpieza ecológica de contingencia o se reprogramará el servicio según mutuo acuerdo.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">3. Responsabilidad</h2>
          <p>
            Nuestro personal está plenamente capacitado y verificado. Sin embargo, en el caso improbable de daños accidentales a la propiedad o a objetos de valor, el cliente debe notificar a The Cleaning Couple dentro de las 24 horas posteriores a la finalización del servicio para iniciar el proceso de revisión y compensación correspondiente.
          </p>
        </div>
      </div>
    </div>
  );
}
