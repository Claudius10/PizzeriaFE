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

export const isKeyValid = () => {
    return getCookie("pseudo_fight") !== "";
};

export const isSpareKeyValid = () => {
    return (getCookie("pseudo_me") !== "");
};

export const keysCheck = async () => {
    if (!isSpareKeyValid()) {
        const logoutBc = new BroadcastChannel("session");
        logoutBc.postMessage("session-expired");
        logoutBc.close();
    }

    if (!isKeyValid() && isSpareKeyValid()) {
        await refreshKey();
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

export const loadCSRFToken = async () => {
    const response = await fetch(`${import.meta.env.VITE_APP_USER_API}/csrf`, {
        credentials: "include"
    });

    if (!response.ok) {
        throw await response.text();
    }
};