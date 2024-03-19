export const getCookie = (key: string) => {
    const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");

    if (b !== null) {
        if (b.length === 0) {
            return "";
        } else {
            return b.pop()!;
        }
    }

    return "";
};

export const isUserLoggedIn = () => {
    return getCookie("id") !== "";
};

export const removeCookies = () => {
    document.cookie.split(";").forEach((c) => {
        document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
};
