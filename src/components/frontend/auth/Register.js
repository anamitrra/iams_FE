import React, { useState } from "react";
import Navbar from '../../../layouts/frontend/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { right } from '@popperjs/core';
import axios from 'axios'
import swal from 'sweetalert';
import { useHistory, Link } from 'react-router-dom'
import { Spinner } from "react-bootstrap";
import { Helmet } from 'react-helmet';

function Register() {
    const history = useHistory();
    const [loading, setloading] = useState(false);
    const [type, setType] = useState('password');
    const [tnc, setTnc] = useState(false);
    const [registerInput, setRegister] = useState({
        name: '',
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
        setRegister({
            ...registerInput,
            [e.target.name]: e.target.value
        })
    }
    const registerSubmit = (e) => {
        e.preventDefault();
        setloading(true);
        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
            status: tnc
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('api/register', data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    localStorage.setItem('auth_email', res.data.email);
                    swal('Success', res.data.message, "success");
                    history.push('/');
                }
                if (res.data.status === 201) {

                    swal('Warning', res.data.message, "warning");
                    setloading(false);
                }
                else {
                    setRegister({ ...registerInput, error_list: res.data.validation_errors });
                    setloading(false);
                }
            });
        });
    }

    return (
        <>
            <Helmet>
                <title>IAMS | Register</title>
            </Helmet>
            <Navbar />
            <div className="container pt-5">

                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Register</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={registerSubmit}>
                                    <div className="form-group mb-3">
                                        <label className="form-label">Name</label>
                                        <input type="text" name="name" required onChange={handleInput} value={registerInput.name} placeholder="Enter your name" className="form-control" />
                                        <span className="text-danger">{registerInput.error_list.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="form-label">Email</label>
                                        <input type="email" name="email" required onChange={handleInput} value={registerInput.email} placeholder="Enter your email" className="form-control" />
                                        <span className="text-danger">{registerInput.error_list.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="form-label">Password</label>
                                        {
                                            type === "password"
                                                ?
                                                <Link style={{ float: right }} className="nav-link text-sm" tabIndex="-1" onClick={(e) => { passwordType(e) }} >
                                                    <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>  Show
                                                </Link >
                                                :
                                                <Link style={{ float: right }} className="nav-link text-sm" tabIndex="-1" onClick={(e) => { passwordType(e) }}>
                                                    <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon> Hide
                                                </Link >
                                        }
                                        <input type={type} name="password" required onChange={handleInput} value={registerInput.password} placeholder="Enter your password" className="form-control" />
                                        <span className="text-danger">{registerInput.error_list.password}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label><input type="checkbox" value={tnc} onChange={(e) => setTnc(e.target.checked)} required /> I Accept Terms & Conditions </label>
                                    </div>
                                    <div className="form-group mb-3">
                                        {
                                            loading ?
                                                <Link className="btn btn-primary" to="#"  >
                                                    <Spinner animation="border" size="sm" /> Loading...
                                                </Link>
                                                :
                                                <button className="btn btn-primary" type="submit" >
                                                    <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon> Register
                                                </button>
                                        }
                                    </div>
                                    <div className="form-group mb-3">
                                        <Link to="/login">
                                            Already have an account? Log in
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Register;