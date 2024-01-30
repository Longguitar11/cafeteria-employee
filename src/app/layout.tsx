import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Header } from '@/components/Header';

const quicksand = Quicksand({subsets: ['vietnamese'] });

export const metadata: Metadata = {
  title: 'Cafeteria',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='vietnamese'>
      <body className={quicksand.className}>
        <Header />

        <ToastContainer
          position='top-right'
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
        {children}
      </body>
    </html>
  );
}
