import { NextRequest, NextResponse } from 'next/server';

// POST /api/contact — Send contact form
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Nombre, email y mensaje son obligatorios' },
        { status: 400 }
      );
    }

    // In a real app, you'd send an email here
    // For now, we just log and return success
    console.log('Contact form submission:', {
      name,
      email,
      phone,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    // TODO: Integrate with email service (e.g., SendGrid, Resend, Nodemailer)
    // await sendEmail({ to: 'info@thecleaningcouple.com', ... })

    return NextResponse.json({
      success: true,
      message: 'Mensaje recibido exitosamente. Te contactaremos pronto.',
    });
  } catch (error: any) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { success: false, error: 'Error al procesar el mensaje', message: error.message },
      { status: 500 }
    );
  }
}
