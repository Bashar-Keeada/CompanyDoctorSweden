# 🚀 Complete Deployment Guide - Company Doktor

## Fullständig guide för att flytta till eget domännamn med backend-funktionalitet

---

## 📋 Snabbstart-sammanfattning

**Rekommenderad lösning:** Netlify + Eget Domännamn

**Totalkostnad:** ~100-150 kr/år (endast domännamn, hosting är gratis!)

**Tid att sätta upp:** 1-2 timmar

**Resultat:** Professionell webbplats på `companydoktor.se` med fungerande backend

---

## Steg 1: Köp Domännamn 🌐

### Rekommenderat: Loopia.se (Svensk leverantör)

1. Gå till **https://loopia.se**
2. Sök efter önskat domännamn:
   - `companydoktor.se` (Rekommenderas!)
   - `companyoktor.com`
   - `dindoktor.se`

3. Lägg i varukorgen (~100-150 kr/år)
4. **Viktigt:** Lägg INTE till webbhotell! (Vi använder Netlify istället)
5. Slutför köpet

### Alternativ: Namecheap.com (Internationell, ofta billigare)

1. Gå till **https://namecheap.com**
2. Sök efter domännamn
3. Lägg till i varukorg (~$10-15/år)
4. Aktivera **WhoisGuard** (gratis - döljer dina personuppgifter)
5. Slutför köpet

---

## Steg 2: Sätt upp Netlify (Gratis hosting med backend!) ⭐

### 2.1 Skapa Netlify-konto

1. Gå till **https://netlify.com**
2. Klicka "Sign up" → Välj "Sign up with GitHub" (rekommenderas)
3. Om du inte har GitHub:
   - Skapa först GitHub-konto på https://github.com
   - Återvänd sedan till Netlify och logga in

### 2.2 Skapa Git Repository

#### Alternativ A: Via GitHub Desktop (Enklast)

1. Ladda ner **GitHub Desktop** från https://desktop.github.com
2. Installera och logga in med ditt GitHub-konto
3. Klicka "File" → "Add Local Repository"
4. Navigera till din Company Doktor-mapp
5. Om mappen inte är ett repository, klicka "Create Repository"
6. Skriv:
   - **Name:** company-doktor
   - **Description:** Company Doktor Landing Page
   - **Klicka:** "Create Repository"
7. Klicka "Publish repository" längst upp
8. **Avmarkera** "Keep this code private" (för gratis Netlify)
9. Klicka "Publish Repository"

#### Alternativ B: Via Terminal/Command Line

```bash
# Navigera till din projektmapp
cd /path/to/company-doktor

# Initiera Git repository
git init

# Lägg till alla filer
git add .

# Första commit
git commit -m "Initial commit - Company Doktor"

# Skapa repository på GitHub (måste göras på github.com först)
# Gå till github.com → New repository → Skapa "company-doktor"

# Koppla till GitHub (ersätt med ditt användarnamn)
git remote add origin https://github.com/DITT_ANVÄNDARNAMN/company-doktor.git
git branch -M main
git push -u origin main
```

### 2.3 Deploya till Netlify

1. Logga in på **https://app.netlify.com**
2. Klicka **"Add new site"** → **"Import an existing project"**
3. Välj **"Deploy with GitHub"**
4. Auktorisera Netlify att komma åt ditt GitHub-konto
5. Välj repository **"company-doktor"**
6. **Build settings:**
   - **Build command:** (lämna tomt)
   - **Publish directory:** `.` (punkt)
   - **Functions directory:** `netlify/functions`
7. Klicka **"Deploy site"**

🎉 **Din sajt är nu live!** Du får en tillfällig URL typ: `https://clever-cupcake-abc123.netlify.app`

### 2.4 Konfigurera Email-backend (VIKTIGT!)

För att formulären ska fungera måste du sätta upp email-konfiguration:

#### Alternativ 1: Använda Gmail (Enklast)

1. Gå till din Gmail-konto
2. Aktivera **2-faktor-autentisering** (om inte redan aktiverat)
3. Gå till **Google Account** → **Security** → **App passwords**
4. Skapa ett nytt App Password:
   - **App:** Mail
   - **Device:** Netlify
   - **Kopiera det 16-siffriga lösenordet**

