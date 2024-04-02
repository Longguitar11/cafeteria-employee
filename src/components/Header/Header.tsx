'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { optionItems } from '@/constants/optionItems';
import { DropdownHoverType } from './Header.models';
import { redirect, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { cancelOrder, deleteDish } from '@/redux/orderSlice';
import { cn } from '@/lib/utils';
import { accountDropdown } from '@/constants/accountDropdown';
import { useAuthContext } from '@/containers/Auth/Auth.context';
import { isExpriredToken } from '@/utils/token';
import { categoriesDropdownData } from '@/utils/categories';
import { Button } from '../ui/button';
import { Dropdown } from '../Dropdown';
import { OrderIcon } from '../OrderIcon';
import { OrderModal } from '../Order';
import { Options } from './Header.views';
import { getAllCategories } from '@/apis/category';
import { DishType } from '@/types/dish';
import { storeCategoryIds } from '@/utils/dish';
import { getAllDishes } from '@/apis/dish';

const Header = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { token } = useAuthContext();

  const [isOptionOpen, setIsOptionOpen] = useState<boolean>(false);
  const [isOrderOpen, setIsOrderOpen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<DropdownHoverType>({
    categories: { header: false, option: false },
  });
  const [allDishes, setAllDishes] = useState<DishType[]>([]);

  const order = useAppSelector((state) => state.orderStore.order);
  const categories = useAppSelector((state) => state.categoryStore.categories);

  const onCategoryClick = (url: string) => {
    setIsHovered({ categories: { header: false } });
    if (isOptionOpen) setIsOptionOpen(false);

    router.push(url);
  };

  const onDeleteClick = (idDish: number) => {
    dispatch(deleteDish(idDish));
  };

  const onConfirmCancelClick = () => {
    dispatch(cancelOrder());
    setIsOrderOpen(false);
  };

  const onAccountClick = (url: string) => {
    if (url === '/signin' && typeof window !== undefined) {
      localStorage.clear();
    }
    router.push(url);
  };

  const currentCategories = useMemo(
    () => categoriesDropdownData(categories),
    [categories]
  );

  const expriredToken = useMemo(() => {
    if (token) return isExpriredToken(token);
  }, [token]);

  useEffect(() => {
    if (expriredToken && typeof window !== undefined) {
      localStorage.clear();
      redirect('/signin');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expriredToken]);

  // store category ids
  useEffect(() => {
    storeCategoryIds(allDishes);
  }, [allDishes]);

  useEffect(() => {
    if (!token) {
      console.log('redirect to login');
      redirect('/signin');
    }

    const res = getAllDishes();
    res.then((res) => setAllDishes(res)).catch((error) => console.log(error));

    getAllCategories(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      className={cn(
        'h-20 w-full px-20 text-green-100 bg-zinc-700 flex justify-between items-center fixed top-0 left-0 whitespace-nowrap',
        isOrderOpen && 'min-w-[800px]'
      )}
    >
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
          <div className='flex gap-6'>
            <Button variant='ghost' onClick={() => router.push('/dish')}>
              Món
            </Button>

            <div className='relative'>
              <Button
                variant='ghost'
                onClick={() => router.push('/category')}
                onMouseOver={() =>
                  setIsHovered({ categories: { header: true } })
                }
                onMouseLeave={() =>
                  setIsHovered({ categories: { header: false } })
                }
              >
                Phân loại
              </Button>

              {isHovered.categories?.header && (
                <Dropdown
                  data={currentCategories}
                  onClick={onCategoryClick}
                  onMouseOver={() =>
                    setIsHovered({ categories: { header: true } })
                  }
                  onMouseLeave={() =>
                    setIsHovered({ categories: { header: false } })
                  }
                  className='left-0'
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='justify-between items-center gap-6 flex'>
        <OrderIcon
          onClick={() => setIsOrderOpen(true)}
          quantity={(order.productDetail && order.productDetail.length) || 0}
          className='ml-6 md:ml-0'
        />

        <div className='hidden sm:flex gap-6'>
          <Button variant='ghost'>
            <Link href='/transaction-history' className='text-inherit'>
              Lịch sử giao dịch
            </Link>
          </Button>

          <div className='relative'>
            <Button
              variant='ghost'
              onMouseOver={() => setIsHovered({ account: { header: true } })}
              onMouseLeave={() => setIsHovered({ account: { header: false } })}
            >
              Tài khoản
            </Button>

            {isHovered.account?.header && (
              <Dropdown
                data={accountDropdown}
                onClick={onAccountClick}
                onMouseOver={() => setIsHovered({ account: { header: true } })}
                onMouseLeave={() =>
                  setIsHovered({ account: { header: false } })
                }
                className='right-0'
              />
            )}
          </div>
        </div>

        <div className='relative w-8 h-8 block sm:hidden'>
          <Image
            className='sm:hidden cursor-pointer hover:opacity-80 transition-opacity duration-200'
            src='/images/bars-solid.svg'
            alt='bar logo'
            fill
            sizes='32px'
            onClick={() => setIsOptionOpen((pre) => !pre)}
          />
        </div>
      </div>

      {isOptionOpen && optionItems.length > 0 && (
        <Options isOpen={isOptionOpen} setIsOpen={setIsOptionOpen} />
      )}

      <OrderModal
        isOpen={isOrderOpen}
        setIsOpen={setIsOrderOpen}
        order={order}
        onConfirmCancelClick={onConfirmCancelClick}
        onDeleteClick={onDeleteClick}
      />
    </section>
  );
};

export default Header;
