import {NavLink} from "react-router-dom";
import {ModalText, Modal, Button, ModalButtonGroup, RedirectWrapper} from "../styled/elements";

type Props = {
    closeModal: () => void;
    redirectTo?: string;
    errorMsg?: string;
    id?: number | string;
}

export const OnError = (props: Props) => {
    const message = props.errorMsg ? props.errorMsg :
        "No ha sido posible crear su pedido. Por favor inténtelo más tarde o contacte con nosotros.";

    return <Modal>
        <ModalText>{message}</ModalText>
        <Button onClick={props.closeModal}> Continuar</Button>
    </Modal>;
};

export const OnCancelOrder = (props: Props) => {
    return <Modal>
        <ModalText>¿Desea proceder con la cancelación del pedido?</ModalText>
        <ModalButtonGroup>
            <Button $width={"3rem"} onClick={props.closeModal}>No</Button>
            <RedirectWrapper $width={"2.2rem"}>
                <NavLink to={props.redirectTo ? props.redirectTo : "/menu/pizzas"} onClick={props.closeModal}>
                    Sí
                </NavLink>
            </RedirectWrapper>
        </ModalButtonGroup>
    </Modal>;
};

export const OnAnonOrderSuccess = (props: Props) => {
    return <Modal>
        <ModalText>Pedido {props.id} confirmado. Registrate y tendrás acceso al historial de pedidos en donde podrás
            comprobar y actualizar tu pedido.</ModalText>
        <RedirectWrapper>
            <NavLink to={props.redirectTo ? props.redirectTo : "/menu/pizzas"} onClick={props.closeModal}>
                Continuar
            </NavLink>
        </RedirectWrapper>
    </Modal>;
};

export const OnUserOrderSuccess = (props: Props) => {
    return <Modal>
        <ModalText>Pedido {props.id} confirmado</ModalText>
        <RedirectWrapper>
            <NavLink to={props.redirectTo ? props.redirectTo : "/menu/pizzas"} onClick={props.closeModal}>
                Continuar
            </NavLink>
        </RedirectWrapper>
    </Modal>;
};

export const OnDeleteSuccess = (props: Props) => {
    return <Modal>
        <ModalText>Pedido {props.id} anulado con éxito.</ModalText>
        <RedirectWrapper>
            <NavLink to={props.redirectTo ? props.redirectTo : "/perfil/pedido/historial?pageSize=5&pageNumber=1"}
                     onClick={props.closeModal}>
                Continuar
            </NavLink>
        </RedirectWrapper>
    </Modal>;
};

export const OnOrderUpdateSuccess = (props: Props) => {
    return <Modal>
        <ModalText>Pedido {props.id} actualizado con éxito</ModalText>
        <RedirectWrapper>
            <NavLink to={props.redirectTo ? props.redirectTo : `/perfil/pedido/historial/${props.id}`}
                     onClick={props.closeModal}>
                Continuar
            </NavLink>
        </RedirectWrapper>
    </Modal>;
};

export const OnCartUpdateNotValid = (props: Props) => {
    return <Modal>
        <ModalText>La cesta ya no puede modificarse debido a la superación del tiempo límite (10 min.).</ModalText>
        <ModalText>Los demás cambios se realizarán correctamente.</ModalText>
        <ModalText>¿Desea continuar?</ModalText>
        <ModalButtonGroup>
            <Button onClick={props.closeModal}>No</Button>
            <RedirectWrapper>
                <NavLink to={props.redirectTo ? props.redirectTo : `actualizacion`} onClick={props.closeModal}>
                    Sí
                </NavLink>
            </RedirectWrapper>
        </ModalButtonGroup>
    </Modal>;
};

export const OnOrderUpdateNotValid = (props: Props) => {
    return <Modal>
        <ModalText>El pedido ya no puede modificarse debido a la superación del tiempo límite (15 min.)</ModalText>
        <Button onClick={props.closeModal}>Continuar</Button>
    </Modal>;
};

export const OnOrderDeleteNotValid = (props: Props) => {
    return <Modal>
        <ModalText>El pedido ya no puede anularse debido a la superación del tiempo límite (20 min.)</ModalText>
        <Button onClick={props.closeModal}>Continuar</Button>
    </Modal>;
};