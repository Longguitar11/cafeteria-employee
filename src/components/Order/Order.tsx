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
import { useEffect, useMemo, useState } from 'react';
import { getValueString } from '@/utils/currency';
import { completeOrder, updateDish } from '@/redux/orderSlice';
import { cn } from '@/lib/utils';
import { AddDish, EditDish, PaymentButton } from './Order.views';
import { AlertDialogCustom } from '../AlertDialogCustom';
import { Button } from '../ui/button';
import { PaymentForm } from '@/schemas/payment';
import { generateReport } from '@/apis/order';
import { OrderedDishInterface } from '@/types/order';
import { getDateTime } from '@/utils/datetime';
import { ImageCustom } from '../ImageCustom';
import { getAllDishes } from '@/apis/dish';
import { DishType } from '@/types/dish';

const OrderModal = (props: Props) => {
  const {
    className = '',
    isOpen,
    setIsOpen,
    order,
    onDeleteClick,
    onConfirmCancelClick,
  } = props;

  const dispatch = useAppDispatch();

  const [quantity, setQuantity] = useState<number>(1);
  const [isShowPaymentModal, setIsShowPaymentModal] = useState<boolean>(false);
  const [allDishes, setAllDishes] = useState<DishType[]>([]);

  const totalDish = (price: string) =>
    getValueString((parseInt(price) * quantity).toString());

  const onEditDishSubmit = (idDish: number) => {
    const dish = order.productDetail.find((dish) => dish.id === idDish);

    if (dish) {
      const { id, price } = dish;

      dispatch(
        updateDish({
          id: id!,
          quantity,
          total: price * quantity,
        })
      );
    }
  };

  const onPaymentSubmit = (values: PaymentForm) => {
    console.log({ values });

    if (values) {
      const { contactNumber, email, name, paymentMethod } = values;

      const productDetail = order.productDetail.map(
        ({ name, category, price, quantity, total }: OrderedDishInterface) => ({
          name,
          category,
          quantity: quantity.toString(),
          price,
          total,
        })
      );

      generateReport(
        {
          contactNumber,
          email,
          name,
          paymentMethod,
          productDetail: JSON.stringify(productDetail),
          totalAmount: order.totalAmount.toString(),
          createdAt: getDateTime(new Date()),
        },
        dispatch
      );

      dispatch(completeOrder());
      setIsOpen(false);
      setIsShowPaymentModal(false);
    }
  };

  // insert an image to dish
  const productDetails = useMemo(() => {
    const ids = allDishes.map(({ id }: DishType) => id);
    const productDetailsCopy = order.productDetail;
    return productDetailsCopy.map((dish) =>
      ids.includes(dish.id)
        ? {
            ...dish,
            thumbnail: allDishes.find((d) => d.id === dish.id)?.imageProduct,
          }
        : dish
    );
  }, [allDishes, order]);

  console.log({ productDetails });

  useEffect(() => {
    const res = getAllDishes();
    res.then((res) => setAllDishes(res)).catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className={cn('sm:min-w-[800px] sm:max-w-[1000px]', className)}
        >
          <DialogHeader>
            <DialogTitle className='text-3xl text-center'>ĐƠN HÀNG</DialogTitle>
          </DialogHeader>

          {productDetails && productDetails.length > 0 ? (
            <>
              <AddDish allDishes={allDishes} />

              <Table className='w-full'>
                <TableHeader className='w-full table table-fixed'>
                  <TableRow>
                    <TableHead className='w-12'>STT</TableHead>
                    <TableHead>Tên</TableHead>
                    <TableHead className='w-20'>Ảnh</TableHead>
                    <TableHead className='w-24'>Số lượng</TableHead>
                    <TableHead className='w-24'>Giá</TableHead>
                    <TableHead className='w-24'>Tổng giá</TableHead>
                    <TableHead className='text-center'>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody className='max-h-[362px] overflow-y-auto hidden-scrollbar block'>
                  {productDetails.map((dish, index) => (
                    <TableRow
                      className='w-full table table-fixed'
                      key={dish.id}
                    >
                      <TableCell className='font-medium w-12'>
                        {index + 1}
                      </TableCell>

                      <TableCell>{dish.name}</TableCell>

                      <TableCell className='w-20 h-20'>
                        <ImageCustom thumbnail={dish.thumbnail!} />
                      </TableCell>

                      <TableCell className='w-24 text-center'>
                        {dish.quantity}
                      </TableCell>

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
                            alertTitle={dish.name + ' ra khỏi đơn'}
                            onSubmit={() => onDeleteClick(dish.id!)}
                          />

                          <EditDish
                            dish={dish}
                            quantity={quantity}
                            allDishes={allDishes}
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
                          variant='primary'
                          onClick={() => setIsShowPaymentModal(true)}
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
              <AddDish allDishes={allDishes} />
            </div>
          )}
        </DialogContent>
      </Dialog>

      <PaymentButton
        open={isShowPaymentModal}
        setOpen={setIsShowPaymentModal}
        onSubmit={onPaymentSubmit}
      />
    </>
  );
};

export default OrderModal;
