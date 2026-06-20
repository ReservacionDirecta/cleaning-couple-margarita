import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';

// GET /api/bookings/[id] — Get single booking
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const booking = await Booking.findById(params.id)
      .populate('user', 'name email phone')
      .populate('services', 'name price category duration')
      .populate('property', 'name type location');

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Reserva no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: booking });
  } catch (error: any) {
    console.error('Error fetching booking:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener la reserva', message: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/bookings/[id] — Update booking
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const body = await req.json();
    const allowedFields = [
      'status', 'paymentStatus', 'paymentMethod', 'date', 'timeSlot',
      'duration', 'address', 'city', 'notes', 'contactName', 'contactPhone',
      'contactEmail', 'totalPrice', 'assignedCleaner',
    ];

    // Only allow updating allowed fields
    const updateData: Record<string, any> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    const booking = await Booking.findByIdAndUpdate(
      params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate('user', 'name email phone')
     .populate('services', 'name price category');

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Reserva no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: booking,
      message: 'Reserva actualizada exitosamente',
    });
  } catch (error: any) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { success: false, error: 'Error al actualizar la reserva', message: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/bookings/[id] — Delete booking
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const booking = await Booking.findByIdAndDelete(params.id);

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Reserva no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: null,
      message: 'Reserva eliminada exitosamente',
    });
  } catch (error: any) {
    console.error('Error deleting booking:', error);
    return NextResponse.json(
      { success: false, error: 'Error al eliminar la reserva', message: error.message },
      { status: 500 }
    );
  }
}
