import styles from "./css/AddressItem.module.css";
import {Button} from "../../../layout/styled/elements";
import {AddressDTO} from "../../../../interfaces/dto/order";

type Props = {
    address: AddressDTO;
    onDelete: (addressId: number) => void;
}

const addressItem = (props: Props) => {
    const deleteById = () => {
        props.onDelete(props.address.id);
    };

    return <div className={styles.container}>
        <div className={styles.data}>

            <p className={styles.text}>
                Calle:
                <span className={styles.value}>
                    {props.address.street}
                </span>
            </p>

            <p className={styles.text}>
                Número:
                <span className={styles.value}>{props.address.streetNr}</span>
            </p>

            {props.address.gate && (
                <p className={styles.text}>
                    Portal:
                    <span className={styles.value}>{props.address.gate}</span>
                </p>
            )}

            {props.address.staircase && (
                <p className={styles.text}>
                    Escalera:
                    <span className={styles.value}>{props.address.staircase}</span>
                </p>
            )}

            {props.address.floor && (
                <p className={styles.text}>
                    Piso:
                    <span className={styles.value}>{props.address.floor}</span>
                </p>
            )}

            {props.address.door && (
                <p className={styles.text}>
                    Puerta:
                    <span className={styles.value}>{props.address.door}</span>
                </p>
            )}
        </div>

        <div className={styles["address-bttn"]}>
            <Button type={"button"} onClick={deleteById}>Borrar</Button>
        </div>
    </div>;
};

export default addressItem;