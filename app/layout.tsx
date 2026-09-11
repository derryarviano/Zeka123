import type { Metadata } from 'next';
import { Fredoka, Nunito } from 'next/font/google';
import './globals.css';

const fredoka = Fredoka({
  variable: '--font-title',
  subsets: ['latin'],
});

const nunito = Nunito({
  variable: '--font-body',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Zeka123 — Belajar Seru Bersama Kobi',
  description: 'Aplikasi belajar adaptif yang aman dan menyenangkan untuk anak kelas 1–3 SD.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body className={`${fredoka.variable} ${nunito.variable} antialiased`}>{children}</body></html>;
}
