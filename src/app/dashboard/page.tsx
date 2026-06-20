'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FaSignOutAlt, FaCalendarCheck, FaHome, FaStar, FaChartBar, 
  FaCheck, FaTimes, FaSpinner, FaTrash, FaEye
} from 'react-icons/fa';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { formatDate, formatPrice, formatTimeSlot } from '@/lib/utils';
import type { IBooking, IDashboardStats } from '@/types';

const statusColors: Record<string, string> = {
  pending: 'badge-yellow',
  confirmed: 'badge-blue',
  in_progress: 'badge-blue',
  completed: 'badge-green',
  cancelled: 'badge-red',
};

const statusLabels: Record<string, string> = {
  pending: 'Pendiente',
  confirmed: 'Confirmado',
  in_progress: 'En Progreso',
  completed: 'Completado',
  cancelled: 'Cancelado',
};

export default function DashboardPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [stats, setStats] = useState<IDashboardStats>({
    totalBookings: 0, pendingBookings: 0, confirmedBookings: 0,
    inProgressBookings: 0, completedBookings: 0, cancelledBookings: 0,
    totalRevenue: 0, totalUsers: 0,
  });
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('admin_token');
    if (stored) {
      setToken(stored);
      setIsAuth(true);
    } else {
      setIsAuth(false);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuth && token) {
      fetchBookings();
    }
  }, [isAuth, token]);

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('No autorizado');
      const data = await res.json();
      if (data.success) {
        setBookings(data.data);
        calculateStats(data.data);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (bookings: IBooking[]) => {
    const newStats: IDashboardStats = {
      totalBookings: bookings.length,
      pendingBookings: bookings.filter(b => b.status === 'pending').length,
      confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
      inProgressBookings: bookings.filter(b => b.status === 'in_progress').length,
      completedBookings: bookings.filter(b => b.status === 'completed').length,
      cancelledBookings: bookings.filter(b => b.status === 'cancelled').length,
      totalRevenue: bookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + b.totalPrice, 0),
      totalUsers: new Set(bookings.map(b => typeof b.user === 'object' ? (b.user as any)._id : b.user)).size,
    };
    setStats(newStats);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Error al actualizar');
      const data = await res.json();
      if (data.success) {
        const updated = bookings.map(b => b._id === id ? { ...b, status: newStatus } as IBooking : b);
        setBookings(updated);
        calculateStats(updated);
      }
    } catch (err: any) {
      alert('Error al actualizar el estado');
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta reserva?')) return;
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Error al eliminar');
      const filtered = bookings.filter(b => b._id !== id);
      setBookings(filtered);
      calculateStats(filtered);
    } catch (err: any) {
      alert('Error al eliminar la reserva');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/dashboard/login');
  };

  if (isLoading) {
    return (
      <div className="pt-24 flex items-center justify-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-emerald-500" />
      </div>
    );
  }

  if (!isAuth) {
    router.push('/dashboard/login');
    return null;
  }

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500">Panel de administración de reservas</p>
          </div>
          <Button variant="ghost" onClick={handleLogout} leftIcon={<FaSignOutAlt />}>
            Cerrar Sesión
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <Card className="p-5 text-center">
            <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
            <p className="text-sm text-gray-500 mt-1">Total Reservas</p>
          </Card>
          <Card className="p-5 text-center">
            <p className="text-3xl font-bold text-yellow-500">{stats.pendingBookings}</p>
            <p className="text-sm text-gray-500 mt-1">Pendientes</p>
          </Card>
          <Card className="p-5 text-center">
            <p className="text-3xl font-bold text-emerald-500">{stats.completedBookings}</p>
            <p className="text-sm text-gray-500 mt-1">Completadas</p>
          </Card>
          <Card className="p-5 text-center">
            <p className="text-3xl font-bold text-ocean-500">${stats.totalRevenue}</p>
            <p className="text-sm text-gray-500 mt-1">Ingresos</p>
          </Card>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Bookings Table */}
        <Card className="overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Reservas</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="text-left p-4 font-medium">Cliente</th>
                  <th className="text-left p-4 font-medium">Servicio</th>
                  <th className="text-left p-4 font-medium">Fecha</th>
                  <th className="text-left p-4 font-medium">Horario</th>
                  <th className="text-left p-4 font-medium">Monto</th>
                  <th className="text-left p-4 font-medium">Estado</th>
                  <th className="text-left p-4 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-400">
                      No hay reservas registradas
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <p className="font-medium text-gray-900">{booking.contactName}</p>
                        <p className="text-xs text-gray-500">{booking.contactPhone}</p>
                      </td>
                      <td className="p-4 text-gray-600">
                        {Array.isArray(booking.services) 
                          ? (typeof booking.services[0] === 'object' 
                              ? (booking.services[0] as any).name || 'Servicio'
                              : String(booking.services[0]))
                          : 'Servicio'}
                      </td>
                      <td className="p-4 text-gray-600">
                        {formatDate(booking.date, 'short')}
                      </td>
                      <td className="p-4 text-gray-600">
                        {formatTimeSlot(booking.timeSlot)}
                      </td>
                      <td className="p-4 font-medium text-gray-900">
                        ${booking.totalPrice}
                      </td>
                      <td className="p-4">
                        <select
                          value={booking.status}
                          onChange={(e) => updateStatus(booking._id, e.target.value)}
                          disabled={updatingId === booking._id}
                          className={cn(
                            'text-xs font-medium rounded-full px-3 py-1 border-0 cursor-pointer',
                            statusColors[booking.status]
                          )}
                        >
                          {Object.entries(statusLabels).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => deleteBooking(booking._id)}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
