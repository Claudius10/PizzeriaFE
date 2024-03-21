import styles from "./css/AnonDeliveryForm.module.css";
import AnonFormReducer, {formActions, formState} from "../common/FormReducer";
import {ChangeEvent, useCallback, useEffect, useReducer, useRef} from "react";
import {useFormContext} from "react-hook-form";
import StoreList from "../common/StoreList";
import {getAddressFormErrors} from "../../../../../functions/form";
import {FormError, Input, Required, Select} from "../../../../layout/styled/elements";
import {charsAndNumbersRegex, esCharsRegex, numbersRegex} from "../../../../../utils/regex";
import {AddressForm} from "../../../../../interfaces/dto/forms/order.ts";
import {defaultAnonOrderFormValues, getSessionStorageAnonForm} from "../FormSessionStorageUtils.ts";

const AnonDeliveryForm = () => {
    const [state, dispatch] = useReducer(AnonFormReducer, formState);
    const form = useFormContext();
    const errors = getAddressFormErrors(form.formState.errors);
    const deliverySelectRef = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        const sessionStorageForm = getSessionStorageAnonForm();
        if (sessionStorageForm.address.id !== null) {
            dispatch(formActions.setPickUp(true));
            if (deliverySelectRef.current !== null) {
                deliverySelectRef.current.value = "StorePickUp";
            }
        }
    }, []);

    const selectAddressOrStore = (event: ChangeEvent<HTMLSelectElement>) => {
        form.resetField("address", {defaultValue: defaultAnonOrderFormValues.address});

        if (event.target.value === "StorePickUp") {
            dispatch(formActions.setPickUp(true));
        }

        if (event.target.value === "HomeDelivery") {
            dispatch(formActions.setPickUp(false));
        }
    };

    const setStoreId = useCallback((storeId: number) => {
        form.setValue("address.id", storeId);
        void form.trigger("address.street");
        void form.trigger("address.streetNr");
    }, []);

    const addressForm = <>
        <label className={styles.label} htmlFor="street">
            Dirección<Required>*</Required>
        </label>
        <Input
            id="street"
            type="text"
            placeholder={"Calle/Avenida/Paseo ..."}
            autoComplete={"new-password"}
            $height={"2rem"}
            $width={"100%"}
            $padding={"0 0 0 0.5rem"}
            $margin={errors.street ? "" : "0 0 0.5rem 0"}
            className={errors.street ? "invalid" : ""}
            {...form.register("address.street", {
                validate: (value, formValues) => {
                    const address = formValues.address as AddressForm;
                    if (address.id) {
                        return true;
                    }

                    if (value === "" || value === undefined || value === null) {
                        return "La calle no puede faltar";
                    }
                },
                pattern: {
                    value: esCharsRegex,
                    message: "Solo se aceptan letras",
                },
                minLength: {
                    value: 2,
                    message: "Mínimo 2 letras"
                },
                maxLength: {
                    value: 25,
                    message: "Máximo 25 letras"
                },
            })}
        />
        {errors.street && <FormError $margin={"0 0 0.5rem 0"}>{errors.street.message}</FormError>}

        <label className={styles.label} htmlFor="streetNr">
            Número<Required>*</Required>
        </label>
        <Input
            id="streetNr"
            type="number"
            placeholder={"1/15/135/1553 ..."}
            autoComplete={"new-password"}
            $height={"2rem"}
            $width={"100%"}
            $padding={"0 0 0 0.5rem"}
            $margin={errors.streetNr ? "" : "0 0 0.5rem 0"}
            className={errors.streetNr ? "invalid" : ""}
            {...form.register("address.streetNr", {
                validate: (value, formValues) => {
                    const address = formValues.address as AddressForm;
                    if (address.id) {
                        return true;
                    }

                    if (value === "" || value === undefined || value === null) {
                        return "El número no puede faltar";
                    }
                },
                pattern: {
                    value: numbersRegex,
                    message: "Solo se aceptan dígitos",
                },
                minLength: {
                    value: 1,
                    message: "Mínimo 1 dígito"
                },
                maxLength: {
                    value: 4,
                    message: "Máximo 4 dígitos"
                },
            })}
        />
        {errors.streetNr && <FormError $margin={"0 0 0.5rem 0"}>{errors.streetNr.message}</FormError>}

        <label className={styles.label} htmlFor="interior">Interior</label>
        <Input
            id="interior"
            type="text"
            placeholder="Portal"
            autoComplete={"new-password"}
            $height={"2rem"}
            $width={"100%"}
            $padding={"0 0 0 0.5rem"}
            $margin={errors.gate ? "" : "0 0 1rem 0"}
            className={errors.gate ? "invalid" : ""}
            {...form.register("address.gate", {
                required: false,
                pattern: {
                    value: charsAndNumbersRegex,
                    message: "Solo se aceptan letras y/o dígitos",
                },
                maxLength: {
                    value: 25,
                    message: "Máximo 25 valores"
                },
            })}
        />
        {errors.gate && <FormError $margin={"0 0 0.5rem 0"}>{errors.gate.message}</FormError>}

        <Input
            id="staircase"
            type="text"
            placeholder="Escalera"
            autoComplete={"new-password"}
            $height={"2rem"}
            $width={"100%"}
            $padding={"0 0 0 0.5rem"}
            $margin={errors.staircase ? "" : "0 0 1rem 0"}
            className={errors.staircase ? "invalid" : ""}
            {...form.register("address.staircase", {
                required: false,
                pattern: {
                    value: charsAndNumbersRegex,
                    message: "Solo se aceptan letras y/o dígitos",
                },
                maxLength: {
                    value: 25,
                    message: "Máximo 25 valores"
                },
            })}
        />
        {errors.staircase && <FormError $margin={"0 0 0.5rem 0"}>{errors.staircase.message}</FormError>}

        <Input
            id="floor"
            type="text"
            placeholder="Piso"
            autoComplete={"new-password"}
            $height={"2rem"}
            $width={"100%"}
            $padding={"0 0 0 0.5rem"}
            $margin={errors.floor ? "" : "0 0 1rem 0"}
            className={errors.floor ? "invalid" : ""}
            {...form.register("address.floor", {
                required: false,
                pattern: {
                    value: charsAndNumbersRegex,
                    message: "Solo se aceptan letras y/o dígitos",
                },
                maxLength: {
                    value: 25,
                    message: "Máximo 25 valores"
                },
            })}
        />
        {errors.floor && <FormError $margin={"0 0 0.5rem 0"}>{errors.floor.message}</FormError>}

        <Input
            id="door"
            type="text"
            placeholder="Puerta"
            autoComplete={"new-password"}
            $height={"2rem"}
            $width={"100%"}
            $padding={"0 0 0 0.5rem"}
            $margin={errors.door ? "" : "0 0 0.5rem 0"}
            className={errors.door ? "invalid" : ""}
            {...form.register("address.door", {
                required: false,
                pattern: {
                    value: charsAndNumbersRegex,
                    message: "Solo se aceptan letras y/o dígitos",
                },
                maxLength: {
                    value: 25,
                    message: "Máximo 25 valores"
                },
            })}
        />
        {errors.door && <FormError>{errors.door.message}</FormError>}
    </>;

    return <div className={styles.container}>
        <div className={styles.header}>
            <h1>Datos de entrega</h1>
        </div>

        <label className={styles.label} htmlFor="delivery">
            ¿Viene a recoger o se lo mandamos a domicilio?<Required>*</Required>
        </label>
        <Select
            id="delivery"
            onChange={selectAddressOrStore}
            ref={deliverySelectRef}
            $height={"2rem"}
            $width={"100%"}
            $margin={"0 0 0.5rem 0"}
            $padding={"0 0 0 0.5rem"}
            $border={errors.address ? "1px solid rgb(199, 30, 30)" : "1px solid #a9004f"}>
            <option value={"HomeDelivery"}>A domicilio</option>
            <option value={"StorePickUp"}>Recoger</option>
        </Select>

        {state.pickUp ? <StoreList isAddressFormInvalid={!!errors.address} onSetStoreId={setStoreId}/> : addressForm}
    </div>;
};

export default AnonDeliveryForm;