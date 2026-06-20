import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad | The Cleaning Couple Isla de Margarita',
  description: 'Conoce cómo manejamos y protegemos tus datos personales y de tu propiedad en The Cleaning Couple.',
};

export default function PrivacyPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-16">
      <div className="container-custom max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-6">
          Política de Privacidad
        </h1>
        <div className="prose prose-sky text-gray-700 space-y-6">
          <p className="text-sm text-gray-500">Última actualización: 2026-06-20</p>
          
          <p>
            En <strong>The Cleaning Couple</strong>, valoramos tu privacidad y la seguridad de los datos de tu propiedad y de contacto. Esta política describe cómo recopilamos, utilizamos y protegemos tu información personal.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">1. Información que Recopilamos</h2>
          <p>
            Recopilamos información básica necesaria para procesar tus reservas y prestar el servicio de manera eficiente: nombre completo, número de teléfono (WhatsApp), dirección de la propiedad, dirección de correo electrónico e instrucciones específicas de acceso.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">2. Uso de la Información</h2>
          <p>
            Utilizamos tu información únicamente para:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Coordinar y confirmar las visitas de limpieza.</li>
            <li>Gestionar los accesos de seguridad a los condominios y conjuntos residenciales de la isla.</li>
            <li>Enviar notificaciones y facturación sobre el servicio contratado.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">3. Protección y Confidencialidad</h2>
          <p>
            Nos comprometemos a no vender, intercambiar ni ceder tus datos a terceros bajo ninguna circunstancia. Toda la información de acceso a la propiedad (claves de cajas de seguridad, contactos de vigilantes) se maneja de forma encriptada y restringida al equipo asignado a tu limpieza.
          </p>
        </div>
      </div>
    </div>
  );
}
