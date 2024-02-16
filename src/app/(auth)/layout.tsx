import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Quicksand } from 'next/font/google';
import { Metadata } from 'next';
import Image from 'next/image';
import cns from 'classnames';
import '../globals.css';

const quicksand = Quicksand({ subsets: ['vietnamese'] });

export const metadata: Metadata = {
  title: 'Cafeteria',
  description: '',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='vietnamese'>
      <body className={quicksand.className}>
        <Image
          src='/images/animated-img-1.jpg'
          alt='Signin Image'
          fill
          priority
        />

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
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-80 w-[500px] px-4 py-10 rounded'>
          {children}
        </div>
      </body>
    </html>
  );
}
