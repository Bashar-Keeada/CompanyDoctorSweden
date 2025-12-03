# 🌐 Guide: Anslut companydoktor.com & .se till Netlify

## 📍 Var är du nu?

Innan vi börjar, berätta vilka av dessa steg du har gjort:

- [ ] **Har du ett GitHub-konto?**
- [ ] **Har du laddat upp projektet till GitHub?**
- [ ] **Har du ett Netlify-konto?**
- [ ] **Har du deployat sajten till Netlify?**
- [ ] **Har du tillgång till Loopia-kontot?** (där domänerna är köpta)
- [ ] **Har du skapat Gmail App Password?**

---

## 🎯 Fullständig Process (7 steg)

### **STEG 1: Förbered GitHub Repository** ⏱️ 15 minuter

#### 1A. Skapa GitHub-konto (om du inte har)
1. Gå till: https://github.com/signup
2. Skapa konto med din email
3. Verifiera email-adressen

#### 1B. Skapa nytt repository
1. Logga in på GitHub
2. Klicka på **"+"** (högst upp till höger) → **"New repository"**
3. Fyll i:
   - **Repository name**: `company-doktor`
   - **Description**: `Company Doktor - Företagshälsovård`
   - **Visibility**: Välj **Public** (gratis) eller **Private** (om du vill)
4. **VIKTIGT**: Klicka INTE i "Add a README file"
5. Klicka **"Create repository"**

#### 1C. Ladda upp projektet
Du får en sida med instruktioner. Kopiera kommandona som visas under **"…or create a new repository on the command line"**.

**Om du har projektet lokalt på din dator:**

```bash
# Öppna Terminal/Command Prompt
# Navigera till din projektmapp
cd /sökväg/till/company-doktor

# Initiera Git
git init

# Lägg till alla filer
git add .

# Första commit
git commit -m "Initial commit - Company Doktor website"

# Byt namn på branch till main
git branch -M main

# Länka till GitHub (ERSÄTT med din URL från GitHub)
git remote add origin https://github.com/DITT_ANVÄNDARNAMN/company-doktor.git

# Ladda upp
git push -u origin main
```

**Om du INTE har projektet lokalt:**
1. Ladda ner alla filer från denna session
2. Skapa en mapp på din dator: `company-doktor`
3. Lägg alla filer i mappen (behåll mappstrukturen: `css/`, `js/`, `netlify/`)
4. Kör kommandona ovan

✅ **Verifiering**: Gå till din GitHub-repository på webben. Du ska se alla filer där.

---

### **STEG 2: Deploya till Netlify** ⏱️ 10 minuter

#### 2A. Skapa Netlify-konto
1. Gå till: https://app.netlify.com/signup
2. Välj **"Sign up with GitHub"** (enklast!)
3. Auktorisera Netlify att komma åt GitHub

#### 2B. Importera GitHub Repository
1. I Netlify dashboard, klicka **"Add new site"**
2. Välj **"Import an existing project"**
3. Klicka **"Deploy with GitHub"**
4. Auktorisera Netlify (om det frågar)
5. Hitta och välj `company-doktor` repository
6. **Build settings**:
   ```
   Build command:    [lämna tom]
   Publish directory: .
   Functions directory: netlify/functions
   ```
7. Klicka **"Deploy [site name]"**

#### 2C. Vänta på deployment
- Netlify bygger och deployar sajten (tar ~1-2 minuter)
- Du får en tillfällig URL som: `https://random-name-12345.netlify.app`
- **Testa URL:en** - sajten ska visas (men formulär fungerar inte ännu)

✅ **Verifiering**: Klicka på den tillfälliga URL:en. Din sajt ska visas!

---

### **STEG 3: Konfigurera Email (SMTP)** ⏱️ 20 minuter

För att formulären ska kunna skicka email behöver du konfigurera SMTP.

#### 3A. Skapa Gmail App Password

