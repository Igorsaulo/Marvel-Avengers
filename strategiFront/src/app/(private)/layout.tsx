'use client';
import { Inter } from 'next/font/google';
import { AuthGuard } from 'src/shared/guards/AuthGuard';
import { Navbar } from 'src/shared/layout/navbar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: JSX.Element;
}) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-black bg-opacity-90`}>
          <Navbar />
          <AuthGuard>
            {children}
          </AuthGuard>
      </body>
    </html>
  );
}

