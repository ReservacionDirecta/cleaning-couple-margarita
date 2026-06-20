import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogs } from '@/lib/blogs';
import Button from '@/components/ui/Button';
import { FaCalendar, FaClock, FaArrowLeft, FaWhatsapp } from 'react-icons/fa';
import type { Metadata } from 'next';

interface BlogPostProps {
  params: {
    slug: string;
  };
}

// Generate static paths
export async function generateStaticParams() {
  return blogs.map((post) => ({
    slug: post.slug,
  }));
}

// Dynamic metadata generator
export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const post = blogs.find((b) => b.slug === params.slug);
  if (!post) return {};

  return {
    title: `${post.title} | Blog The Cleaning Couple`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: [{ url: post.image }],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostProps) {
  const post = blogs.find((b) => b.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="pt-24 sm:pt-28 pb-16">
      <div className="container-custom max-w-4xl">
        {/* Back navigation */}
        <div className="mb-6">
          <Link href="/blog">
            <Button variant="ghost" leftIcon={<FaArrowLeft />} className="text-gray-500 hover:text-sky-600">
              Volver al Blog
            </Button>
          </Link>
        </div>

        {/* Hero Area */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs font-semibold tracking-wider text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full uppercase">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 leading-tight mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-sm text-gray-500 pb-6 border-b border-gray-100">
            <span className="flex items-center gap-1.5">
              <FaCalendar className="text-sky-500" />
              {new Date(post.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <FaClock className="text-sky-500" />
              Lectura de {post.readTime}
            </span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative h-64 sm:h-96 w-full rounded-3xl overflow-hidden shadow-md mb-8">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow text-4xl">
            {post.emoji}
          </div>
        </div>

        {/* Main Content */}
        <article 
          className="prose prose-sky max-w-none text-gray-700 leading-relaxed space-y-6"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Call to Action Box */}
        <div className="mt-12 bg-sky-50 border border-sky-100 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-md">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              ¿Listo para un servicio sustentable?
            </h3>
            <p className="text-sm text-gray-600">
              Garantizamos reseñas de 5 estrellas en tu propiedad de Margarita optimizando al máximo cada gota de agua.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <a
              href="https://wa.me/+584121234567?text=¡Hola!%20Leí%20su%20artículo%20de%20blog%20y%20quiero%20cotizar"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button variant="outline" className="w-full justify-center gap-2 border-green-500 text-green-600 hover:bg-green-50">
                <FaWhatsapp className="text-lg" /> WhatsApp
              </Button>
            </a>
            <Link href="/book" className="w-full sm:w-auto">
              <Button className="w-full justify-center bg-sky-500 hover:bg-sky-600 text-white border-none shadow-md">
                Reservar Ahora
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
