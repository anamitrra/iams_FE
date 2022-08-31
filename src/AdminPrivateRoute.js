import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Route, Redirect, useHistory } from 'react-router-dom';
import MasterLayout from "./layouts/admin/MasterLayout";
import swal from 'sweetalert';

function AdminPrivateRoute({ ...rest }) {

    const history = useHistory();
    const [Authenticated, setAuthenticated] = useState(false);
    const [loading, setloading] = useState(true);
    useEffect(() => {
        axios.get('/api/checkingAuth').then(res => {
            if (res.status === 200) {
                const role = localStorage.getItem('auth_role')
                if(role==1)
                { 
                    setAuthenticated(true);
                    setloading(false); 
                }
                else
                {
                    swal("Unauthorized", "You are un-authorized", "warning");
                    history.push('/user/home');
                }
            }
        });
        return () => {
            setAuthenticated(false);
        };

    }, []);

    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
        if (err.response.status === 401) {
            swal("Unauthorized", err.response.data.message, "warning");
            history.push('/');
        }
        return Promise.reject(err);
    });

    if(loading) 
    {
        return (<h1>Loading...</h1>);
    }

    return (
        <Route {...rest}
            render={({ props, location }) =>
                Authenticated ?
                    (<MasterLayout {...props} />) :
                    (<Redirect to={{pathname: "/login", state:{from: location}}} />)

            } 
        />
    );
}

export default AdminPrivateRoute;