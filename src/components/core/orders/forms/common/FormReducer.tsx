import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface FormState {
    deliverNow: boolean;
    pickUp: boolean;
    changeAllowed: boolean;
    changeSelected: boolean;
}

const initialState: FormState = {
    deliverNow: true,
    pickUp: false,
    changeAllowed: false,
    changeSelected: false,
};

export const FormReducer = createSlice({
    name: "formReducer",
    initialState,
    reducers: {
        setDeliverNow(state, action: PayloadAction<boolean>) {
            state.deliverNow = action.payload;
        },

        setPickUp(state, action: PayloadAction<boolean>) {
            state.pickUp = action.payload;
        },

        setChangeAllowed(state, action: PayloadAction<boolean>) {
            state.changeAllowed = action.payload;
        },

        setChangeSelected(state, action: PayloadAction<boolean>) {
            state.changeSelected = action.payload;
        },

        reset(state) {
            state.deliverNow = true;
            state.pickUp = false;
            state.changeSelected = false;
            state.changeAllowed = false;
        },
    },
});

export const formState = initialState;
export const formActions = FormReducer.actions;
export default FormReducer.reducer;
