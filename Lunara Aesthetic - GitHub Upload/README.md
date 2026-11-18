# Lunara Aesthetic Website

React + Vite + Tailwind + Three.js (3D hero) + Framer Motion.

## Edit your details
Everything lives in **`src/config.js`**: WhatsApp number, email, address, **social links**, owner bios.
Treatments and prices: **`src/data/treatments.js`**. Images: `public/images/`.

## Run locally
```
npm install
npm run dev        # opens http://localhost:5173
npm run build      # production build in /dist
```

## Deploy to Vercel
1. Push this folder to a GitHub repository.
2. On vercel.com, click **Add New → Project**, import the repo. Vercel detects Vite automatically
   (build `npm run build`, output `dist`). Click **Deploy**.
3. **Settings → Domains**, add your domain (e.g. `lunaraaesthetic.com`), then add the DNS
   records Vercel shows you at your domain registrar.

`vercel.json` already makes page links like `/about` work on refresh.

## Booking form: one-time email activation
Form submissions are emailed through FormSubmit (free, no server). **The first time someone
submits the form on the live site, FormSubmit sends an activation email to
ujalahammad379@gmail.com. Click "Activate Form" once**, and every booking after that arrives in the inbox.
Check the spam folder if you don't see it.
