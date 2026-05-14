import { Geist, Geist_Mono } from 'next/font/google';
import { Instrument_Serif } from 'next/font/google';
import './globals.css';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

export const metadata = {
  title: 'Your First Week at Fleek',
  description: 'A guided five-day onboarding journey for the People Ops & Workspace Manager role at Fleek.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable} grain`}>
        {children}
      </body>
    </html>
  );
}
