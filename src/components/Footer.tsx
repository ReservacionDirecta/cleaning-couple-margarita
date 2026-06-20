'use client';

import React from 'react';
import Link from 'next/link';
import { FaWhatsapp, FaInstagram, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const footerLinks = {
  servicios: [
    { href: '/services', label: 'Limpieza Básica' },
    { href: '/services', label: 'Limpieza Profunda' },
    { href: '/services', label: 'Especializada' },
    { href: '/services', label: 'Limpieza Comercial' },
  ],
  empresa: [
    { href: '/about', label: 'Nosotros' },
    { href: '/about', label: 'Cobertura' },
    { href: '/contact', label: 'Contácto' },
    { href: '/book', label: 'Reservar' },
  ],
  legal: [
    { href: '#', label: 'Términos y Condiciones' },
    { href: '#', label: 'Política de Privacidad' },
    { href: '#', label: 'Política de Cancelación' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold text-lg">
                TC
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">
                  The Cleaning <span className="text-emerald-400">Couple</span>
                </h3>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Profesionales en limpieza para propiedades y alojamientos Airbnb 
              en toda la Isla de Margarita, Venezuela.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/+584121234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-600/20 text-green-400 hover:bg-green-600 hover:text-white transition-all"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="text-lg" />
              </a>
              <a
                href="https://instagram.com/thecleaningcouple"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-pink-600/20 text-pink-400 hover:bg-pink-600 hover:text-white transition-all"
                aria-label="Instagram"
              >
                <FaInstagram className="text-lg" />
              </a>
              <a
                href="mailto:info@thecleaningcouple.com"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all"
                aria-label="Email"
              >
                <FaEnvelope className="text-lg" />
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Servicios</h4>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-white font-semibold mt-8 mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contácto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaWhatsapp className="text-green-400 mt-1 shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">WhatsApp</p>
                  <a
                    href="https://wa.me/+584121234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-emerald-400 transition-colors"
                  >
                    +58 412-1234567
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope className="text-emerald-400 mt-1 shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <a
                    href="mailto:info@thecleaningcouple.com"
                    className="text-white hover:text-emerald-400 transition-colors"
                  >
                    info@thecleaningcouple.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-ocean-400 mt-1 shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">Cobertura</p>
                  <p className="text-white">
                    Isla de Margarita,<br />Nueva Esparta, Venezuela
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaPhone className="text-accent-400 mt-1 shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">Teléfono</p>
                  <a href="tel:+584121234567" className="text-white hover:text-emerald-400">
                    +58 412-1234567
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 text-center sm:text-left">
              &copy; {new Date().getFullYear()} The Cleaning Couple. Todos los derechos reservados.
            </p>
            <p className="text-sm text-gray-500">
              Hecho con ❤️ en Isla de Margarita
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
