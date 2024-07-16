import dayjs from 'dayjs';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

let baseURL = 'http://localhost:8000/api/';

export default function useAxios() {

    let { access, refresh, setUser, setAccess, setRefresh } = useContext(AuthContext);

    const axiosInstance = axios.create({
        baseURL: baseURL,
        timeout: 5000,
        headers: {
            'Authorization': `Bearer ${access}`
        }
    });


    axiosInstance.interceptors.request.use(async req => {

        const isExpired = dayjs(jwtDecode(access).exp * 1000).isBefore(dayjs());

        if (!isExpired) {
            return req;
        }

        const response = await axios.post(`${baseURL}token/refresh/`, {
            refresh: refresh
        });

        localStorage.setItem('access', response.data.access);
        localStorage.setItem('refresh', response.data.refresh);
        setAccess(response.data.access);
        setRefresh(response.data.refresh);
        setUser(jwtDecode(response.data.access));

        req.headers['Authorization'] = `Bearer ${response.data.access}`;
        return req;
    });
}