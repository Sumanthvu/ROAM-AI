# Brevo Email Setup Instructions

## ✅ Brevo has been implemented successfully!

Your `sendMail.js` has been updated to use Brevo API instead of SMTP.

## 🔑 Get Your Brevo API Key

Follow these steps to get your Brevo API key:

1. **Sign up for Brevo (FREE)**
   - Go to: https://www.brevo.com/
   - Click "Sign up free"
   - Create your account

2. **Verify Your Email**
   - Check your email and verify your Brevo account

3. **Get Your API Key**
   - Login to Brevo dashboard
   - Go to: **Settings** (top right) → **SMTP & API** → **API Keys**
   - Click **"Generate a new API key"**
   - Give it a name (e.g., "ROAM AI Production")
   - Copy the API key (save it somewhere safe - you can only see it once!)

4. **Add Sender Email (Important!)**
   - Go to: **Senders** → **Add a new sender**
   - Add: `sumanthveslavath07@gmail.com` (or your preferred email)
   - Verify the sender email (Brevo will send a verification email)

## 📝 Add to Your .env File

Add this line to your `.env` file:

```
BREVO_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with the actual API key you copied from Brevo.

## 🚀 Deploy to Render/Vercel

Add the `BREVO_API_KEY` environment variable to your hosting platform:

### For Render:
1. Go to your service → Environment
2. Add new environment variable:
   - Key: `BREVO_API_KEY`
   - Value: (paste your Brevo API key)

### For Vercel:
1. Go to your project → Settings → Environment Variables
2. Add:
   - Key: `BREVO_API_KEY`
   - Value: (paste your Brevo API key)

## 📊 Free Tier Limits

- **300 emails per day** (FREE!)
- Uses HTTPS API (works on Render free tier ✅)
- No SMTP port blocking issues

## ✅ What Changed

- Removed `nodemailer` SMTP configuration
- Implemented Brevo API using `@getbrevo/brevo` package
- `sendEmail()` function now uses Brevo's transactional email API
- Works on all platforms (Render, Vercel, localhost)

## 🧪 Test It

After adding your API key, test the email functionality:
- Try registration (sends OTP)
- Try forgot password (sends reset OTP)

The emails will now be sent through Brevo instead of Gmail SMTP!
