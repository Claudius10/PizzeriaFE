import styles from "./AccountUpdateForm.module.css";
import {getCookie} from "../../../../../functions/web";
import {useMutation} from "@tanstack/react-query";
import {updatePassword} from "../../../../../api/locked/user/settings";
import {useForm} from "react-hook-form";
import {Button, FormError, Input} from "../../../../layout/styled/elements";
import {passwordRegex} from "../../../../../utils/regex";
import {useState} from "react";
import {CircleIcon} from "../../../../layout/buttons/InteractiveIcons";
import PwVisibilityIcon from "../../../../../resources/icons/pwvisibility.png";
import {PasswordChangeForm} from "../../../../../interfaces/dto/forms/account";
import {modals} from "@mantine/modals";
import {useNavigate} from "react-router-dom";

const NewPasswordForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const togglePwVisibility = () => {
        setShowPassword(!showPassword);
    };

    const mutation = useMutation({
        mutationFn: updatePassword,
        onSuccess: () => {
            const logoutBc = new BroadcastChannel("session");
            logoutBc.postMessage("logout");
            logoutBc.close();
            modals.openContextModal({
                modal: "agree",
                title: "Actualización contraseña",
                innerProps: {
                    modalBody: "Actualización completa. La sesión ha de ser reiniciada.",
                    onConfirm: () => {
                        navigate("/iniciar-sesion");
                    }
                }
            });
        },
        onError: (error: string) => {
            modals.openContextModal({
                modal: "agree",
                title: "Error",
                innerProps: {
                    modalBody: error
                }
            });
        }
    });

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<PasswordChangeForm>({
        mode: "onBlur",
        reValidateMode: "onBlur",
        defaultValues: {
            currentPassword: null,
            newPassword: null,
            matchingNewPassword: null
        }
    });

    const onSubmitHandler = (form: PasswordChangeForm) => {
        mutation.mutate({userId: getCookie("id"), form: form});
    };

    return <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
            <div className={styles.input}>

                <div className={styles.inputGroup}>
                    <Input
                        id={"currentPassword"}
                        type={!showPassword ? "password" : "text"}
                        placeholder={"Contraseña actual"}
                        autoComplete={"new-password"}
                        $textAlign={"center"}
                        $height={"2rem"}
                        $width={"15rem"}
                        $margin={errors.currentPassword ? "0 0.5rem 0 1.5rem" : "0 0.5rem 0.5rem 1.5rem"}
                        className={errors.currentPassword ? "invalid" : ""}
                        {...register("currentPassword", {
                            required: {
                                value: true,
                                message: "La contraseña actual no puede faltar"
                            },
                        })}
                    />
                    <CircleIcon
                        action={togglePwVisibility}
                        icon={PwVisibilityIcon}
                        width={"14px"}
                        height={"12px"}
                        margin={errors.currentPassword ? "" : "0 0 0.5rem 0"}
                    />
                </div>
                {errors.currentPassword &&
                    <FormError $margin={"0 0.5rem 0.5rem 1.5rem"}>{errors.currentPassword.message}</FormError>}

                <div className={styles.inputGroup}>
                    <Input
                        id={"newPassword"}
                        type={!showPassword ? "password" : "text"}
                        placeholder={"Contraseña nueva"}
                        autoComplete={"new-password"}
                        $textAlign={"center"}
                        $height={"2rem"}
                        $width={"15rem"}
                        $margin={errors.newPassword ? "0 0.5rem 0 1.5rem" : "0 0.5rem 0.5rem 1.5rem"}
                        className={errors.newPassword ? "invalid" : ""}
                        {...register("newPassword", {
                            required: {
                                value: true,
                                message: "La contraseña nueva no puede faltar"
                            },
                            pattern: {
                                value: passwordRegex,
                                message: "Mínimo 8 caracteres, una letra mayúscula, una letra minúscula, y un número"
                            },
                            validate: (value, formValues) => {
                                if (formValues.matchingNewPassword !== null && value !== formValues.matchingNewPassword)
                                    return "La contraseña debe coincidir";
                            },
                        })}
                    />
                    <CircleIcon
                        action={togglePwVisibility}
                        icon={PwVisibilityIcon}
                        width={"14px"}
                        height={"12px"}
                        margin={errors.newPassword ? "" : "0 0 0.5rem 0"}
                    />
                </div>
                {errors.newPassword &&
                    <FormError $margin={"0 0.5rem 0.5rem 1.5rem"}>{errors.newPassword.message}</FormError>}

                <div className={styles.inputGroup}>
                    <Input
                        id={"matchingNewPassword"}
                        type={!showPassword ? "password" : "text"}
                        placeholder={"Reintroducir la contraseña nueva"}
                        autoComplete={"new-password"}
                        $textAlign={"center"}
                        $height={"2rem"}
                        $width={"15rem"}
                        $margin={errors.matchingNewPassword ? "0 0.5rem 0 1.5rem" : "0 0.5rem 0.5rem 1.5rem"}
                        className={errors.matchingNewPassword ? "invalid" : ""}
                        {...register("matchingNewPassword", {
                            required: {
                                value: true,
                                message: "La contraseña nueva no puede faltar"
                            },
                            pattern: {
                                value: passwordRegex,
                                message: "Mínimo 8 caracteres, una letra mayúscula, una letra minúscula, y un número"
                            },
                            validate: (value, formValues) => {
                                if (formValues.newPassword !== null && value !== formValues.newPassword)
                                    return "La contraseña debe coincidir";
                            },
                        })}/>
                    <CircleIcon
                        action={togglePwVisibility}
                        icon={PwVisibilityIcon}
                        width={"14px"}
                        height={"12px"}
                        margin={errors.matchingNewPassword ? "" : "0 0 0.5rem 0"}
                    />
                </div>
                {errors.matchingNewPassword &&
                    <FormError $margin={"0 0.5rem 0.5rem 1.5rem"}>{errors.matchingNewPassword.message}</FormError>}

            </div>
            <Button type={"submit"}
                    $color={Object.keys(errors).length === 0 ? "#a9004f" : "rgb(199, 30, 30)"}>Continuar</Button>
        </form>
    </div>;
};

export default NewPasswordForm;