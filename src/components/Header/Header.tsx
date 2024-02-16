'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import cns from 'classnames';
import { ItemBar } from '../ItemBar';
import { sideBarItems } from '@/constants/sidebarItems';
import { Button } from '../ui/button';
import { Dropdown } from './Header.views';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isHoverCateHeader, setIsHoverCateHeader] = useState<boolean>(false);
  const [isHoverCateSidebar, setIsHoverCateSideBar] = useState<boolean>(false);

  const onMouseCateSidebarOver = (text: string) => {
    if (text === 'Phân loại') setIsHoverCateSideBar(true);
  }

  const onMouseCateSidebarLeave = (text: string) => {
    if (text === 'Phân loại') setIsHoverCateSideBar(false);
  }

  return (
    <section className='h-20 w-full px-20 text-green-100 bg-amber-500 flex justify-between items-center fixed top-0 left-0 whitespace-nowrap'>
      <div className='flex justify-between items-center gap-6 md:gap-10'>
        <Link href='/'>
          <Image
            className='min-w-[50px] min-h-[50px] rounded shadow-sm hover:opacity-80 transition-opacity duration-200 cursor-pointer'
            src='/images/cafeteria-logo.png'
            alt='logo'
            width={50}
            height={50}
            priority
          />
        </Link>

        <div className='space-x-6 hidden sm:block'>
          <Button variant='ghost'>Bán chạy</Button>

          <Button
            variant='ghost'
            onMouseOver={() => setIsHoverCateHeader(true)}
            onMouseLeave={() => setIsHoverCateHeader(false)}
          >
            Phân loại
          </Button>

          {isHoverCateHeader && <Dropdown setIsHover={setIsHoverCateHeader} className='left-[272px]'/>}
        </div>
      </div>
      <div className='justify-between items-center gap-6 hidden sm:flex'>
        <Link
          href='/transaction-history'
          className='hover:text-amber-700 transition-colors duration-200 pl-6 md:pl-0'
        >
          Lịch sử giao dịch
        </Link>

        <Link
          href='/account'
          className='hover:text-amber-700 transition-colors duration-200'
        >
          Tài khoản
        </Link>
      </div>

      <Image
        className='sm:hidden cursor-pointer hover:opacity-80 transition-opacity duration-200'
        src='/images/bars-solid.svg'
        alt='bar-logo'
        width={30}
        height={30}
        onClick={() => setIsSidebarOpen((pre) => !pre)}
      />

      {sideBarItems.length > 0 && (
        <div
          className={cns(
            'top-20 right-0 flex flex-col bg-lime-600 rounded-tl rounded-bl z-50 sm:hidden',
            isSidebarOpen ? 'absolute' : 'hidden'
          )}
        >
          {sideBarItems.map((item, index) => (
            <ItemBar
              key={index}
              url={item.url}
              text={item.text}
              onClick={setIsSidebarOpen}
              onMouseOver={() => onMouseCateSidebarOver(item.text)}
              onMouseLeave={() => onMouseCateSidebarLeave(item.text)}
            />
          ))}

          {isHoverCateSidebar && (
            <Dropdown
              setIsHover={setIsHoverCateSideBar}
              className='top-14 right-[146px]'
            />
          )}
        </div>
      )}
    </section>
  );
};

export default Header;
