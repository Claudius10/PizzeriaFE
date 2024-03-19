import {QueryClient} from "@tanstack/react-query";
import {QueryOptions} from "@tanstack/react-query";

export const queryResource = async (options: QueryOptions) => {
    let resource;

    if (options.queryKey !== undefined) {
        resource = options.queryKey[1];
    }

    const response = await fetch(`${import.meta.env.VITE_APP_RESOURCES_API}/${resource}`);

    if (!response.ok) {
        throw await response.json();
    } else {
        return response.json();
    }
};

// used only in loader for fetching products
const productQuery = (key: string[]) => ({
    queryKey: key,
    queryFn: async () => {
        const response = await fetch(`${import.meta.env.VITE_APP_RESOURCES_API}/product?type=${key}`);
        if (!response.ok) {
            throw await response.json();
        } else {
            return await response.json();
        }
    },
});

// react router loader used in Routes in App.tsx
export const productLoader = (queryClient: QueryClient, key: string[]) => async () => {
    const query = productQuery(key);
    return (
        queryClient.getQueryData(query.queryKey) ??
        (await queryClient.fetchQuery(query))
        // left-value ?? right-value
        // returns right-value if left is undefined or null
        // else returns left-value
    );
};