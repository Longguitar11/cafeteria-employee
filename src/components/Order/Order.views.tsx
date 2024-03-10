import { useAppDispatch, useAppSelector } from '@/redux/hook';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { useEffect, useState } from 'react';
import { DishType } from '@/types/dish';
import { AddDishType, EditDishType } from './Order.models';
import { addDishes } from '@/redux/orderSlice';
import { getAllDishes } from '@/apis/dish';
import { Button } from '../ui/button';
import { Filter } from '../Filter';
import { cn } from '@/lib/utils';
import { getValueString } from '@/utils/currency';
import { Quantity } from '../Quantity';

export const AddDish = (props: AddDishType) => {
  const { className, buttonClassName } = props;

  const dispatch = useAppDispatch();

  const allDishes = useAppSelector((state) => state.dishStore.allDishes);

  const [dishes, setDishes] = useState<DishType[]>(allDishes);
  const [dishIds, setDishIds] = useState<number[]>([]);

  const onDishClick = (idDish: number) => {
    if (!dishIds.includes(idDish)) setDishIds((pre) => [...pre, idDish]);
    else setDishIds((dishIds) => dishIds.filter((id) => id !== idDish));
  };

  const onSubmit = () => {
    dispatch(addDishes(dishIds));
  };

  useEffect(() => {
    getAllDishes(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className={cn('border-green-500 hover:bg-green-500 hover:text-white transition-colors duration-200', buttonClassName)}
        >
          Thêm món
        </Button>
      </DialogTrigger>

      <DialogContent
        className={cn('sm:max-w-[800px] p-4', className)}
        onCloseAutoFocus={() => setDishIds([])}
      >
        <DialogHeader>
          <DialogTitle className='text-center text-2xl text-green-600'>
            THÊM MÓN
          </DialogTitle>
        </DialogHeader>
        <div className='space-y-3'>
          <Filter allDishes={allDishes} dishes={dishes} setDishes={setDishes} />

          {dishes.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 max-h-[332px] overflow-y-auto hidden-scrollbar'>
              {dishes.map((dish) => (
                <div
                  key={dish.id}
                  onClick={() => onDishClick(dish.id!)}
                  className={cn(
                    'flex gap-3 items-center rounded border-[0.5px] border-gray-300 hover:border-green-500 transition-colors duration-200 p-3 cursor-pointer',
                    dishIds.includes(dish.id!) && 'border-green-500'
                  )}
                >
                  {/* <div className='relative w-12 h-12'>
                      <Image
                        src={dish?.thumbnail || ''}
                        alt='thumbnail'
                        fill
                        className='rounded'
                      />
                    </div> */}

                  <p className='font-light'>{dish.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-center text-lg text-red-500'>
              Không tìm thấy món!
            </p>
          )}

          <DialogFooter className='justify-between items-center'>
            <DialogClose asChild>
              <Button variant='secondary' className='flex-1'>
                Hủy bỏ
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type='submit'
                variant='success'
                className='flex-1'
                disabled={dishIds.length === 0}
                onClick={onSubmit}
              >
                Xác nhận
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const EditDish = (props: EditDishType) => {
  const {
    className = '',
    dish,
    quantity,
    calTotalDish,
    onEditDishSubmit,
    setQuantity,
  } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='success'
          onClick={() => setQuantity(dish.quantity || 1)}
        >
          Chỉnh sửa
        </Button>
      </DialogTrigger>

      <DialogContent className={cn('sm:max-w-[800px] p-4', className)}>
        <div className='flex gap-4'>
          {/* <div className='flex-1 relative h-96'>
              <Image src={dish?.thumbnail || ''} alt='thumbnail' fill />
            </div> */}

          <div className='flex-1 flex flex-col justify-between'>
            <div className='space-y-3'>
              <p className='text-3xl font-semibold'>{dish?.name || ''}</p>

              <p className='text-xl text-red-500'>
                {getValueString(dish.price.toString())}
              </p>

              {/* <Size value={selectedSize.size} onClick={setSelectedSize} /> */}
              <Quantity quantity={quantity} setQuantity={setQuantity} />
            </div>

            <DialogFooter className='space-y-3 block'>
              <p className='text-xl text-end'>
                Thành tiền:{' '}
                <span className='font-medium text-red-500'>
                  {calTotalDish(dish.price.toString())}
                </span>
              </p>
              <div className='w-full flex gap-3'>
                <DialogClose>
                  <Button variant='secondary'>Hủy bỏ</Button>
                </DialogClose>
                <DialogClose asChild className='w-full'>
                  <Button
                    type='submit'
                    variant='success'
                    onClick={() => onEditDishSubmit(dish.id)}
                  >
                    Xác nhận
                  </Button>
                </DialogClose>
              </div>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
