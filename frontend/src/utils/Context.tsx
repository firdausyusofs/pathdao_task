import React, { createContext } from "react";

interface IAppContextType {
    user: IUserType|null;
    signin: (user: any, cb: VoidFunction) => void;
    signout: (cb: VoidFunction) => void;
};

interface IUserType {
    id: number;
    name: string;
    email: string;
}

export const AppContext = createContext<IAppContextType>(null!);

let initialState = (): IUserType|null => {
    let storage = localStorage.getItem("user");

    if (typeof storage == 'string') {
        let data = JSON.parse(storage);

        return {
            id: data.id,
            name: data.name,
            email: data.email
        };
    }
    
    return null;
}

export default function ContextProvider({ children }: { children: React.ReactNode }) {
    let [user, setUser] = React.useState<IUserType|null>(initialState);  

    let signin = (user: IUserType, cb: VoidFunction): void => {
        localStorage.setItem('user', JSON.stringify(user))
        setUser(user);
        cb();
    };

    let signout = (cb: VoidFunction): void => {
        localStorage.removeItem('user');
        setUser(null);
        cb();
    };

    let value = {user, signin, signout};

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}