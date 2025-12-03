# 🚀 DNS Snabbguide - Loopia till Netlify

## 📋 Exakt vad du ska göra i Loopia

### **För companydoktor.com:**

```
┌─────────────────────────────────────────────────┐
│  LOOPIA DNS-INSTÄLLNINGAR                       │
├─────────────────────────────────────────────────┤
│                                                 │
│  Domän: companydoktor.com                       │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │  A RECORD                                │   │
│  │  Hostname: @  (eller tomt)               │   │
│  │  Type:     A                             │   │
│  │  Value:    75.2.60.5                     │   │
│  │  TTL:      3600                          │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │  CNAME RECORD                            │   │
│  │  Hostname: www                           │   │
│  │  Type:     CNAME                         │   │
│  │  Value:    [din-sajt].netlify.app        │   │
│  │  TTL:      3600                          │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
└─────────────────────────────────────────────────┘
```

### **För companydoktor.se:**

```
┌─────────────────────────────────────────────────┐
│  LOOPIA DNS-INSTÄLLNINGAR                       │
├─────────────────────────────────────────────────┤
│                                                 │
│  Domän: companydoktor.se                        │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │  A RECORD                                │   │
│  │  Hostname: @  (eller tomt)               │   │
│  │  Type:     A                             │   │
│  │  Value:    75.2.60.5                     │   │
│  │  TTL:      3600                          │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │  CNAME RECORD                            │   │
│  │  Hostname: www                           │   │
│  │  Type:     CNAME                         │   │
│  │  Value:    [din-sajt].netlify.app        │   │
│  │  TTL:      3600                          │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 🔍 Hitta din Netlify subdomain

**Steg 1**: Gå till Netlify Dashboard
**Steg 2**: Välj din sajt
**Steg 3**: Kolla URL:en högst upp - den ser ut så här:

```
https://company-doktor-abc123.netlify.app
         ↑
         Detta är din subdomain!
```

**Använd detta värde** i CNAME-posterna ovan (utan `https://`)

---

## 🎯 Exakt Steg-för-Steg i Loopia

### 1. Logga in
```
URL: https://customerzone.loopia.se
```

### 2. Navigera till DNS
```
Klicka: "Domäner" (i menyn)
     ↓
Välj: "companydoktor.com"
     ↓
Klicka: "DNS-inställningar" (eller "Zone Editor")
```

### 3. Radera gamla poster (om de finns)
```
Ta bort:
  - Gamla A records för "@" eller "root"
  - Gamla CNAME records för "www"
  
SPARA EJ ÄN!
```

### 4. Lägg till A Record
```
Klicka: "Lägg till post" eller "Add Record"

Fyll i:
  Hostname: @ (eller lämna tomt)
  Type:     A
  Value:    75.2.60.5
  TTL:      3600
  
Klicka: "Lägg till" eller "Add"
```

### 5. Lägg till CNAME Record
```
Klicka: "Lägg till post" eller "Add Record"

Fyll i:
  Hostname: www
  Type:     CNAME
  Value:    [din-sajt].netlify.app
  TTL:      3600
  
Klicka: "Lägg till" eller "Add"
```

### 6. Spara ändringar
```
Klicka: "Spara" eller "Save Changes"
```

### 7. Upprepa för .se domänen
```
Gå tillbaka till "Domäner"
     ↓
Välj: "companydoktor.se"
     ↓
Upprepa steg 3-6
```

---

## ⏱️ Väntetider

| Steg | Tid | Vad händer |
|------|-----|------------|
| DNS-propagering | 15 min - 4 timmar | DNS sprids över internet |
| SSL-certifikat | 5-30 min | Netlify utfärdar Let's Encrypt cert |
| Första besök | Omedelbart | När DNS + SSL klart |

---

## ✅ Verifiera att det fungerar

### Test 1: DNS Propagering
```
Gå till: https://dnschecker.org

Skriv in: companydoktor.com
Typ:      A
Resultat: 75.2.60.5 (gröna checkmarks över hela världen)

Skriv in: www.companydoktor.com
Typ:      CNAME
Resultat: [din-sajt].netlify.app
```

### Test 2: SSL Status i Netlify
```
Netlify Dashboard
    ↓
Site Settings
    ↓
Domain Management
    ↓
HTTPS
    ↓
Status: "Certificate active" ✅
```

### Test 3: Besök sajten
```
Öppna i browser:
  - https://companydoktor.com
  - https://www.companydoktor.com
  - https://companydoktor.se
  - https://www.companydoktor.se

Alla ska:
  ✅ Visa din sajt
  ✅ Ha hänglås-ikon (HTTPS)
  ✅ Inte visa varningar
```

---

## ❌ Vanliga fel och lösningar

### Fel 1: "DNS_PROBE_FINISHED_NXDOMAIN"
```
Problem: Domänen hittas inte

Lösning:
  1. Dubbelkolla A record är korrekt (75.2.60.5)
  2. Vänta längre (DNS tar tid)
  3. Testa från annan enhet/nätverk
  4. Kolla med dnschecker.org
```

### Fel 2: "ERR_SSL_VERSION_OR_CIPHER_MISMATCH"
```
Problem: SSL-certifikat inte klart

Lösning:
  1. Vänta 15-30 minuter
  2. Kolla SSL-status i Netlify
  3. Om "stuck": Klicka "Renew certificate"
```

### Fel 3: "This site can't be reached"
```
Problem: DNS inte propagerat eller fel konfiguration

Lösning:
  1. Prova incognito mode
  2. Töm DNS cache:
     Windows: ipconfig /flushdns
     Mac:     sudo dscacheutil -flushcache
  3. Testa från telefon (4G)
  4. Vänta 1-2 timmar mer
```

### Fel 4: Visar gammal sajt
```
Problem: Browser cache

Lösning:
  1. Håll Ctrl+Shift och klicka Refresh
  2. Töm browser cache (Ctrl+Shift+Delete)
  3. Prova incognito mode
```

---

## 📞 Behöver du hjälp?

Om något inte fungerar efter 4 timmar, berätta:

1. **Vad ser du?** (screenshot)
2. **Vilket felmeddelande?** (exakt text)
3. **Resultat från dnschecker.org**
4. **SSL-status i Netlify**

Jag hjälper dig! 💪

---

## 🎉 När allt fungerar

Du ska kunna:
- ✅ Öppna companydoktor.com i browser
- ✅ Öppna companydoktor.se i browser  
- ✅ Se hänglås (HTTPS)
- ✅ Växla språk (Svenska ⟷ English)
- ✅ Skicka formulär (email till info@companydoktor.com)
- ✅ Dela länken med vem som helst!

**Grattis - din sajt är LIVE! 🚀**
