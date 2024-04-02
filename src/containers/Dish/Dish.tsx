'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { createOrder, updateOrder } from '@/redux/orderSlice';
import { CardCustom } from '@/components/CardCustom';
import { DishModal } from '@/components/DishModal';
import { getValueString } from '@/utils/currency';
import { getDishById, storeCategoryIds } from '@/utils/dish';
import { Props } from './Dish.models';
import { getAllDishes } from '@/apis/dish';
import { DishType } from '@/types/dish';

const Dish = (props: Props) => {
  const { className } = props;

  const dispatch = useAppDispatch();

  // state
  const [open, setOpen] = useState<boolean>(false);
  const [cardId, setCardId] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [allDishes, setAllDishes] = useState<DishType[]>([]);

  console.log({ allDishes });

  const order = useAppSelector((state) => state.orderStore.order);
  const categories = useAppSelector((state) => state.categoryStore.categories);

  // useMemo
  const selectedCard = useMemo(
    () => getDishById(allDishes, cardId),
    [cardId, allDishes]
  );

  const categoryIds: number[] = useMemo(() => {
    if (window !== undefined) {
      return JSON.parse(localStorage.getItem('categoryIds') || '');
    }
  }, []);

  // variables
  const total = selectedCard?.price! * quantity;
  const amount = getValueString(total.toString());

  // function
  const onCardClick = (id: number) => {
    setOpen(true);
    setCardId(id);
  };

  const onAddToOrderSummit = () => {
    if (selectedCard) {
      const { id, name, price, categoryName } = selectedCard;

      if (order.productDetail.length === 0) {
        dispatch(
          createOrder({
            id: id!,
            name,
            quantity,
            price,
            total,
            category: categoryName!,
          })
        );
      } else {
        dispatch(
          updateOrder({
            id: id!,
            name,
            quantity,
            price: price,
            total,
            category: categoryName!,
          })
        );
      }
    }

    setOpen(false);
  };

  // useEffect
  useEffect(() => {
    setQuantity(1);
  }, [open]);

  useEffect(() => {
    const res = getAllDishes();
    res.then((res) => setAllDishes(res)).catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={className}>
      <p className='text-gray-700 text-3xl font-medium uppercase border-b-[0.5px] border-gray-400'>
        TẤT CẢ CÁC MÓN
      </p>

      <div className=' mt-10'>
        {allDishes.length > 0 ? (
          <div className='space-y-6'>
            {categoryIds.map((cateId) => {
              const categoryName = categories.find(
                (cate) => cateId === cate.id
              )?.name;
              return (
                <div key={cateId} className='flex flex-col gap-4'>
                  <p className='text-gray-500 text-2xl font-medium uppercase tracking-widest'>{categoryName}</p>

                  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
                    {allDishes
                      .filter((dish) => dish.categoryId === cateId)
                      .map((dish) => {
                        const {
                          id,
                          name,
                          price,
                          status,
                          imageProduct,
                        } = dish;
                        return (
                          <CardCustom
                            key={id}
                            name={name}
                            thumbnail={imageProduct}
                            price={price.toString()}
                            status={status === 'true'}
                            onClick={() => onCardClick(id!)}
                          />
                        );
                      })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>Không có món nào!</div>
        )}
      </div>

      <DishModal
        amount={amount}
        onSubmit={onAddToOrderSummit}
        open={open}
        quantity={quantity}
        selectedCard={selectedCard!}
        setOpen={setOpen}
        setQuantity={setQuantity}
      />
    </section>
  );
};

export default Dish;
