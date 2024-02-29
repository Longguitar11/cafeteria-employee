import { DropdownData } from '@/types/dropdown';
import { escapeText } from '@/utils/text';

export let categories: DropdownData[] = [
  {
    id: '0',
    label: 'Cà phê',
  },
  {
    id: '1',
    label: 'Nước ép',
  },
  {
    id: '2',
    label: 'Nước giải khát',
  },
  {
    id: '3',
    label: 'Bánh mì',
  },
  {
    id: '4',
    label: 'Hamberger',
  },
  {
    id: '5',
    label: 'Bánh bao',
  },
];

categories.map((cate) => cate.value = escapeText(cate.label).toLocaleLowerCase())
