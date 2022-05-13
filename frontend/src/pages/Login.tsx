import React, { useEffect } from 'react';
import { useForm, FieldValues } from "react-hook-form";
import { useQueryClient, useMutation } from "react-query";
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

import { ActionHolder, Container, FormHolder, InputHolder, LeftContainer, Overlay, RightContainer, SocialLogin, SocialLoginHolder, TitleHolder } from "../styles/login";
import { AppContext } from '../utils/Context';
import Toast from '../components/Toast';
import { time } from 'console';

interface ILoginProps {};

interface User {
    email: string;
    name?: string | null;
    password: string;
};

interface Response {
    status: boolean;
    message: string;
    data?: any;
}

const registerUser = async (data: User): Promise<Response> => {
    const { data: response } = await axios.post("http://localhost:4000/api/v1/register", data, { withCredentials: true });
    return response;
}

const loginUser = async (data: User): Promise<Response> => {
    const { data: response } = await axios.post("http://localhost:4000/api/v1/login", data, { withCredentials: true });
    return response;
}

const Login: React.FunctionComponent<ILoginProps> = props => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [showLogin, setShowLogin] = React.useState<boolean>(true);
    const [showToast, setShowToast] = React.useState<any>(false);
    const [success, setSuccess] = React.useState<boolean>(false);
    const context = React.useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (searchParams.has('verified')) {
            setTimeout(() => {
                setShowToast(true);
                setSearchParams("");
                setTimeout(() => {
                    setShowToast(false);
                }, 3000);
            }, 500);
        }
    }, [])

    const { register, handleSubmit, reset, formState: { errors }, clearErrors, setError } = useForm<User>({
        mode: "onSubmit"
    });

    const { mutate: mutateRegister, isLoading: isLoadingRegister } = useMutation(registerUser, {
        onSuccess: async (data: Response) => {
            if (!data.status) {
                setError("email", {type: "custom", message: data.message});
                return;
            }
            setSuccess(true);
            reset();
        },
        onError: error => {
            alert("There was an error");
        },
    });

    const { mutate: mutateLogin, isLoading: isLoadingLogin } = useMutation(loginUser, {
        onSuccess: async (data: Response) => {
            if (!data.status) {
                setError("email", {type: "custom", message: data.message});
                return;
            }
            context.signin(data.data, () => {
                reset();
                navigate("/profile", {replace: true});
            });
        }
    })

    const handleSignIn = (data: User): void => {
        const user = {
            email: data.email,
            password: data.password
        };

        mutateLogin(user);
    }

    const handleRegister = (data: User) => {
        const user = {
            ...data
        };

        mutateRegister(user);
    }

    const changePage = () => {
        reset();
        setSuccess(false);
        clearErrors();
        setShowLogin(!showLogin);
    }

    const socialLogin = (provider: string) => {
        window.location.href = "http://localhost:4000/api/v1/auth/"+provider;
    }

    return (
        <Container>
            <Toast message='Successfully verified your email address, you may login now.' isError={false} isShowing={showToast} />
            <LeftContainer>
                <Overlay />
                <TitleHolder>
                    <h1>{showLogin ? "Welcome back," : "Hi, Welcome"}</h1>
                    <h2>{showLogin ? "Please login to continue." : "Register to continue."}</h2>
                </TitleHolder>
            </LeftContainer>
            <RightContainer>
                {showLogin && (
                    <>
                        <FormHolder onSubmit={handleSubmit(handleSignIn)}>
                            <InputHolder isError={errors.email != undefined}>
                                <input type="text" {...register("email", { required: {value: true, message: "Email cannot be empty."}, pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address format."} })} placeholder="Email" />
                                <p>{errors.email?.message}</p>
                            </InputHolder>
                            <InputHolder isError={errors.password != undefined}>
                                <input type="password" {...register("password", {required: {value: true, message: "Password cannot be empty."}})} placeholder="Password" />
                                <p>{errors.password?.message}</p>
                            </InputHolder>
                            <ActionHolder>
                                <p onClick={changePage}>Register</p>
                                <button>{isLoadingLogin ? "loading..." : "sign in"}</button>
                            </ActionHolder>
                        </FormHolder>
                        <SocialLoginHolder>
                            <p className='title'>Login with</p> 
                            <SocialLogin>
                                <p onClick={() => socialLogin("facebook")}>facebook</p>
                                <p onClick={() => socialLogin("github")}>github</p>
                                <p onClick={() => socialLogin("google")}>google</p>
                                <p onClick={() => socialLogin("discord")}>discord</p>
                            </SocialLogin>
                        </SocialLoginHolder>
                    </>
                )}
                {!showLogin && (
                   <FormHolder onSubmit={handleSubmit(handleRegister)}>
                       {success && <p className='success'>Successfully registered your account, please check your inbox to verify your email. <span>Resend</span></p>}
                        <InputHolder isError={errors.email != undefined}>
                            <input type="text" {...register("email", { required: {value: true, message: "Email cannot be empty."}, pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address format."} })} placeholder="Email" />
                            <p>{errors.email?.message}</p>
                        </InputHolder>
                        <InputHolder isError={errors.name != undefined}>
                            <input type="text" placeholder='Full Name' {...register("name", {required: {value: true, message: "Full Name cannot be empty."}})} />
                            <p>{errors.name?.message}</p>
                        </InputHolder>
                        <InputHolder isError={errors.password != undefined}>
                            <input type="password" placeholder="Password" {...register("password", { required: {value: true, message: "Password cannot be empty."}, minLength: {value: 8, message: "Password needs to be 8 or more"} })} />
                            <p>{errors.password?.message}</p>
                        </InputHolder>
                        <ActionHolder>
                            <p onClick={changePage}>Back to Login</p>
                            <button>{isLoadingRegister ? "loading..." : "register"}</button>
                        </ActionHolder>
                    </FormHolder> 
                )}
            </RightContainer>
        </Container>
    );
}

export default Login;
