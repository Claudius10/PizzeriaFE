import {QueryClient} from "@tanstack/react-query";
import {getCookie, isUserLoggedIn} from "../../../functions/web";
import {redirect} from "react-router-dom";
import {
    AccountDeleteForm,
    ContactNumberChangeForm,
    EmailChangeForm,
    NameChangeForm,
    PasswordChangeForm
} from "../../../interfaces/dto/forms/account";
import {getHeaders, keysCheck, loadCSRFToken} from "../../APIUtils";

const userDataQuery = (key: string[]) => ({
    queryKey: key,
    queryFn: async () => {
        const response = await fetch(`${import.meta.env.VITE_APP_USER_API}/${getCookie("id")}`,
            {credentials: "include"});

        if (!response.ok) {
            throw await response.json();
        } else {
            return await response.json();
        }
    },
});

export const userLoader = (queryClient: QueryClient, key: string[]) => async () => {
    if (!isUserLoggedIn()) {
        return redirect("/iniciar-sesion");
    } else {
        const query = userDataQuery(key);
        const userData = queryClient.getQueryData(query.queryKey);

        if (userData !== undefined) {
            return userData;
        } else {
            await keysCheck();
            return await queryClient.fetchQuery(query);
        }
    }
};

export const updateName = async (data: { userId: string, form: NameChangeForm }) => {
    const updateNameFn = async (data: { userId: string, form: NameChangeForm }) => {
        const response = await fetch(`${import.meta.env.VITE_APP_USER_API}/${data.userId}/name`, {
            method: "PUT",
            headers: getHeaders({jsonBody: true}),
            body: JSON.stringify(data.form),
            credentials: "include"
        });

        if (!response.ok) {
            throw await response.json();
        }
    };

    await keysCheck();
    await loadCSRFToken();
    return await updateNameFn(data);
};

export const updateEmail = async (data: { userId: string, form: EmailChangeForm }) => {
    const updateEmailFn = async (data: { userId: string, form: EmailChangeForm }) => {
        const response = await fetch(`${import.meta.env.VITE_APP_USER_API}/${data.userId}/email`, {
            method: "PUT",
            headers: getHeaders({jsonBody: true}),
            body: JSON.stringify(data.form),
            credentials: "include"
        });

        if (!response.ok) {
            throw await response.json();
        }
    };

    await keysCheck();
    await loadCSRFToken();
    return await updateEmailFn(data);
};

export const updatePassword = async (data: { userId: string, form: PasswordChangeForm }) => {
    const updatePasswordFn = async (data: { userId: string, form: PasswordChangeForm }) => {
        const response = await fetch(`${import.meta.env.VITE_APP_USER_API}/${data.userId}/password`, {
            method: "PUT",
            headers: getHeaders({jsonBody: true}),
            body: JSON.stringify(data.form),
            credentials: "include"
        });

        if (!response.ok) {
            throw await response.json();
        }
    };

    await keysCheck();
    await loadCSRFToken();
    return await updatePasswordFn(data);
};

export const updateContactNumber = async (data: { userId: string, form: ContactNumberChangeForm }) => {
    const updateContactNumberFn = async (data: { userId: string, form: ContactNumberChangeForm }) => {
        const response = await fetch(`${import.meta.env.VITE_APP_USER_API}/${data.userId}/contact_number`, {
            method: "PUT",
            headers: getHeaders({jsonBody: true}),
            body: JSON.stringify(data.form),
            credentials: "include"
        });

        if (!response.ok) {
            throw await response.json();
        }
    };

    await keysCheck();
    await loadCSRFToken();
    return await updateContactNumberFn(data);
};

export const deleteAccount = async (data: { userId: string, form: AccountDeleteForm }) => {
    const deleteAccountFn = async (data: { userId: string, form: AccountDeleteForm }) => {
        const response = await fetch(`${import.meta.env.VITE_APP_USER_API}/${data.userId}`, {
            method: "DELETE",
            headers: getHeaders({jsonBody: true}),
            body: JSON.stringify(data.form),
            credentials: "include"
        });

        if (!response.ok) {
            throw await response.json();
        }
    };

    await keysCheck();
    await loadCSRFToken();
    return await deleteAccountFn(data);
};