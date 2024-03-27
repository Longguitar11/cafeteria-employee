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
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useEffect, useMemo, useState } from 'react';
import { DishType } from '@/types/dish';
import { AddDishType, EditDishType, PaymentButtonType } from './Order.models';
import { addDishes } from '@/redux/orderSlice';
import { getAllDishes } from '@/apis/dish';
import { Button } from '../ui/button';
import { DishFilter } from '../Filter';
import { cn } from '@/lib/utils';
import { getValueString } from '@/utils/currency';
import { Quantity } from '../Quantity';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PaymentForm, PaymentSchema } from '@/schemas/payment';
import { InputCustom } from '../InputCustom';
import { paymentMethods } from '@/constants/paymentMethod';
import { OrderedDishInterface } from '@/types/order';

export const AddDish = (props: AddDishType) => {
  const { className, buttonClassName } = props;

  const dispatch = useAppDispatch();

  const allDishes = useAppSelector((state) => state.dishStore.allDishes);
  const order = useAppSelector((state) => state.orderStore.order);

  const [dishes, setDishes] = useState<DishType[]>(allDishes);
  const [dishIds, setDishIds] = useState<number[]>([]);

  const onDishClick = (idDish: number) => {
    if (!dishIds.includes(idDish)) setDishIds((pre) => [...pre, idDish]);
    else setDishIds((dishIds) => dishIds.filter((id) => id !== idDish));
  };

  const orderedDishIds = useMemo(() => {
    const orderedIds = order.productDetail.map(
      ({ id }: OrderedDishInterface) => id
    );

    return orderedIds || [];
  }, [order.productDetail]);

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
          className={cn(
            'border-green-500 hover:bg-green-500 hover:text-white transition-colors duration-200',
            buttonClassName
          )}
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
          <DishFilter
            allDishes={allDishes}
            dishes={dishes}
            setDishes={setDishes}
          />

          {dishes.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 max-h-[296px] overflow-y-auto hidden-scrollbar'>
              {dishes.map((dish) => (
                <div
                  key={dish.id}
                  onClick={() => {
                    !orderedDishIds.includes(dish.id!) && onDishClick(dish.id!);
                  }}
                  className={cn(
                    'flex gap-3 justify-between items-center rounded border-[1.5px] border-gray-300 hover:border-red-400 transition-colors duration-200 p-3 cursor-pointer',
                    (dishIds.includes(dish.id!) ||
                      orderedDishIds.includes(dish.id!)) &&
                      'border-red-500',
                    orderedDishIds.includes(dish.id!) &&
                      'bg-gray-200 border-none'
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
                  <span className='font-light text-red-500'>
                    {orderedDishIds.includes(dish.id!) && 'Đã chọn'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-center text-lg text-red-500'>
              Không tìm thấy món!
            </p>
          )}

          <DialogFooter className='justify-between items-center '>
            <DialogClose asChild>
              <Button variant='secondary' className='w-full sm:flex-1'>
                Hủy bỏ
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type='submit'
                variant='success'
                className='w-full sm:flex-1'
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

  const allDishes = useAppSelector((state) => state.dishStore.allDishes);

  const selectedDish = useMemo(() => {
    const selectedDish = allDishes.find((d) => d.id === dish.id);

    if (selectedDish) return selectedDish;
  }, [dish, allDishes]);

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

      <DialogContent className={cn('sm:min-w-[500px] p-4', className)}>
        <div className='flex gap-4'>
          {/* <div className='flex-1 relative h-96'>
              <Image src={dish?.thumbnail || ''} alt='thumbnail' fill />
            </div> */}

          <div className='flex-1 flex flex-col justify-between gap-8'>
            <div className='space-y-3'>
              <p className='text-3xl font-semibold'>{dish?.name}</p>

              <div className='flex gap-4 items-center'>
                <p className='text-xl text-amber-500'>
                  {getValueString((dish?.price || 0).toString())}
                </p>

                <span className=' border-2 border-green-500 px-2 text-green-600 rounded'>
                  {selectedDish?.categoryName}
                </span>
              </div>

              <p className='text-base text-gray-400'>
                Mô tả: {selectedDish?.description}
              </p>

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
                    onClick={() => onEditDishSubmit(dish.id!)}
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

export const PaymentButton = (props: PaymentButtonType) => {
  const { className, open, setOpen, onSubmit } = props;

  const form = useForm<PaymentForm>({
    resolver: zodResolver(PaymentSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      contactNumber: '',
      name: '',
      paymentMethod: 'CASH',
    },
  });

  const { control, handleSubmit } = form;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={cn('w-[500px] max-w-[700px]', className)}
        onCloseAutoFocus={() => form.reset()}
      >
        <DialogHeader>
          <DialogTitle className='text-3xl text-center'>THANH TOÁN</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={cn('space-y-3 mx-auto w-full', className)}
          >
            <InputCustom
              control={control}
              name='name'
              label='Tên khách hàng'
              placeholder='Nhập tên khách hàng...'
            />
            <InputCustom
              control={control}
              name='email'
              label='Email khách hàng'
              placeholder='Nhập email khách hàng...'
            />
            <InputCustom
              control={control}
              name='contactNumber'
              label='SĐT khách hàng'
              placeholder='Nhập SĐT khách hàng...'
            />

            <FormField
              control={control}
              name='paymentMethod'
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel>Phương thức thanh toán</FormLabel>
                  <div className='flex gap-3'>
                    {paymentMethods.map((item) => (
                      <div
                        key={item.value}
                        onClick={() => onChange(item.value)}
                        className={cn(
                          'flex-1 p-3 text-center rounded shadow border-[0.5px] hover:border-green-500 transition-colors duration-200 cursor-pointer',
                          value === item.value && 'border-green-500', item.value === 'ALL' && 'hidden'
                        )}
                      >
                        {item.label}
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline' className='flex-1'>
                  Quay lại
                </Button>
              </DialogClose>

              <Button type='submit' variant='success' className='flex-1'>
                Xác nhận
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
