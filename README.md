# 🌾 SokoLink 

The official frontend application for **SokoLink**, a direct-to-consumer digital marketplace connecting farmers directly with buyers. Built for speed, fluid animations, and a seamless M-Pesa checkout experience.

## 🚀 Tech Stack

- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4 (Custom Theme defined in `index.css`)
- **Routing:** React Router DOM
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **HTTP Client:** Axios (with automatic JWT interceptors)

## ✨ Features

- **Dynamic Role-Based UI:** The app dynamically shifts its color palette based on user interaction (e.g., Coral/Orange for Buyers, Teal/Green for Farmers).
- **Secure Authentication:** JWT-based login and registration system.
- **Marketplace:** Real-time crop listings with visual stock indicators (e.g., "Almost Over", "Sold Out").
- **M-Pesa Integration:** Secure STK push checkout flow directly to the user's phone.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop viewing.

## 🛠️ Local Development

### 1. Install Dependencies
Make sure you have Node.js installed, then run:
```bash
npm install
```

### 2. Environment Variables
If you want to connect the frontend to a live deployed backend, you can create a `.env` file in the root of the `frontend` folder:
```env
VITE_API_URL=https://your-live-backend.com/api
```
*(If you do not create a `.env` file, the app will automatically default to `http://localhost:5000/api` for local development).*

### 3. Start the Development Server
```bash
npm run dev
```
The app will be available at [http://localhost:5173](http://localhost:5173).

## 🌍 Deployment (Vercel)

This project is optimized for deployment on Vercel and includes a `vercel.json` to handle client-side routing.

1. Install the Vercel CLI: `npm i -g vercel`
2. Run `vercel login`
3. Run `vercel` to deploy a preview.
4. Run `vercel --prod` to deploy to production.
5. Add the `VITE_API_URL` variable in your Vercel project settings so it points to your live backend.
