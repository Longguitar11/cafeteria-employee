
import { DateObject } from '@/types/datetime';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const formatMask = 'YYYY-MM-DDTHH:mm:ss[Z]';
// 2023-02-24T08:58:54Z

export const getDateTime = (newDate: Date) => {
  return dayjs(newDate).format('DD/MM/YYYY - hh:mm A');
};

export const startOfDate = (
  inputDate?: string | Date,
  isUtc?: boolean
): string => {
  const date = dayjs(inputDate).startOf('date');
  return isUtc ? dayjs.utc(date).format(formatMask) : date.format(formatMask);
};

export const endOfDate = (
  inputDate?: string | Date,
  isUtc?: boolean
): string => {
  const date = dayjs(inputDate).endOf('date');
  return isUtc ? dayjs.utc(date).format(formatMask) : date.format(formatMask);
};


export const convertDateStringToDateObject = (date: string): DateObject => {
  const splitedDate = date.split('/');
  const dateObject: DateObject = {
    date: +splitedDate[0],
    month: +splitedDate[1],
    year: +splitedDate[2].split('-')[0],
  };

  return dateObject;
};

export const convertDateToDateObject = (date: Date): DateObject => {
  const dateObject: DateObject = {
    date: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };

  return dateObject;
};

export const filterTime = (
  orderTime: DateObject,
  fromTime?: DateObject,
  toTime?: DateObject
) => {
  if (orderTime) {
    if (fromTime && !toTime) {
      if (fromTime.year <= orderTime.year) {
        if (fromTime.month <= orderTime.month) {
          if (fromTime.date <= orderTime.date) {
            return true;
          } else return false;
        } else return false;
      } else return false;
    } else if (!fromTime && toTime) {
      if (toTime.year >= orderTime.year) {
        if (toTime.month >= orderTime.month) {
          if (toTime.date >= orderTime.date) {
            return true;
          } else return false;
        } else return false;
      } else return false;
    } else if (fromTime && toTime) {
      if (fromTime.year <= orderTime.year && toTime.year >= orderTime.year) {
        if (
          fromTime.month <= orderTime.month &&
          toTime.month >= orderTime.month
        ) {
          if (
            fromTime.date <= orderTime.date ||
            toTime.date >= orderTime.date
          ) {
            return true;
          } else return false;
        } else return false;
      } else return false;
    } else return false;
  } else return false;
};

