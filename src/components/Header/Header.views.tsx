import React from 'react';

import { Button } from '../ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { OptionsType } from './Header.models';
import { cn } from '@/lib/utils';
import { optionItems } from '@/constants/optionItems';
import { ItemBar } from '../ItemBar';
import { Dropdown } from '../Dropdown';
import { bestSelling } from '@/constants/bestSelling';
import { categories } from '@/constants/categories';
import { HeaderType } from '@/types/header';
import './style.css';

export const Options = (props: OptionsType) => {
  const {
    className = '',
    isHover,
    isOpen,
    setIsOpen,
    setIsHover,
    onCategoryClick,
  } = props;

  const onMouseOptionOver = (key: HeaderType) => {
    if (key === 'CATEGORIES') setIsHover({ categories: { option: true } });
    if (key === 'BESTSELLING') setIsHover({ bestSelling: { option: true } });
  };

  const onMouseOptionLeave = (key: HeaderType) => {
    if (key === 'CATEGORIES') setIsHover({ categories: { option: false } });
    if (key === 'BESTSELLING') setIsHover({ bestSelling: { option: false } });
  };

  return (
    <div
      className={cn(
        'top-20 right-0 flex flex-col bg-gray-600 text-white rounded-tl rounded-bl z-50 sm:hidden',
        isOpen ? 'absolute' : 'hidden',
        className
      )}
    >
      {optionItems.map((item, index) => (
        <ItemBar
          key={index}
          url={item.url}
          text={item.text}
          onClick={() => setIsOpen(false)}
          onMouseOver={() => onMouseOptionOver(item.key)}
          onMouseLeave={() => onMouseOptionLeave(item.key)}
        />
      ))}

      {isHover.bestSelling?.option && (
        <Dropdown
          data={bestSelling}
          onClick={() => setIsHover({ bestSelling: { option: false } })}
          onMouseLeave={() => setIsHover({ bestSelling: { option: false } })}
          onMouseOver={() => setIsHover({ bestSelling: { option: true } })}
          className='right-[146px]'
        />
      )}

      {isHover.categories?.option && (
        <Dropdown
          data={categories}
          onClick={onCategoryClick}
          onMouseLeave={() => setIsHover({ categories: { option: false } })}
          onMouseOver={() => setIsHover({ categories: { option: true } })}
          className='top-14 right-[146px]'
        />
      )}
    </div>
  );
};
