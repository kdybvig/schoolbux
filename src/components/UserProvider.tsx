import React, { FunctionComponent, createContext, useState } from 'react';
import Login from './Login';

interface newUser {
    email: string,
    username: string,
    password: string,
    confirm: string
}

interface userInfo {
    user: string,
    password: string
}

interface loginReturn {
    success: boolean,
    user: string,
    error: string
}

interface registerReturn {
    success: boolean,
    user: string,
    error: string
}

export const UserContext = createContext({
    user: '',
    isAuth: false,
    login: (userInfo: userInfo) : any => {
        return {success: false, user: ''}
    },
    logout: () : void => {},
    register: (newUser: newUser) : any => {}
});

export const UserProvider:FunctionComponent<{}> = (props) => {
    const [user, setUser] = useState('');
    const [isAuth, setIsAuth] = useState(false);
    const apiUrl = "http://localhost:5000/users/"
    const register = async(newUser: newUser): Promise<registerReturn> => {
        const url= apiUrl + "register";

        try {
            const res = await (fetch(url, {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers:{
                    'Content-Type': 'application/json'
                }
            }))
            const response = await res.json()
            if (response.username) {
                login({user: newUser.username, password: newUser.password})
                return {success: true, user: response.username, error:''}
            }
            return {success: false, user: '', error: response.error}
        } catch(err) {
            console.log(err)
            return {success: false, user: '', error: 'Network error'}
        }
    }

    const login = async (userInfo: userInfo): Promise<loginReturn>=> {
        const url = apiUrl + "login"
        try {
            const res = await (fetch(url, {
                method: 'POST',
                body: JSON.stringify(userInfo),
                headers:{
                    'Content-Type': 'application/json'
                }
            }))
            const response = await res.json();
            if (response.username) {
                setIsAuth(true)
                setUser(response.username)
                return {success: true, user: response.username, error: ''}
            }
            return {success: false, user: '', error: response.error}
        } catch(err) {
            console.log(err)
            return {success: false, user: '', error: 'Network error'}
        }
        
    }

    const logout = (): void => {
        setUser('')
    }
    return (
        <UserContext.Provider value={{user, isAuth, login, logout, register}}>
            {props.children}
        </UserContext.Provider>
    )
}
