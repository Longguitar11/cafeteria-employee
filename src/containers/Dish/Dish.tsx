'use client';

import { CardCustom } from '@/components/CardCustom';
import { Quantity } from '@/components/Quantity';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { createOrder, updateOrder } from '@/redux/orderSlice';
import { getValueString } from '@/utils/currency';
import { getDishById } from '@/utils/dish';
import React, { useEffect, useMemo, useState } from 'react';
import { Props } from './Dish.models';

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

      console.log({ selectedCard });

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

  return (
    <section className={className}>
      <p className='text-gray-700 text-3xl font-medium uppercase border-b-[0.5px] border-gray-400'>
        TẤT CẢ CÁC MÓN
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-10'>
        {allDishes.length > 0 ? (
          allDishes.map((dish) => {
            const { id, name, price, status } = dish;
            return (
              <CardCustom
                key={id}
                name={name}
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-[800px] flex gap-4 p-4'>
          {/* <div className='flex-1 relative h-96'>
            <Image src={selectedCard?.thumbnail || ''} alt='thumbnail' fill />
          </div> */}

          <div className='flex-1 flex flex-col justify-between'>
            <div className='space-y-3'>
              <p className='text-3xl font-semibold'>
                {selectedCard?.name || ''}
              </p>

              <p className='text-xl text-red-500'>
                {getValueString((selectedCard?.price || 0).toString())}
              </p>

              {/* <Size value={selectedSize.size} onClick={setSelectedSize} /> */}
              <Quantity quantity={quantity} setQuantity={setQuantity} />
            </div>

            <div className='space-y-3'>
              <p className='text-xl text-end'>
                Thành tiền:{' '}
                <span className='font-medium text-red-500'>{amount}</span>
              </p>
              <Button
                type='submit'
                variant='success'
                className='w-full'
                onClick={onAddToOrderSummit}
              >
                Thêm vào đơn hàng
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Dish;
