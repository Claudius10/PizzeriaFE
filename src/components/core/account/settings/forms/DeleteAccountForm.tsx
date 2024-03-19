import styles from "./AccountUpdateForm.module.css";
import useModal from "../../../../../hooks/useModal";
import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {deleteAccount} from "../../../../../api/locked/user/settings";
import {ApiErrorDTO} from "../../../../../interfaces/dto/api-error";
import {ApiError} from "../../../../layout/modal/GeneralModals";
import {getCookie} from "../../../../../functions/web";
import Modal from "../../../../../hooks/Modal";
import {Button, FormError, Input} from "../../../../layout/styled/elements";
import {CircleIcon} from "../../../../layout/buttons/InteractiveIcons";
import PwVisibilityIcon from "../../../../../resources/icons/pwvisibility.png";
import {useForm} from "react-hook-form";
import {AccountDeleteForm} from "../../../../../interfaces/dto/forms/account";

const DeleteAccountForm = () => {
    const {isModalOpen, openModal, modalContent, closeModal} = useModal();
    const [showPassword, setShowPassword] = useState(false);

    const togglePwVisibility = () => {
        setShowPassword(!showPassword);
    };

    const mutation = useMutation({
        mutationFn: deleteAccount,
        onSuccess: () => {
            const logoutBc = new BroadcastChannel("session");
            logoutBc.postMessage("logout");
            logoutBc.close();
        },
        onError: (error: ApiErrorDTO) => {
            openModal(<ApiError errorMsg={error.errorMsg} closeModal={closeModal}/>);
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

    return <>
        <Modal content={modalContent} show={isModalOpen} hide={closeModal}/>
        <div className={styles.container}>
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
        </div>
    </>;
};

export default DeleteAccountForm;