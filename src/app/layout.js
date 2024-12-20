import { Toaster } from 'sonner';
import localFont from "next/font/local";
import "./globals.css";
import Navbar from '@/components/Navbar';
import 'react-datepicker/dist/react-datepicker.css';
import { TripProvider } from '@/lib/TripContext';


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Budget It",
  description: "AI-powered travel budget management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <TripProvider>{children}</TripProvider>
        <Toaster 
          richColors 
          position="top-right" 
          duration={3000} 
        />
      </body>
    </html>
  );
}
