import React from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { AppContext } from "../utils/Context";
import { NavBar } from "../styles/menu";

interface IMenuProps {};

const logoutUser = async () => {
    const { data } = await axios.get('http://localhost:4000/api/v1/logout', {withCredentials: true});
    return data;
}

const Menu: React.FunctionComponent<IMenuProps> = props => {
    const context = React.useContext(AppContext);
    const navigate = useNavigate();

    const { mutate } = useMutation(logoutUser, {
        onSuccess: data => {
            if (data.status) {
                context.signout(() => {
                    navigate('/', { replace: true });
                });
            }
        }
    });
    
    return (
        <NavBar>
            <button onClick={() => mutate()}>Log Out</button>
        </NavBar>
    );
}

export default Menu;