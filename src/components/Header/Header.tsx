'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import cns from 'classnames';
import { ItemBar } from '../ItemBar';
import { sideBarItems } from '@/constants/sidebarItems';
import { Button } from '../ui/button';
import { DropdownHoverType } from './Header.models';
import { HeaderType } from '@/types/header';
import { categories } from '@/constants/categories';
import { bestSelling } from '@/constants/bestSelling';
import { Dropdown } from '../Dropdown';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hook';
import { OrderIcon } from '../OrderIcon';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Quantity } from '../Quantity';
import { getValueString } from '@/utils/currency';

const Header = () => {
  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isOrderOpen, setIsOrderOpen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<DropdownHoverType>({
    categories: { header: false, sidebar: false },
    bestSelling: {
      header: false,
      sidebar: false,
    },
  });

  const order = useAppSelector((state) => state.orderStore.order);

  const onMouseSidebarOver = (key: HeaderType) => {
    if (key === 'CATEGORIES') setIsHovered({ categories: { sidebar: true } });
    if (key === 'BESTSELLING') setIsHovered({ bestSelling: { sidebar: true } });
  };

  const onMouseSidebarLeave = (key: HeaderType) => {
    if (key === 'CATEGORIES') setIsHovered({ categories: { sidebar: false } });
    if (key === 'BESTSELLING')
      setIsHovered({ bestSelling: { sidebar: false } });
  };

  const onCategoryClick = (id: string) => {
    setIsHovered({ categories: { header: false } });
    if (isSidebarOpen) setIsSidebarOpen(false);

    router.push(`/categories/${id}`);
  };

  return (
    <section className='h-20 w-full px-20 text-green-100 bg-zinc-700 flex justify-between items-center fixed top-0 left-0 whitespace-nowrap'>
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

        <div className='relative hidden sm:block'>
          <div className='space-x-6'>
            <Button
              variant='ghost'
              onMouseOver={() =>
                setIsHovered({ bestSelling: { header: true } })
              }
              onMouseLeave={() =>
                setIsHovered({ bestSelling: { header: false } })
              }
            >
              Bán chạy
            </Button>

            <Button
              variant='ghost'
              onMouseOver={() => setIsHovered({ categories: { header: true } })}
              onMouseLeave={() =>
                setIsHovered({ categories: { header: false } })
              }
            >
              Phân loại
            </Button>
          </div>

          {isHovered.bestSelling?.header && (
            <Dropdown
              data={bestSelling}
              onClick={() => setIsHovered({ bestSelling: { header: false } })}
              onMouseOver={() =>
                setIsHovered({ bestSelling: { header: true } })
              }
              onMouseLeave={() =>
                setIsHovered({ bestSelling: { header: false } })
              }
            />
          )}

          {isHovered.categories?.header && (
            <Dropdown
              data={categories}
              onClick={onCategoryClick}
              onMouseOver={() => setIsHovered({ categories: { header: true } })}
              onMouseLeave={() =>
                setIsHovered({ categories: { header: false } })
              }
              className='right-0'
            />
          )}
        </div>
      </div>
      <div className='justify-between items-center gap-6 hidden sm:flex'>
        <OrderIcon
          onClick={() => setIsOrderOpen(true)}
          quantity={order.dishes.length}
          className='ml-6 md:ml-0'
        />

        <Button variant='ghost'>
          <Link href='/transaction-history' className='text-inherit'>
            Lịch sử giao dịch
          </Link>
        </Button>

        <Button variant='ghost'>
          <Link href='/account' className='text-inherit'>
            Tài khoản
          </Link>
        </Button>
      </div>

      <Image
        className='sm:hidden cursor-pointer hover:opacity-80 transition-opacity duration-200'
        src='/images/bars-solid.svg'
        alt='bar logo'
        width={30}
        height={30}
        onClick={() => setIsSidebarOpen((pre) => !pre)}
      />

      {isSidebarOpen && sideBarItems.length > 0 && (
        <div
          className={cns(
            'top-20 right-0 flex flex-col bg-gray-600 text-white rounded-tl rounded-bl z-50 sm:hidden',
            isSidebarOpen ? 'absolute' : 'hidden'
          )}
        >
          {sideBarItems.map((item, index) => (
            <ItemBar
              key={index}
              url={item.url}
              text={item.text}
              onClick={() => setIsSidebarOpen(false)}
              onMouseOver={() => onMouseSidebarOver(item.key)}
              onMouseLeave={() => onMouseSidebarLeave(item.key)}
            />
          ))}

          {isHovered.bestSelling?.sidebar && (
            <Dropdown
              data={bestSelling}
              onClick={() => setIsHovered({ bestSelling: { sidebar: false } })}
              onMouseLeave={() =>
                setIsHovered({ bestSelling: { sidebar: false } })
              }
              onMouseOver={() =>
                setIsHovered({ bestSelling: { sidebar: true } })
              }
              className='right-[146px]'
            />
          )}

          {isHovered.categories?.sidebar && (
            <Dropdown
              data={categories}
              onClick={onCategoryClick}
              onMouseLeave={() =>
                setIsHovered({ categories: { sidebar: false } })
              }
              onMouseOver={() =>
                setIsHovered({ categories: { sidebar: true } })
              }
              className='top-14 right-[146px]'
            />
          )}
        </div>
      )}

      <Dialog open={isOrderOpen} onOpenChange={setIsOrderOpen}>
        <DialogContent className='sm:max-w-[800px]'>
          <DialogHeader>
            <DialogTitle className='text-2xl text-center'>ĐƠN HÀNG</DialogTitle>
          </DialogHeader>
          {
            order.dishes.length > 0 ?

              order.dishes.map((dish) => (
                <section
                  key={dish.idDish}
                  className='grid grid-cols-6 items-center'
                >
                  <div className='relative w-14 h-14'>
                    <Image src={dish.thumbnail} alt='thumbnail' fill />
                  </div>
    
                  <p className='col-span-2 text-xl font-medium'>{dish.name}</p>
    
                  <p>
                    {dish.details.map((detail) => (
                      <div key={detail.size} className='flex gap-2'>
                        <p>{detail.quantity}</p>
                        <p>{getValueString(detail.price)}</p>
                      </div>
                    ))}
                  </p>
    
                  <p className='text-xl text-red-500'>
                    {getValueString(dish.total)}
                  </p>
    
                  <div className='bg-green-600 w-10 h-4'>
    
                  </div>
                </section>
              )) :
              <p>Không có món được chọn!</p>
            
          }
        </DialogContent>

        {/* <Button
              type='submit'
              variant='success'
              onClick={onComfirmedSummit}
            >
              Hoàn tất
            </Button> */}
        <DialogFooter></DialogFooter>
      </Dialog>
    </section>
  );
};

export default Header;
