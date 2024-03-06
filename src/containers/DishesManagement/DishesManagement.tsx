'use client';

import React, {
  DetailedHTMLProps,
  FormHTMLAttributes,
  LegacyRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Props } from './DishesManagement.models';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getValueString } from '@/utils/currency';
import { CreateADish } from './CreateADish';
import { createADish, deleteADish } from '@/redux/dishSlice';
import { cn } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid';
import { AlertDialogCustom } from '@/components/AlertDialogCustom';
import { EditADish } from './EditADish';
import { DishForm } from '@/schemas/dish';
import { DishInterface } from '@/types/dish';
import { ImageCustom } from '@/components/ImageCustom';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';

const DishesManagement = (props: Props) => {
  const { className = '' } = props;

  const dispatch = useAppDispatch();

  const [dishId, setDishId] = useState<string>('');
  const [selectedDish, setSelectedDish] = useState<DishInterface>({
    idCate: '',
    idDish: '',
    name: '',
    price: '0',
    quantity: 0,
    thumbnail: '',
  });
  const [createDishOpen, setCreateDishOpen] = useState<boolean>(false);
  const [editDishOpen, setEditDishOpen] = useState<boolean>(false);

  const allDishes = useAppSelector((state) => state.dishStore.allDishes);
  const categories = useAppSelector((state) => state.categoryStore.categories);

  const onCreateADishSubmit = (values: DishForm) => {
    console.log({ values });

    const { categogy, name, price, stock, thumbnail } = values;

    const selectedCategory = categories.find((cate) => cate.value === categogy);

    if (values && selectedCategory) {
      dispatch(
        createADish({
          idDish: uuidv4(),
          idCate: selectedCategory.idCate,
          name,
          price: price.toString(),
          quantity: stock,
          thumbnail: URL.createObjectURL(thumbnail),
        })
      );

      setCreateDishOpen(false);
    }
  };

  const onEditADishSubmit = (values: DishForm) => {
    console.log({ values });
  };

  useEffect(() => {
    const dish = allDishes.find((dish) => dish.idDish === dishId);
    if (dish) {
      setSelectedDish((pre) =>
        JSON.stringify(pre) !== JSON.stringify(dish) ? dish : pre
      );
    }
  }, [allDishes, dishId]);

  return (
    <section className={cn('p-10 h-full', className)}>
      <p className='text-gray-700 text-3xl font-medium uppercase border-b-[0.5px] border-gray-400'>
        QUẢN LÝ MÓN
      </p>

      <Button
        variant='primary'
        className='my-4 float-right'
        onClick={() => setCreateDishOpen(true)}
      >
        Tạo món
      </Button>
      {allDishes.length > 0 ? (
        <div className='mt-10'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>STT</TableHead>
                <TableHead>Tên</TableHead>
                <TableHead>Ảnh</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Hàng trong kho</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead className='text-center'>Thao tác</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {allDishes.map((dish, index) => (
                <TableRow key={dish.idDish}>
                  <TableCell className='font-medium'>{index + 1}</TableCell>

                  <TableCell>{dish.name}</TableCell>

                  <TableCell>
                    {/* <ImageCustom thumbnail={dish.thumbnail} /> */}
                    <div className={cn('relative w-14 h-14', className)}>
                      <Image src={dish.thumbnail} alt='thumbnail' fill />
                    </div>
                  </TableCell>

                  <TableCell>{dish.category}</TableCell>
                  <TableCell>{dish.quantity}</TableCell>

                  <TableCell>{getValueString(dish.price)}</TableCell>

                  <TableCell>
                    <div className='flex justify-center gap-3'>
                      <AlertDialogCustom
                        buttonTitle='Xóa'
                        onSubmit={() => dispatch(deleteADish(dish.idDish))}
                      />

                      <Button
                        variant='success'
                        onClick={() => {
                          setEditDishOpen(true);
                          setDishId((pre) =>
                            pre !== dish.idDish ? dish.idDish : pre
                          );
                        }}
                      >
                        Chỉnh sửa
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className='h-full flex justify-center items-center'>
          <p className='text-3xl text-red-500 font-medium'>
            Danh sách món trống!
          </p>
        </div>
      )}

      {createDishOpen && (
        <CreateADish
          open={createDishOpen}
          setOpen={setCreateDishOpen}
          onSubmit={onCreateADishSubmit}
        />
      )}

      {editDishOpen && (
        <EditADish
          open={editDishOpen}
          setOpen={setEditDishOpen}
          selectedDish={selectedDish}
          onSubmit={onEditADishSubmit}
        />
      )}
    </section>
  );
};

export default DishesManagement;
