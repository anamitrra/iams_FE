import React from "react"
import { Link, NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDot, faTachometerAlt,faCirclePlus,faNotesMedical } from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {
    const name = localStorage.getItem('auth_name')
    return (
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
            <div className="nav"> 
                 
                 <Link  to="/user" className="nav-link">
                 <div className="sb-nav-link-icon"> <FontAwesomeIcon icon={faTachometerAlt}></FontAwesomeIcon> </div>
                 <div></div>Dashboard
                 </Link>
        
                 <div className="sb-sidenav-menu-heading">Data Entry</div>
                 <Link  to="/user/EntryForm" className="nav-link"> 
                 <div className="sb-nav-link-icon"> <FontAwesomeIcon icon={faCirclePlus}></FontAwesomeIcon> </div> 
                    Requisition
                 </Link>

                 <div className="sb-sidenav-menu-heading">View</div>
                 <Link  to="/user/Allitems" className="nav-link">
                 <div className="sb-nav-link-icon"> <FontAwesomeIcon icon={faTachometerAlt}></FontAwesomeIcon> </div>
                 <div></div>All Items
                 </Link>
                 <Link  to="/user/PendingOrders" className="nav-link"> 
                 <div className="sb-nav-link-icon"> <FontAwesomeIcon icon={faCirclePlus}></FontAwesomeIcon> </div> 
                    Pending Orders
                 </Link>
                
                 <Link  to="/user/approved-order" className="nav-link">
                 <div className="sb-nav-link-icon"> <FontAwesomeIcon icon={faTachometerAlt}></FontAwesomeIcon> </div>
                 <div></div>Approved Order
                 </Link>

                 <Link  to="/user/ReceivedOrders" className="nav-link">
                 <div className="sb-nav-link-icon"> <FontAwesomeIcon icon={faTachometerAlt}></FontAwesomeIcon> </div>
                 <div></div>Received Orders
                 </Link>

             </div>
            </div>
            <div className="sb-sidenav-footer">
                <div className="small">Logged in as:</div>
                {name}
            </div>
        </nav>
    )
}

export default Sidebar