import {LoginForm} from "../../interfaces/dto/forms/account";
import {getHeaders} from "../APIUtils";

export const loginFn = async (data: LoginForm) => {
    const response = await fetch(`${import.meta.env.VITE_APP_AUTH_API}/login?username=${data.email}&password=${data.password}`, {
        method: "POST",
        headers: getHeaders({jsonBody: false}),
        credentials: "include",
    });

    if (!response.ok) {
        throw await response.text();
    }
};

export const logoutFn = async () => {
    const response = await fetch(`${import.meta.env.VITE_APP_AUTH_API}/logout`, {
        method: "POST",
        headers: getHeaders({jsonBody: false}),
        credentials: "include",
    });

    if (!response.ok) {
        throw await response.text();
    }
};