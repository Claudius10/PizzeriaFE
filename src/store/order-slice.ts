import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import {CreatedAnonOrderDTO} from "../interfaces/dto/order";

interface OrderState {
    cartId: number | null;
    cartQuantity: number;
    updatePending: boolean;
    refetchPending: boolean;
    orderSummary: CreatedAnonOrderDTO | undefined;
}

const initialState: OrderState = {
    cartId: null,
    cartQuantity: 0,
    updatePending: false,
    refetchPending: false,
    orderSummary: undefined,
};

export const OrderSlice = createSlice({
    name: "orderState",
    initialState,
    reducers: {
        clear() {
            return initialState;
        },

        setOrderSummary(state, action: PayloadAction<CreatedAnonOrderDTO>) {
            state.orderSummary = action.payload;
        },

        setUpdatePending(state, action: PayloadAction<boolean>) {
            state.updatePending = action.payload;
        },

        setRefetchPending(state, action: PayloadAction<boolean>) {
            state.refetchPending = action.payload;
        },

        setCartId(state, action: PayloadAction<number>) {
            state.cartId = action.payload;
        },

        setCartQuantity(state, action: PayloadAction<number>) {
            state.cartQuantity = action.payload;
        },
    },
});

export const orderState = OrderSlice.actions;
export default OrderSlice.reducer;