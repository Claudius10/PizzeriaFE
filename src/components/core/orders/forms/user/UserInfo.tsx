import styles from "./css/ClientForm.module.css";
import gearIcon from "../../../../../resources/icons/gear.png";
import {useNavigate} from "react-router-dom";
import {CircleIcon} from "../../../../layout/buttons/InteractiveIcons";
import {UserDataDTO} from "../../../../../interfaces/dto/user";

type Props = {
    user: UserDataDTO
}

const UserInfo = (props: Props) => {
    const navigate = useNavigate();

    const navToProfile = () => {
        navigate("/perfil");
    };

    return <div className={styles.container}>
        <div className={styles.header}>
            <h1>Datos del cliente</h1>
            <CircleIcon action={navToProfile} icon={gearIcon} height={"14px"} width={"14px"}/>
        </div>

        <div className={styles.fields}>
            <p className={styles.text}>Nombre:
                <span className={styles.value}>{props.user.name}</span></p>

            <p className={styles.text}>Correo electrónico:
                <span className={styles.value}>{props.user.email}</span>
            </p>

            <p className={styles.text}>Teléfono de contacto:
                <span className={styles.value}>{props.user.contactNumber}</span>
            </p>
        </div>
    </div>;
};

export default UserInfo;