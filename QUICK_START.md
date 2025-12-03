# ⚡ Snabbstart - Company Doktor till Produktion

## 🎯 Målet
Få din Company Doktor-webbplats live på `companydoktor.se` med fungerande backend på **under 2 timmar**.

---

## 📝 Steg-för-Steg (Komplett)

### Steg 1: Köp Domän (15 min)
1. Gå till **loopia.se**
2. Sök: `companydoktor.se`
3. Köp (~150 kr/år)
4. ✅ Klart!

### Steg 2: Skapa GitHub Repo (10 min)
1. Skapa konto på **github.com**
2. New repository → `company-doktor`
3. Ladda upp dina filer ELLER använd GitHub Desktop
4. ✅ Klart!

### Steg 3: Deploy till Netlify (20 min)
1. Skapa konto på **netlify.com** (logga in med GitHub)
2. "Add new site" → "Import from Git"
3. Välj `company-doktor` repository
4. Deploy!
5. ✅ Du får en URL: `https://xxx.netlify.app`

### Steg 4: Konfigurera Email Backend (15 min)

#### Använd Gmail:
1. Gmail → Security → App Passwords
2. Skapa nytt App Password för "Netlify"
3. Kopiera 16-siffriga lösenordet
4. I Netlify → Site settings → Environment variables:
   ```
   SMTP_HOST = smtp.gmail.com
   SMTP_PORT = 587
   SMTP_USER = info@keeada.com
   SMTP_PASS = (ditt App Password)
   ```
5. ✅ Klart!

### Steg 5: Koppla Domän (30 min)
1. I Netlify → Domain management → Add custom domain
2. Ange: `companydoktor.se`
3. Hos Loopia → DNS-inställningar:
   ```
   A Record:
   Name: @
   Value: 75.2.60.5
   
   CNAME:
   Name: www
   Value: (din-netlify-url).netlify.app
   ```
4. Vänta 1-2 timmar för DNS
5. ✅ Din sajt är live på https://companydoktor.se

### Steg 6: Testa (10 min)
1. Gå till https://companydoktor.se#contact
2. Fyll i och skicka formulär
3. Kolla att du får email
4. ✅ Allt fungerar!

---

## 🎁 Bonussteg

### Professionellt Email (Valfritt)
**Google Workspace** (~60 kr/månad):
1. workspace.google.com
2. Lägg till domän
3. Skapa info@companydoktor.se
4. ✅ Professionell email!

### Analytics (Valfritt)
1. analytics.google.com
2. Skapa Property
3. Lägg till tracking code
4. ✅ Se besöksstatistik!

---

## 💰 Totalkostnad

**Minimal:**
- Domän: 150 kr/år
- Netlify: GRATIS
- Email (Gmail): GRATIS
- **TOTALT: 150 kr/år** 🎉

**Professionell:**
- Domän: 150 kr/år
- Netlify: GRATIS
- Google Workspace: 720 kr/år
- **TOTALT: 870 kr/år**

---

## 🆘 Problem?

### Formulär fungerar inte
→ Kolla Environment variables i Netlify

### DNS fungerar inte
→ Vänta 2 timmar, rensa cache

### Email kommer inte fram
→ Kolla spam/skräppost

### Behöver hjälp?
→ Se **DEPLOYMENT_GUIDE.md** för detaljerad guide

---

## 📞 Kontakt

**Email:** info@keeada.com  
**Telefon:** +46 70 782 50 82

---

**Lycka till!** 🚀
