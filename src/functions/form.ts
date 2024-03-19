import {FieldErrors, get} from "react-hook-form";
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
        anonCustomerNameError: get(errors, "anonCustomerName") as string,
        anonCustomerEmailError: get(errors, "anonCustomerEmail") as string,
        anonCustomerContactNumberError: get(errors, "anonCustomerContactNumber") as string
    };
};

export const getAddressFormErrors = (errors: FieldErrors) => {
    return {
        street: get(errors, "address.street") as string,
        streetNr: get(errors, "address.streetNr") as string,
        gate: get(errors, "address.gate") as string,
        staircase: get(errors, "address.staircase") as string,
        floor: get(errors, "address.floor") as string,
        door: get(errors, "address.door") as string,
        address: get(errors, "address") as string
    };
};

export const getOrderDetailsFormErrors = (errors: FieldErrors) => {
    return {
        deliverNow: get(errors, "orderDetails.deliverNow") as string,
        deliveryHour: get(errors, "orderDetails.deliveryHour") as string,
        paymentType: get(errors, "orderDetails.paymentType") as string,
        changeRequested: get(errors, "orderDetails.changeRequested") as string,
        deliveryComment: get(errors, "orderDetails.deliveryComment") as string,
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