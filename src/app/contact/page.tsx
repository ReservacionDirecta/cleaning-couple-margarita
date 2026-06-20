'use client';

import React, { useState } from 'react';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaCheck, FaPhone } from 'react-icons/fa';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Error al enviar el mensaje');

      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err: any) {
      setError(err.message || 'Error al enviar el mensaje');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 sm:pt-28">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white py-16 sm:py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-4">
            Contácto
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Elige el canal que prefieras.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Envíanos un mensaje
              </h2>

              {isSuccess ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <FaCheck className="text-emerald-500 text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    ¡Mensaje enviado!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Te responderemos a la brevedad posible.
                  </p>
                  <Button variant="outline" onClick={() => setIsSuccess(false)}>
                    Enviar otro mensaje
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Nombre completo"
                      name="name"
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Correo electrónico"
                      name="email"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Teléfono"
                      name="phone"
                      placeholder="+58 412-1234567"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    <div>
                      <label className="form-label">Asunto</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="form-input"
                        required
                      >
                        <option value="">Selecciona un asunto</option>
                        <option value="Reserva">Quiero reservar un servicio</option>
                        <option value="Cotización">Solicitar cotización</option>
                        <option value="Información">Información general</option>
                        <option value="Queja">Reportar un problema</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Mensaje</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="form-input resize-none"
                      placeholder="Cuéntanos cómo podemos ayudarte..."
                      required
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-500">{error}</p>
                  )}

                  <Button type="submit" isLoading={isSubmitting} rightIcon={<FaPaperPlane />}>
                    Enviar Mensaje
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Información de contacto
              </h2>

              <div className="space-y-4 mb-8">
                <Card className="flex items-start gap-4 p-5">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                    <FaWhatsapp className="text-green-500 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                    <p className="text-sm text-gray-500">Respuesta inmediata</p>
                    <a
                      href="https://wa.me/+584121234567"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 font-medium hover:underline mt-1 inline-block"
                    >
                      +58 412-1234567
                    </a>
                  </div>
                </Card>

                <Card className="flex items-start gap-4 p-5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                    <FaEnvelope className="text-emerald-500 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-sm text-gray-500">Respuesta en 24 horas</p>
                    <a
                      href="mailto:info@thecleaningcouple.com"
                      className="text-emerald-600 font-medium hover:underline mt-1 inline-block"
                    >
                      info@thecleaningcouple.com
                    </a>
                  </div>
                </Card>

                <Card className="flex items-start gap-4 p-5">
                  <div className="w-12 h-12 rounded-xl bg-ocean-100 flex items-center justify-center shrink-0">
                    <FaPhone className="text-ocean-500 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Teléfono</h3>
                    <p className="text-sm text-gray-500">Lun-Sáb 8:00-18:00</p>
                    <a
                      href="tel:+584121234567"
                      className="text-emerald-600 font-medium hover:underline mt-1 inline-block"
                    >
                      +58 412-1234567
                    </a>
                  </div>
                </Card>

                <Card className="flex items-start gap-4 p-5">
                  <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center shrink-0">
                    <FaMapMarkerAlt className="text-accent-500 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Ubicación</h3>
                    <p className="text-sm text-gray-500">
                      Isla de Margarita, Nueva Esparta
                    </p>
                    <p className="text-sm text-gray-500">Venezuela</p>
                  </div>
                </Card>
              </div>

              {/* Quick WhatsApp CTA */}
              <a
                href="https://wa.me/+584121234567?text=¡Hola!%20Quiero%20información%20sobre%20sus%20servicios%20de%20limpieza"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 px-6 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-semibold text-center transition-colors shadow-lg"
              >
                <FaWhatsapp className="inline-block mr-2 text-xl" />
                Contáctanos por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
