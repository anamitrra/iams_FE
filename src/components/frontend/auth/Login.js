import React, { useState } from "react";
import Navbar from '../../../layouts/frontend/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faSignInAlt, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { right } from '@popperjs/core';
import axios from 'axios'
import swal from 'sweetalert';
import { Spinner, Toast, ToastContainer } from "react-bootstrap";
import { useHistory, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function Login() {
    const history = useHistory();
    const [loading, setloading] = useState(false);
    const [type, setType] = useState('password');
    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);
    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: [],
    })
    function passwordType(e) {

        e.preventDefault();
        if (type === "password") {
            setType("text");
        }
        else {
            setType("password");
        }
    }
    const handleInput = (e) => {
        e.persist();
        setLogin({
            ...loginInput,
            [e.target.name]: e.target.value
        })
    }
    const loginSubmit = async (e) => {
        setloading(true);
        e.preventDefault();
        const data = {
            email: loginInput.email,
            password: loginInput.password,
        }
        await axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('api/login', data).then(resp => {
                if (resp.data.status === 200) {
                    localStorage.setItem('auth_token', resp.data.token);
                    localStorage.setItem('auth_name', resp.data.username);
                    localStorage.setItem('auth_email', resp.data.email);
                    localStorage.setItem('auth_id', resp.data.id);
                    localStorage.setItem('auth_role', resp.data.role);
                   // swal('Success', resp.data.message, "success");
                   if(resp.data.role===1 || resp.data.role===2)
                   {
                    history.push('/admin/dashboard');
                   }
                   else
                   {
                    history.push('/administrator/Dashboard');
                   }
                  
                }
                else if (resp.data.status === 401) {
                    setLogin({ ...loginInput, error_list: [] });
                    swal('Warning', resp.data.message, "warning");
                    // setShowA(true);
                    // toggleShowA();
                    setloading(false);
                }
                else {
                    setLogin({ ...loginInput, error_list: resp.data.validation_errors });
                    setloading(false);
                }
            });
        });
    }
    return (
        <>
            <Helmet>
                <title>IAMS | Login</title>
            </Helmet>
            <Navbar />

            <div className="container mt-5 ">

                <div className="row justify-content-center">

                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Login</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={loginSubmit}>

                                    <div className="form-group mb-3">
                                        <label className="form-label">Email</label>
                                        <input type="email" name="email" required onChange={handleInput} value={loginInput.email} className="form-control" />
                                        <span className="text-danger">{loginInput.error_list.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="form-label">Password</label>
                                        {
                                            type === "password"
                                                ?
                                                <Link style={{ float: right }} to="#" className="nav-link text-sm" tabIndex="-1" onClick={(e) => { passwordType(e) }} >
                                                    <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>  Show
                                                </Link >
                                                :
                                                <Link style={{ float: right }} to="#" className="nav-link text-sm" tabIndex="-1" onClick={(e) => { passwordType(e) }}>
                                                    <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon> Hide
                                                </Link >
                                        }
                                        <input type={type} name="password" required onChange={handleInput} value={loginInput.password} className="form-control" />
                                        <span className="text-danger">{loginInput.error_list.password}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        {
                                            loading ?
                                                <Link className="btn btn-primary" to="#"  >
                                                    <Spinner animation="border" size="sm" /> Loading...
                                                </Link>

                                                :
                                                <button className="btn btn-primary" type="submit" >
                                                    <FontAwesomeIcon icon={faSignInAlt}></FontAwesomeIcon> Login
                                                </button>
                                        }

                                    </div>
                                
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer className="p-1" position="bottom-end">
                <Toast bg="warning" show={showA} onClose={toggleShowA} delay={5000} autohide>
                    <Toast.Header>
                        <strong className="me-auto"> <FontAwesomeIcon icon={faExclamationTriangle} ></FontAwesomeIcon> Warning</strong>
                    </Toast.Header>
                    <Toast.Body>
                        Invalid Credential

                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    )
}
export default Login