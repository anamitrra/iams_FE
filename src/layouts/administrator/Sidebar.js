import React from "react"
import { Link } from "react-router-dom" 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDot, faTachometerAlt,faCirclePlus,faNotesMedical } from '@fortawesome/free-solid-svg-icons'
const Sidebar = () => {
    return (
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav"> 
                 
                    <Link  to="/administrator/Dashboard" className="nav-link">
                    <div className="sb-nav-link-icon"> <FontAwesomeIcon icon={faTachometerAlt}></FontAwesomeIcon> </div>
                    <div></div>Dashboard
                    </Link>
                    {/* Nazarat User */}
                    <div className="sb-sidenav-menu-heading">Masters</div>
                    <Link  to="/administrator/BranchMaster" className="nav-link"> 
                    <div className="sb-nav-link-icon"> <FontAwesomeIcon icon={faCircleDot}></FontAwesomeIcon></div>
                     Branch
                    </Link>
                    <Link  to="/administrator/DesignationCreate" className="nav-link"> 
                    <div className="sb-nav-link-icon"> <FontAwesomeIcon icon={faCircleDot}></FontAwesomeIcon>  </div>
                        Designation
                    </Link>
                    <Link  to="/administrator/UserCreate" className="nav-link"> 
                    <div className="sb-nav-link-icon"> <FontAwesomeIcon icon={faCircleDot}></FontAwesomeIcon> </div> 
                       Users
                    </Link>
                   
                </div>
            </div>
            <div className="sb-sidenav-footer">
                <div className="small">Logged in as:</div>
                Admin User
            </div>
        </nav>
    )
}

export default Sidebar