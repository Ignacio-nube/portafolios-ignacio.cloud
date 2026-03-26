import type { Metadata } from 'next';
import { Geist_Mono, DM_Sans } from 'next/font/google';
import './globals.css';
import ClientProviders from '@/components/shared/ClientProviders';
import { LanguageProvider } from '@/context/LanguageContext';

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Ignacio Márquez — Full-Stack Developer',
  description:
    'Técnico en programación y mecatrónica. Construyo aplicaciones web reales con Next.js, Supabase y TypeScript.',
  keywords: ['developer', 'full-stack', 'Next.js', 'Supabase', 'Argentina', 'Tucumán'],
  authors: [{ name: 'Ignacio Márquez' }],
  openGraph: {
    title: 'Ignacio Márquez — Full-Stack Developer',
    description:
      'Técnico en programación y mecatrónica. Construyo aplicaciones web reales con Next.js, Supabase y TypeScript.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistMono.variable} ${dmSans.variable} dark`}
      suppressHydrationWarning
    >
      <body className="bg-[#080808] text-[#F5F5F5] antialiased min-h-screen">
        <ClientProviders />
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
