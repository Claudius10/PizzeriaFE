import React, {useReducer} from "react";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type ModalState = {
    content: React.ReactElement | null;
    isOpen: boolean,
}

const initialState: ModalState = {
    content: null,
    isOpen: false,
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal(state, action: PayloadAction<React.ReactElement>) {
            state.content = action.payload;
            state.isOpen = true;
        },

        closeModal() {
            return initialState;
        },
    },
});

const modalActions = modalSlice.actions;
const modalReducer = modalSlice.reducer;

const useModal = () => {
    const [state, dispatch] = useReducer(modalReducer, initialState);

    const openModal = (content: React.ReactElement) => {
        dispatch(modalActions.openModal(content));
    };

    const closeModal = () => {
        dispatch(modalActions.closeModal());
    };

    return {
        isModalOpen: state.isOpen,
        modalContent: state.content,
        openModal,
        closeModal
    };
};
export default useModal;
