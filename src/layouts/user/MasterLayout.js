
import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from 'react-router-dom'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import '../../assets/admin/css/styles.css'
import '../../assets/admin/js/scripts'
import routes from '../../routes/routes' 

const MasterLayout = () => {
    const email = localStorage.getItem('auth_email')
    const name = localStorage.getItem('auth_name') 
    return (
        <div className="sb-nav-fixed">
            <Navbar name={name} email={email} />
            <div id="layoutSidenav">

                <div id="layoutSidenav_nav">
                    <Sidebar />
                </div>
                <div id="layoutSidenav_content">
                    <main>
                        <div className="container-fluid px-4 pt-4">
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
                                                    render={(props) => (
                                                        <route.component {...props} />
                                                    )}
                                                />
                                            )
                                        )
                                    })
                                }
                                <Redirect to={{ pathname: "/user/home", state: { from: "user" } }} />
                            </Switch>
                        </div>

                    </main>
                    <Footer />
                </div>

            </div>
        </div>

    );
}

export default MasterLayout