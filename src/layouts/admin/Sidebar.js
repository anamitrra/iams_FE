import React from "react"
import { Link } from "react-router-dom" 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDot, faTachometerAlt,faCirclePlus,faNotesMedical } from '@fortawesome/free-solid-svg-icons'
const Sidebar = () => {

    const name = localStorage.getItem('auth_name')
    return (
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav"> 
                 
                    <Link  to="/admin/dashboard" className="nav-link">
                    <div className="sb-nav-link-icon"> <FontAwesomeIcon icon={faTachometerAlt}></FontAwesomeIcon> </div>
                    <div></div>Dashboard
                    </Link>
                    {/* Nazarat User */}
                    <div className="sb-sidenav-menu-heading">Masters</div>
                    <Link  to="/admin/category" className="nav-link"> 
                    <div className="sb-nav-link-icon"> <FontAwesomeIcon icon={faCircleDot}></FontAwesomeIcon></div>
                     Categories
                    </Link>
                    <Link  to="/admin/subcategory" className="nav-link"> 
                    <div className="sb-nav-link-icon"> <FontAwesomeIcon icon={faCircleDot}></FontAwesomeIcon>  </div>
                        Sub-Categories
                    </Link>
                    <Link  to="/admin/item" className="nav-link"> 
                    <div className="sb-nav-link-icon"> <FontAwesomeIcon icon={faCircleDot}></FontAwesomeIcon> </div> 
                        Items
                    </Link>
                    
                    
                    <div className="sb-sidenav-menu-heading">Manage Orders</div>

                    <Link  to="/admin/viewReq" className="nav-link"> 
                    <div className="sb-nav-link-icon"> <FontAwesomeIcon icon={faCirclePlus}></FontAwesomeIcon> </div> 
                       View Pending Orders
                    </Link>

                    <Link  to="/admin/approvedorder" className="nav-link"> 
                    <div className="sb-nav-link-icon"> <FontAwesomeIcon icon={faCirclePlus}></FontAwesomeIcon> </div> 
                       View Approved Orders
                    </Link>


                    
                  
                    <div className="sb-sidenav-menu-heading">Manage Stocks</div>
                    <Link  to="/admin/stockentry" className="nav-link"> 
                    <div className="sb-nav-link-icon"> <FontAwesomeIcon icon={faNotesMedical}></FontAwesomeIcon> </div> 
                       Stock Entry
                    </Link>

                    <Link  to="/admin/ViewFinalStock" className="nav-link"> 
                    <div className="sb-nav-link-icon"> <FontAwesomeIcon icon={faNotesMedical}></FontAwesomeIcon> </div> 
                       View Final Orders
                    </Link>

                    {/* <Link  to="/admin/PresentStocks" className="nav-link"> 
                    <div className="sb-nav-link-icon"> <FontAwesomeIcon icon={faNotesMedical}></FontAwesomeIcon> </div> 
                       Present Stock Record
                    </Link> */}
                   
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