**VIKTIGT**: Du MÅSTE ha **2-stegsverifiering aktiverad** på ditt Gmail-konto först!

1. **Aktivera 2-stegsverifiering** (om inte redan gjort):
   - Gå till: https://myaccount.google.com/security
   - Scrolla ner till **"2-Step Verification"**
   - Klicka **"Get started"** och följ instruktionerna
   - Verifiera med din telefon

2. **Skapa App Password**:
   - Gå till: https://myaccount.google.com/apppasswords
   - Du kan behöva logga in igen
   - Under **"Select app"**: Välj **"Other (Custom name)"**
   - Skriv in: `Company Doktor Netlify`
   - Klicka **"Generate"**
   - Du får ett **16-tecken lösenord** som ser ut så här: `abcd efgh ijkl mnop`
   - **KOPIERA DETTA LÖSENORD** (du kommer inte se det igen!)

3. **Spara lösenordet säkert**:
   ```
   SMTP_HOST: smtp.gmail.com
   SMTP_PORT: 587
   SMTP_USER: info@companydoktor.com
   SMTP_PASS: abcd efgh ijkl mnop
   ```

#### 3B. Lägg till Environment Variables i Netlify

1. I Netlify dashboard, gå till din sajt
2. Gå till **"Site settings"** (högst upp)
3. I vänstermenyn: **"Environment variables"**
4. Klicka **"Add a variable"** → **"Add a single variable"**
5. Lägg till dessa **4 variabler** (en i taget):

   **Variabel 1:**
   ```
   Key:   SMTP_HOST
   Value: smtp.gmail.com
   ```

   **Variabel 2:**
   ```
   Key:   SMTP_PORT
   Value: 587
   ```

   **Variabel 3:**
   ```
   Key:   SMTP_USER
   Value: info@companydoktor.com
   ```
   *(Ersätt med den Gmail-adress du vill skicka FRÅN)*

   **Variabel 4:**
   ```
   Key:   SMTP_PASS
   Value: [ditt 16-tecken app password från 3A]
   ```
   *(UTAN mellanslag, t.ex: abcdefghijklmnop)*

6. Klicka **"Save"** för varje variabel

#### 3C. Trigger Redeploy

**VIKTIGT**: Environment variables träder bara i kraft efter en ny deployment!

1. Gå till **"Deploys"** (i huvudmenyn)
2. Klicka **"Trigger deploy"** → **"Deploy site"**
3. Vänta ~1-2 minuter

✅ **Verifiering**: När deployment är klar, testa att fylla i kontaktformuläret på din sajt. Kolla din inbox på `info@companydoktor.com` - du ska få ett email!

---

### **STEG 4: Anslut Custom Domains i Netlify** ⏱️ 5 minuter

Nu ska vi berätta för Netlify vilka domäner du vill använda.

1. I Netlify dashboard, gå till din sajt
2. Gå till **"Site settings"** → **"Domain management"**
3. Under **"Custom domains"**, klicka **"Add a domain"**

#### 4A. Lägg till companydoktor.com
1. Klicka **"Add a domain"**
2. Skriv in: `companydoktor.com`
3. Klicka **"Verify"**
4. Netlify frågar om du äger domänen → Klicka **"Yes, add domain"**
5. Du ser nu domänen listad med status: **"Awaiting External DNS"** (det är OK!)

#### 4B. Lägg till www.companydoktor.com
1. Klicka **"Add a domain"** igen
2. Skriv in: `www.companydoktor.com`
3. Klicka **"Verify"** → **"Yes, add domain"**

#### 4C. Upprepa för .se domänen
1. Klicka **"Add a domain"**
2. Skriv in: `companydoktor.se`
3. Verifiera och lägg till
4. Klicka **"Add a domain"** igen
5. Skriv in: `www.companydoktor.se`
6. Verifiera och lägg till

Du ska nu ha **4 domäner** listade:
- `companydoktor.com` (Primary domain)
- `www.companydoktor.com`
- `companydoktor.se`
- `www.companydoktor.se`

