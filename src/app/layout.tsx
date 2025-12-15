import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Business United - Accompagnement Entrepreneurs Caen & Normandie",
  description: "Entreprise de conseil en affaires qui t'accompagne de A à Z pour structurer ton business à Caen et la France. Transforme tes idées en actions concrètes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <script src="https://assets.calendly.com/assets/external/widget.js" async></script>
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-sm border-t border-gray-800/50">
          <div className="container mx-auto max-w-7xl px-4 py-2">
            <p className="text-center text-xs text-gray-400">
              Site réalisé par{' '}
              <a 
                href="https://codyxo.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors underline"
              >
                codyxo.com
              </a>
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}