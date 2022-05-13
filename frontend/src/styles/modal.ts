import styled from "styled-components";

export const ModalWrapper = styled.div`

`;

export const ModalOverlay = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 500;
    top: 0;
    background: rgba(0,0,0,.4);
`;

export const ModalHolder = styled.div`
    width: 30%;
    // height: 50%;
    position: absolute;
    background: #fff;
    z-index: 1000;
    top: 50%;
    border-radius: 10px;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 40px;

    button {
        cursor: pointer;
        margin-top: 20px;
        width :100%;
        padding: 15px;
        border: none;
        border-radius: 10px;
        font-size: 0.9em;
        font-weight: 700;
        color: #333;
    }
`;

export const ProviderList = styled.div`
    margin-top: 40px;
`;

export const Provider = styled.div`
    display: flex;
    align-items: center;
    padding: 15px 20px;
    margin-bottom: 20px;
    border-radius: 5px;
    background-color: rgb(249, 249, 251);
    border: 1px solid rgba(224, 224, 225, 0.7);
    transition: background 0.25s ease-in-out;
    cursor: pointer;

    &:hover {
        background: rgba(224, 224, 225, 0.4);
    }

    img {
        width: 40px;
        margin-right: 20px;
        // box-shadow: 0 5px 10px rgba(0,0,0,.15);
        border-radius: 100%;
    }

    p {
        font-size: 0.9em;
        font-weight: 700;
        color: #333;
    }
`