#### 4D. Sätt primary domain
1. Välj vilken som ska vara huvuddomänen (t.ex. `companydoktor.com`)
2. Klicka **"Options"** → **"Set as primary domain"**

✅ **Verifiering**: Alla domäner visas i listan (även om de inte fungerar ännu).

---

### **STEG 5: Konfigurera DNS i Loopia** ⏱️ 15 minuter

Nu ska vi peka dina Loopia-domäner till Netlify.

#### 5A. Logga in på Loopia
1. Gå till: https://customerzone.loopia.se
2. Logga in med dina uppgifter

#### 5B. Hitta Netlify DNS-information

I Netlify (från steg 4), klicka på `companydoktor.com`:
- Du ser en sektion **"DNS configuration"**
- Netlify visar vilka DNS-poster du behöver lägga till

**Standard Netlify DNS-poster:**
```
A Record:  @  →  75.2.60.5
CNAME:     www  →  [din-sajt].netlify.app
```

*(Ersätt `[din-sajt]` med din faktiska Netlify subdomain, t.ex. `company-doktor-xyz123.netlify.app`)*

#### 5C. Konfigurera companydoktor.com

1. I Loopia Customer Zone, klicka på **"Domäner"**
2. Hitta `companydoktor.com` och klicka på den
3. Gå till **"DNS-inställningar"** (eller "Zone editor" / "Advanced DNS")

**Radera gamla poster** (om det finns några A eller CNAME records):
- Ta bort alla befintliga A-records för `@` (root)
- Ta bort alla befintliga CNAME för `www`

**Lägg till nya poster:**

**A Record:**
```
Hostname: @ (eller lämna tomt, betyder "root")
Type:     A
Value:    75.2.60.5
TTL:      3600 (eller lämna default)
```

**CNAME Record:**
```
Hostname: www
Type:     CNAME
Value:    [din-sajt].netlify.app
TTL:      3600 (eller lämna default)
```

**Spara ändringarna!**

#### 5D. Konfigurera companydoktor.se

Upprepa samma process för `.se` domänen:

1. Klicka på `companydoktor.se` i Loopia
2. Gå till DNS-inställningar
3. Lägg till samma A och CNAME records:

```
A Record:    @  →  75.2.60.5
CNAME:       www  →  [din-sajt].netlify.app
```

**Spara ändringarna!**

---

### **STEG 6: Vänta på DNS-propagering** ⏱️ 1-24 timmar

DNS-ändringar tar tid att spridas över internet.

#### Hur länge tar det?
- **Minimum**: 10-15 minuter (om du har tur)
- **Normalt**: 1-4 timmar
- **Maximum**: 24-48 timmar (ovanligt)

#### Kolla status
Använd detta verktyg för att se om DNS har uppdaterats:
https://dnschecker.org

1. Skriv in: `companydoktor.com`
2. Välj **"A"** i dropdown
3. Klicka **"Search"**
4. Du ska se `75.2.60.5` över hela världen (gröna checkmarks)

Upprepa för:
- `www.companydoktor.com` (typ: CNAME)
- `companydoktor.se` (typ: A)
- `www.companydoktor.se` (typ: CNAME)

#### Under väntan
- **Normal beteende**: Domänen visar ingenting eller gammal sajt
- **Inte panik**: Detta är helt normalt under propagering
- **Töm cache**: Prova incognito-läge i browsern

---

### **STEG 7: Verifiera SSL & HTTPS** ⏱️ 5 minuter

När DNS har propagerat (steg 6), gör Netlify automatiskt detta:

1. **Detekterar** att DNS pekar korrekt till Netlify
2. **Provisionar** SSL-certifikat från Let's Encrypt (gratis)
3. **Aktiverar HTTPS** för alla domäner

#### Kolla SSL-status i Netlify

1. Gå till **"Site settings"** → **"Domain management"**
2. Under **"HTTPS"**, ska du se:
   - ✅ **"Your site has HTTPS enabled"**
   - Status: **"Certificate active"**

