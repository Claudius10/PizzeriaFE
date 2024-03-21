import styles from "../offers/css/OffersList.module.css";
import OfferItem from "./OfferItem";
import {OfferDTO} from "../../../interfaces/dto/resources";

type Properties = {
    offers: OfferDTO[];
}

const OffersList = (props: Properties) => {
    return <ul className={styles["offers-list"]}>
        {props.offers.map((offer) => (
            <li key={offer.id}>
                <OfferItem offer={offer}/>
            </li>
        ))}
    </ul>;
};

export default OffersList;
