import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faQuestionCircle, faUser } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
    const history = useHistory();
    const logoutSubmit = (e) => {
        e.preventDefault();
        axios.post('api/logout').then(resp => {
            if (resp.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                swal('Success', resp.data.message, "success");
                history.push('/login');
            }
        })
    }
    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <Link className="navbar-brand ps-3" to="/administrator/dashboard">IAMS Administrator</Link>
            <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button>

            <ul className="navbar-nav   ms-auto me-0 me-md-3 my-2 my-md-0me-lg-4">
               
                <li className="nav-item dropdown">
                    <Link to="#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon> 
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                   
                        <li><hr className="dropdown-divider" /></li>
                        <li><button type="submit" className="dropdown-item" onClick={logoutSubmit} to="/">Logout</button></li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
}
export default Navbar