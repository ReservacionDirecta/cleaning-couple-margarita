'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaLock, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || 'Credenciales inválidas');
      }

      localStorage.setItem('admin_token', data.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-4">
            <span className="text-3xl font-bold text-white">TC</span>
          </div>
          <h1 className="text-2xl font-bold text-white">
            The Cleaning Couple
          </h1>
          <p className="text-emerald-200">Panel de Administración</p>
        </div>

        <Card className="p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Iniciar Sesión</h2>
          <p className="text-sm text-gray-500 mb-6">
            Ingresa tus credenciales para acceder al dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Correo electrónico"
              type="email"
              placeholder="admin@thecleaningcouple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<FaEnvelope />}
              required
            />

            <div>
              <label className="form-label">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">
                {error}
              </p>
            )}

            <Button type="submit" fullWidth isLoading={isLoading} leftIcon={<FaLock />}>
              Iniciar Sesión
            </Button>
          </form>
        </Card>

        <p className="text-center text-emerald-200 text-sm mt-6">
          &copy; {new Date().getFullYear()} The Cleaning Couple
        </p>
      </div>
    </div>
  );
}
