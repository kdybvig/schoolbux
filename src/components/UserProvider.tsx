import React, { FunctionComponent, createContext, useState } from 'react';
import Login from './Login';

export const UserContext = createContext({
    user: '',
    isAuth: false,
    login: (newUser: string) : void => {
    },
    logout: () : void => {}
});

export const UserProvider:FunctionComponent<{}> = (props) => {
    const [user, setUser] = useState('');
    const [isAuth, setIsAuth] = useState(false);

    const login = (newUser: string): Promise<string> => {
        return new Promise (resolve => {
            setTimeout(()=> {
                setIsAuth(true);
                setUser(newUser)
                resolve(newUser)
            }, 800)
        })
        
    }

    const logout = (): void => {
        setUser('')
    }
    return (
        <UserContext.Provider value={{user, isAuth, login, logout}}>
            {props.children}
        </UserContext.Provider>
    )
}
