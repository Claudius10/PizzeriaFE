import styled from 'styled-components';

export const Button = styled.button<{
    $width?: string,
    $color?: string,
    $margin?: string,
    $textColor?: string,
    $padding?: string
}>`
    height: fit-content;
    width: ${props => props.$width || "fit-content"};
    margin: ${props => props.$margin || ""};
    padding: ${props => props.$padding || "0.2rem 0.3rem"};
    border: 1px solid black;
    color: ${props => props.$textColor || "#e4e6ed"};
    background-color: ${props => props.$color || "#a9004f"};
    text-transform: uppercase;
    font: inherit;
    font-weight: 800;
    outline: inherit;
    cursor: pointer;
    letter-spacing: 0.5px;

    &:disabled {
        background-color: #e4e6ed;
        color: #a9004f;
        cursor: not-allowed;
`;

export const RoundButton = styled.button<{ $width?: string, $height?: string }>`
    height: ${props => props.$height || "fit-content"};
    width: ${props => props.$width || "fit-content"};
    border: 2px solid #a9004f;
    border-radius: 20px;
    color: #c8cad3;
    background-color: transparent;
    text-transform: uppercase;
    font: inherit;
    font-weight: 800;
    outline: inherit;
    cursor: pointer;
    letter-spacing: 1px;

    &:disabled {
        background-color: #e4e6ed;
`;

export const FormError = styled.p<{ $margin?: string }>`
    color: rgb(199, 30, 30);
    font-size: small;
    font-style: italic;
    width: 15rem;
    min-width: 14rem;
    word-break: break-word;
    margin: ${props => props.$margin || ""};
`;

export const Modal = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const ModalText = styled.p`
    color: #e4e6ed;
    font-weight: 800;
    margin-bottom: 1rem;
    text-align: center;
`;

export const ModalButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
`;

export const RedirectWrapper = styled.div<{ $width?: string }>`
    > a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: ${props => props.$width || "fit-content"};
        padding: 0.2rem 0.3rem;
        height: fit-content;
        border: 1px solid black;
        color: #e4e6ed;
        background-color: #a9004f;
        font: inherit;
        font-weight: 800;
        cursor: pointer;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        text-decoration: none;
    }

    > a:link {
        text-decoration: none;
        text-align: center;
        cursor: pointer;
    }

    > a:visited {
        text-decoration: none;
        text-align: center;
        cursor: pointer;
    }
`;

export const IconRoundBackground = styled.button<{ $margin?: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    background-color: #a9004f;
    cursor: pointer;
    margin: ${props => props.$margin || "0"};
`;

export const IconRectangleBackground = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: 1rem;
    background-color: transparent;
    border: none;
`;

export const Input = styled.input<{
    $margin?: string,
    $padding?: string,
    $width?: string,
    $height?: string,
    $textAlign?: string
}>`
    border: 1px solid #a9004f;
    background-color: #292929;
    color: #e4e6ed;
    height: ${props => props.$height || "100"};;
    width: ${props => props.$width || "100"};
    margin: ${props => props.$margin || "0"};
    padding: ${props => props.$padding || "0"};
    text-align: ${props => props.$textAlign || "start"};

    &&.invalid {
        border: 1px solid rgb(199, 30, 30);
    }

    &&:-webkit-autofill {
        box-shadow: 0 0 0 30px #292929 inset;
        -webkit-text-fill-color: #e4e6ed;
        caret-color: #e4e6ed;
    }
`;

export const InputLabel = styled.label<{ $opacity?: string }>`
    color: #e4e6ed;
    font-weight: 800;
    opacity: ${props => props.$opacity || "100"};
`;

export const Select = styled.select<{
    $margin?: string,
    $padding?: string,
    $width?: string,
    $height?: string,
    $textAlign?: string,
    $border?: string;
    $opacity?: string;
}>`
    background-color: #292929;
    color: #e4e6ed;
    border: ${props => props.$border || "1px solid #a9004f"};
    height: ${props => props.$height || "100"};
    width: ${props => props.$width || "100"};
    margin: ${props => props.$margin || "0"};
    padding: ${props => props.$padding || "0"};
    text-align: ${props => props.$textAlign || "start"};
    opacity: ${props => props.$opacity || "100"};
`;

export const Required = styled.span`
    color: #a9004f;
    margin-left: 0.2rem;
`;

export const Prompt = styled.p<{ $fontSize?: string, $margin?: string, $color?: string, $fontFamily?: string }>`
    text-align: center;
    font-family: ${props => props.$fontFamily || "\"Pacifico\", cursive"};
    font-size: ${props => props.$fontSize || "2rem"};;
    color: ${props => props.$color || "#e4e6ed"};
    margin: ${props => props.$margin || "0"};
`;

export const Placeholder = styled.p`
    height: 35rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #e4e6ed;
    font-size: 2rem;
    font-family: "Pacifico", cursive;
`;

export const IconImg = styled.img<{
    $height?: string,
    $width?: string,
    $margin?: string,
    $padding?: string,
}>`
    width: ${props => props.$width || "100%"};
    height: ${props => props.$height || "100%"};
    margin: ${props => props.$margin || ""};
    padding: ${props => props.$padding || ""};
`;