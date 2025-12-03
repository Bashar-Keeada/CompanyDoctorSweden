# ✅ Deployment Checklista - Company Doktor

## 📍 Var är du nu?

Kryssa i vad du redan har gjort:

### Förberedelser
- [ ] Jag har ett GitHub-konto
- [ ] Jag har ett Netlify-konto
- [ ] Jag har tillgång till Loopia (companydoktor.com & .se)
- [ ] Jag har tillgång till Gmail (info@companydoktor.com)

---

## 🎯 Deployment-process

### STEG 1: GitHub (15 min)
- [ ] Skapat repository: `company-doktor`
- [ ] Laddat upp alla projektfiler
- [ ] Kan se filerna på github.com/[ditt-användarnamn]/company-doktor
- [ ] Verifierat att `netlify/functions/` mappen finns

### STEG 2: Netlify - Initial Deploy (10 min)
- [ ] Registrerat Netlify-konto
- [ ] Kopplat GitHub till Netlify
- [ ] Importerat `company-doktor` repository
- [ ] Sajten är deployad
- [ ] Testat tillfällig URL (https://xxx.netlify.app)
- [ ] Sajten visas korrekt på tillfällig URL

### STEG 3: Gmail App Password (10 min)
- [ ] Aktiverat 2-stegsverifiering på Gmail
- [ ] Gått till: https://myaccount.google.com/apppasswords
- [ ] Skapat app password: "Company Doktor Netlify"
- [ ] Kopierat 16-tecken lösenordet
- [ ] Sparat lösenordet säkert (kommer inte visas igen!)

### STEG 4: Netlify - SMTP Configuration (10 min)
- [ ] Gått till: Site Settings → Environment Variables
- [ ] Lagt till `SMTP_HOST` = `smtp.gmail.com`
- [ ] Lagt till `SMTP_PORT` = `587`
- [ ] Lagt till `SMTP_USER` = `info@companydoktor.com`
- [ ] Lagt till `SMTP_PASS` = `[mitt 16-tecken app password]`
- [ ] Triggat redeploy (Deploys → Trigger deploy → Deploy site)
- [ ] Väntat tills deployment är klar

### STEG 5: Netlify - Custom Domains (5 min)
- [ ] Gått till: Site Settings → Domain Management
- [ ] Lagt till: `companydoktor.com`
- [ ] Lagt till: `www.companydoktor.com`
- [ ] Lagt till: `companydoktor.se`
- [ ] Lagt till: `www.companydoktor.se`
- [ ] Satt primary domain (vald vilken som huvuddomän)
- [ ] Alla domäner visas i listan

### STEG 6: Hitta Netlify DNS-info (2 min)
- [ ] Klickat på `companydoktor.com` i domain-listan
- [ ] Sett "DNS configuration" sektionen
- [ ] Antecknat min Netlify subdomain: `_____________________________.netlify.app`
- [ ] Redo att konfigurera DNS i Loopia

### STEG 7: Loopia - companydoktor.com (5 min)
- [ ] Loggat in på: https://customerzone.loopia.se
- [ ] Navigerat till: Domäner → companydoktor.com → DNS-inställningar
- [ ] **RADERAT gamla A och CNAME records** (om de fanns)
- [ ] **Lagt till A Record:**
  - Hostname: `@` (eller tomt)
  - Type: `A`
  - Value: `75.2.60.5`
  - TTL: `3600`
- [ ] **Lagt till CNAME Record:**
  - Hostname: `www`
  - Type: `CNAME`
  - Value: `[min-netlify-subdomain].netlify.app`
  - TTL: `3600`
- [ ] **SPARAT ändringar**

### STEG 8: Loopia - companydoktor.se (5 min)
- [ ] Navigerat till: Domäner → companydoktor.se → DNS-inställningar
- [ ] **RADERAT gamla A och CNAME records** (om de fanns)
- [ ] **Lagt till A Record:**
  - Hostname: `@` (eller tomt)
  - Type: `A`
  - Value: `75.2.60.5`
  - TTL: `3600`
- [ ] **Lagt till CNAME Record:**
  - Hostname: `www`
  - Type: `CNAME`
  - Value: `[min-netlify-subdomain].netlify.app`
  - TTL: `3600`
- [ ] **SPARAT ändringar**

### STEG 9: Vänta på DNS (1-4 timmar)
- [ ] Antecknat tid när jag ändrade DNS: `_____:_____`
- [ ] Väntat minst 30 minuter
- [ ] Testat med: https://dnschecker.org
  - [ ] `companydoktor.com` (typ: A) → visar `75.2.60.5`
  - [ ] `www.companydoktor.com` (typ: CNAME) → visar netlify.app
  - [ ] `companydoktor.se` (typ: A) → visar `75.2.60.5`
  - [ ] `www.companydoktor.se` (typ: CNAME) → visar netlify.app
- [ ] Gröna checkmarks över hela världen på dnschecker.org

### STEG 10: Verifiera SSL (15-30 min efter DNS)
- [ ] Gått till Netlify: Site Settings → Domain Management → HTTPS
- [ ] Status visar: **"Certificate active"** ✅
- [ ] (Om "Verifying DNS" - väntat 15-30 min till)

---

## 🧪 TEST: Funktionalitet

### Test 1: Domäner & HTTPS
- [ ] `https://companydoktor.com` - fungerar och visar hänglås
- [ ] `https://www.companydoktor.com` - fungerar och visar hänglås
- [ ] `https://companydoktor.se` - fungerar och visar hänglås
- [ ] `https://www.companydoktor.se` - fungerar och visar hänglås
- [ ] `http://companydoktor.com` - omdirigerar automatiskt till https
- [ ] Ingen "not secure" varning i någon browser

### Test 2: Språkväxling
- [ ] Öppnat sajten (standard: Svenska)
- [ ] Klickat på "English" knappen
- [ ] All text ändrades till engelska
- [ ] Klickat på "Svenska" knappen
- [ ] All text ändrades tillbaka till svenska
- [ ] Inga felmeddelanden i console (F12)

### Test 3: Kontaktformulär
- [ ] Scrollat till kontaktformuläret
- [ ] Fyllt i:
  - Namn: `________________________`
  - Email: `________________________` (min egen test-email)
  - Telefon: `________________________`
  - Meddelande: `________________________`
- [ ] Klickat "Skicka meddelande"
- [ ] Såg success-meddelande: ✅ "Tack! Vi återkommer inom 24 timmar."
- [ ] **Kollat mailbox på `info@companydoktor.com`:**
  - [ ] Fått email med ämne: "Ny kontaktförfrågan från Company Doktor - [namn]"
  - [ ] Emailet innehåller alla formulärdata
  - [ ] Emailet ser professionellt ut (HTML-formaterat)
- [ ] **Kollat test-mailbox:**
  - [ ] Fått bekräftelse-email från Company Doktor
  - [ ] Emailet tackar för kontakten

### Test 4: Expertansökan
- [ ] Klickat på "Bli Expert" i footern (eller navigerat till formuläret)
- [ ] Fyllt i:
  - Namn: `________________________`
  - Email: `________________________`
  - Telefon: `________________________`
  - Expertisområde: `________________________` (valt från dropdown)
  - CV: `________________________` (laddat upp testfil - PDF eller Word)
- [ ] Klickat "Skicka ansökan"
- [ ] Såg success-meddelande
- [ ] **Kollat mailbox på `info@companydoktor.com`:**
  - [ ] Fått email med ämne: "🩺 Ny Expertansökan - [expertisområde] - [namn]"
  - [ ] Emailet innehåller all ansökningsdata
  - [ ] **CV-filen är bifogad** (kan öppna den)
- [ ] **Kollat test-mailbox:**
  - [ ] Fått bekräftelse-email från Company Doktor

### Test 5: Mobil & Responsivitet
- [ ] Öppnat sajten på smartphone
- [ ] Hamburgermeny (☰) visas på mobil
- [ ] Hamburgermeny öppnas och stängs korrekt
- [ ] All text är läsbar (inte för liten)
- [ ] Kontaktformulär fungerar på mobil
- [ ] Inga horisontella scrollbars
- [ ] Bilder laddas och ser bra ut

### Test 6: Performance & Loading
- [ ] Sajten laddar snabbt (< 3 sekunder)
- [ ] Bilder laddas korrekt
- [ ] Inga trasiga länkar (404)
- [ ] Smooth scrolling fungerar
- [ ] Inga console-errors (F12 → Console)

---

## 🎉 SLUTGILTIG CHECKLISTA

### Teknisk Konfiguration
- [ ] GitHub repository live med alla filer
- [ ] Netlify deployment fungerar
- [ ] SMTP environment variables konfigurerade
- [ ] Custom domains anslutna i Netlify
- [ ] DNS korrekt konfigurerade i Loopia
- [ ] SSL-certifikat aktivt på alla domäner
- [ ] HTTPS tvingar på alla requests

### Funktionalitet
- [ ] Alla 4 domäner fungerar (com/se, www/root)
- [ ] Språkväxling fungerar (Svenska ⟷ English)
- [ ] Kontaktformulär skickar email
- [ ] Expertansökan skickar email med CV
- [ ] Bekräftelsemail skickas till kunder
- [ ] Mobil-vy fungerar perfekt
- [ ] Alla länkar fungerar

### Dokumentation
- [ ] README.md uppdaterad
- [ ] Deployment-guider lästa
- [ ] DNS-konfiguration dokumenterad
- [ ] SMTP-credentials sparade säkert

### Business
- [ ] Email `info@companydoktor.com` fungerar och mottar
- [ ] Kontaktuppgifter är korrekta på sajten
- [ ] Tjänster och priser är uppdaterade
- [ ] Legal information (om det behövs) är inkluderad

---

## 🚀 DU ÄR KLAR!

**Om alla ovanstående är ikryssade - GRATTIS!** 🎉

Din sajt är nu:
- ✅ **Live** på internet
- ✅ **Säker** (HTTPS)
- ✅ **Funktionell** (formulär skickar email)
- ✅ **Professionell** (custom domains)
- ✅ **Skalbar** (Netlify auto-scaling)
- ✅ **Kostnadseffektiv** (gratis hosting!)

---

## 📊 Nästa Steg (Valfritt)

### Marknadsföring
- [ ] Dela länk på sociala medier
- [ ] Uppdatera visitkort med ny URL
- [ ] Skicka nyhetsbrev till kunder
- [ ] Lägg till på LinkedIn/Facebook business page

### SEO & Analytics
- [ ] Lägg till Google Analytics
- [ ] Registrera på Google Search Console
- [ ] Skapa och skicka in sitemap.xml
- [ ] Optimera meta-tags för SEO

### Innehåll
- [ ] Lägg till fler case studies
- [ ] Skapa blogg-sektion
- [ ] Lägg till kundrecensioner
- [ ] Uppdatera team-sida

### Teknisk Förbättring
- [ ] Lägg till cookie-banner (GDPR)
- [ ] Implementera chat-widget
- [ ] Lägg till booking-system
- [ ] Integrera CRM-system

---

## 📞 Support

**Om något inte fungerar:**

1. **Kolla först:** Troubleshooting-sektionen i `DOMAIN_CONNECTION_GUIDE.md`
2. **DNS-problem:** Använd https://dnschecker.org för att verifiera
3. **Email-problem:** Dubbelkolla SMTP environment variables i Netlify
4. **SSL-problem:** Vänta 30 min, sedan "Renew certificate" i Netlify

**Behöver du hjälp?** Berätta:
- Vilket steg du är på
- Vad som inte fungerar (felmeddelande)
- Vad du redan har provat

Jag hjälper dig lösa det! 💪

---

## 📅 Underhållsschema

### Varje månad:
- [ ] Testa alla formulär
- [ ] Kolla att emails kommer fram
- [ ] Verifiera SSL-certifikat (auto-förnyas)
- [ ] Uppdatera innehåll om nödvändigt

### Varje kvartal:
- [ ] Backup av repository (GitHub gör detta automatiskt)
- [ ] Kolla analytics och förbättra
- [ ] Testa på nya enheter/browsers
- [ ] Uppdatera priser/tjänster

### Årligen:
- [ ] Förnya domäner (companydoktor.com & .se)
- [ ] Review och uppdatera design
- [ ] Audit SEO-performance
- [ ] Planera nya features

---

**Lycka till med din nya sajt! 🚀**

*Skapad: 2024-11-26*
*Projekt: Company Doktor Website*
*Version: 1.0*
