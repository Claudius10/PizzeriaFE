import styles from "./Settings.module.css";
import {useMutation} from "@tanstack/react-query";
import {Button, Prompt} from "../../../layout/styled/elements";
import {logoutFn} from "../../../../api/open/auth";
import {useState} from "react";
import NewPasswordForm from "./forms/NewPasswordForm";
import DeleteAccountForm from "./forms/DeleteAccountForm";
import {useNavigate} from "react-router-dom";

type FormState = {
    showPasswordForm: boolean;
    showAccountDeleteForm: boolean;
}

const Settings = () => {
    const navigate = useNavigate();
    const [formState, setFormState] = useState<FormState>({
        showPasswordForm: false,
        showAccountDeleteForm: false
    });

    const toggleNewPasswordForm = () => {
        setFormState({...formState, showPasswordForm: !formState.showPasswordForm});
    };

    const toggleDeleteAccountForm = () => {
        setFormState({...formState, showAccountDeleteForm: !formState.showAccountDeleteForm});
    };

    const logout = useMutation({
        mutationFn: logoutFn,
        onSuccess: () => {
            const logoutBc = new BroadcastChannel("session");
            logoutBc.postMessage("logout");
            logoutBc.close();
            navigate("/");
        },
        retry: 1
    });

    const logoutHandler = () => {
        logout.mutate();
    };

    return <div className={styles.layout}>

        <div className={styles.container}>
            <Prompt>¡Hasta la próxima!</Prompt>
            <Button $width={"13rem"} $margin={"0.5rem 0 0 0"} $padding={"0.3rem 0.3rem"} onClick={logoutHandler}>Terminar
                sesión</Button>
        </div>

        <div className={styles.container}>
            <Prompt>Más vale prevenir que lamentar...</Prompt>
            <div className={styles.section}>
                <Button $width={"13rem"} $margin={"0.5rem 0 0 0"} $padding={"0.3rem 0.3rem"}
                        onClick={toggleNewPasswordForm}>Cambiar
                    contraseña</Button>
                {formState.showPasswordForm && <NewPasswordForm/>}
            </div>
        </div>

        <div className={styles.container}>
            <Prompt>Tu cuenta, tu elección.</Prompt>
            <div className={styles.section}>
                <Button $width={"13rem"} $margin={"0.5rem 0 0 0"} $padding={"0.3rem 0.3rem"}
                        onClick={toggleDeleteAccountForm}>Borrar
                    cuenta</Button>
                {formState.showAccountDeleteForm && <DeleteAccountForm/>}
            </div>
        </div>
    </div>;
};

export default Settings;