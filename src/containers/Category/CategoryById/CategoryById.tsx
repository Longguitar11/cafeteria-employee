'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { CardCustom } from '@/components/CardCustom';
import { getValueString } from '@/utils/currency';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { createOrder, updateOrder } from '@/redux/orderSlice';
import { getDishesByCateId } from '@/apis/dish';
import { getDishById } from '@/utils/dish';
import { getCategoryById } from '@/utils/categories';
import { Props } from './CategoryById.models';
import { DishModal } from '@/components/DishModal';
import { DishType } from '@/types/dish';

export default function CategoryById(props: Props) {
  const { className, idCate } = props;

  const dispatch = useAppDispatch();

  // state
  const [open, setOpen] = useState<boolean>(false);
  const [cardId, setCardId] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [dishes, setDishes] = useState<DishType[]>([]);
  const [isGettingDishes, setIsGettingDishes] = useState<boolean>(false);

  // selectors
  const categories = useAppSelector((state) => state.categoryStore.categories);
  const order = useAppSelector((state) => state.orderStore.order);

  // useMemo
  const category = useMemo(
    () => getCategoryById(categories, parseInt(idCate)),
    [categories, idCate]
  );

  const selectedCard = useMemo(
    () => getDishById(dishes, cardId),
    [cardId, dishes]
  );

  // useCallback
  const fetchDishes = useCallback(() => {
    const res = getDishesByCateId(parseInt(idCate));

    setIsGettingDishes(true);
    res
      .then((res) => {
        setIsGettingDishes(false);
        setDishes(res);
      })
      .catch((error) => console.log(error));
  }, [idCate]);

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
            price,
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
    fetchDishes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idCate]);

  return (
    <section className={className}>
      <p className='text-gray-700 text-3xl font-medium uppercase border-b-[0.5px] border-gray-400'>
        {category?.name}
      </p>

      {!isGettingDishes ? (
        dishes.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-10'>
            {dishes.map((dish) => {
              const { id, name, price, status, imageProduct } = dish;
              return (
                <CardCustom
                  key={id}
                  name={name}
                  price={price.toString()}
                  thumbnail={imageProduct}
                  status={status === 'true'}
                  onClick={() => onCardClick(id!)}
                />
              );
            })}
          </div>
        ) : (
          <div className='text-center text-xl mt-4'>Không có món nào!</div>
        )
      ) : (
        <div className='text-sky-500 text-center text-xl mt-4'>
          Đang tải...
        </div>
      )}

      <DishModal
        amount={amount}
        open={open}
        quantity={quantity}
        onSubmit={onAddToOrderSummit}
        setOpen={setOpen}
        selectedCard={selectedCard!}
        setQuantity={setQuantity}
      />
    </section>
  );
}
