import React from 'react';
import Link from 'next/link';
import { blogs } from '@/lib/blogs';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { FaCalendar, FaClock, FaArrowRight } from 'react-icons/fa';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog de Limpieza Sustentable | The Cleaning Couple Isla de Margarita',
  description: 'Aprende sobre técnicas eco-amigables de hospitalidad, gestión de escasez de agua y estándares de Las Vegas en Isla de Margarita.',
  keywords: ['ahorro de agua', 'limpieza ecologica', 'Isla de Margarita', 'Las Vegas hospitalidad', 'Airbnb tips', 'Margarita sequia'],
};

export default function BlogListPage() {
  return (
    <div className="pt-24 sm:pt-28">
      {/* Hero */}
      <section className="bg-gradient-to-br from-sky-900 via-slate-900 to-slate-950 text-white py-16 sm:py-20 relative overflow-hidden">
        {/* Background Image Pattern Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay"
          style={{ backgroundImage: "url('/images/usa_esta_imagen_para_crear_202606201341.jpeg')" }}
          aria-hidden="true"
        />
        <div className="container-custom text-center relative z-10">
          <span className="inline-block text-xs font-semibold text-sky-300 bg-white/10 px-4 py-1.5 rounded-full mb-4">
            Blog & Recursos Eco-Amigables
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-4">
            Lecturas de <span className="text-sky-300">Sustentabilidad</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
            Descubre metodologías avanzadas traídas de Las Vegas para mantener tu propiedad reluciente optimizando el agua al máximo.
          </p>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((post) => (
              <Card key={post.slug} className="flex flex-col h-full overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Visual */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-xl p-2.5 shadow-sm text-2xl flex items-center justify-center w-11 h-11">
                    {post.emoji}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <FaCalendar className="text-sky-500" />
                      {new Date(post.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaClock className="text-sky-500" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-bold text-gray-900 text-lg sm:text-xl mb-2 line-clamp-2 hover:text-sky-600 transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed flex-1">
                    {post.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-semibold tracking-wider text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link href={`/blog/${post.slug}`} className="mt-auto">
                    <Button variant="outline" fullWidth rightIcon={<FaArrowRight />} className="border-gray-200 text-gray-700 hover:border-sky-500 hover:text-sky-600 hover:bg-sky-50">
                      Leer Artículo
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
