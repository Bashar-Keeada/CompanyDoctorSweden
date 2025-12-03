/**
 * Netlify Serverless Function - Expertansökan
 * Hanterar CV-uppladdning och ansökan
 */

const nodemailer = require('nodemailer');
const busboy = require('busboy');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // Parse multipart form data (för fil-uppladdning)
    const formData = await parseMultipartForm(event);
    
    const { 
      name, 
      email, 
      phone, 
      linkedin, 
      expertise, 
      experience, 
      message,
      cvFile,
      cvFileName 
    } = formData;

    // Validering
    if (!name || !email || !phone || !expertise || !experience || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: 'Alla obligatoriska fält måste fyllas i' 
        })
      };
    }

    if (!cvFile) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: 'CV måste laddas upp' 
        })
      };
    }

    // Konfigurera email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Översätt expertområden
    const expertiseLabels = {
      'strategy': 'Affärsstrategi & Tillväxt',
      'finance': 'Ekonomi & Finans',
      'marketing': 'Marknadsföring & Försäljning',
      'hr': 'HR & Organisation',
      'tech': 'Tech & Digitalisering',
      'quality': 'Kvalitet & Compliance',
      'legal': 'Juridik & Avtal',
      'international': 'Internationalisering',
      'sustainability': 'Hållbarhet & Impact',
      'other': 'Annat'
    };

    const expertiseLabel = expertiseLabels[expertise] || expertise;

    // Email till dig med ansökan
    const mailToYou = {
      from: process.env.SMTP_USER,
      to: 'info@companydoktor.com', // ÄNDRA TILL DIN EMAIL HÄR
      subject: `🩺 Ny Expertansökan - ${expertiseLabel} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0066cc 0%, #00a86b 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">🩺 Company Doktor</h1>
            <p style="color: white; margin: 10px 0 0 0;">Ny Expertansökan</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px;">
            <div style="background: #d4edda; border-left: 4px solid #28a745; padding: 15px; margin-bottom: 20px; border-radius: 4px;">
              <strong>🎯 Expertområde:</strong> ${expertiseLabel}<br>
              <strong>📊 Erfarenhet:</strong> ${experience}
            </div>
            
            <h2 style="color: #16213e; margin-top: 0;">Kandidatinformation</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Namn:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Email:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                  <a href="mailto:${email}" style="color: #0066cc;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Telefon:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${phone}</td>
              </tr>
              ${linkedin ? `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">LinkedIn:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                  <a href="${linkedin}" style="color: #0066cc;" target="_blank">${linkedin}</a>
                </td>
              </tr>
              ` : ''}
            </table>
            
            <h3 style="color: #16213e; margin-top: 30px;">Om kandidaten:</h3>
            <div style="background: white; padding: 20px; border-left: 4px solid #0066cc; border-radius: 4px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
            
            <div style="margin-top: 30px; padding: 20px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
              <strong>📄 CV bifogat:</strong> ${cvFileName}<br>
              <small>Se bifogad fil för fullständigt CV</small>
            </div>
            
            <div style="margin-top: 20px; padding: 20px; background: #d1ecf1; border-left: 4px solid #17a2b8; border-radius: 4px;">
              <strong>⏰ Nästa steg:</strong><br>
              1. Granska CV och bakgrund<br>
              2. Besluta om videointervju (inom 5 arbetsdagar)<br>
              3. Skicka bekräftelse/avslag till kandidaten
            </div>
          </div>
          
          <div style="background: #16213e; padding: 20px; text-align: center; color: white; font-size: 12px;">
            <p>Expertansökan från Company Doktor</p>
            <p>© 2025 Company Doktor by Keeada Management</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: cvFileName,
          content: cvFile,
          contentType: 'application/pdf'
        }
      ]
    };

    // Bekräftelsemail till kandidaten
    const mailToCandidate = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Din ansökan har mottagits - Company Doktor',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0066cc 0%, #00a86b 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">🩺 Company Doktor</h1>
            <p style="color: white; margin: 10px 0 0 0;">Tack för din ansökan!</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px;">
            <h2 style="color: #16213e;">Hej ${name}!</h2>
            
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Tack för att du söker till Company Doktor som expert inom <strong>${expertiseLabel}</strong>. 
              Vi har mottagit din ansökan och ditt CV.
            </p>
            
            <div style="background: white; padding: 20px; border-left: 4px solid #00a86b; border-radius: 4px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #16213e;">📋 Ansökningsprocessen</h3>
              <ol style="line-height: 1.8; color: #333;">
                <li><strong>Granskning</strong> - Vi går igenom din ansökan och ditt CV (1-3 dagar)</li>
                <li><strong>Återkoppling</strong> - Vi återkommer med besked inom 5 arbetsdagar</li>
                <li><strong>Videointervju</strong> - Om vi går vidare bokar vi en videointervju</li>
                <li><strong>Case-uppgift</strong> - Praktisk uppgift för att visa din kompetens</li>
                <li><strong>Onboarding</strong> - Välkommen till teamet!</li>
              </ol>
            </div>
            
            <div style="background: #e8f4f8; padding: 20px; border-radius: 4px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #16213e;">⏰ Vad händer nu?</h3>
              <p style="margin: 10px 0;">
                Vi kommer att granska din ansökan noggrant och återkommer till dig med besked 
                <strong>senast inom 5 arbetsdagar</strong>.
              </p>
              <p style="margin: 10px 0; font-size: 14px; color: #666;">
                Om vi bestämmer oss för att gå vidare kommer vi att kontakta dig för att 
                boka en videointervju. Håll utkik efter email från oss!
              </p>
            </div>
            
            <div style="background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; border-radius: 4px; margin: 20px 0;">
              <strong>💡 Tips under väntetiden:</strong><br>
              • Bekanta dig med vår webbplats och tjänster<br>
              • Tänk på konkreta exempel från din erfarenhet<br>
              • Förbered frågor du har om rollen
            </div>
            
            <p style="font-size: 14px; color: #666; margin-top: 30px;">
              Har du frågor om din ansökan?<br>
              Kontakta oss på <a href="mailto:info@keeada.com" style="color: #0066cc;">info@keeada.com</a>
            </p>
            
            <p style="font-size: 14px; color: #666; margin-top: 20px;">
              Med vänliga hälsningar,<br>
              <strong>Company Doktor Team</strong><br>
              Keeada Management
            </p>
          </div>
          
          <div style="background: #16213e; padding: 20px; text-align: center; color: white; font-size: 12px;">
            <p>Company Doktor - Bli en del av vårt expertteam</p>
            <p>Modulvägen 6, 141 75 Kungens Kurva, Sverige</p>
            <p>© 2025 Company Doktor by Keeada Management</p>
          </div>
        </div>
      `
    };

    // Skicka emails
    await transporter.sendMail(mailToYou);
    await transporter.sendMail(mailToCandidate);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Din ansökan har skickats! Vi återkommer inom 5 arbetsdagar.'
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Något gick fel. Vänligen försök igen eller kontakta oss direkt.',
        details: error.message
      })
    };
  }
};

// Hjälpfunktion för att parse multipart form data
function parseMultipartForm(event) {
  return new Promise((resolve, reject) => {
    const bb = busboy({ 
      headers: event.headers,
      limits: {
        fileSize: 5 * 1024 * 1024 // 5MB max
      }
    });
    
    const result = {};
    
    bb.on('file', (fieldname, file, info) => {
      const { filename, mimeType } = info;
      const chunks = [];
      
      file.on('data', (data) => {
        chunks.push(data);
      });
      
      file.on('end', () => {
        result.cvFile = Buffer.concat(chunks);
        result.cvFileName = filename;
      });
    });
    
    bb.on('field', (fieldname, value) => {
      result[fieldname] = value;
    });
    
    bb.on('finish', () => {
      resolve(result);
    });
    
    bb.on('error', reject);
    
    bb.write(Buffer.from(event.body, 'base64'));
    bb.end();
  });
}
