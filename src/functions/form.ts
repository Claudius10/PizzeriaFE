import {FieldError, FieldErrors, get} from "react-hook-form";
import {OrderItemForm} from "../interfaces/dto/forms/order";

export const getDeliveryHours = () => {
    const interval = 5;
    const hourIntervals: string[] = [];
    const date = new Date();

    const coefficient = 1000 * 60 * 5;
    const roundedCurrentMins = new Date(
        Math.ceil(date.getTime() / coefficient) * coefficient
    ).getMinutes();
    const currentHour = new Date().getHours() * 60;

    for (
        let minutes = currentHour + roundedCurrentMins + 30;
        minutes < 24 * 60;
        minutes = minutes + interval
    ) {
        date.setHours(0);
        date.setMinutes(minutes);
        hourIntervals.push(date.toLocaleTimeString("es", {timeStyle: "short"}));
    }
    return hourIntervals;
};

export const getAnonCustomerErrors = (errors: FieldErrors) => {
    return {
        anonCustomerNameError: get(errors, "anonCustomerName") as FieldError,
        anonCustomerEmailError: get(errors, "anonCustomerEmail") as FieldError,
        anonCustomerContactNumberError: get(errors, "anonCustomerContactNumber") as FieldError
    };
};

export const getAddressFormErrors = (errors: FieldErrors) => {

    return {
        street: get(errors, "address.street") as FieldError,
        streetNr: get(errors, "address.streetNr") as FieldError,
        gate: get(errors, "address.gate") as FieldError,
        staircase: get(errors, "address.staircase") as FieldError,
        floor: get(errors, "address.floor") as FieldError,
        door: get(errors, "address.door") as FieldError,
        address: get(errors, "address") as FieldError
    };
};

export const getOrderDetailsFormErrors = (errors: FieldErrors) => {
    return {
        deliverNow: get(errors, "orderDetails.deliverNow") as FieldError,
        deliveryHour: get(errors, "orderDetails.deliveryHour") as FieldError,
        paymentType: get(errors, "orderDetails.paymentType") as FieldError,
        changeRequested: get(errors, "orderDetails.changeRequested") as FieldError,
        deliveryComment: get(errors, "orderDetails.deliveryComment") as FieldError,
    };
};

export const removeItemIds = (items: OrderItemForm[]) => {
    const copy = [...items];
    copy.forEach((item: OrderItemForm) => item.id = null);
    return copy;
};

export const isOrderUpdateValid = (orderCreatedOn: string, timeLimit: number) => {
    const now = new Date(Date.now());
    const createdOn = new Date(orderCreatedOn);

    // add one hour to createdOn because DB is in UTC+0
    createdOn.setTime(createdOn.getTime() + (60 * 60 * 1000));

    const orderUpdateTimeLimit = new Date(createdOn.getTime() + (timeLimit * 60000));

    return now < orderUpdateTimeLimit;
};