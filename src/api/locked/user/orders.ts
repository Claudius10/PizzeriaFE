import {OrderDTO, OrderSummarySlice} from "../../../interfaces/dto/order";
import {QueryOptions} from "@tanstack/react-query";
import {UpdatingUserOrderForm, UserOrderForm} from "../../../interfaces/dto/forms/order";
import {getHeaders, keysCheck, loadCSRFToken} from "../../APIUtils";

export const createUserOrder = async (order: UserOrderForm) => {
    const createUserOrderFn = async (order: UserOrderForm) => {
        const response = await fetch(`${import.meta.env.VITE_APP_USER_ORDERS_API}`, {
            method: "POST",
            body: JSON.stringify(order),
            headers: getHeaders({jsonBody: true}),
            credentials: "include",
        });

        if (!response.ok) {
            throw await response.text();
        } else {
            // returns order id
            return await response.json() as number;
        }
    };

    await keysCheck();
    await loadCSRFToken();
    return createUserOrderFn(order);
};

export const findUserOrder = async (options: QueryOptions) => {
    const findUserOrderFn = async (options: QueryOptions) => {
        let orderId;
        if (options.queryKey !== undefined) {
            orderId = options.queryKey[2] as string;
        }

        const response = await fetch(`${import.meta.env.VITE_APP_USER_ORDERS_API}/${orderId}`,
            {credentials: "include"});

        if (response.status === 202) {
            throw new Error(await response.text());
        }

        if (!response.ok) {
            throw await response.text();
        } else {
            return await response.json() as Promise<OrderDTO>;
        }
    };

    await keysCheck();
    return await findUserOrderFn(options);
};

export const findUserOrders = async (options: QueryOptions) => {
    const findUserOrdersFn = async (options: QueryOptions) => {
        let pageSize;
        let pageNumber;
        let userId;

        if (options.queryKey) {
            pageSize = options.queryKey[2] as string;
            pageNumber = Number(options.queryKey[3] as string) - 1;
            userId = options.queryKey[4] as string;
        }

        const response = await fetch(`${import.meta.env.VITE_APP_USER_ORDERS_API}?pageNumber=${pageNumber}&pageSize=${pageSize}&userId=${userId}`,
            {credentials: "include"});

        if (response.status === 202) {
            throw new Error(await response.text());
        }

        if (!response.ok) {
            throw await response.text();
        } else {
            return await response.json() as Promise<OrderSummarySlice>;
        }
    };

    await keysCheck();
    return await findUserOrdersFn(options);
};

export const updateUserOrder = async (order: UpdatingUserOrderForm) => {
    const updateUserOrderFn = async (order: UpdatingUserOrderForm) => {
        const response = await fetch(`${import.meta.env.VITE_APP_USER_ORDERS_API}`, {
            method: "PUT",
            body: JSON.stringify(order),
            headers: getHeaders({jsonBody: true}),
            credentials: "include",
        });

        if (!response.ok) {
            throw await response.text();
        } else {
            // returns order id
            return await response.json() as number;
        }
    };

    await keysCheck();
    await loadCSRFToken();
    return updateUserOrderFn(order);
};

export const deleteOrderById = async (orderId: string) => {
    const deleteOrderByIdFn = async (orderId: string) => {
        const response = await fetch(`${import.meta.env.VITE_APP_USER_ORDERS_API}/${orderId}`, {
            method: "DELETE",
            headers: getHeaders({jsonBody: false}),
            credentials: "include"
        });

        if (!response.ok) {
            throw await response.text();
        } else {
            // returns order id
            return await response.json() as number;
        }
    };

    await keysCheck();
    await loadCSRFToken();
    return deleteOrderByIdFn(orderId);
};