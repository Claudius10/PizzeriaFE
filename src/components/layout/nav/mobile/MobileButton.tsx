import Icon from "../../../layout/icon/Icon";
import styles from "./MobileButton.module.css";

type Props = {
    name: string;
    action: () => void;
    icon: string;
    height: string;
    width: string;
}

const MobileButton = (props: Props) => {
    return (
        <button
            type="button"
            className={styles.button}
            onClick={props.action}>
            <Icon src={props.icon} height={props.height} width={props.width}/>
        </button>
    );
};

export default MobileButton;
