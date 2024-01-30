import Image from 'next/image';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className=''>
      <Image
        src='/images/animated-img-1.jpg'
        alt='Signin Image'
        priority
        // className='min-w-[500px] w-2/3 h-screen'
        // width={1200}
        // height={1000}
        layout='fill'
      />

      {/* <div className='flex h-screen min-w-[500px] flex-1'>{children}</div> */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-80 w-[500px] px-4 py-10 rounded'>
        {children}
      </div>
    </section>
  );
};

export default AuthLayout;
