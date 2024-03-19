import styles from "./css/UserUpdateForm.module.css";
import useModal from "../../../../../hooks/useModal";
import {getCookie} from "../../../../../functions/web";
import {useMutation} from "@tanstack/react-query";
import {updateEmail} from "../../../../../api/locked/user/settings";
import {ApiErrorDTO} from "../../../../../interfaces/dto/api-error";
import {ApiError} from "../../../../layout/modal/GeneralModals";
import {useForm} from "react-hook-form";
import Modal from "../../../../../hooks/Modal";
import {Button, FormError, Input} from "../../../../layout/styled/elements";
import {emailRgx} from "../../../../../utils/regex";
import {useState} from "react";
import {CircleIcon} from "../../../../layout/buttons/InteractiveIcons";
import PwVisibilityIcon from "../../../../../resources/icons/pwvisibility.png";
import {EmailChangeForm} from "../../../../../interfaces/dto/forms/account";

const EmailForm = () => {
    const {isModalOpen, openModal, modalContent, closeModal} = useModal();
    const [showPassword, setShowPassword] = useState(false);

    const togglePwVisibility = () => {
        setShowPassword(!showPassword);
    };

    const mutation = useMutation({
        mutationFn: updateEmail,
        onSuccess: () => {
            const logoutBc = new BroadcastChannel("session");
            logoutBc.postMessage("email-update");
            logoutBc.close();
        },
        onError: (error: ApiErrorDTO) => {
            if (error.errorMsg === "1062") {
                openModal(<ApiError
                    errorMsg={"Email asociado a una cuenta diferente. Por favor, utilice esa cuenta o contacte con nosotros."}
                    closeModal={closeModal}/>);
            } else {
                openModal(<ApiError errorMsg={error.errorMsg} closeModal={closeModal}/>);
            }
        }
    });

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<EmailChangeForm>({
        mode: "onBlur",
        reValidateMode: "onBlur",
        defaultValues: {
            email: null,
            password: null
        }
    });

    const onSubmitHandler = (form: EmailChangeForm) => {
        mutation.mutate({userId: getCookie("id"), form: form});
    };

    return <>
        <Modal content={modalContent} show={isModalOpen} hide={closeModal}/>
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
                <div className={styles.input}>

                    <Input
                        id={"emailUpdate"}
                        type={"email"}
                        placeholder={"Email nuevo"}
                        autoComplete={"new-password"}
                        $textAlign={"center"}
                        $height={"2rem"}
                        $width={"15rem"}
                        $margin={errors.email ? "0 0.5rem 0 1.5rem" : "0 0.5rem 0.5rem 1.5rem"}
                        className={errors.email ? "invalid" : ""}
                        {...register("email", {
                            required: {
                                value: true,
                                message: "El email no puede faltar"
                            },
                            pattern: {
                                value: emailRgx,
                                message: "Compruebe el email introducido."
                            },
                            minLength: {
                                value: 2,
                                message: "Mínimo 2 caracteres"
                            },
                            maxLength: {
                                value: 50,
                                message: "Máximo 50 caracteres"
                            }
                        })}/>
                    {errors.email && <FormError $margin={"0 0.5rem 0.5rem 1.5rem"}>{errors.email.message}</FormError>}

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

export default EmailForm;