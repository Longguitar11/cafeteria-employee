import currency from 'currency.js';

const getSymbol = (rawSymbol: string) => {
  const lowerCaseSymbol = rawSymbol.toLocaleLowerCase();
  if (['đ', 'vnđ', 'vnd'].includes(lowerCaseSymbol)) {
    return 'đ';
  }
  return rawSymbol;
};

export const getVNDFormat = (rawString: string, symbol?: string): currency => {
  return currency(rawString, {
    fromCents: true,
    precision: 0,
    separator: '.',
    symbol: getSymbol(symbol || 'đ'),
    pattern: '#!',
    negativePattern: '-#!',
  });
};

export const getValueString = (rawString: string, symbol?: string): string => {
  return getVNDFormat(rawString, symbol).format();
};
