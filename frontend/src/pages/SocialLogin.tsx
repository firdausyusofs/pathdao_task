import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../utils/Context";

const loginSuccess = async (): Promise<any> => {
    const { data } = await axios.get("http://localhost:4000/api/v1/auth/social/success", { withCredentials: true });
    return data;
}

const SocialLogin: React.FunctionComponent = () => {
    const { isLoading, data } = useQuery('login', loginSuccess);
    const navigate = useNavigate();
    const context = React.useContext(AppContext);

    React.useEffect(() => {
        console.log(data);
        if (!isLoading && data) {
            context.signin(data.user, () => {
                navigate('/profile', {replace: true});
            });
        }
    }, [data]);

    return <></>;
}

export default SocialLogin;