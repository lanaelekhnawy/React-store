
import { createContext, useState, useEffect } from "react";


export const userContext = createContext(null);

export default function UserContextProvider(props) {
    const [isLogin, setLogin] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
            setLogin(token);
        }
    }, []); 

    return (
        <userContext.Provider value={{ isLogin, setLogin }}>
            {props.children}
        </userContext.Provider>
    );
}