import React from 'react'

import { Route, Switch, Redirect } from 'react-router-dom'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import '../../assets/admin/css/styles.css'
import '../../assets/admin/js/scripts'
import routes from '../../routes/routes'  

const MasterLayout = () => {    
    return (
        <div className="sb-nav-fixed">
            <Navbar />
            <div id="layoutSidenav">

                <div id="layoutSidenav_nav">
                    <Sidebar />
                </div>
                <div id="layoutSidenav_content">
                    <main className="main">
                        <Switch>
                            {
                                routes.map((route, idx) => {
                                    return (
                                        route.component && (
                                            <Route
                                                key={idx}
                                                path={route.path}
                                                exact={route.exact}
                                                name={route.name} 
                                                render={(props)=>(
                                                    <route.component {...props}/>
                                                )}
                                            />
                                        )
                                    )
                                })
                            } 
                            <Redirect from ={{pathname: "/admin/dashboard", state:{from: "admin"}}}  />
                        </Switch>
                    </main>
                    <Footer />
                </div>

            </div>
        </div>

    );
}

export default MasterLayout