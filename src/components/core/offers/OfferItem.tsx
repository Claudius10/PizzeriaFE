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
    // eslint-disable-next-line react/react-in-jsx-scope
    return <div className={styles["offer-container"]}>
        {/* Image */}
        <div className={styles["img-container"]}>
            <ProgressiveImage src={offerPicture} width={"100%"} height={"100%"}/>
        </div>

        <div className={styles["offer-info"]}>
            {/* Title */}
            <div className={styles["offer-title"]}>{offer.name}</div>

            {/* Description */}
            <div className={styles.desc}>{offer.description}</div>

            {/* the catch */}
            <ExtraInfo title={OfferItemTitle} info={offer.caveat} open={false}/>
        </div>
    </div>;
};

export default OfferItem;