Om du ser **"DNS verification in progress"**:
- Detta är normalt
- Vänta 15-30 minuter
- Netlify försöker automatiskt igen

#### Testa HTTPS manuellt

Öppna i browser:
```
https://companydoktor.com
https://www.companydoktor.com
https://companydoktor.se
https://www.companydoktor.se
```

Alla ska:
- ✅ Visa din sajt
- ✅ Visa hänglås-ikon i adressfältet
- ✅ Omdirigera http → https automatiskt

✅ **Verifiering**: Alla domäner fungerar med HTTPS!

---

## 🧪 STEG 8: Testa Allt! ⏱️ 15 minuter

### Test 1: Domäner
- [ ] `companydoktor.com` fungerar
- [ ] `www.companydoktor.com` fungerar
- [ ] `companydoktor.se` fungerar
- [ ] `www.companydoktor.se` fungerar
- [ ] Alla visar samma sajt
- [ ] Alla har HTTPS (hänglås-ikon)

### Test 2: Språkväxling
1. Öppna sajten
2. Klicka på **"English"** knappen
3. All text ska ändras till engelska
4. Klicka på **"Svenska"**
5. All text ska ändras tillbaka till svenska

### Test 3: Kontaktformulär
1. Scrolla ner till kontaktformuläret
2. Fyll i alla fält (använd din egen email som test)
3. Klicka **"Skicka meddelande"**
4. Du ska se: ✅ **"Tack! Vi återkommer inom 24 timmar."**
5. **Kolla två mailboxes:**
   - ✉️ `info@companydoktor.com` → Du ska få ett email med formulärdata
   - ✉️ Din test-email → Du ska få ett bekräftelse-email

### Test 4: Expertansökan
1. Klicka på **"Bli Expert"** i footern
2. Fyll i formuläret
3. Ladda upp en testfil (PDF eller Word)
4. Välj expertisområde
5. Skicka formuläret
6. **Kolla mailbox:**
   - ✉️ `info@companydoktor.com` → Du ska få email MED CV bifogat

### Test 5: Mobil
1. Öppna sajten på din telefon
2. Testa hamburgermeny (☰)
3. Testa formulär
4. Kolla att allt ser bra ut

---

## 🎉 KLART!

Om alla tester fungerar - **Grattis!** Din sajt är nu live på internet! 🚀

### Nästa steg (frivilligt):

#### Google Analytics (spåra besökare)
1. Skapa Google Analytics-konto
2. Lägg till tracking code i `index.html`
3. Se besöksstatistik

#### Google Search Console (SEO)
1. Verifiera dina domäner
2. Skicka in sitemap
3. Förbättra ranking i Google

#### Marketing
- Dela länkarna på sociala medier
- Lägg till på visitkort
- Skicka till kunder
- Marknadsför tjänsten!

---

## ❌ Felsökning (Troubleshooting)

### Problem: "Site can't be reached" efter DNS-ändringar

**Orsak**: DNS har inte propagerat ännu

**Lösning**:
1. Vänta 1-4 timmar
2. Kolla med: https://dnschecker.org
3. Töm browser cache (Ctrl+Shift+Delete)
4. Prova incognito mode
5. Prova från din telefon (4G, inte WiFi)

---

### Problem: "Not secure" varning i browser

**Orsak**: SSL-certifikat inte ännu utfärdat

**Lösning**:
1. Gå till Netlify → Domain management → HTTPS
2. Kolla status: Ska vara "Certificate active"
3. Om "Verifying DNS", vänta 15-30 minuter
4. Om det fastnat över 1 timme:
   - Klicka **"Renew certificate"**
   - Eller kontakta Netlify support

---

### Problem: Formulär skickar inte email

**Orsak 1**: SMTP Environment Variables inte konfigurerade

