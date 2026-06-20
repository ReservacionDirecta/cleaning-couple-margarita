'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  FaCalendarCheck, FaHome, FaStar, FaSignOutAlt, FaChartBar,
  FaTachometerAlt
} from 'react-icons/fa';
import { cn } from '@/lib/utils';

const sidebarLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: FaTachometerAlt },
  { href: '/dashboard', label: 'Reservas', icon: FaCalendarCheck },
  { href: '/dashboard', label: 'Propiedades', icon: FaHome },
  { href: '/dashboard', label: 'Reseñas', icon: FaStar },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Don't apply layout to login page
  if (pathname === '/dashboard/login') {
    return <>{children}</>;
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/dashboard/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200">
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold text-lg">
              TC
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 leading-tight">
                Admin Panel
              </p>
              <p className="text-xs text-gray-500">Dashboard</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <link.icon className={cn('text-lg', isActive ? 'text-emerald-500' : 'text-gray-400')} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <FaSignOutAlt className="text-lg" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Mobile Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex items-center justify-around p-2">
          {sidebarLinks.slice(0, 4).map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  'flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors',
                  isActive ? 'text-emerald-600' : 'text-gray-500'
                )}
              >
                <link.icon className="text-lg" />
                {link.label}
              </Link>
            );
          })}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg text-xs font-medium text-red-500"
          >
            <FaSignOutAlt className="text-lg" />
            Salir
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 lg:ml-0 pb-16 lg:pb-0">
        {children}
      </main>
    </div>
  );
}