5. I Netlify:
   - Gå till **Site settings** → **Environment variables**
   - Lägg till följande variabler:
   
   ```
   SMTP_HOST = smtp.gmail.com
   SMTP_PORT = 587
   SMTP_USER = info@keeada.com  (din Gmail-adress)
   SMTP_PASS = xxxx xxxx xxxx xxxx  (App Password från steg 4)
   ```

#### Alternativ 2: Använda SendGrid (Professionellt, rekommenderas för produktion)

1. Skapa konto på **https://sendgrid.com** (Gratis för 100 emails/dag)
2. Verifiera din email
3. Gå till **Settings** → **API Keys** → **Create API Key**
4. Kopiera API-nyckeln
5. I Netlify Environment variables:
   
   ```
   SMTP_HOST = smtp.sendgrid.net
   SMTP_PORT = 587
   SMTP_USER = apikey
   SMTP_PASS = (din SendGrid API-nyckel)
   ```

#### Alternativ 3: Använda One.com Email (Om du har webhotell där)

```
SMTP_HOST = send.one.com
SMTP_PORT = 587
SMTP_USER = info@companydoktor.se
SMTP_PASS = (ditt email-lösenord)
```

---

## Steg 3: Koppla Ditt Domännamn till Netlify 🔗

### 3.1 Lägg till domän i Netlify

1. I Netlify Dashboard, gå till **Site settings** → **Domain management**
2. Klicka **"Add custom domain"**
3. Skriv in ditt domännamn: `companydoktor.se`
4. Klicka **"Verify"** → **"Add domain"**
5. Netlify visar nu DNS-instruktioner

### 3.2 Uppdatera DNS hos Loopia

1. Logga in på **https://customerzone.loopia.se**
2. Välj din domän **companydoktor.se**
3. Gå till **DNS-inställningar**
4. Ta bort alla befintliga A-records och CNAME-records
5. Lägg till följande records (från Netlify):

#### Metod A: Apex Domain (Rekommenderas)

```
Type: A
Name: @
Value: 75.2.60.5
TTL: 3600

Type: CNAME
Name: www
Value: clever-cupcake-abc123.netlify.app  (din Netlify-URL)
TTL: 3600
```

#### Metod B: Netlify DNS (Enklast, men kostar ~5$/månad)

1. I Netlify, klicka **"Set up Netlify DNS"**
2. Följ instruktionerna
3. Hos Loopia, ändra nameservers till:
   ```
   dns1.p01.nsone.net
   dns2.p01.nsone.net
   dns3.p01.nsone.net
   dns4.p01.nsone.net
   ```

### 3.3 Vänta på DNS-propagering

- **Tid:** 5 minuter till 48 timmar (oftast 1-2 timmar)
- **Testa:** Gå till https://companydoktor.se
- **Om det inte fungerar:** Vänta längre eller rensa webbläsarcache

### 3.4 Aktivera HTTPS (Automatiskt!)

Netlify aktiverar automatiskt gratis SSL-certifikat via Let's Encrypt.

1. Gå till **Site settings** → **Domain management** → **HTTPS**
2. Vänta 1-2 minuter
3. **"Force HTTPS"** aktiveras automatiskt
4. ✅ Din sajt är nu säker: https://companydoktor.se

---

## Steg 4: Testa att Backend Fungerar 🧪

### 4.1 Testa Kontaktformulär

1. Gå till https://companydoktor.se#contact
2. Fyll i formuläret:
   - **Namn:** Test Testsson
   - **Företag:** Test AB
   - **Email:** din-egen-email@example.com
   - **Telefon:** 0701234567
   - **Meddelande:** Detta är ett test
3. Klicka **"Skicka förfrågan"**
4. Du ska få:
   - ✅ Success-meddelande på sajten
   - ✅ Email till info@keeada.com
   - ✅ Bekräftelsemail till din-egen-email

### 4.2 Testa Expertansökan

1. Gå till https://companydoktor.se#join-clinic
2. Scrolla ner till ansökningsformuläret
3. Fyll i alla fält och ladda upp ett test-PDF
4. Klicka **"Skicka ansökan"**
5. Du ska få:
   - ✅ Success-meddelande
   - ✅ Email med CV bifogat till info@keeada.com
   - ✅ Bekräftelsemail till kandidaten

