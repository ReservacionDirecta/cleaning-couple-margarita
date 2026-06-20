// ===== Enums / Union Types =====

export type UserRole = 'client' | 'admin' | 'cleaner';
export type BookingStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded';
export type ServiceCategory = 'basic' | 'deep' | 'specialized' | 'commercial' | 'addon';
export type TimeSlot = 'morning' | 'midday' | 'afternoon' | 'evening';
export type PropertyType = 'apartment' | 'house' | 'villa' | 'condo' | 'commercial';

// ===== User Interfaces =====

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IUserInput {
  name: string;
  email: string;
  password: string;
  phone: string;
  role?: UserRole;
}

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IAuthResponse {
  token: string;
  user: IUser;
}

// ===== Service Interfaces =====

export interface IService {
  _id: string;
  name: string;
  slug: string;
  category: ServiceCategory;
  description: string;
  shortDescription: string;
  icon: string;
  duration: number;
  price: number;
  includes: string[];
  doesNotInclude: string[];
  isPopular: boolean;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

// ===== Property Interfaces =====

export interface IProperty {
  _id: string;
  name: string;
  slug: string;
  type: PropertyType;
  description: string;
  shortDescription: string;
  location: string;
  address: string;
  city: string;
  state: string;
  images: string[];
  pricePerHour: number;
  pricePerVisit: number;
  squareMeters: number;
  bedrooms: number;
  bathrooms: number;
  features: string[];
  cleaningTypes: string[];
  isAvailable: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

// ===== Booking Interfaces =====

export interface IBooking {
  _id: string;
  user: string | IUser;
  property?: string | IProperty;
  services: string[] | IService[];
  date: string;
  timeSlot: TimeSlot;
  duration: number;
  address: string;
  city: string;
  notes?: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  totalPrice: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  assignedCleaner?: string | IUser;
  createdAt: string;
  updatedAt: string;
}

export interface IBookingInput {
  services: string[];
  date: string;
  timeSlot: TimeSlot;
  duration: number;
  address: string;
  city?: string;
  notes?: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  totalPrice: number;
}

// ===== Review Interfaces =====

export interface IReview {
  _id: string;
  user: string | IUser;
  booking?: string;
  rating: number;
  title?: string;
  comment: string;
  serviceQuality: number;
  punctuality: number;
  professionalism: number;
  isVerified: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

// ===== Contact Form =====

export interface IContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

// ===== Dashboard Stats =====

export interface IDashboardStats {
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  inProgressBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
  totalUsers: number;
}

// ===== API Response Types =====

export interface IApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface IApiError {
  success: false;
  error: string;
  message?: string;
}
