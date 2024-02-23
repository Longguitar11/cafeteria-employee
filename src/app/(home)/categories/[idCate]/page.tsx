'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { categories } from '@/constants/categories';
import { foodAndDrinks } from '@/constants/foodAndDrinks';
import { Button } from '@/components/ui/button';
import { CardCustom } from '@/components/CardCustom';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getValueString } from '@/utils/currency';
import { Size } from '@/components/Size';
import { SizeType } from '@/types/size';
import { Quantity } from '@/components/Quantity';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { createOrder, updateOrder } from '@/redux/orderSlice';
import { calString } from '@/utils/dish';

export default function IdCategory({ params }: { params: { idCate: string } }) {
  // state
  const [open, setOpen] = useState<boolean>(false);
  const [cardId, setCardId] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<{
    size: SizeType;
    price: string;
  }>({ size: 'S', price: '0' });
  const [quantity, setQuantity] = useState<number>(1);

  // selectors
  const allOrders = useAppSelector((state) => state.orderStore.allOrders);
  const order = useAppSelector((state) => state.orderStore.order);

  const dispatch = useAppDispatch();

  const category = categories.find((cate) => cate.id == params.idCate);
  const products = foodAndDrinks.filter((item) => item.idCate == params.idCate);
  const selectedCard = products.find((prod) => prod.id === cardId);
  const total = (
    (parseInt(selectedCard?.price || '0') + parseInt(selectedSize?.price)) *
    quantity
  ).toString();
  const amount = getValueString(total);

  const onCardClick = (id: string) => {
    setOpen(true);
    setCardId(id);
  };

  const onAddToOrderSummit = () => {
    const product = products.find((product) => product.id === cardId);

    if (product) {
      const { id, name, price, thumbnail } = product;

      if (order.dishes.length === 0) {
        dispatch(
          createOrder({
            idDish: id,
            name,
            thumbnail,
            details: [
              {
                size: selectedSize.size,
                price: calString([price, selectedSize.price], '+'),
                quantity,
              },
            ],
            total: total,
          })
        );
      } else {
        dispatch(
          updateOrder({
            idDish: id,
            name,
            thumbnail,
            details: [
              {
                size: selectedSize.size,
                price: calString([price, selectedSize.price], '+'),
                quantity,
              },
            ],
            total: total,
          })
        );
      }
    }

    setOpen(false);
  };

  useEffect(() => {
    setQuantity(1);
    setSelectedSize({ size: 'S', price: '0' });
  }, [open]);

  return (
    <section className='py-10 px-10'>
      <p className='text-gray-700 text-3xl font-medium uppercase border-b-[0.5px] border-gray-400'>
        {category?.name}
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-10'>
        {products.length > 0 ? (
          products.map((prod) => {
            const { id, thumbnail, name, price } = prod;
            return (
              <CardCustom
                key={id}
                onClick={() => onCardClick(id)}
                thumbnail={thumbnail}
                name={name}
                price={price}
              />
            );
          })
        ) : (
          <div>Không có sản phẩm!</div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-[800px] flex gap-4 p-4'>
          <div className='flex-1 relative h-96'>
            <Image src={selectedCard?.thumbnail || ''} alt='thumbnail' fill />
          </div>

          <div className='flex-1 flex flex-col justify-between'>
            <div className='space-y-3'>
              <p className='text-3xl font-semibold'>
                {selectedCard?.name || ''}
              </p>

              <p className='text-xl text-red-500'>
                {getValueString(selectedCard?.price || '0')}
              </p>

              <Size value={selectedSize.size} onClick={setSelectedSize} />
              <Quantity quantity={quantity} setQuantity={setQuantity} />

              <p className='text-xl'>
                Thành tiền:{' '}
                <span className='font-medium text-red-500'>{amount}</span>
              </p>
            </div>

            <Button
              type='submit'
              variant='success'
              onClick={onAddToOrderSummit}
            >
              Thêm vào đơn hàng
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
