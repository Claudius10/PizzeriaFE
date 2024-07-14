import {AnonOrderForm} from "../../interfaces/dto/forms/order";
import {RegisterForm} from "../../interfaces/dto/forms/account";
import {getHeaders} from "../APIUtils";
import {CreatedAnonOrderDTO} from "../../interfaces/dto/order";

export const registerFn = async (data: RegisterForm) => {
    const response = await fetch(`${import.meta.env.VITE_APP_ANON_API}/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: getHeaders({jsonBody: true}),
        credentials: "include"
    });
    if (!response.ok) {
        throw await response.text();
    }
};

export const createAnonOrder = async (order: AnonOrderForm) => {
    const response = await fetch(`${import.meta.env.VITE_APP_ANON_API}/order`, {
        method: "POST",
        body: JSON.stringify(order),
        headers: {"Content-Type": "application/json"},
    });

    if (!response.ok) {
        throw await response.text();
    } else {
        return await response.json() as CreatedAnonOrderDTO;
    }
};