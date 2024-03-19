export type AddressForm = {
    id: number | null;
    street: string | null;
    streetNr: number | null;
    gate: string | null;
    staircase: string | null;
    door: string | null;
    floor: string | null;
}

export type OrderDetailsForm = {
    id: number | null;
    deliverNow: string | null;
    deliveryHour: string | null;
    paymentType: string | null;
    changeRequested: number | null;
    paymentChange: number | null;
    deliveryComment: string | null;
}

export type OrderItemForm = {
    id: number | null;
    productType: string | null;
    name: string | null;
    format: string | null;
    price: number | null;
    quantity: number | null;
}

type CartForm = {
    id: number | null;
    totalQuantity: number | null;
    totalCost: number | null;
    totalCostOffers: number | null;
    orderItems: OrderItemForm[] | null;
}

export type AnonOrderForm = {
    anonCustomerName: string | null;
    anonCustomerContactNumber: number | null;
    anonCustomerEmail: string | null;
    address: AddressForm;
    orderDetails: OrderDetailsForm;
    cart: CartForm;
}

export type UserOrderForm = {
    userId: number | null;
    addressId: number | null;
    orderDetails: OrderDetailsForm;
    cart: CartForm;
}

export type UpdatingUserOrderForm = {
    orderId: number | null;
    userId: number | null;
    addressId: number | null;
    createdOn: string | null;
    orderDetails: OrderDetailsForm;
    cart: CartForm;
}