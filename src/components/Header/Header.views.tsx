import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { optionItems } from '@/constants/optionItems';
import { accountDropdown } from '@/constants/accountDropdown';
import { OptionsType } from './Header.models';
import { Dropdown } from '../Dropdown';
import './style.css';

export const Options = (props: OptionsType) => {
  const { className = '', isOpen, setIsOpen } = props;

  const router = useRouter();

  const [isAccountHover, setIsAccountHover] = useState<boolean>(false);

  const onDropdownClick = (url: string) => {
    setIsAccountHover(false);

    // clear all items of localStorage
    if (url === '/signin' && typeof window !== undefined) {
      localStorage.clear();
    }

    router.push(url);
  };

  return (
    <div
      className={cn(
        'top-20 right-0 flex flex-col bg-gray-600 text-white rounded-tl rounded-bl z-50 sm:hidden',
        isOpen ? 'absolute' : 'hidden',
        className
      )}
    >
      {optionItems.map((item, index) => {
        return (
          <>
            {item.key !== 'ACCOUNT' ? (
              <Link
                key={index}
                href={item.url!}
                onClick={() => setIsOpen(false)}
                className='cursor-pointer hover:text-gray-400 transition-colors duration-200 p-3'
              >
                {item.text}
              </Link>
            ) : (
              <div className='relative'>
                <div
                  className='cursor-pointer hover:text-gray-400 transition-colors duration-200 p-3'
                  onMouseOver={() => setIsAccountHover(true)}
                  onMouseLeave={() => setIsAccountHover(false)}
                >
                  {item.text}
                </div>

                {isAccountHover && (
                  <Dropdown
                    data={accountDropdown}
                    onClick={onDropdownClick}
                    onMouseLeave={() => setIsAccountHover(false)}
                    onMouseOver={() => setIsAccountHover(true)}
                    className='-left-[147px] top-0'
                  />
                )}
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};
