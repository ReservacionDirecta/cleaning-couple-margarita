import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';

// GET /api/services — Fetch all services
export async function GET() {
  try {
    await dbConnect();

    const services = await Service.find({ isAvailable: true })
      .sort({ category: 1, price: 1 })
      .lean();

    return NextResponse.json({ success: true, data: services });
  } catch (error: any) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener los servicios', message: error.message },
      { status: 500 }
    );
  }
}

// POST /api/services — Create a new service
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();

    const { name, slug, category, description, shortDescription, icon, duration, price, includes, doesNotInclude, isPopular } = body;

    if (!name || !slug || !category || !description || !duration || price === undefined) {
      return NextResponse.json(
        { success: false, error: 'Faltan campos obligatorios' },
        { status: 400 }
      );
    }

    const existing = await Service.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Ya existe un servicio con este slug' },
        { status: 409 }
      );
    }

    const service = await Service.create({
      name,
      slug,
      category,
      description,
      shortDescription: shortDescription || description.slice(0, 150),
      icon: icon || 'BsBrush',
      duration,
      price,
      includes: includes || [],
      doesNotInclude: doesNotInclude || [],
      isPopular: isPopular || false,
      isAvailable: true,
    });

    return NextResponse.json(
      { success: true, data: service, message: 'Servicio creado exitosamente' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { success: false, error: 'Error al crear el servicio', message: error.message },
      { status: 500 }
    );
  }
}
