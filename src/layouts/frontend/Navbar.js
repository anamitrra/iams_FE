import React from "react";
import { Link,useHistory, NavLink  } from 'react-router-dom';
import axios from 'axios'
import swal from 'sweetalert'; 

function Navbar(props) {
    const history = useHistory();
    var AuthButton = ''; 
    const logoutSubmit=(e)=>{
        e.preventDefault();
        axios.post('api/logout').then(resp=>{
            if(resp.data.status===200)
            {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name'); 
                swal('Success', resp.data.message, "success");
                history.push('/login');
            }
        })
    }
    if (!localStorage.getItem('auth_token')) {
        AuthButton = (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <NavLink className="nav-link"  to="/login">Login</NavLink>
                </li>
              
            </ul>
        )
    }
    else {
        history.push('/admin/dashboard');
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-default shadow sticky-top">
                <div className="container">
                    <Link className="navbar-brand" to="/">IAMS</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink exact   className="nav-link" aria-current="page" to="/">Home</NavLink> 
                            </li> 
                            {AuthButton}
                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )
}
export default Navbar;