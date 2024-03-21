import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '../ui/dialog';
import { getValueString } from '@/utils/currency';
import { Quantity } from '../Quantity';
import { Button } from '../ui/button';
import { Props } from './DishModal.models';

const DishModal = (props: Props) => {
  const {
    className,
    quantity,
    setQuantity,
    onSubmit,
    amount,
    open,
    selectedCard,
    setOpen,
  } = props;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:min-w-[500px] p-4'>
        {/* <div className='flex-1 relative h-96'>
            <Image src={selectedCard?.thumbnail || ''} alt='thumbnail' fill />
          </div> */}

        <div className='flex-1 flex flex-col justify-between gap-8'>
          <div className='space-y-2'>
            <p className='text-3xl font-semibold'>{selectedCard?.name || ''}</p>

            <div className='flex gap-4 items-center'>
              <p className='text-xl text-amber-500'>
                {getValueString((selectedCard?.price || 0).toString())}
              </p>

              <span className=' border-2 border-green-500 px-2 text-green-600 rounded'>
                {selectedCard?.categoryName}
              </span>
            </div>

            <p className='text-base text-gray-400'>
              Mô tả: {selectedCard?.description}
            </p>
          </div>

          <Quantity quantity={quantity} setQuantity={setQuantity} />

          <div className='space-y-3'>
            <p className='text-xl text-end'>
              Thành tiền:{' '}
              <span className='font-medium text-red-500'>{amount}</span>
            </p>
            <Button
              type='submit'
              variant='success'
              className='w-full'
              onClick={onSubmit}
            >
              Thêm vào đơn hàng
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DishModal;
