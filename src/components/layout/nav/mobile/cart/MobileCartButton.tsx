import styles from "./MobileCartButton.module.css";
import {useAppSelector} from "../../../../../store/hooks";
import {useEffect, useState} from "react";
import Icon from "../../../../layout/icon/Icon";
import cartIcon from "../../../../../resources/icons/icons8-cart-100.png";
import {Badge} from "@mantine/core";

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

    return <div onClick={props.action} className={`${styles.button} ${cartQChanged ? styles.bump : ""}`}>
        <Icon src={cartIcon} height="30px" width="30px"/>
        <Badge size="md" color="#a9004f" circle>{cartQuantity}</Badge>
    </div>;
};

export default MobileCartButton;
