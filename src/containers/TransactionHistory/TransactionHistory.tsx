'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Props } from './TransactionHistory.models';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { Button } from '@/components/ui/button';
import { getValueString } from '@/utils/currency';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { BillInterface, OrderedDishInterface } from '@/types/order';
import { getBills } from '@/apis/order';
import { TransactionFilter } from '@/components/Filter';
import { paymentMethods } from '@/constants/paymentMethod';
import { getDateTime } from '@/utils/datetime';
import { getSumOfTotal } from './TransactionHistory.utils';

const TransactionHistory = (props: Props) => {
  const { className } = props;

  const dispatch = useAppDispatch();

  const allOrders = useAppSelector((state) => state.orderStore.allOrders);

  const [bills, setBills] = useState<BillInterface[]>(allOrders);
  const [isShowViewOrder, setIsShowViewOrder] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<number>(0);
  const [isShowSum, setIsShowSum] = useState<boolean>(false);

  console.log({ bills });

  const selectedOrder = useMemo(() => {
    const selectedOrder = bills.find((order) => order.id === orderId);
    if (selectedOrder) return selectedOrder;
  }, [orderId, bills]);

  // set bills when all orders updated
  useEffect(() => {
    setBills(allOrders);
  }, [allOrders]);

  useEffect(() => {
    getBills(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={className}>
      <p className='text-gray-700 text-3xl font-medium uppercase border-b-[0.5px] border-gray-400'>
        LỊCH SỬ GIAO DỊCH
      </p>

      {allOrders.length > 0 ? (
        <>
          <TransactionFilter
            className='mt-10 mb-4'
            bills={bills}
            setBills={setBills}
            allBills={allOrders}
          />

          {bills.length > 0 && (
            <div className='flex justify-end items-center gap-3 mb-4'>
              {isShowSum && (
                <p className='text-xl font-medium text-amber-500 transition-transform -translate-x-5 duration-200'>{getSumOfTotal(bills)}</p>
              )}
              <Button
                variant='success'
                onClick={() => setIsShowSum((pre) => !pre)}
              >
                Xem tổng tiền
              </Button>
            </div>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Email nhân viên</TableHead>
                <TableHead>Tên khách hàng</TableHead>
                {/* <TableHead className='w-20'>Ảnh</TableHead> */}
                <TableHead>SĐT khách hàng</TableHead>
                <TableHead>Email khách hàng</TableHead>
                <TableHead>Chi tiết đơn hàng</TableHead>
                <TableHead>Hình thức thanh toán</TableHead>
                <TableHead>Thời gian</TableHead>
                <TableHead>Thành tiền</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {bills.length > 0 ? (
                bills.map((bill) => {
                  const {
                    id,
                    uuid,
                    contactNumber,
                    createdBy,
                    email,
                    name,
                    paymentMethod,
                    total,
                    createdAt,
                  } = bill;

                  const currentPaymentMethod = paymentMethods.find(
                    (pm) => pm.value === paymentMethod
                  )?.label;

                  return (
                    <TableRow key={uuid}>
                      <TableCell className='font-medium'>{id}</TableCell>
                      <TableCell>{createdBy}</TableCell>
                      <TableCell>{name}</TableCell>

                      {/* <TableCell className='w-20'>
                        <div className='relative w-14 h-14'>
                          <Image src={dish.thumbnail} alt='thumbnail' fill />
                        </div>
                      </TableCell> */}

                      <TableCell className=''>{contactNumber}</TableCell>

                      <TableCell className=''>{email}</TableCell>

                      <TableCell className=''>
                        <Button
                          variant='primary'
                          onClick={() => {
                            setIsShowViewOrder(true);
                            setOrderId(id);
                          }}
                        >
                          Xem chi tiết
                        </Button>
                      </TableCell>

                      <TableCell className=''>{currentPaymentMethod}</TableCell>
                      <TableCell className=''>{createdAt}</TableCell>

                      <TableCell>{getValueString(total.toString())}</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className='text-red-500 text-xl text-center'
                  >
                    Không tìm ra hóa đơn!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </>
      ) : (
        <p className='mt-10'>Lịch sử giao dịch trống!</p>
      )}

      <Dialog open={isShowViewOrder} onOpenChange={setIsShowViewOrder}>
        <DialogContent className='sm:min-w-[600px] sm:max-w-[800px]'>
          <DialogHeader>
            <DialogTitle className='text-3xl text-center text-green-600'>
              ĐƠN HÀNG - {selectedOrder?.uuid}
            </DialogTitle>
          </DialogHeader>

          {selectedOrder?.productDetail &&
          selectedOrder.productDetail.length > 0 ? (
            <>
              <Table>
                <TableHeader className='w-full table table-fixed'>
                  <TableRow>
                    <TableHead className='w-12'>STT</TableHead>
                    <TableHead className='w-24'>Tên</TableHead>
                    {/* <TableHead className='w-20'>Ảnh</TableHead> */}
                    <TableHead className='w-24'>Số lượng</TableHead>
                    <TableHead className='w-24'>Giá</TableHead>
                    <TableHead className='w-24'>Tổng giá</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody className='max-h-[314px] overflow-y-auto hidden-scrollbar block'>
                  {JSON.parse(selectedOrder.productDetail).map(
                    (dish: OrderedDishInterface, index: number) => (
                      <TableRow
                        className='w-full table table-fixed'
                        key={dish.id}
                      >
                        <TableCell className='font-medium w-12'>
                          {index + 1}
                        </TableCell>

                        <TableCell className='w-24'>{dish.name}</TableCell>

                        {/* <TableCell className='w-20'>
                        <div className='relative w-14 h-14'>
                          <Image src={dish.thumbnail} alt='thumbnail' fill />
                        </div>
                      </TableCell> */}

                        <TableCell className='w-24'>{dish.quantity}</TableCell>

                        <TableCell className='w-24'>
                          {getValueString(dish.price.toString())}
                        </TableCell>

                        <TableCell className='w-24'>
                          {getValueString(dish.total.toString())}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow className='w-full table table-fixed'>
                    <TableCell colSpan={7} className='text-end text-lg'>
                      Thành tiền:{' '}
                      <span className='text-red-500 font-medium'>
                        {getValueString(selectedOrder?.total.toString())}
                      </span>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </>
          ) : (
            <p className='mt-10 text-2xl text-red-600'>
              Đơn hàng này không có món nào!
            </p>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default TransactionHistory;
