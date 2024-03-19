import styles from "./css/NewAddressForm.module.css";
import React from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createUserAddress} from "../../../../../api/locked/user/data";
import {ApiErrorDTO} from "../../../../../interfaces/dto/api-error";
import {ApiError} from "../../../../layout/modal/GeneralModals";
import useModal from "../../../../../hooks/useModal";
import {useForm} from "react-hook-form";
import {getCookie} from "../../../../../functions/web";
import {Button, FormError, Input, Required} from "../../../../layout/styled/elements";
import {charsAndNumbersRegex, esCharsRegex, numbersRegex} from "../../../../../utils/regex";
import Modal from "../../../../../hooks/Modal";
import {AddressForm} from "../../../../../interfaces/dto/forms/order";

type Props = {
    handler: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewAddressForm = (props: Props) => {
    const {isModalOpen, openModal, modalContent, closeModal} = useModal();
    const queryClient = useQueryClient();

    const addAddress = useMutation({
        mutationFn: createUserAddress,
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["user", "addressList"]});
            props.handler(false);
        },
        onError: (error: ApiErrorDTO) => {
            openModal(<ApiError errorMsg={error.errorMsg} closeModal={closeModal}/>);
        }
    });

    const {
        handleSubmit,
        register,
        formState: {errors}
    } = useForm<AddressForm>({
        mode: "onBlur",
        reValidateMode: "onBlur",
        defaultValues: {
            id: null,
            street: null,
            streetNr: null,
            gate: null,
            staircase: null,
            floor: null,
            door: null
        }
    });

    const onSubmitHandler = (address: AddressForm) => {
        addAddress.mutate({userId: getCookie("id"), form: address});
    };

    return <>
        <Modal content={modalContent} show={isModalOpen} hide={closeModal}/>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className={styles.form}>

                <label className={styles.label} htmlFor="street">
                    Dirección<Required>*</Required>
                </label>
                <Input
                    id="street"
                    type="text"
                    placeholder={"Calle/Avenida/Paseo ..."}
                    autoComplete={"new-password"}
                    $height={"2rem"}
                    $padding={"0 0 0 0.5rem"}
                    $margin={errors.street ? "" : "0 0 1rem 0"}
                    className={errors.street ? "invalid" : ""}
                    {...register("street", {
                        required: {
                            value: true,
                            message: "La calle no puede faltar"
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
                            value: 50,
                            message: "Máximo 50 letras"
                        },
                    })}
                />
                {errors.street && <FormError $margin={"0.5rem 0 0.5rem 0"}>{errors.street.message}</FormError>}

                <label className={styles.label} htmlFor="streetNr">
                    Número<Required>*</Required>
                </label>
                <Input
                    id="streetNr"
                    type="number"
                    placeholder={"1/15/135/1553 ..."}
                    autoComplete={"new-password"}
                    $height={"2rem"}
                    $padding={"0 0 0 0.5rem"}
                    $margin={errors.streetNr ? "" : "0 0 1rem 0"}
                    className={errors.streetNr ? "invalid" : ""}
                    {...register("streetNr", {
                        required: {
                            value: true,
                            message: "El número no puede faltar"
                        },
                        pattern: {
                            value: numbersRegex,
                            message: "Solo se aceptan dígitos",
                        },
                        minLength: {
                            value: 1,
                            message: "Mínimo 1 dígitos"
                        },
                        maxLength: {
                            value: 4,
                            message: "Máximo 4 dígitos"
                        },
                    })}
                />
                {errors.streetNr && <FormError $margin={"0.5rem 0 0.5rem 0"}>{errors.streetNr.message}</FormError>}

                <p className={styles.label}>Interior</p>
                <Input
                    id="interior"
                    type="text"
                    placeholder="Portal"
                    autoComplete={"new-password"}
                    $height={"2rem"}
                    $padding={"0 0 0 0.5rem"}
                    $margin={errors.gate ? "" : "0 0 1.5rem 0"}
                    className={errors.gate ? "invalid" : ""}
                    {...register("gate", {
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
                {errors.gate && <FormError $margin={"0.5rem 0 1rem 0"}>{errors.gate.message}</FormError>}

                <Input
                    id="staircase"
                    type="text"
                    placeholder="Escalera"
                    autoComplete={"new-password"}
                    $height={"2rem"}
                    $padding={"0 0 0 0.5rem"}
                    $margin={errors.staircase ? "" : "0 0 1.5rem 0"}
                    className={errors.staircase ? "invalid" : ""}
                    {...register("staircase", {
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
                {errors.staircase && <FormError $margin={"0.5rem 0 1rem 0"}>{errors.staircase.message}</FormError>}

                <Input
                    id="floor"
                    type="text"
                    placeholder="Piso"
                    autoComplete={"new-password"}
                    $height={"2rem"}
                    $padding={"0 0 0 0.5rem"}
                    $margin={errors.floor ? "" : "0 0 1.5rem 0"}
                    className={errors.floor ? "invalid" : ""}
                    {...register("floor", {
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
                {errors.floor && <FormError $margin={"0.5rem 0 1rem 0"}>{errors.floor.message}</FormError>}

                <Input
                    id="door"
                    type="text"
                    placeholder="Puerta"
                    autoComplete={"new-password"}
                    $height={"2rem"}
                    $padding={"0 0 0 0.5rem"}
                    $margin={errors.door ? "" : "0 0 1rem 0"}
                    className={errors.door ? "invalid" : ""}
                    {...register("door", {
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
                {errors.door && <FormError $margin={"0.5rem 0 0.5rem 0"}>{errors.door.message}</FormError>}

            </div>
            <Button type={"submit"}
                    $color={Object.keys(errors).length === 0 ? "#a9004f" : "rgb(199, 30, 30)"}>Continuar</Button>
        </form>
    </>;
};

export default NewAddressForm;