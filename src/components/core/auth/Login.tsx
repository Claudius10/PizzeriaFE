import styles from "./Login.module.css";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {loginFn} from "../../../api/open/auth";
import {emailRgx} from "../../../utils/regex";
import {Button, FormError, Input} from "../../layout/styled/elements";
import {CircleIcon} from "../../layout/buttons/InteractiveIcons";
import PwVisibilityIcon from "../../../resources/icons/pwvisibility.png";
import {LoginForm} from "../../../interfaces/dto/forms/account";
import {clearSessionStorageForm} from "../orders/forms/FormSessionStorageUtils";
import {modals} from "@mantine/modals";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const togglePwVisibility = () => {
        setShowPassword(!showPassword);
    };

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<LoginForm>({
        mode: "onBlur",
        reValidateMode: "onBlur",
        defaultValues: {
            email: null,
            password: null
        }
    });

    const login = useMutation({
        mutationFn: loginFn,
        onSuccess: () => {
            clearSessionStorageForm();
            navigate("/menu/pizzas");
        },
        onError: (error: string) => {
            modals.openContextModal({
                modal: "agree",
                title: "Error",
                innerProps: {
                    modalBody: error
                }
            });
        },
        retry: 1
    });

    const onSubmitHandler = (form: LoginForm) => {
        login.mutate(form);
    };

    const formJSX = (
        <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
            <div className={styles.input}>

                <Input
                    id={"email"}
                    type={"text"}
                    placeholder={"Correo electrónico"}
                    autoComplete={"email"}
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
                            message: "Compruebe el email introducido"
                        }
                    })}
                />
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
                        $margin={"0 0.5rem 0 1.5rem"}
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
                    />
                </div>
                {errors.password && <FormError $margin={"0 0.5rem 0 1.5rem"}>{errors.password.message}</FormError>}

            </div>
            <Button type={"submit"} $margin={errors.password ? "1rem 0 0 0" : "1.5rem 0 0 0"}
                    $color={Object.keys(errors).length === 0 ? "#a9004f" : "rgb(199, 30, 30)"}>Continuar</Button>
        </form>
    );

    return <div className={styles.layout}>
        <p className={styles.header}>Iniciar sesión</p>
        {formJSX}
        <div className={styles.register}>
            <p>¿Aún no tienes cuenta?</p>
            <NavLink className={styles.link} to={"/registracion-usuario"}>Regístrate aquí</NavLink>
        </div>
    </div>;
};

export default Login;