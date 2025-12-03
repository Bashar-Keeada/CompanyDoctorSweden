# 📧 Email Setup Guide - Company Doktor

## ✅ Jag har redan ändrat mottagare-emailen!

I både `contact-form.js` och `expert-application.js` är nu mottagare-emailen ändrad till:
```
info@companydoktor.com
```

---

## 🎯 Snabbstart - Gmail Setup (15 minuter)

### Steg 1: Skapa Gmail App Password

1. Gå till **https://myaccount.google.com/security**
2. Under "How you sign in to Google":
   - Klicka **"2-Step Verification"**
   - Aktivera om inte redan aktiverat
3. Scrolla ner → Klicka **"App passwords"**
4. Välj:
   - App: **Mail**
   - Device: **Other** → Skriv "Netlify"
5. Klicka **"Generate"**
6. **Kopiera 16-siffriga lösenordet** (typ: `abcd efgh ijkl mnop`)

### Steg 2: Lägg till i Netlify

1. Gå till **https://app.netlify.com**
2. Välj din site: **company-doktor**
3. **Site configuration** → **Environment variables**
4. Lägg till dessa 4 variabler:

```bash
# Variabel 1
Key: SMTP_HOST
Value: smtp.gmail.com

# Variabel 2
Key: SMTP_PORT
Value: 587

# Variabel 3
Key: SMTP_USER
Value: din-gmail@gmail.com

# Variabel 4
Key: SMTP_PASS
Value: abcd efgh ijkl mnop  # (ditt App Password)
```

### Steg 3: Pusha Ändringar till GitHub

Eftersom jag ändrade email-addressen i functions-filerna måste du pusha detta till GitHub:

#### Med GitHub Desktop:
1. Öppna GitHub Desktop
2. Du ser ändringar i:
   - `netlify/functions/contact-form.js`
   - `netlify/functions/expert-application.js`
3. Skriv commit message: "Changed recipient email to info@companydoktor.com"
4. Klicka **"Commit to main"**
5. Klicka **"Push origin"**

#### Med Terminal:
```bash
cd /path/to/company-doktor
git add netlify/functions/
git commit -m "Changed recipient email to info@companydoktor.com"
git push
```

### Steg 4: Vänta på Auto-Deploy

- Netlify deployer automatiskt när du pushar till GitHub
- Vänta 1-2 minuter
- Kolla **"Deploys"** i Netlify Dashboard

### Steg 5: Testa!

1. Gå till **https://companydoktor.com#contact**
2. Fyll i formulär med din egen email
3. Klicka **"Skicka"**
4. **Resultat:**
   - ✅ Email till **info@companydoktor.com** (eller din Gmail)
   - ✅ Bekräftelsemail till din email

---

## 🔄 Vill du byta till en annan email?

### Om du senare vill ändra mottagare:

1. Öppna filen: `netlify/functions/contact-form.js`
2. Hitta rad ~60 där det står:
   ```javascript
   to: 'info@companydoktor.com',
   ```
3. Ändra till din nya email:
   ```javascript
   to: 'din-nya-email@example.com',
   ```

4. Gör samma sak i: `netlify/functions/expert-application.js` (rad ~100)

5. Commit och push till GitHub

---

## 📧 Olika Email-Tjänster

### Gmail (Personlig eller Google Workspace)
```
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_USER = din-email@gmail.com (eller @companydoktor.com)
SMTP_PASS = App Password (16 tecken)
```

### SendGrid (Rekommenderas för produktion)
```
SMTP_HOST = smtp.sendgrid.net
SMTP_PORT = 587
SMTP_USER = apikey
SMTP_PASS = SG.xxxxxxxxxxxxxxxxxx (SendGrid API Key)
```

### Outlook/Office365
```
SMTP_HOST = smtp.office365.com
SMTP_PORT = 587
SMTP_USER = din-email@outlook.com
SMTP_PASS = ditt-lösenord
```

### Loopia Email
```
SMTP_HOST = send.one.com
SMTP_PORT = 587
SMTP_USER = info@companydoktor.com
SMTP_PASS = ditt-loopia-lösenord
```

---

## 🚨 Vanliga Problem & Lösningar

### Problem 1: "Invalid login" eller "Authentication failed"

**Orsak:** Fel användarnamn eller lösenord

**Lösning för Gmail:**
- Använd **App Password**, INTE ditt vanliga Gmail-lösenord
- Kolla att 2FA är aktiverat
- Skapa nytt App Password om osäker

**Lösning för SendGrid:**
- Använd exakt texten "apikey" som SMTP_USER
- Kolla att API-nyckeln är korrekt (börjar med SG.)
- Verifiera din Sender Identity i SendGrid

### Problem 2: Formulär ger "Network error"

**Lösning:**
1. Öppna Netlify → **Functions** → **contact-form**
2. Se senaste körningar för felmeddelanden
3. Vanligaste problemet: Environment variables saknas eller är felaktiga
4. Dubbelkolla alla 4 variabler (SMTP_HOST, PORT, USER, PASS)

### Problem 3: Email kommer inte fram

