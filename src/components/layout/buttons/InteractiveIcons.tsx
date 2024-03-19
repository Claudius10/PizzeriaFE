import Icon from "../icon/Icon";
import {IconRectangleBackground, IconRoundBackground} from "../styled/elements";
import {NavLink, useNavigate} from "react-router-dom";

type Props = {
    action?: () => void;
    icon: string;
    height?: string;
    width?: string;
    margin?: string;
    linkTo?: string;
}

export const CircleIcon = (props: Props) => {
    return <IconRoundBackground
        type="button"
        onClick={props.action}
        $margin={props.margin && props.margin}>
        <Icon src={props.icon} height={props.height} width={props.width}/>
    </IconRoundBackground>;
};

export const RectangleIcon = (props: Props) => {
    return <NavLink to={props.linkTo!}>
        <IconRectangleBackground>
            <Icon src={props.icon} height={props.height} width={props.width}/>
        </IconRectangleBackground>
    </NavLink>;
};