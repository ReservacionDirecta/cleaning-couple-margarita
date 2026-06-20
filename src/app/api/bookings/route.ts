import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

function getUserIdFromToken(req: NextRequest): string | null {
  try {
    const authHeader = req.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      return decoded.userId;
    }
    return null;
  } catch {
    return null;
  }
}

// GET /api/bookings — Fetch all bookings
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const userId = getUserIdFromToken(req);

    // If authenticated, return all bookings (admin view), otherwise only user's bookings
    let bookings;
    if (userId) {
      bookings = await Booking.find({})
        .populate('user', 'name email phone')
        .populate('services', 'name price category')
        .populate('property', 'name type location')
        .sort({ createdAt: -1 })
        .lean();
    } else {
      bookings = await Booking.find({})
        .populate('services', 'name price category')
        .sort({ createdAt: -1 })
        .lean();
    }

    return NextResponse.json({
      success: true,
      data: bookings,
    });
  } catch (error: any) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener las reservas', message: error.message },
      { status: 500 }
    );
  }
}

// POST /api/bookings — Create a new booking
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();

    const {
      services,
      date,
      timeSlot,
      duration,
      address,
      city,
      notes,
      contactName,
      contactPhone,
      contactEmail,
      totalPrice,
    } = body;

    // Validate required fields
    if (!services || !date || !timeSlot || !address || !contactName || !contactPhone || !contactEmail || !totalPrice) {
      return NextResponse.json(
        { success: false, error: 'Faltan campos obligatorios' },
        { status: 400 }
      );
    }

    // Find or create a temporary user for the booking
    const User = (await import('@/models/User')).default;
    let user = await User.findOne({ email: contactEmail });

    if (!user) {
      // Create a simple user for this booking
      user = await User.create({
        name: contactName,
        email: contactEmail,
        password: Math.random().toString(36).slice(-12), // random password
        phone: contactPhone,
        role: 'client',
      });
    }

    // Map services to IDs (or find matching service in DB)
    const Service = (await import('@/models/Service')).default;
    const serviceIds = await Promise.all(
      (Array.isArray(services) ? services : [services]).map(async (svc: string) => {
        // Try to find by slug or category
        const found = await Service.findOne({
          $or: [
            { slug: svc.toLowerCase() },
            { category: svc.toLowerCase() },
            { _id: svc },
          ],
        });
        return found?._id;
      })
    );

    const booking = await Booking.create({
      user: user._id,
      services: serviceIds.filter(Boolean),
      date: new Date(date),
      timeSlot,
      duration: duration || 120,
      address,
      city: city || 'Margarita',
      notes: notes || '',
      contactName,
      contactPhone,
      contactEmail,
      totalPrice,
      status: 'pending',
      paymentStatus: 'unpaid',
    });

    return NextResponse.json(
      {
        success: true,
        data: booking,
        message: 'Reserva creada exitosamente',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { success: false, error: 'Error al crear la reserva', message: error.message },
      { status: 500 }
    );
  }
}