**Lösning**:
1. Gå till Netlify → Site settings → Environment variables
2. Kontrollera att alla 4 variabler finns:
   - SMTP_HOST
   - SMTP_PORT
   - SMTP_USER
   - SMTP_PASS
3. Om du ändrat något → Trigger redeploy

**Orsak 2**: Gmail App Password fel

**Lösning**:
1. Generera nytt App Password
2. Uppdatera SMTP_PASS i Netlify
3. Trigger redeploy

**Orsak 3**: Gmail blockerar "mindre säkra appar"

**Lösning**:
1. Kontrollera att du använder App Password (inte vanligt lösenord!)
2. Kontrollera att 2-stegsverifiering är aktiverad på Gmail
3. Testa skicka från Gmail webb-interface för att se om kontot fungerar

---

### Problem: Språkväxling fungerar inte

**Orsak**: JavaScript-fel eller felaktiga translations

**Lösning**:
1. Öppna Developer Tools (F12)
2. Gå till Console-fliken
3. Kolla efter röda felmeddelanden
4. Om du ser "translations is not defined":
   - Kontrollera att `js/translations.js` laddas innan `js/main.js`
   - Kolla `index.html` - script-ordningen är viktig!

---

### Problem: Sajten visar felaktig/gammal version

**Orsak**: Browser cache

**Lösning**:
1. Håll Ctrl+Shift och klicka Refresh (hårt reload)
2. Eller: Töm cache helt (Ctrl+Shift+Delete)
3. Eller: Prova incognito mode
4. På mobil: Stäng och öppna appen igen

---

## 📞 Behöver du mer hjälp?

Om något inte fungerar, berätta:
1. **Vilket steg** du är på (1-8)
2. **Vad som inte fungerar** (exakt felmeddelande)
3. **Vad du har provat** (så vi inte upprepar samma sak)

Jag hjälper dig lösa det! 💪

---

## 📚 Snabbreferens: Viktiga URL:er

| Tjänst | URL |
|--------|-----|
| GitHub | https://github.com |
| Netlify Dashboard | https://app.netlify.com |
| Loopia Customer Zone | https://customerzone.loopia.se |
| Gmail App Passwords | https://myaccount.google.com/apppasswords |
| DNS Checker | https://dnschecker.org |
| SSL Checker | https://www.sslshopper.com/ssl-checker.html |

---

## ✅ Checklista: Slutlig verifiering

Gå igenom denna lista innan du är klar:

**GitHub:**
- [ ] Repository skapad
- [ ] Alla filer uppladdade
- [ ] Kan se filerna på github.com

**Netlify:**
- [ ] Sajt deployad
- [ ] Tillfällig URL fungerar (https://xxx.netlify.app)
- [ ] SMTP Environment Variables tillagda (alla 4)
- [ ] Custom domains tillagda (alla 4)
- [ ] Redeployat efter environment variables

**Loopia DNS:**
- [ ] companydoktor.com - A record: 75.2.60.5
- [ ] companydoktor.com - CNAME www → netlify.app
- [ ] companydoktor.se - A record: 75.2.60.5
- [ ] companydoktor.se - CNAME www → netlify.app

**DNS Propagering:**
- [ ] dnschecker.org visar rätt IP (75.2.60.5)
- [ ] Alla domäner resolverar korrekt
- [ ] Väntat minst 1 timme efter DNS-ändringar

**HTTPS/SSL:**
- [ ] Netlify visar "Certificate active"
- [ ] Alla domäner visar hänglås i browser
- [ ] Ingen "not secure" varning

**Funktionalitet:**
- [ ] Språkväxling fungerar (Svenska ⟷ English)
- [ ] Kontaktformulär skickar email till info@companydoktor.com
- [ ] Bekräftelse-email skickas till kund
- [ ] Expertansökan fungerar med CV-uppladdning
- [ ] Mobil-vy fungerar korrekt
- [ ] Alla länkar fungerar

**🎉 Om alla är ikryssade - DU ÄR KLAR!**

---

**Lycka till! 🚀**
