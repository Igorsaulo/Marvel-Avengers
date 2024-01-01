'use client'
import { Inter } from 'next/font/google';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Status } from 'src/shared/components/status';
import { useState, useEffect } from 'react';
import { useAlertError } from 'src/shared/store/useAlertError';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isWindow, setWindow] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') setWindow(true);
  }, []);

  const { initialState } = useAlertError();
  const { open } = initialState;

  return (
    <html lang="pt-br">
      <head>
        <title>Marvel Heroes</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-black bg-opacity-90`}>
        <QueryClientProvider client={new QueryClient()}>
          {children}
          {isWindow && open && <Status />}
        </QueryClientProvider>
      </body>
    </html>
  );
}
