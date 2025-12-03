/**
 * Netlify Serverless Function - Kontaktformulär
 * Hanterar formulärinskick och skickar email
 */

const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Endast POST-förfrågningar
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // Parse formulärdata
    const data = JSON.parse(event.body);
    const { name, company, email, phone, service, message } = data;

    // Validering
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: 'Namn, email och meddelande är obligatoriska' 
        })
      };
    }

    // Email-validering
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Ogiltig email-adress' })
      };
    }

    // Konfigurera email-transportör
    // OBS: Lägg till dessa miljövariabler i Netlify Dashboard
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER, // info@keeada.com
        pass: process.env.SMTP_PASS  // App-specifikt lösenord
      }
    });

    // Email till dig (Keeada)
    const mailToYou = {
      from: process.env.SMTP_USER,
      to: 'info@companydoktor.com', // ÄNDRA TILL DIN EMAIL HÄR
      subject: `Ny kontaktförfrågan från Company Doktor - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0066cc 0%, #00a86b 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">🏥 Company Doktor</h1>
            <p style="color: white; margin: 10px 0 0 0;">Ny kontaktförfrågan</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px;">
            <h2 style="color: #16213e; margin-top: 0;">Kontaktinformation</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Namn:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Företag:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${company || 'Ej angivet'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Email:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                  <a href="mailto:${email}" style="color: #0066cc;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Telefon:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${phone || 'Ej angivet'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Intresserad av:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${service || 'Ej specificerat'}</td>
              </tr>
            </table>
            
            <h3 style="color: #16213e; margin-top: 30px;">Meddelande:</h3>
            <div style="background: white; padding: 20px; border-left: 4px solid #0066cc; border-radius: 4px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
            
            <div style="margin-top: 30px; padding: 20px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
              <strong>⏰ Åtgärd krävs:</strong> Svara på denna förfrågan inom 24 timmar för bästa kundupplevelse.
            </div>
          </div>
          
          <div style="background: #16213e; padding: 20px; text-align: center; color: white; font-size: 12px;">
            <p>Skickat från Company Doktor kontaktformulär</p>
            <p>© 2025 Company Doktor by Keeada Management</p>
          </div>
        </div>
      `
    };

    // Bekräftelse-email till kunden
    const mailToCustomer = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Tack för din förfrågan - Company Doktor',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0066cc 0%, #00a86b 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">🏥 Company Doktor</h1>
            <p style="color: white; margin: 10px 0 0 0;">Vi har tagit emot din förfrågan</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px;">
            <h2 style="color: #16213e;">Hej ${name}!</h2>
            
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Tack för att du kontaktade Company Doktor. Vi har tagit emot din förfrågan 
              och återkommer till dig inom <strong>24 timmar</strong>.
            </p>
            
            <div style="background: white; padding: 20px; border-left: 4px solid #00a86b; border-radius: 4px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #16213e;">Vad händer nu?</h3>
              <ol style="line-height: 1.8; color: #333;">
                <li>Vi går igenom din förfrågan noggrant</li>
                <li>En av våra experter kontaktar dig för en första diskussion</li>
                <li>Vi bokar in ett kostnadsfritt konsultationsmöte</li>
                <li>Vi gör en initial bedömning av ditt företags behov</li>
              </ol>
            </div>
            
            <div style="background: #e8f4f8; padding: 20px; border-radius: 4px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #16213e;">📞 Behöver du prata direkt?</h3>
              <p style="margin: 10px 0;">
                <strong>Telefon:</strong> <a href="tel:+46707825082" style="color: #0066cc;">+46 70 782 50 82</a><br>
                <strong>Email:</strong> <a href="mailto:info@keeada.com" style="color: #0066cc;">info@keeada.com</a>
              </p>
            </div>
            
            <p style="font-size: 14px; color: #666; margin-top: 30px;">
              Med vänliga hälsningar,<br>
              <strong>Company Doktor Team</strong><br>
              Keeada Management
            </p>
          </div>
          
          <div style="background: #16213e; padding: 20px; text-align: center; color: white; font-size: 12px;">
            <p>Company Doktor - Din professionella doktor för företag</p>
            <p>Modulvägen 6, 141 75 Kungens Kurva, Sverige</p>
            <p>© 2025 Company Doktor by Keeada Management</p>
          </div>
        </div>
      `
    };

    // Skicka båda emails
    await transporter.sendMail(mailToYou);
    await transporter.sendMail(mailToCustomer);

    // Framgång!
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Din förfrågan har skickats! Vi återkommer inom 24 timmar.'
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Något gick fel. Vänligen försök igen eller ring oss direkt.',
        details: error.message
      })
    };
  }
};
