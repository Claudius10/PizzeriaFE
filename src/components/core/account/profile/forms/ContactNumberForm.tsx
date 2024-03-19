import styles from "./css/UserUpdateForm.module.css";
import useModal from "../../../../../hooks/useModal";
import {getCookie} from "../../../../../functions/web";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateContactNumber} from "../../../../../api/locked/user/settings";
import {ApiErrorDTO} from "../../../../../interfaces/dto/api-error";
import {ApiError} from "../../../../layout/modal/GeneralModals";
import {useForm} from "react-hook-form";
import {Button, FormError, Input} from "../../../../layout/styled/elements";
import Modal from "../../../../../hooks/Modal";
import {useState} from "react";
import {CircleIcon} from "../../../../layout/buttons/InteractiveIcons";
import PwVisibilityIcon from "../../../../../resources/icons/pwvisibility.png";
import {ContactNumberChangeForm} from "../../../../../interfaces/dto/forms/account";

type Props = {
    hide: () => void;
    revalidate: () => void;
}

const ContactNumberForm = (props: Props) => {
    const {isModalOpen, openModal, modalContent, closeModal} = useModal();
    const [showPassword, setShowPassword] = useState(false);
    const queryClient = useQueryClient();

    const togglePwVisibility = () => {
        setShowPassword(!showPassword);
    };

    const changeContactNumber = useMutation({
        mutationFn: updateContactNumber,
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["user", "data"], refetchType: "all"}, {throwOnError: true});
            props.hide();
            props.revalidate();
        },
        onError: (error: ApiErrorDTO) => {
            if (error.errorMsg === "1062") {
                openModal(<ApiError
                    errorMsg={"Número de contacto asociado a una cuenta diferente. Por favor, utilice esa cuenta o contacte con nosotros."}
                    closeModal={closeModal}/>);
            } else {
                openModal(<ApiError errorMsg={error.errorMsg} closeModal={closeModal}/>);
            }
        }
    });

    const {
        handleSubmit,
        register,
        formState: {errors}
    } = useForm<ContactNumberChangeForm>({
        mode: "onBlur",
        reValidateMode: "onBlur",
        defaultValues: {
            contactNumber: null,
            password: null
        }
    });

    const onSubmitHandler = (form: ContactNumberChangeForm) => {
        changeContactNumber.mutate({userId: getCookie("id"), form: form});
    };

    return <>
        <Modal content={modalContent} show={isModalOpen} hide={closeModal}/>
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
                <div className={styles.input}>

                    <Input
                        id="contactNumber"
                        type="number"
                        placeholder={"Número nuevo"}
                        autoComplete={"new-password"}
                        $textAlign={"center"}
                        $height={"2rem"}
                        $width={"15rem"}
                        $margin={errors.contactNumber ? "0 0.5rem 0 1.5rem" : "0 0.5rem 0.5rem 1.5rem"}
                        className={errors.contactNumber ? "invalid" : ""}
                        {...register("contactNumber", {
                            required: {
                                value: true,
                                message: "El número no puede faltar"
                            },
                            minLength: {
                                value: 9,
                                message: "Mínimo 9 dígitos"
                            },
                            maxLength: {
                                value: 9,
                                message: "Máximo 9 dígitos"
                            },
                        })}
                    />
                    {errors.contactNumber &&
                        <FormError $margin={"0 0.5rem 0.5rem 1.5rem"}>{errors.contactNumber.message}</FormError>}

                    <div className={styles.inputGroup}>
                        <Input
                            id="password"
                            type={!showPassword ? "password" : "text"}
                            placeholder={"Contraseña"}
                            autoComplete={"new-password"}
                            $textAlign={"center"}
                            $height={"2rem"}
                            $width={"15rem"}
                            $margin={errors.password ? "0 0.5rem 0 1.5rem" : "0 0.5rem 0.5rem 1.5rem"}
                            className={errors.password ? "invalid" : ""}
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "La contraseña no puede faltar"
                                }
                            })}
                        />
                        <CircleIcon
                            action={togglePwVisibility}
                            icon={PwVisibilityIcon}
                            width={"14px"}
                            height={"12px"}
                            margin={errors.password ? "" : "0 0 0.5rem 0"}
                        />
                    </div>
                    {errors.password &&
                        <FormError $margin={"0 0.5rem 0.5rem 1.5rem"}>{errors.password.message}</FormError>}

                </div>
                <Button type={"submit"}
                        $color={Object.keys(errors).length === 0 ? "#a9004f" : "rgb(199, 30, 30)"}>Continuar</Button>
            </form>
        </div>
    </>;
};

export default ContactNumberForm;