import {AddressForm, AnonOrderForm, OrderDetailsForm} from "../../../../interfaces/dto/forms/order";

export const AnonOrderFormDefaultValues: AnonOrderForm = {
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

export const sessionStorageFormExists = () => {
    return sessionStorage.getItem("form") !== null;
};

export const getSessionStorageForm = () => {
    if (sessionStorageFormExists()) {
        return JSON.parse(sessionStorage.getItem("form")!) as AnonOrderForm;
    }
    return AnonOrderFormDefaultValues;
};

export const setAnonCustomerToSessionStorage = (name: string, email: string, number: number) => {
    const form = getSessionStorageForm();
    sessionStorage.setItem("form", JSON.stringify(
        {
            ...form,
            anonCustomerName: name,
            anonCustomerEmail: email,
            anonCustomerContactNumber: number
        }
    ));
};

export const setAddressToSessionStorage = (address: AddressForm) => {
    const form = getSessionStorageForm();
    sessionStorage.setItem("form", JSON.stringify(
        {
            ...form,
            address: address
        }
    ));
};

export const setOrderDetailsToSessionStorage = (orderDetails: OrderDetailsForm) => {
    const form = getSessionStorageForm();
    sessionStorage.setItem("form", JSON.stringify(
        {
            ...form,
            orderDetails: orderDetails
        }
    ));
};

export const setAddressIdToSessionStorage = (addressId: number) => {
    const form = getSessionStorageForm();
    sessionStorage.setItem("form", JSON.stringify(({
        ...form,
        address: {
            id: addressId
        }
    })));
};

export const setDeliveryTypeToSessionStorage = (type: string) => {
    sessionStorage.setItem("delivery", type);
};

export const getDeliveryTypeToSessionStorage = () => {
    if (sessionStorage.getItem("delivery") !== null) {
        return sessionStorage.getItem("delivery")!;
    }
    return "HomeDelivery";
};

export const clearSessionStorageForm = () => {
    sessionStorage.removeItem("form");
    sessionStorage.removeItem("delivery");
};