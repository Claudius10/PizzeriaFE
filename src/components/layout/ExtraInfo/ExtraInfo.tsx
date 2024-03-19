import styles from "./ExtraInfo.module.css";
import React, {useState} from "react";

type Properties = {
    title: string;
    info: string | React.ReactElement;
    open: boolean;
}

const ExtraInfo = (props: Properties) => {
    const [showExtraInfo, setShowExtraInfo] = useState<boolean>(props.open);

    const toggleExtraInfoHandler = () => {
        setShowExtraInfo(!showExtraInfo);
    };

    return <div className={styles.container}>
        <p className={styles.extra}>
            <button onClick={toggleExtraInfoHandler} className={styles.button}>
                {props.title}
            </button>
        </p>
        {showExtraInfo && <div className={styles.text}>{props.info}</div>}
    </div>;
};

export default ExtraInfo;
