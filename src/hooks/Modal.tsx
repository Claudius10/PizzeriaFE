import styles from "./css/Modal.module.css";
import ReactDOM from "react-dom";
import React, {useEffect, useCallback} from "react";

interface Props {
    content: React.ReactElement | null;
    show: boolean;
    hide: () => void;
}

const Modal = (props: Props) => {
    // hide modal on "Esc" key
    const onKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === "Escape" && props.show) {
                props.hide();
            }
        },
        [props]
    );

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown, false);
        return () => {
            document.removeEventListener("keydown", onKeyDown, false);
        };
    }, [props.show, onKeyDown]);

    const portalElement: HTMLElement = document.getElementById("modal")!;
    const backdrop = <div className={styles.backdrop} onClick={props.hide}/>;
    const modalOverlay = <div className={styles.modal}>{props.content}</div>;

    const modal = (
        <>
            {backdrop}
            {modalOverlay}
        </>
    );
    return props.show ? ReactDOM.createPortal(modal, portalElement) : null;
};

export default Modal;
