import {AddressDTO} from "../../../interfaces/dto/order";
import {QueryOptions} from "@tanstack/react-query";
import {AddressForm} from "../../../interfaces/dto/forms/order";
import {getHeaders, keysCheck, loadCSRFToken} from "../../APIUtils";

export const findUserAddressListById = async (options: QueryOptions) => {
    const findUserAddressListByIdFn = async (options: QueryOptions) => {
        let userId;

        if (options.queryKey !== undefined) {
            userId = options.queryKey[2] as string;
        }

        const response = await fetch(`${import.meta.env.VITE_APP_USER_API}/${userId}/address`, {
            credentials: "include"
        });

        if (response.status === 202) {
            throw new Error(await response.text());
        }

        if (!response.ok) {
            throw await response.text();
        } else {
            return await response.json() as Promise<AddressDTO[]>;
        }
    };

    await keysCheck();
    return await findUserAddressListByIdFn(options);
};

export const createUserAddress = async (data: { userId: string, form: AddressForm }) => {
    const createUserAddressFn = async (data: { userId: string, form: AddressForm }) => {
        const response = await fetch(`${import.meta.env.VITE_APP_USER_API}/${data.userId}/address`, {
            method: "POST",
            headers: getHeaders({jsonBody: true}),
            body: JSON.stringify(data.form),
            credentials: "include"
        });

        if (!response.ok) {
            throw await response.text();
        }
    };

    await keysCheck();
    await loadCSRFToken();
    return await createUserAddressFn(data);
};

export const deleteUserAddress = async (data: { userId: string, addressId: number }) => {
    const deleteUserAddressFn = async (data: { userId: string, addressId: number }) => {
        const response = await fetch(`${import.meta.env.VITE_APP_USER_API}/${data.userId}/address/${data.addressId}`, {
            method: "DELETE",
            headers: getHeaders({jsonBody: false}),
            credentials: "include"
        });

        if (!response.ok) {
            throw await response.text();
        }
    };

    await keysCheck();
    await loadCSRFToken();
    return await deleteUserAddressFn(data);
};