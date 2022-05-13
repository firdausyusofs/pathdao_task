import React from "react";
import { useMutation } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastDiv } from "../styles/toast";


interface IToastProps {
    message: string;
    isError: boolean;
    isShowing: boolean;
};

const Toast: React.FunctionComponent<IToastProps> = props => {
    return (
        <ToastDiv isError={props.isError} isShowing={props.isShowing}>
            <p>{props.message}</p>
        </ToastDiv>
    );
}

export default Toast;