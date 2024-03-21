'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { createOrder, updateOrder } from '@/redux/orderSlice';
import { CardCustom } from '@/components/CardCustom';
import { DishModal } from '@/components/DishModal';
import { getValueString } from '@/utils/currency';
import { getDishById } from '@/utils/dish';
import { Props } from './Dish.models';
import { getAllDishes } from '@/apis/dish';

const Dish = (props: Props) => {
  const { className } = props;

  const dispatch = useAppDispatch();

  // state
  const [open, setOpen] = useState<boolean>(false);
  const [cardId, setCardId] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  const allDishes = useAppSelector((state) => state.dishStore.allDishes);
  const order = useAppSelector((state) => state.orderStore.order);

  // useMemo
  const selectedCard = useMemo(
    () => getDishById(allDishes, cardId),
    [cardId, allDishes]
  );

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
    getAllDishes(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={className}>
      <p className='text-gray-700 text-3xl font-medium uppercase border-b-[0.5px] border-gray-400'>
        TẤT CẢ CÁC MÓN
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-10'>
        {allDishes.length > 0 ? (
          allDishes.map((dish) => {
            const { id, name, categoryName, price, status } = dish;
            return (
              <CardCustom
                key={id}
                name={name}
                category={categoryName!}
                price={price.toString()}
                status={status === 'true'}
                onClick={() => onCardClick(id!)}
              />
            );
          })
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
