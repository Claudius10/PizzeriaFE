import {get} from "react-hook-form";
import {OrderItemForm} from "../interfaces/dto/forms/order";
import {FieldErrors} from "react-hook-form/dist/types/errors";

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
        anonCustomerNameError: get(errors, "anonCustomerName"),
        anonCustomerEmailError: get(errors, "anonCustomerEmail"),
        anonCustomerContactNumberError: get(errors, "anonCustomerContactNumber")
    };
};

export const getAddressFormErrors = (errors: FieldErrors) => {
    return {
        street: get(errors, "address.street"),
        streetNr: get(errors, "address.streetNr"),
        gate: get(errors, "address.gate"),
        staircase: get(errors, "address.staircase"),
        floor: get(errors, "address.floor"),
        door: get(errors, "address.door"),
        address: get(errors, "address")
    };
};

export const getOrderDetailsFormErrors = (errors: FieldErrors) => {
    return {
        deliverNow: get(errors, "orderDetails.deliverNow"),
        deliveryHour: get(errors, "orderDetails.deliveryHour"),
        paymentType: get(errors, "orderDetails.paymentType"),
        changeRequested: get(errors, "orderDetails.changeRequested"),
        deliveryComment: get(errors, "orderDetails.deliveryComment"),
    };
};

export const removeItemIds = (items: OrderItemForm[]): OrderItemForm[] => {
    const itemsWithNoIds = JSON.parse(JSON.stringify(items));
    itemsWithNoIds.forEach((item: OrderItemForm) => item.id = null);
    return itemsWithNoIds;
};

export const isOrderUpdateValid = (orderCreatedOn: string, timeLimit: number) => {
    const now = new Date(Date.now());
    const createdOn = new Date(orderCreatedOn);

    // add one hour to createdOn because DB is in UTC+0
    createdOn.setTime(createdOn.getTime() + (60 * 60 * 1000));

    const orderUpdateTimeLimit = new Date(createdOn.getTime() + (timeLimit * 60000));

    return now < orderUpdateTimeLimit;
};