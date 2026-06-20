'use client';

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WHATSAPP_NUMBER = '+584121234567';
const WHATSAPP_MESSAGE = '¡Hola! Quiero agendar un servicio de limpieza para mi propiedad Airbnb';

export default function WhatsAppWidget() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float animate-float gap-2"
      aria-label="Contactar por WhatsApp"
      title="Contáctanos por WhatsApp"
    >
      <FaWhatsapp className="h-6 w-6 shrink-0" />
      <span className="text-sm font-bold tracking-wide whitespace-nowrap hidden sm:inline">
        ¿Necesitas ayuda? Escríbenos
      </span>
      <span className="text-sm font-bold tracking-wide whitespace-nowrap sm:hidden">
        ¿Ayuda? Chat
      </span>
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25 -z-10" />
    </a>
  );
}
