# 🌤️ SkyGuru - Modern Weather App

A beautiful, feature-rich weather application built with Next.js featuring stunning animations, real-time weather data, and a premium user experience.

![SkyGuru Weather App](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

- 🌡️ **Real-time Weather Data** - Current conditions, hourly and 5-day forecasts
- 🔍 **City Search** - Search any city worldwide with autocomplete
- 📍 **Geolocation** - Get weather for your current location
- 🌡️ **Temperature Units** - Toggle between Celsius and Fahrenheit
- 🌙 **Dark/Light Mode** - Beautiful theme switching with circular animation
- 🌞 **Animated Celestial Bodies** - Sun and moon rise with soft glowing effects
- 🎨 **Dynamic Backgrounds** - Animated clouds, rain, snow, and stars
- 📊 **Detailed Metrics** - Humidity, wind speed, pressure, visibility, and more
- 📱 **Fully Responsive** - Works perfectly on all devices

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/weather_SkyGuru.git
   cd weather_SkyGuru
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up your API key** (see below)

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🔑 API Key Configuration

This app uses the **OpenWeatherMap API** to fetch weather data. You need to get your own free API key.

### Step 1: Get Your Free API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Click **"Sign Up"** and create a free account
3. After signing in, go to your **API Keys** section
4. You'll see a default API key, or you can generate a new one
5. Copy your API key

> **Note:** New API keys may take up to 2 hours to activate.

### Step 2: Add API Key to Your Project

1. Create a file named `.env.local` in the project root directory:

   ```bash
   # Windows (PowerShell)
   New-Item -Path .env.local -ItemType File

   # Mac/Linux
   touch .env.local
   ```

2. Open `.env.local` and add your API key:

   ```env
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
   ```

   Replace `your_api_key_here` with your actual API key from OpenWeatherMap.

3. **Example `.env.local` file:**
   ```env
   NEXT_PUBLIC_OPENWEATHER_API_KEY=abc123def456ghi789
   ```

### Step 3: Restart the Development Server

If the server is already running, stop it (Ctrl+C) and restart:

```bash
npm run dev
```

---

## ⚠️ Important Notes

- **Never commit your API key!** The `.env.local` file is already in `.gitignore`
- **Free tier limits:** 1,000 API calls/day (more than enough for personal use)
- An `.env.example` file is provided as a template - copy it to `.env.local` and add your key

---

## 🎨 Theme Animation

SkyGuru features a unique theme transition effect:

- **Circular Reveal** - Theme changes with an expanding circle from the celestial body
- **Rising Sun/Moon** - Celestial bodies rise from bottom with soft glow effects
- **Synchronized Animation** - All elements animate together for a premium feel
- **View Transitions API** - Modern browser API for smooth page transitions

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework with App Router |
| **TypeScript** | Type-safe JavaScript |
| **TailwindCSS 4** | Utility-first CSS |
| **OpenWeatherMap API** | Weather data provider |
| **View Transitions API** | Smooth theme animations |

---

## 📁 Project Structure

```
weather_SkyGuru/
├── src/
│   ├── app/             # Next.js app router
│   ├── components/      # React components
│   ├── context/         # Theme context
│   ├── services/        # API services
│   └── types/           # TypeScript types
├── public/              # Static assets
├── .env.local           # Your API key (create this)
├── .env.example         # API key template
└── package.json
```

---

##  Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons and design inspiration from modern weather apps

---

**Made with ❤️ by Ravi Rajput**