**Lösning:**
1. Kolla **Spam/Skräppost**-mappen
2. I Gmail: Sök efter "Company Doktor"
3. Vänta 2-5 minuter (kan ta lite tid)
4. Kolla SendGrid Activity (om du använder SendGrid)

### Problem 4: Bekräftelsemail till kunden funkar inte

**Lösning:**
1. Kolla att kundens email är rätt stavad
2. Vissa email-providers blockerar automatiska emails
3. Be kunden kolla spam-mapp

---

## 🧪 Debug-Guide

### Steg 1: Kolla Function Logs

```bash
# I Netlify Dashboard
Functions → contact-form → View recent logs

# Leta efter:
- "Error: Missing credentials" → Lägg till environment variables
- "Error: Invalid login" → Fel användarnamn/lösenord
- "Error: Message failed" → SMTP-server-problem
```

### Steg 2: Testa SMTP Credentials Manuellt

Du kan testa om dina SMTP-credentials fungerar utanför Netlify:

```javascript
// test-smtp.js (kör lokalt)
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'din-email@gmail.com',
    pass: 'ditt-app-password'
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.log('❌ SMTP Error:', error);
  } else {
    console.log('✅ SMTP fungerar!');
  }
});
```

### Steg 3: Browser Console

1. Öppna sajten
2. Tryck **F12**
3. Gå till **Console**
4. Skicka formulär
5. Kolla efter felmeddelanden

---

## 📊 Email-Gränser

### Gmail (Gratis)
- **500 emails/dag** från Gmail-konto
- **2000 emails/dag** från Google Workspace
- Perfekt för: SMB med < 50 förfrågningar/dag

### SendGrid (Free Tier)
- **100 emails/dag** (3000/månad)
- Bättre deliverability än Gmail
- Email-statistik inkluderad
- Perfekt för: 20-50 förfrågningar/dag

### SendGrid (Essentials Plan - $20/mån)
- **40,000 emails/månad**
- Email validering
- Dedikerad IP (valfritt)
- Support
- Perfekt för: 500+ förfrågningar/månad

---

## 🎯 Best Practices

### 1. Använd App Passwords (Gmail)
❌ **FEL:** Använda ditt vanliga Gmail-lösenord  
✅ **RÄTT:** Använda App Password

### 2. Aktivera 2FA
❌ **FEL:** Ingen 2FA  
✅ **RÄTT:** 2-faktor-autentisering aktiverad

### 3. Verifiera Sender (SendGrid)
❌ **FEL:** Skicka från overifierad email  
✅ **RÄTT:** Verifiera din avsändare-email

### 4. Spara Credentials Säkert
❌ **FEL:** Hårdkoda lösenord i kod  
✅ **RÄTT:** Använda Netlify Environment Variables

### 5. Testa Regelbundet
❌ **FEL:** Bara testa en gång  
✅ **RÄTT:** Testa veckovis att formulär fungerar

---

## 🔐 Säkerhet

### Environment Variables
- **ALDRIG** commit SMTP_PASS till Git
- **ALLTID** använd Environment Variables i Netlify
- **ROTERA** lösenord var 6:e månad

### App Passwords
- Skapa separata App Passwords för olika tjänster
- Radera oanvända App Passwords
- Håll koll på aktiva passwords

### API Keys (SendGrid)
- Använd "Full Access" endast om nödvändigt
- Skapa nya API keys för olika miljöer (dev/prod)
- Radera gamla/oanvända keys

---

## ✅ Checklista

- [ ] 2FA aktiverat på Gmail/Email-tjänst
- [ ] App Password skapat (eller SendGrid API Key)
- [ ] 4 Environment Variables tillagda i Netlify
- [ ] Ändrat mottagare-email i functions-filerna
- [ ] Pushat ändringar till GitHub
- [ ] Netlify auto-deployat (väntat 2 min)
- [ ] Testat kontaktformulär
- [ ] Email mottaget på info@companydoktor.com
- [ ] Bekräftelsemail mottaget av kund
- [ ] Testat expertansökan
- [ ] CV-email mottaget med bilaga
- [ ] Spam-mappen kollad (om email saknas)

---

## 📞 Behöver Hjälp?

**Om formulär inte fungerar:**
1. Kolla denna guide igen
2. Se Netlify Function logs
3. Testa med Gmail först (enklast)
4. Kontakta: info@keeada.com

**Gmail Support:**
- https://support.google.com/mail

**SendGrid Support:**
- https://support.sendgrid.com

**Netlify Support:**
- https://answers.netlify.com

---

## 🎉 Sammanfattning

**Du har nu:**
- ✅ Backend som skickar emails
- ✅ Mottagare-email satt till info@companydoktor.com
- ✅ Professionella HTML-emails
- ✅ Bekräftelseemails till kunder
- ✅ CV-uppladdning med email-bilaga

**Nästa steg:**
1. Konfigurera SMTP (Gmail eller SendGrid)
2. Lägg till Environment Variables
3. Pusha till GitHub
4. Testa formulär
5. 🎊 Klart!

---

**Skapad:** 2025-01-23  
**Status:** ✅ Ready to Configure  
**Uppskattad setup-tid:** 15 minuter  

**Lycka till!** 📧🚀
