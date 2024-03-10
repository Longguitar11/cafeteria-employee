import { useAppDispatch } from '@/redux/hook';
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
import { Props } from './Order.models';
import { useState } from 'react';
import { getValueString } from '@/utils/currency';
import { updateDish } from '@/redux/orderSlice';
import { cn } from '@/lib/utils';
import { AddDish, EditDish } from './Order.views';
import { AlertDialogCustom } from '../AlertDialogCustom';
import { Button } from '../ui/button';

const OrderModal = (props: Props) => {
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

  const onEditDishSubmit = (idDish: number) => {
    const dish = order.productDetail.find((dish) => dish.id === idDish);

    if (dish) {
      const { id, price } = dish;

      dispatch(
        updateDish({
          id,
          quantity,
          total: price * quantity,
        })
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className={cn('min-w-[800px] max-w-[1000px]', className)}>
        <DialogHeader>
          <DialogTitle className='text-3xl text-center'>ĐƠN HÀNG</DialogTitle>
        </DialogHeader>

        {order.productDetail && order.productDetail.length > 0 ? (
          <>
            <AddDish />

            <Table>
              <TableHeader className='w-full table table-fixed'>
                <TableRow>
                  <TableHead className='w-12'>STT</TableHead>
                  <TableHead>Tên</TableHead>
                  {/* <TableHead className='w-20'>Ảnh</TableHead> */}
                  <TableHead className='w-24'>Số lượng</TableHead>
                  <TableHead className='w-24'>Giá</TableHead>
                  <TableHead className='w-24'>Tổng giá</TableHead>
                  <TableHead className='text-center'>Thao tác</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className='max-h-[355.2px] overflow-y-auto hidden-scrollbar block'>
                {order.productDetail.map((dish, index) => (
                  <TableRow className='w-full table table-fixed' key={dish.id}>
                    <TableCell className='font-medium w-12'>
                      {index + 1}
                    </TableCell>

                    <TableCell>{dish.name}</TableCell>

                    {/* <TableCell className='w-20'>
                        <div className='relative w-14 h-14'>
                          <Image src={dish.thumbnail} alt='thumbnail' fill />
                        </div>
                      </TableCell> */}

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
                      {getValueString(dish.price.toString())}
                    </TableCell>

                    <TableCell className='w-24'>
                      {getValueString(dish.total.toString())}
                    </TableCell>

                    <TableCell>
                      <div className='flex justify-center gap-3'>
                        <AlertDialogCustom
                          buttonTitle='Xóa'
                          onSubmit={() => onDeleteClick(dish.id)}
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
                      {getValueString(order?.totalAmount.toString())}
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
          <div className='flex flex-col items-center gap-3'>
            <p className='text-xl'>Chưa có món được chọn!</p>
            <AddDish />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderModal;
