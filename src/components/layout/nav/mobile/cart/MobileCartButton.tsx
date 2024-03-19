import styles from "./MobileCartButton.module.css";
import {useAppSelector} from "../../../../../store/hooks";
import {useEffect, useState} from "react";
import Icon from "../../../../layout/icon/Icon";
import cartIcon from "../../../../../resources/icons/icons8-cart-100.png";

interface Props {
    action: () => void;
}

const MobileCartButton = (props: Props) => {
    const cartQuantity = useAppSelector(state => state.order.cartQuantity);
    const [cartQChanged, setCartQChanged] = useState<boolean>(false);

    useEffect(() => {
        if (cartQuantity === 0) {
            return;
        }

        setCartQChanged(true);

        const timer = setTimeout(() => {
            setCartQChanged(false);
        }, 300);


        return () => {
            clearTimeout(timer);
        };
    }, [cartQuantity]);

    return <button
        type="button"
        onClick={props.action}
        className={`${styles.button} ${cartQChanged ? styles.bump : ""}`}>
        <Icon src={cartIcon} height="36px" width="auto"/>
        <span className={styles.badge}>{cartQuantity}</span>
    </button>;
};

export default MobileCartButton;
