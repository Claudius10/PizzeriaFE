import {getCookie} from "../functions/web";

type HeaderOptions = {
    jsonBody: boolean;
}

export function getHeaders(options: HeaderOptions) {
    const headers = new Headers();

    if (options.jsonBody) {
        headers.append("Content-Type", "application/json");
    }

    return headers;
}

export const isKeyInvalid = () => {
    if (getCookie("pseudo_fight") === "") {
        return true;
    }
};

export const isSpareKeyInvalid = () => {
    // check and alert if spare key expired
    if (getCookie("pseudo_me") === undefined) {
        const logoutBc = new BroadcastChannel("session");
        logoutBc.postMessage("session-expired");
    }
};

export const refreshKey = async () => {
    const response = await fetch(`${import.meta.env.VITE_APP_TOKEN_API}/refresh`, {
        method: "POST",
        headers: getHeaders({jsonBody: false}),
        credentials: "include",
    });

    // first call fails due to missing csrf token...
    // go ahead with second call
    if (!response.ok) {
        await fetch(`${import.meta.env.VITE_APP_TOKEN_API}/refresh`, {
            method: "POST",
            headers: getHeaders({jsonBody: false}),
            credentials: "include",
        });
    }
};

export const keysCheck = async () => {
    isSpareKeyInvalid();
    if (isKeyInvalid()) {
        await refreshKey();
    }
};

export const loadCSRFToken = async () => {
    const response = await fetch(`${import.meta.env.VITE_APP_USER_API}/csrf`, {
        credentials: "include"
    });

    if (!response.ok) {
        throw await response.json();
    }
};