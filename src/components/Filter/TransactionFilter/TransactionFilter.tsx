import React, { useEffect, useRef, useState } from 'react';
import { Input } from '../../ui/input';
import { cn } from '@/lib/utils';
import { Props } from './TransactionFilter.models';
import { filterOptions } from './TransactionFilter.utils';
import { PaymentMethod } from '@/types/paymentMethod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { paymentMethods } from '@/constants/paymentMethod';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

const TransactionFilter = (props: Props) => {
  const { className = '', allBills, bills, setBills } = props;

  const [searchValue, setSearchValue] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('ALL');
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const timerUpdateSearchText = useRef<NodeJS.Timeout | null>(null);

  const reset = () => {
    setSearchValue('');
    setPaymentMethod('ALL');
    setDate({ from: undefined, to: undefined });
  };

  useEffect(() => {
    if (timerUpdateSearchText.current !== null)
      clearTimeout(timerUpdateSearchText.current);

    timerUpdateSearchText.current = setTimeout(() => {
      const result = filterOptions(allBills, {
        text: searchValue,
        paymentMethod: paymentMethod === 'ALL' ? '' : paymentMethod,
        fromTime: date?.from || undefined,
        toTime: date?.to || undefined,
      });

      console.log({ result, bills });

      setBills(result);
    }, 800);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, paymentMethod, date]);

  useEffect(() => {
    reset();
  }, [allBills]);

  return (
    <div className={cn('flex gap-3', className)}>
      <Input
        type='text'
        placeholder='Tìm hóa đơn (theo id, email NV, tên KH, sđt KH, email KH)'
        className='text-base'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Chọn ngày</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      <Select
        value={paymentMethod}
        onValueChange={(value: PaymentMethod) => setPaymentMethod(value)}
      >
        <SelectTrigger className='w-[300px]'>
          <SelectValue placeholder='Phương thức thanh toán' />
        </SelectTrigger>
        <SelectContent>
          {paymentMethods.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button variant='destructive' onClick={reset}>
        Reset
      </Button>
    </div>
  );
};

export default TransactionFilter;
