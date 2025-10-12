# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/35d72d2e-6e25-40e5-9b0c-c0d1a7c1b727

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/35d72d2e-6e25-40e5-9b0c-c0d1a7c1b727) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/35d72d2e-6e25-40e5-9b0c-c0d1a7c1b727) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

## Testimonials (arkiv)

- "Atlas förändrade vår produktion genom att ta över repetitiva moment så teamet kunde fokusera på innovation. Vi ökade kapaciteten med 30% på tre månader." — Sarah Chen, Operativ chef, Axion Manufacturing
- "Implementeringen av Atlas i våra logistikcenter minskade arbetsskadorna med 40% samtidigt som orderprecisionen ökade. Lärandeförmågan är imponerande." — Michael Rodriguez, Logistikchef, GlobalShip
- "Atlas anpassade sig till våra laboratorieprotokoll snabbare än något system vi tidigare använt. Det är som en forskarkollega som aldrig blir trött och alltid levererar precision." — Dr. Amara Patel, Forskningsledare, BioAdvance Research
- "Som medelstort bolag trodde vi inte avancerad AI var inom räckhåll. Atlas ändrade förutsättningarna helt med sin flexibilitet och enkla implementation." — Jason Lee, VD, Innovative Solutions Inc.

## Väntelista - konfigurera utskick

Formuläret använder EmailJS för att skicka väntelisteanmälningar till `hej@okamail.se`. Så här kommer du igång:

1. Skapa ett konto på [EmailJS](https://www.emailjs.com/) och lägg till din e-postleverantör.
2. Skapa minst ett template som använder parametrarna `name`, `email`, `company`, `companySize`, `aiKnowledge`, `notes`, `timestamp`, `subject`, `logo_url` och `html_message`. Ställ in mottagare till `{{to_email}}` så att samma template kan användas för både auto-reply och notifiering.
3. Lägg till följande miljövariabler i t.ex. `.env.local` i projektroten:
   ```
VITE_EMAILJS_SERVICE_ID=din_service_id
VITE_EMAILJS_TEMPLATE_ID=din_template_id
   VITE_EMAILJS_PUBLIC_KEY=din_public_key
   VITE_EMAILJS_ADMIN_TEMPLATE_ID=valfritt_annat_template_id
   ```

   `VITE_WAITLIST_LOGO_URL` är valfri men rekommenderad – den pekar på en offentlig logotyp-URL som används i e-postutskicken.

   Om du bygger sajten på en server via GitHub är det bra att lägga samma värden i `.env.production` (ligger i repo) så att EmailJS-nycklarna finns tillgängliga i byggsteget.

### (Valfritt) spara till kalkylark

Om du vill spara anmälningarna i ett spreadsheet kan du skapa ett webhook-endpoint (t.ex. via Google Apps Script eller Make/Zapier) och ange URL:en i `VITE_WAITLIST_SPREADSHEET_WEBHOOK`. Då skickas varje anmälan både via e-post och till ditt valda endpoint. Exempel:

```
VITE_WAITLIST_SPREADSHEET_WEBHOOK=https://ditt-webhook-endpoint
VITE_WAITLIST_LOGO_URL=https://files.catbox.moe/d73mz0.png
```

### EmailJS-template

Skapa minst ett template i EmailJS och använd följande parametrar i template-innehållet:

```
Ämne: {{subject}}

HTML-innehåll:
{{{html_message}}}
```

Övriga fält som finns tillgängliga: `to_email`, `to_name`, `company`, `companySize`, `aiKnowledge`, `notes`, `timestamp`, `email`, `name`, `logo_url`.

Du kan använda samma template för både auto-reply och notifiering. Om du vill separera dem kan du skapa ett extra template-ID och lägga det i `VITE_EMAILJS_ADMIN_TEMPLATE_ID`.

### Google Apps Script-exempel

```javascript
function doPost(e) {
  var sheetId = 'REPLACE_WITH_YOUR_SHEET_ID';
  var sheetName = 'Sheet1';

  var spreadsheet = SpreadsheetApp.openById(sheetId);
  var sheet = spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);

  // Säkerställ kolumnrubriker
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['timestamp', 'name', 'email', 'company', 'notes', 'companySize', 'aiKnowledge']);
  }

  var body = JSON.parse(e.postData.contents);
  sheet.appendRow([
    body.timestamp || new Date().toISOString(),
   body.name || '',
   body.email || '',
   body.company || '',
   body.notes || '',
   body.companySize || '',
   body.aiKnowledge || ''
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ status: 'ok' })
  ).setMimeType(ContentService.MimeType.JSON);
}
```
