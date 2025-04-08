"use client"; 

import { Provider } from 'react-redux';
import store from '@/store/store';
import {Alert} from '@/components'; 
import { Inter, Poppins, Manrope, Lato } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'],});
const poppins = Poppins({ subsets: ['latin'],style:'italic', weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] });
const manrope = Manrope({ subsets: ['latin'], weight: ['200', '300', '400', '500', '600', '700', '800'] });
const lato = Lato({ subsets: ['latin'], weight: ['100', '300', '400', '700', '900'] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={`overflow-x-hidden`}>
          <div className="screen hidden h-screen w-screen bg-[#00000070] fixed top-0 left-0 z-[49]"></div>
          <Alert />
          {children}
        </body>
      </html>
    </Provider>
  );
}
