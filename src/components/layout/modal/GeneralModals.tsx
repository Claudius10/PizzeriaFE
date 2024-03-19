import {Button, RedirectWrapper} from "../styled/elements";
import {Modal, ModalText} from "../styled/elements";
import {NavLink} from "react-router-dom";

type Props = {
    closeModal: () => void;
    errorMsg?: string;
    redirectTo?: string;
}

export const OnSuccessfulRegistration = (props: Props) => {
    return <Modal>
        <ModalText>Registración completa.</ModalText>
        <RedirectWrapper>
            <NavLink to={props.redirectTo ? props.redirectTo : "/menu/pizzas"} onClick={props.closeModal}>
                Sí
            </NavLink>
        </RedirectWrapper>
    </Modal>;
};

export const ApiError = (props: Props) => {
    const message = props.errorMsg ? <ModalText>{props.errorMsg}</ModalText> : <ModalText>
        Ocurrió un error. Por favor inténtelo más tarde o contacte con nosotros.
    </ModalText>;

    return <Modal>
        {message}
        <Button onClick={props.closeModal}>Continuar</Button>
    </Modal>;
};

export const SessionExpiredModal = (props: Props) => {
    return <Modal>
        <ModalText>La sesión ha caducado. Por favor, reinicie la sesión.</ModalText>
        <RedirectWrapper>
            <NavLink to={props.redirectTo ? props.redirectTo : "/iniciar-sesion"} onClick={props.closeModal}>
                Continuar
            </NavLink>
        </RedirectWrapper>
    </Modal>;
};

export const DeliveryHoursRefreshModal = (props: Props) => {
    return <Modal>
        <ModalText>
            La franja de horas disponible para entrega ha sido actualizada debido a ausencia de actividad en los últimos
            5 minutos.
        </ModalText>
        <Button type={"button"} onClick={props.closeModal}>Ok</Button>
    </Modal>;
};