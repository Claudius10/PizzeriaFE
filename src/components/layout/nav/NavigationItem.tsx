import styles from "./css/NavigationItem.module.css";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import Icon from "../icon/Icon";

type Props = {
    title: string;
    icon: string;
    linkTo: string;
    width?: string;
    height?: string;
}

const NavigationItem = (props: Props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = location.pathname === props.linkTo;

    const navigateTo = () => {
        navigate(props.linkTo);
    };

    return <div className={styles.container} onClick={navigateTo}>
        <div className={isActive ? styles.iconActive : styles.iconPending}>
            <Icon src={props.icon} width={props.width} height={props.height}/>
        </div>
        <NavLink to={props.linkTo} className={({isActive, isPending}) =>
            isPending ? `${styles.pending}` : isActive ? `${styles.active}` : `${styles.pending}`}>{props.title}</NavLink>
    </div>;
};

export default NavigationItem;