import { BillInterface } from '@/types/order';
import { getValueString } from '@/utils/currency';

export const getSumOfTotal = (bills: BillInterface[]) => {
  let sum = 0;
  for (const bill of bills) {
    sum += bill.total;
  }

  return getValueString(sum.toString());
};
