import styles from "./css/AdditionalDataForm.module.css";
import {useFormContext} from "react-hook-form";
import {ChangeEvent, useEffect, useReducer, useRef} from "react";
import AnonFormReducer, {formActions, formState} from "./FormReducer";
import useModal from "../../../../../hooks/useModal";
import {getDeliveryHours, getOrderDetailsFormErrors} from "../../../../../functions/form";
import {DeliveryHoursRefreshModal} from "../../../../layout/modal/GeneralModals";
import Modal from "../../../../../hooks/Modal";
import {FormError, Input, InputLabel, Required, Select} from "../../../../layout/styled/elements";
import {esCharsAndNumbersAndBasicSymbolsRgx} from "../../../../../utils/regex";
import {
    AnonOrderFormDefaultValues,
    getSessionStorageForm,
    sessionStorageFormExists,
    setOrderDetailsToSessionStorage
} from "../FormSessionStorageUtils";
import {OrderDetailsForm} from "../../../../../interfaces/dto/forms/order.ts";

const AdditionalDataForm = () => {
    const {openModal, closeModal, modalContent, isModalOpen} = useModal();
    const [state, dispatch] = useReducer(AnonFormReducer, formState);
    const form = useFormContext();
    const errors = getOrderDetailsFormErrors(form.formState.errors);
    const changeRequestSelectRef = useRef<HTMLSelectElement>(null);

    const setChangeRequestedOption = (requested: boolean) => {
        if (changeRequestSelectRef.current !== null) {
            changeRequestSelectRef.current.value = requested ? "cashChangeRequested" : "noCashChangeRequested";
        }
    };

    useEffect(() => {
        if (sessionStorageFormExists()) {
            const sessionStorageForm = getSessionStorageForm();

            if (sessionStorageForm.orderDetails.deliverNow === "TBD") {
                dispatch(formActions.setDeliverNow(false));
            }

            if (sessionStorageForm.orderDetails.paymentType === "Cash") {
                dispatch(formActions.setChangeAllowed(true));

                if (sessionStorageForm.orderDetails.changeRequested !== null) {
                    dispatch(formActions.setChangeSelected(true));
                    setChangeRequestedOption(true);
                }
            }
        }

        return () => {
            setOrderDetailsToSessionStorage(form.getValues("orderDetails") as OrderDetailsForm);
        };
    }, []);

    const selectDeliveryTime = (event: ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value === "ASAP") {
            dispatch(formActions.setDeliverNow(true));
            form.setValue("orderDetails.deliveryHour", null);
        }

        if (event.target.value === "TBD") {
            dispatch(formActions.setDeliverNow(false));
        }

        void form.trigger("orderDetails.deliverNow"); // trigger manual field validation
    };

    const selectPaymentType = (event: ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value === "Cash") {
            dispatch(formActions.setChangeAllowed(true));
        }

        if (event.target.value === "Card") {
            dispatch(formActions.setChangeAllowed(false));
            dispatch(formActions.setChangeSelected(false));
            setChangeRequestedOption(false);
            form.setValue("orderDetails.changeRequested", null);
        }

        void form.trigger("orderDetails.paymentType");
    };

    const selectChangeRequest = (event: ChangeEvent<HTMLSelectElement>) => {
        form.resetField("orderDetails.changeRequested",
            {defaultValue: AnonOrderFormDefaultValues.orderDetails.changeRequested});

        if (event.target.value === "cashChangeRequested") {
            dispatch(formActions.setChangeSelected(true));
        }

        if (event.target.value === "noCashChangeRequested") {
            dispatch(formActions.setChangeSelected(false));
        }
    };

    const deliveryHours = getDeliveryHours().map((item) => (
        <option key={item}>{item}</option>));

    // useEffect to refresh deliveryHours every 5 min
    // when "Hora programada" option is selected
    useEffect(() => {

        const interval = setInterval(() => {
            if (!state.deliverNow) {
                openModal(<DeliveryHoursRefreshModal closeModal={closeModal}/>);
            }
        }, 300000); // 5 min

        return () => {
            clearInterval(interval);
        };

    }, [closeModal, openModal, state.deliverNow]);

    return <>
        <Modal content={modalContent} show={isModalOpen} hide={closeModal}/>
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Datos adicionales</h1>
            </div>

            <label className={styles.label} htmlFor="deliveryChoice">
                Hora de entrega<Required>*</Required>
            </label>
            <Select
                id="deliveryChoice"
                $height={"2rem"}
                $width={"100%"}
                $padding={"0 0 0 0.5rem"}
                $margin={errors.deliverNow ? "" : "0 0 0.5rem 0"}
                $border={errors.deliverNow ? "1px solid rgb(199, 30, 30)" : "1px solid #a9004f"}
                {...form.register("orderDetails.deliverNow", {
                    required: {
                        value: true,
                        message: "La hora de entrega no puede faltar"
                    },
                    onChange: selectDeliveryTime
                })}>
                <option value="ASAP">Lo antes posible</option>
                <option value="TBD">Hora programada</option>
            </Select>
            {errors.deliverNow && <FormError $margin={"0 0 0.5rem 0"}>{errors.deliverNow.message}</FormError>}

            {!state.deliverNow &&
                <>
                    <label className={styles.label} htmlFor="programmedHour">
                        Seleccione hora
                    </label>
                    <Select
                        id="programmedHour"
                        $height={"2rem"}
                        $width={"100%"}
                        $padding={"0 0 0 0.5rem"}
                        $margin={errors.deliveryHour ? "" : "0 0 0.5rem 0"}
                        $border={errors.deliveryHour ? "1px solid rgb(199, 30, 30)" : "1px solid #a9004f"}
                        {...form.register("orderDetails.deliveryHour", {
                            required: {
                                value: true,
                                message: "La hora programada no puede faltar"
                            },
                            onChange: () => {
                                void form.trigger("orderDetails.deliveryHour");
                            }
                        })}>
                        {deliveryHours}
                    </Select>
                    {errors.deliveryHour &&
                        <FormError $margin={"0 0 0.5rem 0"}>{errors.deliveryHour.message}</FormError>}
                </>}

            <label className={styles.label} htmlFor="payment">
                Forma de pago<Required>*</Required>
            </label>
            <Select
                id="payment"
                $height={"2rem"}
                $width={"100%"}
                $padding={"0 0 0 0.5rem"}
                $margin={errors.paymentType ? "" : "0 0 0.5rem 0"}
                $border={errors.paymentType ? "1px solid rgb(199, 30, 30)" : "1px solid #a9004f"}
                {...form.register("orderDetails.paymentType", {
                    required: {
                        value: true,
                        message: "La forma de pago no puede faltar"
                    },
                    onChange: selectPaymentType
                })}>
                <option value="Card">Tarjeta</option>
                <option value="Cash">Efectivo</option>
            </Select>
            {errors.paymentType && <FormError $margin={"0 0 0.5rem 0"}>{errors.paymentType.message}</FormError>}

            {/* if efectivo true*/}

            <InputLabel htmlFor="changeSelected" $opacity={state.changeAllowed ? "100%" : "40%"}>
                ¿Necesita cambio?<Required>*</Required>
            </InputLabel>
            <Select
                id="changeSelected"
                onChange={selectChangeRequest}
                ref={changeRequestSelectRef}
                disabled={!state.changeAllowed}
                $height={"2rem"}
                $width={"100%"}
                $padding={"0 0 0 0.5rem"}
                $margin={"0 0 0.5rem 0"}
                $opacity={state.changeAllowed ? "100%" : "40%"}>
                <option value="noCashChangeRequested">No</option>
                <option value="cashChangeRequested">Sí</option>
                {/* if yes, number input field */}
            </Select>

            {state.changeSelected &&
                <>
                    <label className={styles.label} htmlFor="changeSelected">
                        Cambio de<Required>*</Required>
                    </label>
                    <Input
                        id={"changeSelected"}
                        type={"number"}
                        placeholder={"Valores aceptados: 10 / 20.5 / 50.55"}
                        step={".01"}
                        $height={"2rem"}
                        $width={"97.5%"}
                        $padding={"0 0 0 0.5rem"}
                        $margin={errors.changeRequested ? "" : "0 0 0.5rem 0"}
                        className={errors.changeRequested ? "invalid" : ""}
                        {...form.register("orderDetails.changeRequested", {
                            required: {
                                value: true,
                                message: "El valor numérico no puede faltar"
                            },
                            maxLength: {
                                value: 5,
                                message: "Máximo 5 dígitos"
                            },
                        })}/>
                    {errors.changeRequested &&
                        <FormError $margin={"0 0 0.5rem 0"}>{errors.changeRequested.message}</FormError>}
                </>}


            <label className={styles.label} htmlFor="comment">
                Observaciones al repartidor
            </label>
            <textarea
                className={styles.comment}
                id="comment"
                placeholder={"Escriba aquí..."}
                rows={3}
                cols={50}
                {...form.register("orderDetails.deliveryComment", {
                    required: false,
                    pattern: {
                        value: esCharsAndNumbersAndBasicSymbolsRgx,
                        message:
                            "Solo letras, dígitos, !¡ ?¿ . , : ; se aceptan",
                    },
                    maxLength: {
                        value: 250,
                        message: "Máximo 250 caracteres"
                    },
                })}
            />
            {errors.deliveryComment &&
                <FormError $margin={"0 0 0.5rem 0"}>{errors.deliveryComment.message}</FormError>}
        </div>
    </>;
};

export default AdditionalDataForm;