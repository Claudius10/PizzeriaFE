import styles from "./AccountUpdateForm.module.css";
import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {deleteAccount} from "../../../../../api/locked/user/settings";
import {getCookie} from "../../../../../functions/web";
import {Button, FormError, Input} from "../../../../layout/styled/elements";
import {CircleIcon} from "../../../../layout/buttons/InteractiveIcons";
import PwVisibilityIcon from "../../../../../resources/icons/pwvisibility.png";
import {useForm} from "react-hook-form";
import {AccountDeleteForm} from "../../../../../interfaces/dto/forms/account";
import {modals} from "@mantine/modals";
import {useNavigate} from "react-router-dom";

const DeleteAccountForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const togglePwVisibility = () => {
        setShowPassword(!showPassword);
    };

    const mutation = useMutation({
        mutationFn: deleteAccount,
        onSuccess: () => {
            const logoutBc = new BroadcastChannel("session");
            logoutBc.postMessage("logout");
            logoutBc.close();
            modals.openContextModal({
                modal: "agree",
                title: "Eliminación cuenta",
                innerProps: {
                    modalBody: "La cuenta ha sido eliminada con éxito.",
                    onConfirm: () => {
                        navigate("/");
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
    } = useForm<AccountDeleteForm>({
        mode: "onBlur",
        reValidateMode: "onBlur",
        defaultValues: {
            password: null
        }
    });

    const onSubmitHandler = (form: AccountDeleteForm) => {
        mutation.mutate({userId: getCookie("id"), form: form});
    };

    return <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
            <div className={styles.input}>

                <div className={styles.inputGroup}>
                    <Input
                        id={"password"}
                        type={!showPassword ? "password" : "text"}
                        placeholder={"Contraseña actual"}
                        autoComplete={"new-password"}
                        $textAlign={"center"}
                        $height={"2rem"}
                        $width={"15rem"}
                        $margin={errors.password ? "0 0.5rem 0 1.5rem" : "0 0.5rem 0.5rem 1.5rem"}
                        className={errors.password ? "invalid" : ""}
                        {...register("password", {
                            required: {
                                value: true,
                                message: "La contraseña actual no puede faltar"
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
    </div>;
};

export default DeleteAccountForm;