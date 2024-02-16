import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Header } from '@/components/Header';
import cns from 'classnames';
import '../globals.css';

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
      <body className={cns('static', quicksand.className)}>
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
        <div className='absolute top-20 w-full h-[calc(100vh-80px)] z-[-1]'>
          {children}
        </div>
      </body>
    </html>
  );
}
