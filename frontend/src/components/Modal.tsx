import React from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { AppContext } from "../utils/Context";
import { ModalHolder, ModalOverlay, ModalWrapper, ProviderList, Provider } from "../styles/modal";

import googleLogo from "../assets/google.svg";
import githubLogo from "../assets/github.svg";
import discordLogo from "../assets/discord.svg";
import facebookLogo from "../assets/facebook.svg";

interface IProvider {
    google: boolean;
    facebook: boolean;
    github: boolean;
    discord: boolean
}

interface IModalProps  {
    onClose: VoidFunction;
    providers: IProvider;
};

const Modal: React.FunctionComponent<IModalProps> = props => {
    const handleConnect = (provider: string) => {
        window.location.href = "http://localhost:4000/api/v1/connect/"+provider
    }
    return (
        <ModalWrapper>
            <ModalOverlay />
            <ModalHolder>
                <h1>Add social account</h1>
                <ProviderList>
                    {props.providers.google && (
                        <Provider onClick={() => handleConnect("google")}>
                            <img src={googleLogo} />
                            <p>Google</p>
                        </Provider>
                    )}
                    {props.providers.github && (
                        <Provider onClick={() => handleConnect("github")}>
                            <img src={githubLogo} />
                            <p>Github</p>
                        </Provider>
                    )}
                    {props.providers.discord && (
                        <Provider onClick={() => handleConnect("discord")}>
                            <img src={discordLogo} />
                            <p>Discord</p>
                        </Provider>
                    )}
                    {props.providers.facebook && (
                        <Provider onClick={() => handleConnect("facebook")}>
                            <img src={facebookLogo} />
                            <p>Facebook</p>
                        </Provider>
                    )}
                </ProviderList>
                <button onClick={props.onClose}>Cancel</button>
            </ModalHolder>
        </ModalWrapper>
    );
}

export default Modal;