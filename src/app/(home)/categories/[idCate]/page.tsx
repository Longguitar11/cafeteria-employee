'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { categories } from '@/constants/categories';
import { foodAndDrinks } from '@/constants/foodAndDrinks';
import { Button } from '@/components/ui/button';
import { CardCustom } from '@/components/CardCustom';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getValueString } from '@/utils/currency';
import { Quantity } from '@/components/Quantity';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { createOrder, updateOrder } from '@/redux/orderSlice';

export default function IdCategory({ params }: { params: { idCate: string } }) {
  // state
  const [open, setOpen] = useState<boolean>(false);
  const [cardId, setCardId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  // selectors
  const order = useAppSelector((state) => state.orderStore.order);

  const dispatch = useAppDispatch();

  const category = categories.find((cate) => cate.id == params.idCate);
  const products = foodAndDrinks.filter((item) => item.idCate == params.idCate);
  const selectedCard = products.find((prod) => prod.idDish === cardId);
  const total = (parseInt(selectedCard?.price || '0') * quantity).toString();
  const amount = getValueString(total);

  const onCardClick = (id: string) => {
    setOpen(true);
    setCardId(id);
  };

  const onAddToOrderSummit = () => {
    const product = products.find((product) => product.idDish === cardId);

    if (product) {
      const { idDish, idCate, name, price, thumbnail } = product;

      if (order.dishes.length === 0) {
        dispatch(
          createOrder({
            idDish,
            idCate,
            name,
            thumbnail,
            quantity,
            price,
            total,
          })
        );
      } else {
        dispatch(
          updateOrder({
            idDish,
            idCate,
            name,
            thumbnail,
            quantity,
            price,
            total,
          })
        );
      }
    }

    setOpen(false);
  };

  useEffect(() => {
    setQuantity(1);
  }, [open]);

  return (
    <section className='py-10 px-10'>
      <p className='text-gray-700 text-3xl font-medium uppercase border-b-[0.5px] border-gray-400'>
        {category?.label}
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-10'>
        {products.length > 0 ? (
          products.map((prod) => {
            const { idDish, thumbnail, name, price } = prod;
            return (
              <CardCustom
                key={idDish}
                onClick={() => onCardClick(idDish)}
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
}
