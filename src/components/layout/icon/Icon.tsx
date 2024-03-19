import {IconImg} from "../styled/elements";

type Props = {
    src: string;
    height?: string;
    width?: string;
}

const Icon = (props: Props) => {
    return <IconImg
        src={props.src}
        alt="mobile-icon"
        $height={props.height}
        $width={props.width}
    />;
};

export default Icon;
