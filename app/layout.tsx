import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Missão Lab | Ludymilla Dias',
  description: 'Laboratório de inovação e tecnologia política.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${space.variable} ${mono.variable} dark`}>
      <body className="bg-[#050505] text-white antialiased min-h-screen flex flex-col font-sans selection:bg-[#FFD600] selection:text-black">
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-[#FFD600] text-black px-4 py-2 font-bold rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Pular para o conteúdo principal
        </a>
        <Navbar />
        <main id="main-content" className="flex-grow focus:outline-none" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
