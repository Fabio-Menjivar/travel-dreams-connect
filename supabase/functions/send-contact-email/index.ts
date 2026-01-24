import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone: string;
  destination: string;
  checkIn: string;
  checkOut: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, destination, checkIn, checkOut, message }: ContactEmailRequest = await req.json();

    // Validate required fields
    if (!name || !email || !phone || !destination) {
      return new Response(
        JSON.stringify({ error: "Faltan campos requeridos" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Email to the agency (notification)
    const agencyEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); color: white; padding: 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; }
          .content { padding: 30px; }
          .field { margin-bottom: 20px; padding: 15px; background: #f9fafb; border-radius: 8px; border-left: 4px solid #0ea5e9; }
          .field-label { font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; }
          .field-value { font-size: 16px; color: #1f2937; font-weight: 500; }
          .footer { padding: 20px 30px; background: #f9fafb; text-align: center; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✈️ Nueva solicitud de viaje</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Mundo Travel</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="field-label">Nombre</div>
              <div class="field-value">${name}</div>
            </div>
            <div class="field">
              <div class="field-label">Correo electrónico</div>
              <div class="field-value">${email}</div>
            </div>
            <div class="field">
              <div class="field-label">Teléfono</div>
              <div class="field-value">${phone}</div>
            </div>
            <div class="field">
              <div class="field-label">Destino de interés</div>
              <div class="field-value">${destination}</div>
            </div>
            <div class="field">
              <div class="field-label">Fechas</div>
              <div class="field-value">Salida: ${checkIn} | Regreso: ${checkOut}</div>
            </div>
            <div class="field">
              <div class="field-label">Mensaje</div>
              <div class="field-value">${message}</div>
            </div>
          </div>
          <div class="footer">
            Este mensaje fue enviado desde el formulario de contacto de Mundo Travel
          </div>
        </div>
      </body>
      </html>
    `;

    // Email to the customer (confirmation)
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); color: white; padding: 40px 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; }
          .content { padding: 30px; }
          .highlight { background: linear-gradient(135deg, #f97316 0%, #ec4899 100%); color: white; padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 25px; }
          p { color: #4b5563; line-height: 1.7; margin-bottom: 15px; }
          .info-box { background: #f0fdf4; border: 1px solid #22c55e; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { padding: 20px 30px; background: #f9fafb; text-align: center; color: #6b7280; font-size: 14px; }
          .social { margin-top: 15px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>¡Gracias por contactarnos, ${name}! 🌴</h1>
          </div>
          <div class="content">
            <div class="highlight">
              <p style="color: white; margin: 0; font-size: 18px;">Tu solicitud para <strong>${destination}</strong> ha sido recibida</p>
            </div>
            <p>Hemos recibido tu información y estamos emocionados de ayudarte a planificar tu próxima aventura.</p>
            <div class="info-box">
              <p style="margin: 0; color: #166534;"><strong>⏰ Tiempo de respuesta:</strong> Uno de nuestros asesores se pondrá en contacto contigo en las próximas 24 horas hábiles.</p>
            </div>
            <p>Mientras tanto, puedes seguirnos en nuestras redes sociales para ver los destinos más increíbles y ofertas especiales.</p>
            <p>¡Prepárate para una experiencia inolvidable!</p>
            <p style="margin-top: 30px;"><strong>El equipo de Mundo Travel</strong></p>
          </div>
          <div class="footer">
            <p style="margin: 0;">✈️ Mundo Travel - Tu agencia de viajes en El Salvador</p>
            <p style="margin: 5px 0 0 0;">+503 2222-3333 | info@mundotravel.sv</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send notification email to agency
    // Note: Update "onboarding@resend.dev" to your verified domain email
    const agencyEmail = await resend.emails.send({
      from: "Mundo Travel <onboarding@resend.dev>",
      to: ["onboarding@resend.dev"], // Replace with your agency email
      subject: `Nueva solicitud de viaje - ${destination}`,
      html: agencyEmailHtml,
    });

    console.log("Agency notification sent:", agencyEmail);

    // Send confirmation email to customer
    const customerEmail = await resend.emails.send({
      from: "Mundo Travel <onboarding@resend.dev>",
      to: [email],
      subject: "¡Recibimos tu solicitud! - Mundo Travel",
      html: customerEmailHtml,
    });

    console.log("Customer confirmation sent:", customerEmail);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Correos enviados exitosamente",
        agencyEmailId: agencyEmail.data?.id,
        customerEmailId: customerEmail.data?.id,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

Deno.serve(handler);
