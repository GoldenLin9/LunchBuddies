import {createContext} from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';


import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const baseURL = "http://localhost:8000";


export const AuthProvider = ({children}) => {

    let navigate = useNavigate();

    let [user, setUser] = useState(localStorage.getItem('access') ? jwtDecode(localStorage.getItem('access')) : null);
    let [access, setAccess] = useState(localStorage.getItem('access'));
    let [refresh, setRefresh] = useState(localStorage.getItem('refresh'));


    async function register(username, password) {
        
        axios.post(`${baseURL}/api/register/`, {
            username: username,
            password: password
        }).then((response) => {
            console.log(response.data);

            navigate('/login');
        }).catch((error) => {
            console.log(error);
        });
    }

    
    async function login(username, password) {
        
        axios.post(`${baseURL}/api/token/`, {
            username: username,
            password: password
        }).then((response) => {
            console.log(response.data);
            localStorage.setItem('access', response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
            
            setUser(jwtDecode(response.data.access));
            setAccess(response.data.access);
            setRefresh(response.data.refresh);

            console.log(user);

        }).catch((error) => {
            console.log(error);
        });

    }

    async function logout() {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setUser(null);
        setAccess(null);
        setRefresh(null);
    }
    
    let value = {
        user: user,
        access: access,
        refresh: refresh,
        
        register: register,
        login: login,
        logout: logout,

        setUser: setUser,
        setAccess: setAccess,
        setRefresh: setRefresh,
    }


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;