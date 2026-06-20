'use client';

import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaCheck, FaCalendar, FaHome, FaUser, FaInfoCircle, FaWhatsapp } from 'react-icons/fa';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { formatPrice, formatTimeSlot } from '@/lib/utils';

// ===== Types =====
interface BookingFormData {
  // Step 1 - Service
  serviceCategory: string;
  serviceIds: string[];
  // Step 2 - Schedule
  date: string;
  timeSlot: string;
  address: string;
  city: string;
  // Step 3 - Property
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  squareMeters: number;
  // Step 4 - Contact
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  notes: string;
}

interface FormErrors {
  [key: string]: string;
}

const timeSlots = [
  { value: 'morning', label: 'Mañana (08:00 - 12:00)', icon: '🌅' },
  { value: 'midday', label: 'Medio día (12:00 - 14:00)', icon: '☀️' },
  { value: 'afternoon', label: 'Tarde (14:00 - 18:00)', icon: '🌤️' },
  { value: 'evening', label: 'Noche (18:00 - 20:00)', icon: '🌙' },
];

const serviceCategories = [
  { value: 'basic', label: 'Limpieza Básica', price: 35, duration: '2 hrs', icon: '🧹' },
  { value: 'deep', label: 'Limpieza Profunda', price: 75, duration: '4 hrs', icon: '✨' },
  { value: 'specialized', label: 'Especializada', price: 55, duration: '3 hrs', icon: '🔧' },
  { value: 'addon', label: 'Add-ons', price: 15, duration: '30 min', icon: '➕' },
];

const propertyTypes = [
  { value: 'apartment', label: 'Apartamento' },
  { value: 'house', label: 'Casa' },
  { value: 'villa', label: 'Villa' },
  { value: 'condo', label: 'Condominio' },
  { value: 'commercial', label: 'Comercial' },
];

const cities = [
  'Porlamar',
  'Pampatar',
  'La Asunción',
  'El Valle del Espíritu Santo',
  'Playa El Agua',
  'Playa Caribe',
  'Punta de Piedras',
  'Los Robles',
  'Bella Vista',
  'Costa Azul',
  'Otra',
];

const initialFormData: BookingFormData = {
  serviceCategory: '',
  serviceIds: [],
  date: '',
  timeSlot: '',
  address: '',
  city: '',
  propertyType: '',
  bedrooms: 1,
  bathrooms: 1,
  squareMeters: 50,
  contactName: '',
  contactPhone: '',
  contactEmail: '',
  notes: '',
};

