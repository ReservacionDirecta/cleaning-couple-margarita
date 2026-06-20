import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Cancelación | The Cleaning Couple Isla de Margarita',
  description: 'Conoce nuestras políticas de cancelación y reprogramación de servicios de limpieza.',
};

export default function CancellationPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-16">
      <div className="container-custom max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-6">
          Política de Cancelación y Reprogramación
        </h1>
        <div className="prose prose-sky text-gray-700 space-y-6">
          <p className="text-sm text-gray-500">Última actualización: 2026-06-20</p>
          
          <p>
            Entendemos que los calendarios de los alquileres vacacionales y de Airbnb pueden cambiar rápidamente debido a reservas imprevistas, cancelaciones de vuelos o contingencias de servicios en la isla. Nuestra política busca ser justa tanto para los anfitriones como para nuestro equipo de limpieza.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">1. Plazos de Cancelación sin Cargo</h2>
          <p>
            Puedes cancelar o reprogramar tu servicio de limpieza de forma totalmente gratuita hasta **24 horas antes** del horario de inicio agendado.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">2. Cancelaciones de Último Minuto</h2>
          <p>
            Las cancelaciones o reprogramaciones solicitadas con menos de 24 horas de anticipación estarán sujetas a un cargo del **30% de la tarifa estimada del servicio** para cubrir la logística del personal asignado.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">3. Cancelación por Falta de Acceso o Servicios Críticos</h2>
          <p>
            Si nuestro equipo acude a la propiedad y no se le concede acceso o se detecta que la propiedad no cumple con las condiciones mínimas para realizar el trabajo (por ejemplo, corte absoluto de luz o tanque de agua vacío sin previo aviso), se cobrará el cargo mínimo de movilización equivalente al 30% de la tarifa del servicio reservado.
          </p>
        </div>
      </div>
    </div>
  );
}
