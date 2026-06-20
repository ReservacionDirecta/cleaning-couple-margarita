import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Cleaning Couple | Limpieza Profesional para Airbnb en Isla de Margarita',
  description:
    'Servicio profesional de limpieza para propiedades Airbnb y alojamientos turísticos en Isla de Margarita, Venezuela. Reseñas de 5 estrellas garantizadas.',
  keywords: [
    'limpieza profesional',
    'Airbnb',
    'Isla de Margarita',
    'limpieza de propiedades',
    'Venezuela',
    'anfitriones',
    'servicio de limpieza',
    'Porlamar',
    'Pampatar',
  ],
  openGraph: {
    title: 'The Cleaning Couple | Limpieza Profesional para Airbnb',
    description:
      'Servicio profesional de limpieza para propiedades Airbnb en Isla de Margarita.',
    type: 'website',
    locale: 'es_ES',
    siteName: 'The Cleaning Couple',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col relative`}>
        <div className="bg-pattern-accent" />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