export default function BookingForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const totalSteps = 5;

  // Calculate price based on service category
  const calculatePrice = () => {
    const service = serviceCategories.find(s => s.value === formData.serviceCategory);
    return service?.price || 0;
  };

  // Update form field
  const updateField = (field: keyof BookingFormData, value: string | number | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Validate current step
  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    switch (step) {
      case 0: // Service
        if (!formData.serviceCategory) {
          newErrors.serviceCategory = 'Selecciona un tipo de servicio';
        }
        break;
      case 1: // Schedule
        if (!formData.date) {
          newErrors.date = 'Selecciona una fecha';
        }
        if (!formData.timeSlot) {
          newErrors.timeSlot = 'Selecciona un horario';
        }
        if (!formData.address.trim()) {
          newErrors.address = 'Ingresa la dirección';
        }
        if (!formData.city) {
          newErrors.city = 'Selecciona la ciudad';
        }
        break;
      case 2: // Property
        if (!formData.propertyType) {
          newErrors.propertyType = 'Selecciona el tipo de propiedad';
        }
        break;
      case 3: // Contact
        if (!formData.contactName.trim()) {
          newErrors.contactName = 'Ingresa tu nombre';
        }
        if (!formData.contactPhone.trim()) {
          newErrors.contactPhone = 'Ingresa tu teléfono';
        } else if (!/^[\d\s+\-()]{7,15}$/.test(formData.contactPhone)) {
          newErrors.contactPhone = 'Ingresa un teléfono válido';
        }
        if (!formData.contactEmail.trim()) {
          newErrors.contactEmail = 'Ingresa tu correo electrónico';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
          newErrors.contactEmail = 'Ingresa un correo válido';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next step
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle prev step
  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle form submit
  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const bookingPayload = {
        services: [formData.serviceCategory],
        date: formData.date,
        timeSlot: formData.timeSlot,
        duration: serviceCategories.find(s => s.value === formData.serviceCategory)?.price === 35 ? 120 : 
                  serviceCategories.find(s => s.value === formData.serviceCategory)?.price === 75 ? 240 : 180,
        address: formData.address,
        city: formData.city,
        notes: formData.notes,
        contactName: formData.contactName,
        contactPhone: formData.contactPhone,
        contactEmail: formData.contactEmail,
        totalPrice: calculatePrice(),
      };

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || 'Error al crear la reserva');
      }

      setIsSuccess(true);
    } catch (error: any) {
      setSubmitError(error.message || 'Error al enviar la reserva. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step indicator
  const StepIndicator = () => {
    const labels = ['Servicio', 'Agenda', 'Propiedad', 'Contacto', 'Revisar'];

    return (
      <div className="mb-6 sm:mb-8">
        {/* Mobile Stepper */}
        <div className="sm:hidden text-center">
          <p className="text-xs font-semibold text-sky-600 uppercase tracking-wider mb-1">
            Paso {currentStep + 1} de {totalSteps}
          </p>
          <h4 className="text-base font-bold text-gray-900 mb-2">{labels[currentStep]}</h4>
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-sky-500 h-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Desktop Stepper */}
        <div className="hidden sm:flex items-center justify-between">
          {labels.map((label, i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                    i < currentStep
                      ? 'bg-sky-500 text-white'
                      : i === currentStep
                      ? 'bg-sky-500 text-white ring-4 ring-sky-500/20'
                      : 'bg-gray-100 text-gray-400'
                  )}
                >
                  {i < currentStep ? <FaCheck /> : i + 1}
                </div>
                <span
                  className={cn(
                    'text-xs mt-1',
                    i <= currentStep ? 'text-sky-600 font-medium' : 'text-gray-400'
                  )}
                >
                  {label}
                </span>
              </div>
              {i < totalSteps - 1 && (
                <div
                  className={cn(
                    'h-1 w-8 sm:w-16 lg:w-24 mx-2 rounded-full',
                    i < currentStep ? 'bg-sky-500' : 'bg-gray-200'
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Success view
  if (isSuccess) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <div className="w-20 h-20 rounded-full bg-sky-100 flex items-center justify-center mx-auto mb-6">
          <FaCheck className="text-sky-500 text-3xl" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          ¡Reserva Confirmada!
        </h3>
        <p className="text-gray-600 mb-6">
          Hemos recibido tu solicitud de reserva. Te contactaremos pronto 
          para confirmar los detalles.
        </p>
        <div className="bg-sky-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-sky-800">
            ¿Necesitas algo más? Contáctanos por WhatsApp
          </p>
          <a
            href="https://wa.me/+584121234567?text=¡Hola!%20Acabo%20de%20reservar%20un%20servicio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sky-600 font-semibold mt-2 hover:underline"
          >
            <FaWhatsapp /> +58 412-1234567
          </a>
        </div>
        <Button variant="outline" onClick={() => { setCurrentStep(0); setFormData(initialFormData); setIsSuccess(false); }}>
          Nueva Reserva
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <StepIndicator />

      {/* Step 1: Service Selection */}
      {currentStep === 0 && (
        <div className="animate-fade-in">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Selecciona tu servicio
            </h3>
            <p className="text-gray-600">
              Elige el tipo de limpieza que necesita tu propiedad
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {serviceCategories.map((service) => (
              <button
                key={service.value}
                onClick={() => updateField('serviceCategory', service.value)}
                className={cn(
                  'relative p-6 rounded-2xl border-2 text-left transition-all',
                  formData.serviceCategory === service.value
                    ? 'border-sky-500 bg-sky-50 ring-2 ring-sky-500/20'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                )}
              >
                <div className="text-3xl mb-3">{service.icon}</div>
                <h4 className="font-bold text-gray-900 mb-1">{service.label}</h4>
                <p className="text-sm text-gray-500 mb-2">{service.duration}</p>
                <p className="text-2xl font-bold text-sky-600">
                  ${service.price}
                  <span className="text-sm font-normal text-gray-500"> USD</span>
                </p>
                {formData.serviceCategory === service.value && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center">
                    <FaCheck className="text-xs" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {errors.serviceCategory && (
            <p className="text-red-500 text-sm mt-2 text-center">{errors.serviceCategory}</p>
          )}

          <div className="mt-8 flex justify-end">
            <Button onClick={handleNext} rightIcon={<FaArrowRight />}>
              Continuar
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Schedule */}
      {currentStep === 1 && (
        <div className="animate-fade-in">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Agenda tu visita
            </h3>
            <p className="text-gray-600">
              Selecciona fecha, horario y lugar del servicio
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Date */}
            <div>
              <label className="form-label">Fecha del servicio</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => updateField('date', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className={cn('form-input', errors.date && 'border-red-500')}
              />
              {errors.date && <p className="form-error">{errors.date}</p>}
            </div>

            {/* Time Slot */}
            <div>
              <label className="form-label">Horario</label>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.value}
                    onClick={() => updateField('timeSlot', slot.value)}
                    className={cn(
                      'p-3 rounded-xl border-2 text-left transition-all',
                      formData.timeSlot === slot.value
                        ? 'border-sky-500 bg-sky-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    )}
                  >
                    <span className="text-lg">{slot.icon}</span>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {slot.label.split('(')[0].trim()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {slot.label.match(/\(([^)]+)\)/)?.[1]}
                    </p>
                  </button>
                ))}
              </div>
              {errors.timeSlot && <p className="form-error mt-2">{errors.timeSlot}</p>}
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <Input
                label="Dirección de la propiedad"
                placeholder="Ej: Calle Principal, Edificio Mar, Apto 3B"
                value={formData.address}
                onChange={(e) => updateField('address', e.target.value)}
                error={errors.address}
                leftIcon={<FaHome />}
              />
            </div>

            {/* City */}
            <div className="md:col-span-2">
              <label className="form-label">Ciudad / Sector</label>
              <select
                value={formData.city}
                onChange={(e) => updateField('city', e.target.value)}
                className={cn('form-input', errors.city && 'border-red-500')}
              >
                <option value="">Selecciona una ciudad</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.city && <p className="form-error">{errors.city}</p>}
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <Button variant="ghost" onClick={handlePrev} leftIcon={<FaArrowLeft />}>
              Atrás
            </Button>
            <Button onClick={handleNext} rightIcon={<FaArrowRight />}>
              Continuar
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Property Details */}
      {currentStep === 2 && (
        <div className="animate-fade-in">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Detalles de la propiedad
            </h3>
            <p className="text-gray-600">
              Ayúdanos a entender mejor tu espacio
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Property Type */}
            <div className="md:col-span-2">
              <label className="form-label">Tipo de propiedad</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {propertyTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => updateField('propertyType', type.value)}
                    className={cn(
                      'p-4 rounded-xl border-2 text-center transition-all',
                      formData.propertyType === type.value
                        ? 'border-sky-500 bg-sky-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    )}
                  >
                    <p className="text-sm font-medium text-gray-900">{type.label}</p>
                  </button>
                ))}
              </div>
              {errors.propertyType && <p className="form-error mt-2">{errors.propertyType}</p>}
            </div>

            {/* Bedrooms */}
            <div>
              <label className="form-label">Habitaciones</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateField('bedrooms', Math.max(0, formData.bedrooms - 1))}
                  className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                >
                  -
                </button>
                <span className="text-xl font-bold text-gray-900 w-8 text-center">
                  {formData.bedrooms}
                </span>
                <button
                  onClick={() => updateField('bedrooms', Math.min(20, formData.bedrooms + 1))}
                  className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Bathrooms */}
            <div>
              <label className="form-label">Baños</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateField('bathrooms', Math.max(0, formData.bathrooms - 1))}
                  className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                >
                  -
                </button>
                <span className="text-xl font-bold text-gray-900 w-8 text-center">
                  {formData.bathrooms}
                </span>
                <button
                  onClick={() => updateField('bathrooms', Math.min(20, formData.bathrooms + 1))}
                  className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Square Meters */}
            <div className="md:col-span-2">
              <label className="form-label">
                Metros cuadrados aproximados: <strong>{formData.squareMeters}m²</strong>
              </label>
              <input
                type="range"
                min={20}
                max={500}
                step={10}
                value={formData.squareMeters}
                onChange={(e) => updateField('squareMeters', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>20 m²</span>
                <span>500 m²</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <Button variant="ghost" onClick={handlePrev} leftIcon={<FaArrowLeft />}>
              Atrás
            </Button>
            <Button onClick={handleNext} rightIcon={<FaArrowRight />}>
              Continuar
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Contact Info */}
      {currentStep === 3 && (
        <div className="animate-fade-in">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Información de contacto
            </h3>
            <p className="text-gray-600">
              ¿Cómo podemos comunicarnos contigo?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Input
                label="Nombre completo"
                placeholder="Ej: María González"
                value={formData.contactName}
                onChange={(e) => updateField('contactName', e.target.value)}
                error={errors.contactName}
                leftIcon={<FaUser />}
              />
            </div>

            <Input
              label="Teléfono / WhatsApp"
              placeholder="+58 412-1234567"
              value={formData.contactPhone}
              onChange={(e) => updateField('contactPhone', e.target.value)}
              error={errors.contactPhone}
              leftIcon={<FaWhatsapp />}
            />

            <Input
              label="Correo electrónico"
              type="email"
              placeholder="correo@ejemplo.com"
              value={formData.contactEmail}
              onChange={(e) => updateField('contactEmail', e.target.value)}
              error={errors.contactEmail}
            />

            <div className="md:col-span-2">
              <label className="form-label">Notas adicionales (opcional)</label>
              <textarea
                value={formData.notes}
                onChange={(e) => updateField('notes', e.target.value)}
                placeholder="Ej: Instrucciones de acceso, áreas que requieren atención especial..."
                rows={3}
                className="form-input resize-none"
                maxLength={500}
              />
              <p className="text-xs text-gray-400 mt-1">
                {formData.notes.length}/500 caracteres
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <Button variant="ghost" onClick={handlePrev} leftIcon={<FaArrowLeft />}>
              Atrás
            </Button>
            <Button onClick={handleNext} rightIcon={<FaArrowRight />}>
              Revisar Reserva
            </Button>
          </div>
        </div>
      )}

      {/* Step 5: Review & Submit */}
      {currentStep === 4 && (
        <div className="animate-fade-in">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Revisa tu reserva
            </h3>
            <p className="text-gray-600">
              Verifica que toda la información sea correcta antes de enviar
            </p>
          </div>

          <Card className="space-y-6">
            {/* Service Summary */}
            <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center text-2xl">
                {serviceCategories.find(s => s.value === formData.serviceCategory)?.icon}
              </div>
              <div>
                <h4 className="font-bold text-gray-900">
                  {serviceCategories.find(s => s.value === formData.serviceCategory)?.label}
                </h4>
                <p className="text-sm text-gray-500">
                  {serviceCategories.find(s => s.value === formData.serviceCategory)?.duration}
                </p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-2xl font-bold text-sky-600">
                  ${calculatePrice()}
                </p>
                <p className="text-xs text-gray-500">USD</p>
              </div>
            </div>

            {/* Schedule */}
            <div className="flex items-start gap-3">
              <FaCalendar className="text-sky-500 mt-1" />
              <div>
                <p className="font-medium text-gray-900">Fecha y horario</p>
                <p className="text-sm text-gray-600">
                  {formData.date 
                    ? new Date(formData.date).toLocaleDateString('es-ES', { 
                        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
                       })
                    : 'No seleccionada'} 
                  {' - '}
                  {timeSlots.find(s => s.value === formData.timeSlot)?.label}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3">
              <FaHome className="text-sky-500 mt-1" />
              <div>
                <p className="font-medium text-gray-900">Dirección</p>
                <p className="text-sm text-gray-600">{formData.address}</p>
                <p className="text-sm text-gray-500">{formData.city}</p>
              </div>
            </div>

            {/* Property */}
            <div className="flex items-start gap-3">
              <FaInfoCircle className="text-sky-500 mt-1" />
              <div>
                <p className="font-medium text-gray-900">Propiedad</p>
                <p className="text-sm text-gray-600">
                  {propertyTypes.find(t => t.value === formData.propertyType)?.label} | 
                  {formData.bedrooms} hab, {formData.bathrooms} baños, ~{formData.squareMeters}m²
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="flex items-start gap-3">
              <FaUser className="text-sky-500 mt-1" />
              <div>
                <p className="font-medium text-gray-900">Contacto</p>
                <p className="text-sm text-gray-600">{formData.contactName}</p>
                <p className="text-sm text-gray-500">{formData.contactPhone} | {formData.contactEmail}</p>
              </div>
            </div>

            {/* Notes */}
            {formData.notes && (
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm font-medium text-gray-700 mb-1">Notas:</p>
                <p className="text-sm text-gray-600">{formData.notes}</p>
              </div>
            )}

            {/* Price Total */}
            <div className="bg-sky-50 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">Total estimado</p>
                <p className="text-sm text-gray-500">Precio sujeto a confirmación</p>
              </div>
              <p className="text-3xl font-bold text-sky-600">${calculatePrice()} USD</p>
            </div>
          </Card>

          {submitError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {submitError}
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <Button variant="ghost" onClick={handlePrev} leftIcon={<FaArrowLeft />}>
              Editar
            </Button>
            <Button
              onClick={handleSubmit}
              isLoading={isSubmitting}
              rightIcon={!isSubmitting ? <FaArrowRight /> : undefined}
            >
              Confirmar Reserva
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
