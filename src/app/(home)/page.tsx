'use client';

import Image from 'next/image';

export default function Home() {
  return (
    <main className='relative w-full h-full flex flex-col items-center justify-between'>
      <Image src='/images/home.jpg' alt='home-image' fill priority />
    </main>
  );
}
