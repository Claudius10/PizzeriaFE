import styles from "./css/AnonClientForm.module.css";
import {useFormContext} from "react-hook-form";
import {FormError, Input, Required} from "../../../../layout/styled/elements";
import {emailRgx, esCharsRegex, numbersRegex} from "../../../../../utils/regex";
import {getAnonCustomerErrors} from "../../../../../functions/form";

const AnonClientForm = () => {
    const form = useFormContext();
    const errors = getAnonCustomerErrors(form.formState.errors);

    let width = "fit-content";
    if (window.screen.width < 550) {
        width = "16rem";
    }

    return <div className={styles.container}>
        <div className={styles.header}>
            <h1>Datos del cliente</h1>
        </div>

        <label className={styles.label} htmlFor={"customerName"}>
            Nombre y Apellido(s)<Required>*</Required>
        </label>
        <Input
            id={"customerName"}
            type={"text"}
            placeholder={"Miguel de Cervantes"}
            autoComplete={"new-password"}
            $height={"2rem"}
            $width={"100%"}
            $padding={"0 0 0 0.5rem"}
            className={errors.anonCustomerNameError ? "invalid" : ""}
            {...form.register("anonCustomerName", {
                required: {
                    value: true,
                    message: "El nombre y apellido(s) no puede faltar"
                },
                pattern: {
                    value: esCharsRegex,
                    message:
                        "El nombre/apellido ha de ser constituido solo por letras",
                },
                minLength: {
                    value: 2,
                    message: "Mínimo dos letras"
                },
                maxLength: {
                    value: 50,
                    message: "Máximo cincuenta letras"
                },
            })}
        />
        {errors.anonCustomerNameError &&
            <FormError>{errors.anonCustomerNameError.message}</FormError>}
        <FormError $color={"#a9004f"} $width={width}>Recomendación: introducir nombre ficticio. Ejemplo:
            Don Quijote</FormError>

        <label className={styles.label} htmlFor={"contactTel"}>
            Teléfono de contacto<Required>*</Required>
        </label>
        <Input
            id={"contactTel"}
            type={"number"}
            placeholder={"123456789"}
            autoComplete={"new-password"}
            $height={"2rem"}
            $width={"100%"}
            $padding={"0 0 0 0.5rem"}
            className={errors.anonCustomerContactNumberError ? "invalid" : ""}
            {...form.register("anonCustomerContactNumber", {
                required: {
                    value: true,
                    message: "El teléfono de contacto no puede faltar"
                },
                pattern: {
                    value: numbersRegex,
                    message: "El teléfono ha de ser constituido solo por dígitos",
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
        {errors.anonCustomerContactNumberError &&
            <FormError>{errors.anonCustomerContactNumberError.message}</FormError>}
        <FormError $color={"#a9004f"} $width={width}>Recomendación: introducir número ficticio. Ejemplo:
            123456789</FormError>

        <label className={styles.label} htmlFor={"email"}>
            Correo electrónico<Required>*</Required>
        </label>
        <Input
            id={"email"}
            type={"text"}
            placeholder={"correoelectronico@gmail.es"}
            autoComplete={"new-password"}
            $height={"2rem"}
            $width={"100%"}
            $padding={"0 0 0 0.5rem"}
            className={errors.anonCustomerEmailError ? "invalid" : ""}
            {...form.register("anonCustomerEmail", {
                required: {
                    value: true,
                    message: "El email no puede faltar"
                },
                pattern: {
                    value: emailRgx,
                    message: "Compruebe el email introducido",
                },
            })}
        />
        {errors.anonCustomerEmailError &&
            <FormError>{errors.anonCustomerEmailError.message}</FormError>}
        <FormError $color={"#a9004f"} $margin={"0 0 0.5rem 0"} $width={width}>Recomendación: introducir email
            ficticio. Ejemplo:
            marco.polo@yahoo.es</FormError>
    </div>;
};

export default AnonClientForm;