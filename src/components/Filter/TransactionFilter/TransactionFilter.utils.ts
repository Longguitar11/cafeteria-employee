import { BillInterface } from '@/types/order';
import { PaymentMethod } from '@/types/paymentMethod';
import { escapeText } from '@/utils/text';
import { filter, isEqual } from 'lodash';

export const filterOptions = (
  allBills: BillInterface[],
  options: {
    text?: string;
    paymentMethod?: PaymentMethod | string;
    fromTime: Date | undefined;
    toTime: Date | undefined;
  }
): BillInterface[] => {
  const { text = '', paymentMethod, fromTime, toTime } = options;

  if (text === '' && !paymentMethod && !fromTime && !toTime) return allBills;
  else if (text !== '' && !paymentMethod && !fromTime && !toTime) {
    console.log('text');

    const textLowercase = escapeText(text).toLowerCase();
    return (
      filter(allBills, (order) => {
        const { id, contactNumber, createdBy, email, name } = order;
        const parsedName = escapeText(name).toLowerCase();

        return (
          isEqual(parsedName, text) ||
          parsedName.includes(textLowercase) ||
          isEqual(name, text) ||
          //
          isEqual(contactNumber, text) ||
          contactNumber.includes(text) ||
          isEqual(contactNumber, text) ||
          //
          isEqual(email.toLowerCase(), text) ||
          email.toLowerCase().includes(textLowercase) ||
          isEqual(email, text) ||
          //
          isEqual(createdBy.toLowerCase(), text) ||
          createdBy.toLowerCase().includes(textLowercase) ||
          isEqual(createdBy, text) ||
          //
          isEqual(id, parseInt(text))
        );
      }) || []
    );
  } else if (text === '' && paymentMethod && !fromTime && !toTime) {
    console.log('payment method');
    const filteredOrders = allBills.filter(
      (order) => order.paymentMethod === paymentMethod
    );

    console.log({ allBills, filteredOrders });
    return filteredOrders;
  } else if (text === '' && !paymentMethod && fromTime && !toTime) {
    console.log('from time');
    const filteredOrders = allBills.filter((order) => {
      console.log(getDateFromString(order.createdAt));
      getDateFromString(order.createdAt);
      return getDateFromString(order.createdAt) === fromTime.getDate();
    });

    return filteredOrders;
  } else if (text === '' && !paymentMethod && fromTime && toTime) {
    console.log('from and to time');

    const filteredOrders = allBills.filter((order) => {
      return (
        getDateFromString(order.createdAt) >= fromTime.getDate() &&
        getDateFromString(order.createdAt) <= toTime.getDate()
      );
    });

    return filteredOrders;
  } else if (text && paymentMethod && !fromTime && !toTime) {
    console.log('text and payment method');

    let filteredOrders = allBills.filter(
      (order) => order.paymentMethod === paymentMethod
    );

    const textLowercase = escapeText(text).toLowerCase();

    return filter(filteredOrders, (order) => {
      const { id, contactNumber, createdBy, email, name } = order;
      const parsedName = escapeText(name).toLowerCase();

      return (
        isEqual(parsedName, text) ||
        parsedName.includes(textLowercase) ||
        isEqual(name, text) ||
        //
        isEqual(contactNumber, text) ||
        contactNumber.includes(text) ||
        isEqual(contactNumber, text) ||
        //
        isEqual(email.toLowerCase(), text) ||
        email.toLowerCase().includes(textLowercase) ||
        isEqual(email, text) ||
        //
        isEqual(createdBy.toLowerCase(), text) ||
        createdBy.toLowerCase().includes(textLowercase) ||
        isEqual(createdBy, text) ||
        //
        isEqual(id, parseInt(text))
      );
    });
  } else if (text && !paymentMethod && fromTime && !toTime) {
    console.log('text and from time');
    const filteredOrders = allBills.filter((order) => {
      return getDateFromString(order.createdAt) >= fromTime.getDate();
    });

    const textLowercase = escapeText(text).toLowerCase();

    return (
      filter(filteredOrders, (order) => {
        const { id, contactNumber, createdBy, email, name } = order;
        const parsedName = escapeText(name).toLowerCase();

        return (
          isEqual(parsedName, text) ||
          parsedName.includes(textLowercase) ||
          isEqual(name, text) ||
          //
          isEqual(contactNumber, text) ||
          contactNumber.includes(text) ||
          isEqual(contactNumber, text) ||
          //
          isEqual(email.toLowerCase(), text) ||
          email.toLowerCase().includes(textLowercase) ||
          isEqual(email, text) ||
          //
          isEqual(createdBy.toLowerCase(), text) ||
          createdBy.toLowerCase().includes(textLowercase) ||
          isEqual(createdBy, text) ||
          //
          isEqual(id, parseInt(text))
        );
      }) || []
    );
  } else if (text && !paymentMethod && fromTime && toTime) {
    console.log('text, from and to time');
    const filteredOrders = allBills.filter((order) => {
      return (
        getDateFromString(order.createdAt) >= fromTime.getDate() &&
        getDateFromString(order.createdAt) <= toTime.getDate()
      );
    });

    const textLowercase = escapeText(text).toLowerCase();

    return (
      filter(filteredOrders, (order) => {
        const { id, contactNumber, createdBy, email, name } = order;
        const parsedName = escapeText(name).toLowerCase();

        return (
          isEqual(parsedName, text) ||
          parsedName.includes(textLowercase) ||
          isEqual(name, text) ||
          //
          isEqual(contactNumber, text) ||
          contactNumber.includes(text) ||
          isEqual(contactNumber, text) ||
          //
          isEqual(email.toLowerCase(), text) ||
          email.toLowerCase().includes(textLowercase) ||
          isEqual(email, text) ||
          //
          isEqual(createdBy.toLowerCase(), text) ||
          createdBy.toLowerCase().includes(textLowercase) ||
          isEqual(createdBy, text) ||
          //
          isEqual(id, parseInt(text))
        );
      }) || []
    );
  } else if (!text && paymentMethod && fromTime && !toTime) {
    console.log('payment method, from time');
    let filteredOrders = allBills.filter(
      (order) => order.paymentMethod === paymentMethod
    );

    filteredOrders = filteredOrders.filter((order) => {
      console.log({
        createdAt: getDateFromString(order.createdAt),
        fromTime: fromTime.getDate(),
      });
      return getDateFromString(order.createdAt) === fromTime.getDate();
    });

    console.log({ filteredOrders });

    return filteredOrders;
  } else if (!text && paymentMethod && fromTime && toTime) {
    console.log('payment method, from and to time');
    let filteredOrders = allBills.filter(
      (order) => order.paymentMethod === paymentMethod
    );

    filteredOrders = filteredOrders.filter((order) => {
      return (
        getDateFromString(order.createdAt) >= fromTime.getDate() &&
        getDateFromString(order.createdAt) <= toTime.getDate()
      );
    });

    return filteredOrders;
  } else if (text && paymentMethod && fromTime && !toTime) {
    console.log('text, payment method, from time');
    let filteredOrders = allBills.filter(
      (order) => order.paymentMethod === paymentMethod
    );

    filteredOrders = filteredOrders.filter((order) => {
      return getDateFromString(order.createdAt) >= fromTime.getDate();
    });

    const textLowercase = escapeText(text).toLowerCase();

    return (
      filter(filteredOrders, (order) => {
        const { id, contactNumber, createdBy, email, name } = order;
        const parsedName = escapeText(name).toLowerCase();

        return (
          isEqual(parsedName, text) ||
          parsedName.includes(textLowercase) ||
          isEqual(name, text) ||
          //
          isEqual(contactNumber, text) ||
          contactNumber.includes(text) ||
          isEqual(contactNumber, text) ||
          //
          isEqual(email.toLowerCase(), text) ||
          email.toLowerCase().includes(textLowercase) ||
          isEqual(email, text) ||
          //
          isEqual(createdBy.toLowerCase(), text) ||
          createdBy.toLowerCase().includes(textLowercase) ||
          isEqual(createdBy, text) ||
          //
          isEqual(id, parseInt(text))
        );
      }) || []
    );
  } else {
    const filteredOrders = allBills.filter(
      (order) => order.paymentMethod === paymentMethod
    );

    const textLowercase = escapeText(text).toLowerCase();

    return (
      filter(filteredOrders, (order) => {
        const { id, contactNumber, createdBy, email, name } = order;
        const parsedName = escapeText(name).toLowerCase();

        return (
          isEqual(parsedName, text) ||
          parsedName.includes(textLowercase) ||
          isEqual(name, text) ||
          //
          isEqual(contactNumber, text) ||
          contactNumber.includes(text) ||
          isEqual(contactNumber, text) ||
          //
          isEqual(email.toLowerCase(), text) ||
          email.toLowerCase().includes(textLowercase) ||
          isEqual(email, text) ||
          //
          isEqual(createdBy.toLowerCase(), text) ||
          createdBy.toLowerCase().includes(textLowercase) ||
          isEqual(createdBy, text) ||
          //
          isEqual(id, parseInt(text))
        );
      }) || []
    );
  }
};

export const getDateFromString = (date: string) => {
  return +date.split('/')[0];
};
