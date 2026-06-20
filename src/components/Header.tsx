'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/services', label: 'Servicios' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'Nosotros' },
  { href: '/contact', label: 'Contácto' },
  { href: '/book', label: 'Reservar' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'glass shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 text-white font-bold text-lg shadow-md group-hover:shadow-lg transition-shadow">
              TC
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-900 leading-tight">
                The Cleaning{' '}
                <span className="gradient-text">Couple</span>
              </h1>
              <p className="text-xs text-gray-500 -mt-0.5">
                Isla de Margarita
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  isScrolled
                    ? 'text-gray-700 hover:text-sky-600 hover:bg-sky-50'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://wa.me/+584121234567?text=¡Hola!%20Quiero%20agendar%20un%20servicio%20de%20limpieza"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'btn-base px-4 py-2 text-sm rounded-lg gap-2',
                isScrolled
                  ? 'text-sky-600 bg-sky-50 hover:bg-sky-100'
                  : 'text-white bg-white/10 hover:bg-white/20'
              )}
            >
              <FaWhatsapp className="text-lg" />
              <span className="hidden xl:inline">+58 412-1234567</span>
            </a>
            <Link
              href="/book"
              className={cn(
                'btn-base px-5 py-2.5 text-sm font-semibold rounded-xl',
                'bg-gradient-to-r from-sky-500 to-cyan-500 text-white hover:from-sky-600 hover:to-cyan-600 shadow-md hover:shadow-lg'
              )}
            >
              Reservar Ahora
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              'lg:hidden p-2 rounded-lg transition-colors',
              isScrolled
                ? 'text-gray-700 hover:bg-gray-100'
                : 'text-white hover:bg-white/10'
            )}
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMobileMenuOpen ? (
              <HiX className="h-6 w-6" />
            ) : (
              <HiMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 sm:top-20 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="relative bg-white shadow-xl rounded-b-2xl mx-4 mt-2 overflow-hidden animate-slide-down">
            <nav className="py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center px-6 py-3.5 text-base font-medium text-gray-700 hover:text-sky-600 hover:bg-sky-50 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="border-t border-gray-100 p-4 space-y-3">
              <a
                href="https://wa.me/+584121234567?text=¡Hola!%20Quiero%20agendar%20un%20servicio%20de%20limpieza"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-base w-full justify-center px-5 py-3 text-base font-medium rounded-xl border-2 border-green-500 text-green-600 hover:bg-green-50 gap-2"
              >
                <FaWhatsapp className="text-xl" />
                WhatsApp
              </a>
              <Link
                href="/book"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-base w-full justify-center px-5 py-3 text-base font-semibold rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white hover:from-sky-600 hover:to-cyan-600 shadow-md"
              >
                Reservar Ahora
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
