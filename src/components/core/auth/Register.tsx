import styles from "./Register.module.css";
import {useState} from "react";
import useModal from "../../../hooks/useModal";
import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import {registerFn} from "../../../api/open/anon";
import {ApiError, OnSuccessfulRegistration} from "../../layout/modal/GeneralModals";
import {ApiErrorDTO} from "../../../interfaces/dto/api-error";
import {emailRgx, esCharsRegex, passwordRegex} from "../../../utils/regex";
import {Button, FormError, Input} from "../../layout/styled/elements";
import {CircleIcon} from "../../layout/buttons/InteractiveIcons";
import PwVisibilityIcon from "../../../resources/icons/pwvisibility.png";
import {NavLink} from "react-router-dom";
import Modal from "../../../hooks/Modal";
import {RegisterForm} from "../../../interfaces/dto/forms/account";

const Register = () => {
    const {isModalOpen, modalContent, openModal, closeModal} = useModal();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<RegisterForm>({
        mode: "onBlur",
        reValidateMode: "onBlur",
        defaultValues: {
            name: null,
            email: null,
            matchingEmail: null,
            password: null,
            matchingPassword: null
        }
    });

    const registration = useMutation({
        mutationFn: registerFn,
        onSuccess: () => {
            openModal(<OnSuccessfulRegistration redirectTo={"/menu/pizzas"} closeModal={closeModal}/>);
        },
        onError: (error: ApiErrorDTO) => {
            openModal(<ApiError errorMsg={error.errorMsg} closeModal={closeModal}/>);
        }
    });

    const togglePwVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmitHandler = (form: RegisterForm) => {
        registration.mutate(form);
    };

    const formJSX = (
        <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
            <div className={styles.input}>

                <Input
                    id={"name"}
                    type={"text"}
                    placeholder={"Nombre y apellido(s)"}
                    autoComplete={"new-password"}
                    $textAlign={"center"}
                    $height={"2rem"}
                    $width={"15rem"}
                    $margin={errors.name ? "0 0.5rem 0 1.5rem" : "0 0.5rem 1rem 1.5rem"}
                    className={errors.name ? "invalid" : ""}
                    {...register("name", {
                        required: {value: true, message: "El nombre y apellido(s) no puede faltar"},
                        pattern: {
                            value: esCharsRegex,
                            message: "Solo se aceptan letras"
                        },
                        minLength: {
                            value: 2,
                            message: "La longitud mínima del nombre es de 2 caracteres"
                        },
                        maxLength: {
                            value: 50,
                            message: "La longitud máxima del nombre es de 50 caracteres"
                        }
                    })}
                />
                {errors.name && <FormError $margin={"0 0.5rem 0.5rem 1.5rem"}>{errors.name.message}</FormError>}

                <Input
                    id={"email"}
                    type={"email"}
                    placeholder={"Correo electrónico"}
                    autoComplete={"new-password"}
                    $textAlign={"center"}
                    $height={"2rem"}
                    $width={"15rem"}
                    $margin={errors.email ? "0 0.5rem 0 1.5rem" : "0 0.5rem 1rem 1.5rem"}
                    className={errors.email ? "invalid" : ""}
                    {...register("email", {
                        required: {
                            value: true,
                            message: "El email no puede faltar"
                        },
                        pattern: {
                            value: emailRgx,
                            message: "Compruebe el email introducido"
                        },
                        maxLength: {
                            value: 100,
                            message: "La longitud máxima del email es de 100 caracteres"
                        },
                        validate: (value, formValues) => {
                            if (formValues.matchingEmail !== null && value !== formValues.matchingEmail)
                                return "El correo electrónico debe coincidir";
                        },
                    })}
                />
                {errors.email && <FormError $margin={"0 0.5rem 0.5rem 1.5rem"}>{errors.email.message}</FormError>}

                <Input
                    id={"matchingEmail"}
                    type={"email"}
                    placeholder={"Reintroduzca el correo electrónico"}
                    autoComplete={"new-password"}
                    $textAlign={"center"}
                    $height={"2rem"}
                    $width={"15rem"}
                    $margin={errors.matchingEmail ? "0 0.5rem 0 1.5rem" : "0 0.5rem 1rem 1.5rem"}
                    className={errors.matchingEmail ? "invalid" : ""}
                    {...register("matchingEmail", {
                        required: {
                            value: true,
                            message: "El email no puede faltar"
                        },
                        pattern: {
                            value: emailRgx,
                            message: "Compruebe el email introducido"
                        },
                        maxLength: {
                            value: 100,
                            message: "Compruebe el email introducido"
                        },
                        validate: (value, formValues) => {
                            if (formValues.email !== null && value !== formValues.email)
                                return "El correo electrónico debe coincidir";
                        },
                    })}
                />
                {errors.matchingEmail &&
                    <FormError $margin={"0 0.5rem 0.5rem 1.5rem"}>{errors.matchingEmail.message}</FormError>}

                <div className={styles.inputGroup}>
                    <Input
                        id={"password"}
                        type={!showPassword ? "password" : "text"}
                        placeholder={"Contraseña"}
                        autoComplete={"new-password"}
                        $textAlign={"center"}
                        $height={"2rem"}
                        $width={"15rem"}
                        $margin={errors.password ? "0 0.5rem 0 1.5rem" : "0 0.5rem 1rem 1.5rem"}
                        className={errors.password ? "invalid" : ""}
                        {...register("password", {
                            required: {
                                value: true,
                                message: "La contraseña no puede faltar"
                            },
                            pattern: {
                                value: passwordRegex,
                                message: "Mínimo 8 caracteres, una letra mayúscula, una letra minúscula, y un número"
                            },
                            validate: (value, formValues) => {
                                if (formValues.matchingPassword !== null && value !== formValues.matchingPassword)
                                    return "La contraseña debe coincidir";
                            },
                        })}
                    />
                    <CircleIcon
                        action={togglePwVisibility}
                        icon={PwVisibilityIcon}
                        width={"14px"}
                        height={"14px"}
                        margin={errors.password ? "" : "0 0 1rem 0"}
                    />
                </div>
                {errors.password && <FormError $margin={"0 0.5rem 0.5rem 1.5rem"}>{errors.password.message}</FormError>}

                <div className={styles.inputGroup}>
                    <Input
                        id={"matchingPassword"}
                        type={!showPassword ? "password" : "text"}
                        placeholder={"Reintroduzca la contraseña"}
                        autoComplete={"new-password"}
                        $textAlign={"center"}
                        $height={"2rem"}
                        $width={"15rem"}
                        $margin={errors.matchingPassword ? "0 0.5rem 0 1.5rem" : "0 0.5rem 0 1.5rem"}
                        className={errors.matchingPassword ? "invalid" : ""}
                        {...register("matchingPassword", {
                            required: {
                                value: true,
                                message: "La contraseña no puede faltar"
                            },
                            pattern: {
                                value: passwordRegex,
                                message: "Mínimo 8 caracteres, una letra mayúscula, una letra minúscula, y un número"
                            },
                            validate: (value, formValues) => {
                                if (formValues.password !== null && value !== formValues.password)
                                    return "La contraseña debe coincidir";
                            },
                        })}
                    />
                    <CircleIcon
                        action={togglePwVisibility}
                        icon={PwVisibilityIcon}
                        width={"14px"}
                        height={"14px"}
                    />
                </div>
                {errors.matchingPassword &&
                    <FormError $margin={"0 0.5rem 0 1.5rem"}>{errors.matchingPassword.message}</FormError>}

            </div>
            <Button type={"submit"} $margin={errors.matchingPassword ? "1rem 0 0 0" : "1.5rem 0 0 0"}
                    $color={Object.keys(errors).length === 0 ? "#a9004f" : "rgb(199, 30, 30)"}>Continuar</Button>
        </form>
    );

    return <>
        <Modal content={modalContent} show={isModalOpen} hide={closeModal}/>
        <div className={styles.layout}>
            <p className={styles.header}>Crear cuenta</p>
            {formJSX}
            <div className={styles.login}>
                <p>¿Ya tienes una cuenta?</p>
                <NavLink to={"/iniciar-sesion"} className={styles.link}>Inicia sesión</NavLink>
            </div>
        </div>
    </>;
};

export default Register;