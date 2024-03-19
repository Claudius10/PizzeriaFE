import {Modal, RedirectWrapper, ModalText} from "../styled/elements";
import {NavLink} from "react-router-dom";

type Props = {
    closeModal: () => void;
    redirectTo?: string;
    errorMsg?: string;
    id?: number | string;
}

export const OnUserEmailUpdate = (props: Props) => {
    return <Modal>
        <ModalText>Email actualizado con éxito. La sesión ha de ser reiniciada.</ModalText>
        <RedirectWrapper>
            <NavLink to={props.redirectTo ? props.redirectTo : "/iniciar-sesion"} onClick={props.closeModal}>
                Continuar
            </NavLink>
        </RedirectWrapper>
    </Modal>;
};


export const OnUserPasswordUpdate = (props: Props) => {
    return <Modal>
        <ModalText>Contraseña actualizada con éxito. La sesión ha de ser reiniciada.</ModalText>
        <RedirectWrapper>
            <NavLink to={props.redirectTo ? props.redirectTo : "/iniciar-sesion"} onClick={props.closeModal}>
                Continuar
            </NavLink>
        </RedirectWrapper>
    </Modal>;
};

export const OnUserAccountDelete = (props: Props) => {
    return <Modal>
        <ModalText>Cuenta borrada con éxito.</ModalText>
        <RedirectWrapper>
            <NavLink to={props.redirectTo ? props.redirectTo : "/"} onClick={props.closeModal}>
                Continuar
            </NavLink>
        </RedirectWrapper>
    </Modal>;
};
