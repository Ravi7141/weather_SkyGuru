import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SkyGuru - Modern Weather App",
  description: "Get real-time weather updates with a beautiful, interactive interface. Search any city worldwide for current conditions, hourly and daily forecasts.",
  keywords: ["weather", "forecast", "temperature", "climate", "weather app"],
  authors: [{ name: "SkyGuru" }],
  openGraph: {
    title: "SkyGuru - Modern Weather App",
    description: "Beautiful weather forecasts at your fingertips",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.variable} font-sans antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
