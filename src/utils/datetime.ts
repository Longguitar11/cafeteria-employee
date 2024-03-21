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
