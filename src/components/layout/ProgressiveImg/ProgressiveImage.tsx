import placeholder2 from "../../../resources/icons/placeholder2.jpg";
import styles from "./ProgressiveImage.module.css";
import {useState, useEffect} from "react";

type Props = {
    src: string;
    height: string;
    width: string;
}

const ProgressiveImage = (props: Props) => {
    const [image, setImage] = useState<string>(placeholder2);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // start loading actual image
        const loadingImage = new Image();
        loadingImage.src = props.src;
        loadingImage.onload = () => {
            // when loaded replace placeholder with actual image
            setImage(props.src);
            setLoading(false);
        };
    }, [props.src]);

    return (
        <img
            src={image}
            className={styles[`${loading ? "img-loading" : "img-loaded"}`]}
            alt=""
            height={props.height}
            width={props.width}
        />
    );
};

export default ProgressiveImage;
