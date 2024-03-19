import styles from "./css/UserUpdateForm.module.css";
import useModal from "../../../../../hooks/useModal";
import {getCookie} from "../../../../../functions/web";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateName} from "../../../../../api/locked/user/settings";
import {ApiErrorDTO} from "../../../../../interfaces/dto/api-error";
import {ApiError} from "../../../../layout/modal/GeneralModals";
import {useForm} from "react-hook-form";
import Modal from "../../../../../hooks/Modal";
import {Button, FormError, Input} from "../../../../layout/styled/elements";
import {esCharsRegex} from "../../../../../utils/regex";
import {useState} from "react";
import {CircleIcon} from "../../../../layout/buttons/InteractiveIcons";
import PwVisibilityIcon from "../../../../../resources/icons/pwvisibility.png";
import {NameChangeForm} from "../../../../../interfaces/dto/forms/account";

type Props = {
    hide: () => void;
    revalidate: () => void;
}

const NameForm = (props: Props) => {
    const {isModalOpen, openModal, modalContent, closeModal} = useModal();
    const [showPassword, setShowPassword] = useState(false);
    const queryClient = useQueryClient();

    const togglePwVisibility = () => {
        setShowPassword(!showPassword);
    };

    const mutation = useMutation({
        mutationFn: updateName,
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["user", "data"], refetchType: "all"}, {throwOnError: true});
            props.hide();
            props.revalidate();
        },
        onError: (error: ApiErrorDTO) => {
            openModal(<ApiError errorMsg={error.errorMsg} closeModal={closeModal}/>);
        }
    });

    const {
        register,
        handleSubmit,
        formState: {errors,}
    } = useForm<NameChangeForm>({
        mode: "onBlur",
        reValidateMode: "onBlur",
        defaultValues: {
            name: null,
            password: null
        }
    });

    const onSubmitHandler = (form: NameChangeForm) => {
        mutation.mutate({userId: getCookie("id"), form: form});
    };

    return <>
        <Modal content={modalContent} show={isModalOpen} hide={closeModal}/>
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
                <div className={styles.input}>

                    <Input
                        id={"nameUpdate"}
                        type={"text"}
                        placeholder={"Nombre nuevo"}
                        autoComplete={"new-password"}
                        $textAlign={"center"}
                        $height={"2rem"}
                        $width={"15rem"}
                        $margin={errors.name ? "0 0.5rem 0 1.5rem" : "0 0.5rem 0.5rem 1.5rem"}
                        className={errors.name ? "invalid" : ""}
                        {...register("name", {
                            required: {
                                value: true,
                                message: "El nombre no puede faltar"
                            },
                            pattern: {
                                value: esCharsRegex,
                                message: "Solo se aceptan letras"
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
                    {errors.name && <FormError $margin={"0 0.5rem 0.5rem 1.5rem"}>{errors.name.message}</FormError>}

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

export default NameForm;