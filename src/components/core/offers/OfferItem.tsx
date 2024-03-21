import styles from "../offers/css/OfferItem.module.css";
import ProgressiveImage from "../../layout/ProgressiveImg/ProgressiveImage";
import {OfferDTO} from "../../../interfaces/dto/resources";
import ExtraInfo from "../../layout/ExtraInfo/ExtraInfo";
import {OfferItemTitle} from "../../layout/ExtraInfo/ExtraInfoContents";
import offerPicture from "../../../resources/imgs/special-offer.png";

type Props = {
    offer: OfferDTO;
}

const OfferItem = ({offer}: Props) => {
    return <div className={styles["offer-container"]}>
        <div className={styles["img-container"]}>
            <ProgressiveImage src={offerPicture} width={"100%"} height={"100%"}/>
        </div>

        <div className={styles["offer-info"]}>
            <div className={styles["offer-title"]}>{offer.name}</div>
            <div className={styles.desc}>{offer.description}</div>
            <ExtraInfo title={OfferItemTitle} info={offer.caveat} open={false}/>
        </div>
    </div>;
};

export default OfferItem;
