import {configureStore} from "@reduxjs/toolkit";
import OrderSlice from "./order-slice";


export const store = configureStore({
    reducer: {
        order: OrderSlice,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
