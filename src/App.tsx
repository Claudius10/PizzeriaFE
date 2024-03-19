import styles from "./App.module.css";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Routes from "./main/Routes.tsx";
import {RouterProvider} from "react-router-dom";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 600000, // 10 min
            retry: 1
        },
        mutations: {
            retry: 1
        },
    }
});

function App() {
    const router = Routes(queryClient);
    return <div className={styles.mainWrapper}>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
        </QueryClientProvider>
    </div>;
}

export default App;