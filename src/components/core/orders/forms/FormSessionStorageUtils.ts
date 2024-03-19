import {AnonOrderForm, UserOrderForm} from "../../../../interfaces/dto/forms/order";

export const defaultAnonOrderFormValues: AnonOrderForm = {
    anonCustomerName: null,
    anonCustomerContactNumber: null,
    anonCustomerEmail: null,
    address: {
        id: null,
        street: null,
        streetNr: null,
        gate: null,
        staircase: null,
        floor: null,
        door: null
    },
    orderDetails: {
        id: null,
        deliveryHour: null,
        changeRequested: null,
        deliverNow: null,
        deliveryComment: null,
        paymentChange: null,
        paymentType: null
    },
    cart: {
        id: null,
        orderItems: null,
        totalCost: null,
        totalCostOffers: null,
        totalQuantity: null
    },
};

export const defaultUserFormValues: UserOrderForm = {
    userId: null,
    addressId: null,
    orderDetails: {
        id: null,
        deliveryHour: null,
        changeRequested: null,
        deliverNow: null,
        deliveryComment: null,
        paymentChange: null,
        paymentType: null
    },
    cart: {
        id: null,
        orderItems: null,
        totalCost: null,
        totalCostOffers: null,
        totalQuantity: null,
    },
};

export const getSessionStorageAnonForm = () => {
    if (sessionStorage.getItem("form") !== null) {
        return JSON.parse(sessionStorage.getItem("form")!) as AnonOrderForm;
    }
    return defaultAnonOrderFormValues;
};

export const getSessionStorageUserForm = () => {
    if (sessionStorage.getItem("form") !== null) {
        return JSON.parse(sessionStorage.getItem("form")!) as UserOrderForm;
    }
    return defaultUserFormValues;
};

export const clearSessionStorageForm = () => {
    sessionStorage.removeItem("form");
};