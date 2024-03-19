export type AddressDTO = {
    id: number;
    street: string;
    streetNr: number;
    gate: string;
    staircase: string;
    door: string;
    floor: string;
}

export type OrderDetailsDTO = {
    id: number;
    deliverNow: string;
    deliveryHour: string;
    paymentType: string;
    changeRequested: number;
    paymentChange: number;
    deliveryComment: string;
}

export type OrderItemDTO = {
    id: number;
    productType: string;
    name: string;
    format: string;
    price: number;
    quantity: number;
}

export type CartDTO = {
    id: number;
    totalQuantity: number;
    totalCost: number;
    totalCostOffers: number;
    orderItems: OrderItemDTO[];
}

export type UserDTO = {
    id: number;
    name: string;
    email: string;
    contactNumber: string;
}

export type OrderDTO = {
    id: number;
    createdOn: string;
    updatedOn: string;
    formattedCreatedOn: string;
    formattedUpdatedOn: string;
    address: AddressDTO;
    orderDetails: OrderDetailsDTO;
    cart: CartDTO;
    user: UserDTO;
}

export type CreatedAnonOrderDTO = {
    id: number | null;
    formattedCreatedOn: string | null,
    anonCustomerName: string | null;
    anonCustomerContactNumber: number | null;
    anonCustomerEmail: string | null;
    address: AddressDTO;
    orderDetails: OrderDetailsDTO;
    cart: CartDTO;
}

export type CartSummaryDTO = {
    totalQuantity: number;
    totalCost: number;
    totalCostOffers: number;
}

export type OrderDetailsSummaryDTO = {
    paymentType: string;
}

export type OrderSummaryDTO = {
    id: string;
    createdOn: string;
    updatedOn: string;
    formattedCreatedOn: string;
    formattedUpdatedOn: string;
    orderDetails: OrderDetailsSummaryDTO;
    cart: CartSummaryDTO;
}

export type OrderSummarySlice = {
    content: OrderSummaryDTO[];
    pageable: {
        pageNumber: number;
        pageSize: number;
        sort: {
            empty: boolean;
            sorted: boolean;
            unsorted: boolean;
        }
        offset: number;
        unpaged: boolean;
        paged: boolean;
    }
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    }
    size: number;
    number: number;
    first: boolean;
    last: boolean;
    numberOfElements: number;
    empty: boolean;
    totalPages: number;
    totalElements: number;
}