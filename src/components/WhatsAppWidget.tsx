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
      className="whatsapp-float animate-float"
      aria-label="Contactar por WhatsApp"
      title="Contáctanos por WhatsApp"
    >
      <FaWhatsapp className="h-7 w-7" />
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
    </a>
  );
}
