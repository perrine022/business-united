import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Quentin - Expert Cold Call | Formation & Coaching Commercial",
  description: "Formateur et coach spécialisé en cold call. J'aide vos commerciaux à retrouver le plaisir de la vente avec des formations 100% dédiées à la prospection téléphonique.",
  icons: {
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp-Image-2025-12-13-at-10.16.33-1765617731496.jpeg",
    apple: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp-Image-2025-12-13-at-10.16.33-1765617731496.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
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