### 4.3 Felsökning om det inte fungerar

#### Problem: "Network error" eller timeout

**Lösning:**
1. Öppna Netlify Functions logs:
   - Gå till **Site** → **Functions** → Välj funktion
   - Klicka på senaste körningen
   - Se felmeddelande

2. Vanliga problem:
   - **SMTP credentials saknas** → Lägg till Environment variables (Se Steg 2.4)
   - **Fel port eller host** → Dubbelkolla SMTP-inställningar
   - **Gmail blockerar** → Använd App Password, inte vanligt lösenord

#### Problem: Emails skickas inte

**Lösning:**
1. Kolla Netlify Function logs
2. Verifiera att environment variables är rätt satta
3. Testa SMTP-credentials manuellt
4. Om Gmail: Kolla att 2FA är aktiverat och App Password används
5. Kolla spam/skräppost-mapp

#### Problem: CV-filen laddar inte upp

**Lösning:**
1. Kolla att filen är PDF och under 5MB
2. Kolla browser console för fel (F12)
3. Testa med en mindre fil först

---

## Steg 5: Sätt upp Email-konto (Professionellt) 📧

### Alternativ A: Google Workspace (Rekommenderas)

**Kostnad:** ~60 kr/månad per användare

1. Gå till **https://workspace.google.com**
2. Välj **Business Starter** (60 kr/mån)
3. Ange ditt domännamn: **companydoktor.se**
4. Skapa användare: **info@companydoktor.se**
5. Verifiera domän:
   - Google ger dig en TXT-record
   - Lägg till i Loopia DNS
   - Verifiera efter 10 minuter

6. Konfigurera MX-records hos Loopia:
   ```
   Priority: 1
   MX Record: ASPMX.L.GOOGLE.COM

   Priority: 5
   MX Record: ALT1.ASPMX.L.GOOGLE.COM

   Priority: 5
   MX Record: ALT2.ASPMX.L.GOOGLE.COM
   ```

7. ✅ Nu kan du använda Gmail med info@companydoktor.se

### Alternativ B: One.com Email (Billigare)

**Kostnad:** ~30 kr/månad

1. Köp **"Email Start"** paket på One.com
2. Lägg till domän: companydoktor.se
3. Skapa email: info@companydoktor.se
4. Konfigurera MX-records (One.com ger instruktioner)
5. Använd webmail på https://webmail.one.com

### Alternativ C: Loopia Email

**Kostnad:** ~25 kr/månad per brevlåda

1. I Loopia Customer Zone
2. Välj domän → **Email** → **Lägg till brevlåda**
3. Skapa **info@companydoktor.se**
4. MX-records konfigureras automatiskt
5. Använd webmail på https://webmail.loopia.se

---

## Steg 6: Framtida Uppdateringar 🔄

### När du vill ändra något på sajten:

#### Metod A: Via GitHub Desktop (Enklast)

1. Öppna GitHub Desktop
2. Gör dina ändringar i filerna (index.html, css/style.css, etc.)
3. GitHub Desktop visar dina ändringar
4. Skriv en beskrivning av ändringen i "Summary"
5. Klicka **"Commit to main"**
6. Klicka **"Push origin"**
7. **Netlify deployer automatiskt!** (tar 30-60 sekunder)
8. ✅ Dina ändringar är live på companydoktor.se

#### Metod B: Direkt på GitHub.com

1. Gå till https://github.com/DITT_ANVÄNDARNAMN/company-doktor
2. Navigera till filen du vill ändra
3. Klicka på **pennikonen** (Edit)
4. Gör dina ändringar
5. Scrolla ner → **"Commit changes"**
6. Netlify deployer automatiskt!

#### Metod C: Via Terminal

```bash
# Gör dina ändringar i filerna

# Stage changes
git add .

# Commit
git commit -m "Uppdaterade priser och kontaktinformation"

# Push to GitHub
git push

# Netlify deployer automatiskt!
```

---

## 📊 Kostnadsoversikt

### Minimal Setup (Rekommenderas för start)

