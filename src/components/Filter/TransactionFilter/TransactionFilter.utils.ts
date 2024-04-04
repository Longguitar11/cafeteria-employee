import { BillInterface } from '@/types/order';
import { PaymentMethod } from '@/types/paymentMethod';
import {
  convertDateStringToDateObject,
  convertDateToDateObject,
  filterTime,
} from '@/utils/datetime';
import { escapeText } from '@/utils/text';
import { filter, isEqual } from 'lodash';

export const filterOptions = (
  allOrders: BillInterface[],
  options: {
    text?: string;
    paymentMethod?: PaymentMethod | '';
    fromTime: Date | undefined;
    toTime: Date | undefined;
  }
): BillInterface[] => {
  const { text = '', paymentMethod, fromTime, toTime } = options;

  console.log({ text, paymentMethod, fromTime, toTime });

  if (text === '' && !paymentMethod && !fromTime && !toTime) {
    console.log('empty parameters');
    return allOrders;
  } else if (text !== '' && !paymentMethod && !fromTime && !toTime) {
    console.log('text');

    const textLowercase = escapeText(text).toLowerCase();
    return (
      filter(allOrders, (order) => {
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
    const filteredOrders = allOrders.filter(
      (order) => order.paymentMethod === paymentMethod
    );

    return filteredOrders;
  } else if (text === '' && !paymentMethod && fromTime && !toTime) {
    console.log('from time');
    const filteredOrders = allOrders.filter((order) => {
      const orderTime = convertDateStringToDateObject(order.createdAt);
      const convertedFromTime = convertDateToDateObject(fromTime);
      if (filterTime(orderTime, convertedFromTime)) return order;
    });

    return filteredOrders.length > 0 ? filteredOrders : [];
  } else if (text === '' && !paymentMethod && fromTime && toTime) {
    console.log('from and to time');

    const filteredOrders = allOrders.filter((order) => {
      const orderTime = convertDateStringToDateObject(order.createdAt);
      const convertedFromTime = convertDateToDateObject(fromTime);
      const convertedToTime = convertDateToDateObject(toTime);
      if (filterTime(orderTime, convertedFromTime, convertedToTime))
        return order;
    });

    return filteredOrders;
  } else if (text && paymentMethod && !fromTime && !toTime) {
    console.log('text and payment method');

    let filteredOrders = allOrders.filter(
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
  } else if (text && !paymentMethod && fromTime && !toTime) {
    console.log('text and from time');
    const filteredOrders = allOrders.filter((order) => {
      const orderTime = convertDateStringToDateObject(order.createdAt);
      const convertedFromTime = convertDateToDateObject(fromTime);
      if (filterTime(orderTime, convertedFromTime)) return order;
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
    const filteredOrders = allOrders.filter((order) => {
      const orderTime = convertDateStringToDateObject(order.createdAt);
      const convertedFromTime = convertDateToDateObject(fromTime);
      const convertedToTime = convertDateToDateObject(toTime);
      if (filterTime(orderTime, convertedFromTime, convertedToTime))
        return order;
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
    let filteredOrders = allOrders.filter(
      (order) => order.paymentMethod === paymentMethod
    );

    console.log()

    filteredOrders = filteredOrders.filter((order) => {
      const orderTime = convertDateStringToDateObject(order.createdAt);
      const convertedFromTime = convertDateToDateObject(fromTime);
      if (filterTime(orderTime, convertedFromTime)) return order;
    });

    return filteredOrders;
  } else if (!text && paymentMethod && fromTime && toTime) {
    console.log('payment method, from and to time');
    let filteredOrders = allOrders.filter(
      (order) => order.paymentMethod === paymentMethod
    );

    filteredOrders = filteredOrders.filter((order) => {
      const orderTime = convertDateStringToDateObject(order.createdAt);
      const convertedFromTime = convertDateToDateObject(fromTime);
      const convertedToTime = convertDateToDateObject(toTime);
      if(filterTime(orderTime, convertedFromTime, convertedToTime)) return order;
    });

    return filteredOrders;
  } else if (text && paymentMethod && fromTime && !toTime) {
    console.log('text, payment method, from time');
    let filteredOrders = allOrders.filter(
      (order) => order.paymentMethod === paymentMethod
    );

    filteredOrders = filteredOrders.filter((order) => {
      const orderTime = convertDateStringToDateObject(order.createdAt);
      const convertedFromTime = convertDateToDateObject(fromTime);
      if (filterTime(orderTime, convertedFromTime)) return order;
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
    console.log('all');

    console.log({paymentMethod, fromTime, toTime, text})
    let filteredOrders = allOrders.filter(
      (order) => order.paymentMethod === paymentMethod
    );

    filteredOrders = filteredOrders.filter((order) => {
      const orderTime = convertDateStringToDateObject(order.createdAt);
      const convertedFromTime = convertDateToDateObject(fromTime!);
      const convertedToTime = convertDateToDateObject(toTime!);
      if (filterTime(orderTime, convertedFromTime, convertedToTime))
        return order;
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
  }
};