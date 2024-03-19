import styles from "./css/ProductFormatMenu.module.css";
import {RoundButton} from "../../layout/styled/elements";

type Props = {
    formats: string[];
    formatHandlers: (() => void)[];
}

const ProductFormatMenu = (props: Props) => {

    return <div className={styles.format}>
        {props.formats.map((format, index) =>
            <RoundButton $width={"7rem"} $height={"2rem"} key={index} onClick={() => {
                props.formatHandlers[index]();
            }}>
                {format}
            </RoundButton>)}
    </div>;
};

export default ProductFormatMenu;