import styles from "./css/Footer.module.css";
import React from "react";
import githubIcon from "../../../resources/icons/tech/github-mark-white.png";
import tsIcon from "../../../resources/icons/tech/ts-logo-128.png";
import reactIcon from "../../../resources/icons/tech/React-icon.svg.png";
import railwayIcon from "../../../resources/icons/tech/railway-logo-dark.png";
import routerIcon from "../../../resources/icons/tech/react-router-mark-color-inverted.png";
import hookFormIcon from "../../../resources/icons/tech/react-hook-form-logo-only.png";
import reduxIcon from "../../../resources/icons/tech/Redux.png";
import queryIcon from "../../../resources/icons/tech/72518640.png";
import eslintIcon from "../../../resources/icons/tech/eslint.png";
import styledCompIcons from "../../../resources/icons/tech/styled-components.png";
import {RectangleIcon} from "../buttons/InteractiveIcons";
import {NavLink} from "react-router-dom";
import {Group} from "@mantine/core";

const Footer = () => {
    return <footer className={styles.footer}>
        <div className={styles.inner}>
            <div className={styles.icons}>
                <p>Powered by</p>
                <RectangleIcon icon={tsIcon} linkTo={"https://www.typescriptlang.org/"} height={"1.2rem"}/>
                <RectangleIcon icon={reactIcon} linkTo={"https://react.dev/"} height={"1.2rem"}/>
                <RectangleIcon icon={routerIcon} linkTo={"https://reactrouter.com/en/main"} height={"1.2rem"}/>
                <RectangleIcon icon={hookFormIcon} linkTo={"https://www.react-hook-form.com/"} height={"1.2rem"}/>
                <RectangleIcon icon={queryIcon} linkTo={"https://tanstack.com/query/latest"} height={"1.2rem"}/>
                <RectangleIcon icon={reduxIcon} linkTo={"https://react-redux.js.org/"} height={"1.2rem"}/>
                <RectangleIcon icon={styledCompIcons} linkTo={"https://styled-components.com/"} height={"1.2rem"}/>
                <RectangleIcon icon={eslintIcon} linkTo={"https://eslint.org/"} height={"1.2rem"}/>
                <RectangleIcon icon={railwayIcon} linkTo={"https://railway.app?referralCode=MZ_nxf/"} height={"1.2rem"}/>
                <Group>
                    <p className={styles.iconProvider}>Icons by <NavLink to={"https://icons8.com/"}>Icons8</NavLink></p>
                    <p className={styles.iconProvider}>Hosted on <NavLink to={"https://railway.app?referralCode=MZ_nxf"}>Railway</NavLink></p>
                </Group>
            </div>
            <div className={styles.details}>
                <p className={styles.iconProviderMobile}>Icons by <NavLink to={"https://icons8.com/"}>Icons8</NavLink>
                </p>
                <RectangleIcon icon={githubIcon} linkTo={"https://github.com/Claudius10"} height={"1.2rem"}/>
            </div>
        </div>
    </footer>;
};

export default React.memo(Footer);
