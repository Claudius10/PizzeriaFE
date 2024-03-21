import styles from "./App.module.css";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Routes from "./main/Routes.tsx";
import {RouterProvider} from "react-router-dom";
import {MantineProvider} from "@mantine/core";
import {ModalsProvider} from '@mantine/modals';
import '@mantine/core/styles/global.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.layer.css';
import {AgreementModal, ConfirmModal} from "./AppModals.tsx";

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
            <MantineProvider defaultColorScheme="dark">
                <ModalsProvider modals={{agree: AgreementModal, confirm: ConfirmModal}}>
                    <RouterProvider router={router}/>
                </ModalsProvider>
            </MantineProvider>
        </QueryClientProvider>
    </div>;
}

export default App;