```
Domännamn (Loopia):        100-150 kr/år
Netlify Hosting:           0 kr (gratis!)
SendGrid Email:            0 kr (100 emails/dag gratis)
─────────────────────────────────────
TOTALT:                    ~125 kr/år
```

### Professionell Setup

```
Domännamn:                 100-150 kr/år
Netlify Hosting:           0 kr
Google Workspace:          720 kr/år (60 kr/mån)
─────────────────────────────────────
TOTALT:                    ~850 kr/år
```

### Premium Setup (För framtiden)

```
Domännamn:                 150 kr/år
Netlify Pro:               ~250 kr/mån = 3000 kr/år
Google Workspace:          720 kr/år
SendGrid Essentials:       ~200 kr/mån = 2400 kr/år
─────────────────────────────────────
TOTALT:                    ~6300 kr/år
```

---

## 🔐 Säkerhet & Best Practices

### 1. Aldrig committa känslig information

```bash
# Skapa .gitignore fil
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore
echo "*.log" >> .gitignore

# Committa .gitignore
git add .gitignore
git commit -m "Added .gitignore"
git push
```

### 2. Använd Environment Variables

- **Aldrig** hårdkoda lösenord eller API-nycklar i kod
- Använd alltid Netlify Environment Variables
- Rotera lösenord regelbundet

### 3. Aktivera 2-Factor Authentication

- **GitHub:** Settings → Security → 2FA
- **Netlify:** User settings → Security → 2FA
- **Gmail:** Security → 2-Step Verification

### 4. Regelbundna Backups

```bash
# Backup av hela projektet
git clone https://github.com/DITT_ANVÄNDARNAMN/company-doktor.git company-doktor-backup

# Eller ladda ner ZIP från GitHub
```

---

## 📈 Analytics & Tracking (Nästa steg)

### Google Analytics 4

1. Skapa konto på https://analytics.google.com
2. Skapa Property för companydoktor.se
3. Kopiera Measurement ID (typ: G-XXXXXXXXXX)
4. Lägg till i `<head>` i index.html:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

5. Commit och push till GitHub
6. Analytics börjar samla data efter 24 timmar

### Google Search Console

1. Gå till https://search.google.com/search-console
2. Lägg till property: companydoktor.se
3. Verifiera med DNS TXT-record (hos Loopia)
4. Skicka in sitemap: companydoktor.se/sitemap.xml (skapa först)

---

## 🆘 Support & Hjälp

### Netlify Support
- **Dokumentation:** https://docs.netlify.com
- **Community Forum:** https://answers.netlify.com
- **Support:** support@netlify.com (endast för betalande kunder)

### Loopia Support
- **Telefon:** 0771-21 21 20
- **Email:** support@loopia.se
- **Chatt:** https://loopia.se

### Gmail/Google Workspace
- **Hjälpcenter:** https://support.google.com/workspace
- **Community:** https://support.google.com/workspace/community

---

## ✅ Checklista - Är du klar?

- [ ] Domännamn köpt (companydoktor.se)
- [ ] GitHub-konto skapat
- [ ] Repository skapat och pushad
- [ ] Netlify-konto skapat
- [ ] Site deployad till Netlify
- [ ] Environment variables konfigurerade (SMTP)
- [ ] Domän kopplad till Netlify
- [ ] DNS-records uppdaterade hos Loopia
- [ ] HTTPS aktiverat
- [ ] Kontaktformulär testat ✅
- [ ] Expertansökan testad ✅
- [ ] Email-konto skapat (info@companydoktor.se)
- [ ] Google Analytics installerat
- [ ] Google Search Console verifierat

---

## 🎉 Grattis! Din webbplats är nu live!

**Din professionella webbplats:**
✅ https://companydoktor.se  
✅ Fungerande backend  
✅ Email-notifikationer  
✅ HTTPS säkerhet  
✅ Automatiska deployments  
✅ Professionellt email  

**Nästa steg:**
1. Testa alla formulär noggrant
2. Dela länken med kollegor för feedback
3. Börja marknadsföra via LinkedIn, email, etc.
4. Övervaka analytics för att se besökare
5. Optimera baserat på användarbeteende

---

**Skapad:** 2025-01-23  
**Version:** 1.0  
**Author:** AI Assistant för Bashar Yousif / Keeada Management  
**Support:** info@keeada.com  
