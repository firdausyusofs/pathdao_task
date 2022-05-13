import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, isError } from "react-query";
import { useSearchParams } from 'react-router-dom';

import Menu from '../components/Menu';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import { AccountList, ActionHolder, Container, Holder, InnerList, InputField, List, TitleHolder, Wrapper } from '../styles/profile';

interface IProfileProps {};

interface IUpdateRequest {
    name: string;
};

interface ISocialAccountType {
    id: number;
    social_id: string;
    display_name: string;
    social_provider: string;
};

const getProfile = async () => {
    const { data } = await axios.get("http://localhost:4000/api/v1/user/me", {withCredentials: true});
    return data;
}

const updateName = async (data: IUpdateRequest) => {
    const { data: response } = await axios.put("http://localhost:4000/api/v1/user", data, {withCredentials: true});
    return response;
}

const Profile: React.FunctionComponent<IProfileProps> = props => {
    const [editing, setEditing] = React.useState<boolean>(false);
    const [showToast, setShowToast] = React.useState<string>("");
    const [isToastError, setIsToastError] = React.useState<boolean>(false);
    const [provider, setProvider] = React.useState({
        google: true,
        facebook: true,
        github: true,
        discord: true
    });
    const [showModal, setShowModal] = React.useState<boolean>(false);

    const [searchParams, setSearchParams] = useSearchParams();

    const { register, handleSubmit, clearErrors, reset, formState: { errors } } = useForm<IUpdateRequest>({
        mode: "onSubmit"
    });

    const { isLoading, error, data, refetch } = useQuery('profile', getProfile);
    const { mutate, isLoading: isLoadingUpdate } = useMutation(updateName, {
        onSuccess: data => {
            reset();
            refetch();
            setEditing(false);
            triggerToast(`Successfully updated your name.`, false);
        },
        onError: err => {
            alert("There was an error");
        }
    })

    React.useEffect(() => {
        if (searchParams.has('linked') && searchParams.has('provider')) {
            setTimeout(() => {
                triggerToast(`Successfully linked your ${searchParams.get('provider')} account.`, false);
            }, 500);
        } else if (searchParams.has('linked') && searchParams.has('error')) {
            let error = searchParams.get("error");
            error!.replace("#_=_", "");
            var message = "";
            switch (error) {
                case "associated":
                    message = "Social account already been associated.";
                    break;
                case "unauthorized":
                    message = "Unauthorized";
                    break;
                default:
                    message = "";
                    break;
            }
            setTimeout(() => {
                triggerToast(message, true);
            }, 500);
        }
    }, [])

    const triggerToast = (message: string, isError: boolean) => {
        setSearchParams("");
        setShowToast(message);
        setIsToastError(isError);
        setTimeout(() => {
            setShowToast("");
        }, 3000); 
    }

    React.useEffect(() => {
        if (data) {
            data.data.social_accounts.map((account: ISocialAccountType) => {
                setProvider(state => ({...state, [account.social_provider]: false}));
            });
        }
    }, [data]);

    if (isLoading || error) {
        return <></>;
    }

    const handleSubmitSave = () => {
        handleSubmit(async (value: IUpdateRequest) => {
            if (value.name == data.data.name) {
                cancel();
                return;
            };
            mutate(value);
        })();
    }

    const cancel = () => {
        setEditing(false);
        reset();
        clearErrors();
    }

    return (
        <Wrapper>
            {showModal && <Modal providers={provider} onClose={() => setShowModal(false)} />}
            <Toast message={showToast} isError={isToastError} isShowing={showToast != ""} />
            <Menu />
            <Container>
                <Holder>
                    <TitleHolder>
                        <h2>Profile</h2>
                        <div>
                            {!editing && (
                                <p onClick={() => setEditing(true)}>Edit</p>
                            )}
                            {editing && (
                                <>
                                   <p className='cancel' onClick={cancel}>Cancel</p> 
                                   <p className='save' onClick={handleSubmitSave}>Save</p>
                                </>
                            )}
                        </div>
                    </TitleHolder>
                    <List>
                        <InnerList>
                            <table>
                                <tr>
                                    <td><p className='title'>Name: </p></td>
                                    <td>
                                        {editing ? 
                                            (
                                                <>
                                                    <InputField isError={errors.name != undefined} type="text" {...register("name", {required: {value: true, message: "Name cannot be empty."}})} defaultValue={data.data.name} />
                                                    <p className="error">{errors.name?.message}</p>
                                                </>
                                            )
                                            : <p className='value'>{data.data.name}</p>}
                                    </td>
                                </tr>
                                <tr>
                                    <td><p className='title'>Email: </p></td>
                                    <td><p className="value">{data.data.email}</p></td>
                                </tr>
                            </table>
                        </InnerList>
                    </List>
                </Holder>
                <Holder>
                    <h2>Linked Accounts</h2>
                    {data.data.social_accounts.length == 0 && <p className='no-data'>No linked accounts</p>}
                    {data.data.social_accounts.length > 0 && (
                        data.data.social_accounts.map((account: ISocialAccountType) => {
                            return <AccountList key={account.id}>
                                <img src={require(`../assets/${account.social_provider}.svg`)} />
                                <p>{account.display_name}</p>
                            </AccountList>
                        })
                    )}
                    {data.data.social_accounts.length < 4 && (
                        <ActionHolder>
                            <button onClick={() => setShowModal(true)}>Link Social Accounts</button>
                        </ActionHolder>
                    )}
                </Holder>        
            </Container>
        </Wrapper>
    );
}

export default Profile;