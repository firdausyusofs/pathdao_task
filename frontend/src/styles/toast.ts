import styled from "styled-components";

export const ToastDiv = styled.div.attrs((props: {isError: boolean, isShowing: boolean}) => props)`
    // width: 30%;
    padding: 20px 30px;
    background: ${props => props.isError ? `#ff0038` : `#00ff7f`};
    position: fixed;
    top: ${props => props.isShowing ? '20px' : '-60px'};
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    border-radius: 8px;
    transition: all 0.25s ease-in-out;

    p {
        font-size: 0.9em;
        font-weight: 600;
        color: ${props => props.isError ? '#fff' : '#333'};
    }
`;