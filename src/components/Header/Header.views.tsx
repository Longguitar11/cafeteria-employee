import React, { useEffect, useState } from 'react';
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
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Button } from '../ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import Image from 'next/image';
import { getValueString } from '@/utils/currency';
import {
  AddDishType,
  EditDishType,
  OptionsType,
  OrderModalType,
} from './Header.models';
import { cn } from '@/lib/utils';
import { optionItems } from '@/constants/optionItems';
import { ItemBar } from '../ItemBar';
import { Dropdown } from '../Dropdown';
import { bestSelling } from '@/constants/bestSelling';
import { categories } from '@/constants/categories';
import { HeaderType } from '@/types/header';
import { Quantity } from '../Quantity';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { addDishes, updateDish } from '@/redux/orderSlice';
import Filter from '../Filter/Filter';
import { DishInterface } from '@/types/dish';
import { foodAndDrinks } from '@/constants/foodAndDrinks';
import './style.css';
import { AlertDialogCustom } from '../AlertDialogCustom';

export const OrderModal = (props: OrderModalType) => {
  const {
    className = '',
    isOpen,
    setIsOpen,
    order,
    onPayClick,
    onDeleteClick,
    onConfirmCancelClick,
  } = props;

  const dispatch = useAppDispatch();

  const [quantity, setQuantity] = useState<number>(1);

  const totalDish = (price: string) =>
    getValueString((parseInt(price) * quantity).toString());

  const onEditDishSubmit = (idDish: string) => {
    const dish = order.dishes.find((dish) => dish.idDish === idDish);

    dispatch(
      updateDish({
        idDish,
        quantity,
        total: (parseInt(dish?.price || '0') * quantity).toString(),
      })
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className={cn('min-w-[800px] max-w-[1000px]', className)}>
        <DialogHeader>
          <DialogTitle className='text-3xl text-center'>ĐƠN HÀNG</DialogTitle>
        </DialogHeader>

        {order.dishes.length > 0 ? (
          <>
            <AddDish />

            <Table>
              <TableHeader className='w-full table table-fixed'>
                <TableRow>
                  <TableHead className='w-12'>STT</TableHead>
                  <TableHead>Tên</TableHead>
                  <TableHead className='w-20'>Ảnh</TableHead>
                  <TableHead className='w-24'>
                    {/* Chi tiết <br /> (Size - SL - Giá) */}
                    Số lượng
                  </TableHead>
                  <TableHead className='w-24'>Giá</TableHead>
                  <TableHead className='w-24'>Tổng giá</TableHead>
                  <TableHead className='text-center'>Thao tác</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className='max-h-[355.2px] overflow-y-auto hidden-scrollbar block'>
                {order.dishes.map((dish, index) => (
                  <TableRow
                    className='w-full table table-fixed'
                    key={dish.idDish}
                  >
                    <TableCell className='font-medium w-12'>
                      {index + 1}
                    </TableCell>

                    <TableCell>{dish.name}</TableCell>

                    <TableCell className='w-20'>
                      <div className='relative w-14 h-14'>
                        <Image src={dish.thumbnail} alt='thumbnail' fill />
                      </div>
                    </TableCell>

                    <TableCell className='w-24 text-center'>
                      {dish.quantity}
                    </TableCell>
                    {/* <TableCell>
                      {dish.details.map((detail) => (
                        <div
                          key={detail.size}
                          className='flex justify-center gap-4'
                        >
                          <p>{detail.size}</p>
                          <p>{detail.quantity}</p>
                          <p>{getValueString(detail.totalValue)}</p>
                        </div>
                      ))}
                    </TableCell> */}

                    <TableCell className='w-24'>
                      {getValueString(dish.price)}
                    </TableCell>

                    <TableCell className='w-24'>
                      {getValueString(dish.total || '0')}
                    </TableCell>

                    <TableCell>
                      <div className='flex justify-center gap-3'>
                        <AlertDialogCustom
                          buttonTitle='Xóa'
                          onSubmit={() =>
                            onDeleteClick({
                              idDish: dish.idDish,
                              idCate: dish.idCate,
                            })
                          }
                        />

                        <EditDish
                          dish={dish}
                          quantity={quantity}
                          calTotalDish={totalDish}
                          setQuantity={setQuantity}
                          onEditDishSubmit={onEditDishSubmit}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

              <TableFooter>
                <TableRow className='w-full table table-fixed'>
                  <TableCell colSpan={7} className='text-end text-lg'>
                    Thành tiền:{' '}
                    <span className='text-red-500 font-medium'>
                      {getValueString(order?.amount || '0')}
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow className='w-full table table-fixed'>
                  <TableCell colSpan={6}>
                    <AlertDialogCustom
                      buttonTitle='hủy đơn'
                      onSubmit={onConfirmCancelClick}
                    />
                  </TableCell>
                  <TableCell className='w-fit'>
                    <div className='flex justify-end gap-3'>
                      <Button
                        variant='secondary'
                        onClick={() => setIsOpen(false)}
                      >
                        Quay lại
                      </Button>
                      <Button
                        type='submit'
                        variant='primary'
                        onClick={onPayClick}
                      >
                        Thanh toán
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </>
        ) : (
          <p className='text-center text-xl'>Chưa có món được chọn!</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export const AddDish = (props: AddDishType) => {
  const { className = '' } = props;

  const dispatch = useAppDispatch();

  const [dishes, setDishes] = useState<DishInterface[]>(foodAndDrinks);

  const [dishIds, setDishIds] = useState<string[]>([]);

  const onDishClick = (idDish: string) => {
    if (!dishIds.includes(idDish)) setDishIds((pre) => [...pre, idDish]);
    else setDishIds((dishIds) => dishIds.filter((id) => id !== idDish));
  };

  const onSubmit = () => {
    dispatch(addDishes(dishIds));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='border-green-500 hover:bg-green-500 hover:text-white transition-colors duration-200'
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
          <Filter dishes={dishes} setDishes={setDishes} />

          {dishes.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 max-h-[332px] overflow-y-auto hidden-scrollbar'>
              {dishes.map((dish) => (
                <div
                  key={dish.idDish}
                  onClick={() => onDishClick(dish.idDish)}
                  className={cn(
                    'flex gap-3 items-center rounded border-[0.5px] border-gray-300 hover:border-green-500 transition-colors duration-200 p-3 cursor-pointer',
                    dishIds.includes(dish.idDish) && 'border-green-500'
                  )}
                >
                  <div className='relative w-12 h-12'>
                    <Image
                      src={dish?.thumbnail || ''}
                      alt='thumbnail'
                      fill
                      className='rounded'
                    />
                  </div>

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
          <div className='flex-1 relative h-96'>
            <Image src={dish?.thumbnail || ''} alt='thumbnail' fill />
          </div>

          <div className='flex-1 flex flex-col justify-between'>
            <div className='space-y-3'>
              <p className='text-3xl font-semibold'>{dish?.name || ''}</p>

              <p className='text-xl text-red-500'>
                {getValueString(dish?.price || '0')}
              </p>

              {/* <Size value={selectedSize.size} onClick={setSelectedSize} /> */}
              <Quantity quantity={quantity} setQuantity={setQuantity} />
            </div>

            <DialogFooter className='space-y-3 block'>
              <p className='text-xl text-end'>
                Thành tiền:{' '}
                <span className='font-medium text-red-500'>
                  {calTotalDish(dish.price)}
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
                    onClick={() => onEditDishSubmit(dish.idDish)}
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

export const Options = (props: OptionsType) => {
  const {
    className = '',
    isHover,
    isOpen,
    setIsOpen,
    setIsHover,
    onCategoryClick,
  } = props;

  const onMouseOptionOver = (key: HeaderType) => {
    if (key === 'CATEGORIES') setIsHover({ categories: { option: true } });
    if (key === 'BESTSELLING') setIsHover({ bestSelling: { option: true } });
  };

  const onMouseOptionLeave = (key: HeaderType) => {
    if (key === 'CATEGORIES') setIsHover({ categories: { option: false } });
    if (key === 'BESTSELLING') setIsHover({ bestSelling: { option: false } });
  };

  return (
    <div
      className={cn(
        'top-20 right-0 flex flex-col bg-gray-600 text-white rounded-tl rounded-bl z-50 sm:hidden',
        isOpen ? 'absolute' : 'hidden',
        className
      )}
    >
      {optionItems.map((item, index) => (
        <ItemBar
          key={index}
          url={item.url}
          text={item.text}
          onClick={() => setIsOpen(false)}
          onMouseOver={() => onMouseOptionOver(item.key)}
          onMouseLeave={() => onMouseOptionLeave(item.key)}
        />
      ))}

      {isHover.bestSelling?.option && (
        <Dropdown
          data={bestSelling}
          onClick={() => setIsHover({ bestSelling: { option: false } })}
          onMouseLeave={() => setIsHover({ bestSelling: { option: false } })}
          onMouseOver={() => setIsHover({ bestSelling: { option: true } })}
          className='right-[146px]'
        />
      )}

      {isHover.categories?.option && (
        <Dropdown
          data={categories}
          onClick={onCategoryClick}
          onMouseLeave={() => setIsHover({ categories: { option: false } })}
          onMouseOver={() => setIsHover({ categories: { option: true } })}
          className='top-14 right-[146px]'
        />
      )}
    </div>
  );
};
