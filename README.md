# Roam AI - Your Personal AI Travel Agent

Roam AI is a full-stack web application designed to be a smart travel companion. It leverages an AI agent powered by CrewAI and Google's Gemini API to generate personalized, end-to-end travel itineraries based on user preferences. From destination suggestions to a detailed day-by-day plan, Roam AI handles it all.

---

## ✨ Features

- **Full User Authentication**: Secure registration with OTP email verification, login, and persistent sessions using JWT (access/refresh tokens in httpOnly cookies). Includes password reset functionality.
- **AI-Powered Trip Planning**: A multi-step workflow that guides the user through the planning process.
  - **Step 1: Preferences**: Users input their travel style, budget, group size, duration, and interests.
  - **Step 2: AI Suggestions**: The AI model suggests multiple travel destinations tailored to the user's input, complete with images and key details.
  - **Step 3: Customization**: Users select their preferred destination and then choose from a list of AI-suggested local attractions and cuisines.
  - **Step 4: Comprehensive Itinerary**: The AI generates a complete travel plan.
- **Detailed Itinerary View**: A rich, tabbed interface for the final plan, including:
  - A beautiful, icon-based day-by-day **Timeline**.
  - **Image Gallery** for the destination.
  - **Logistics** (transport and accommodation suggestions).
  - **Reviews** for top attractions and restaurants.
  - Smart **Packing List** based on destination and season.
  - Detailed **Budget Breakdown**.
  - Crucial **Safety Information**.
- **User Profile Management**:
  - A dedicated profile page displaying user information.
  - Functionality to view, change, or remove the profile cover image.
  - A gallery of all saved trip itineraries.
- **Trip Management**: Users can save their generated trips to their profile and delete them with a custom confirmation modal for a smooth UX.
- **Resilient API Communication**: The frontend includes an Axios interceptor to automatically retry requests to the ML model, gracefully handling server "cold starts" on free hosting tiers.

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, React Router, Axios, CSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT), bcrypt
- **File Storage**: Cloudinary for image uploads
- **Email**: Nodemailer for sending OTPs
- **AI Model**: Python, FastAPI, CrewAI, Google Gemini API

---