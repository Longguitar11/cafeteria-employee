import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '../../ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useMemo, useState } from 'react';
import { CategoryFilterType } from './DishFilter.models';
import { useAppSelector } from '@/redux/hook';

export const CategoryFilter = (props: CategoryFilterType) => {
  const { className = '', cateId, setCateId } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const categories = useAppSelector((state) => state.categoryStore.categories);

  useEffect(() => {
    const cate = categories.find((cate) => cate.value === value);
    if (cate && cate.id !== cateId) setCateId(cate.id);
    if (value === '') setCateId(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'
        >
          {value
            ? categories.find((cate) => cate.value === value)?.name
            : 'Loại'}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn('w-[200px] p-0', className)}>
        <Command>
          <CommandInput placeholder='Tìm kiếm...' />
          <CommandEmpty>Không tìm ra loại!</CommandEmpty>
          <CommandGroup>
            {categories.map((cate) => (
              <CommandItem
                key={cate.value}
                value={cate.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    cateId === cate.id ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {cate.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
