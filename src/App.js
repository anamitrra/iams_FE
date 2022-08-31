import React from "react";
import Home from './components/frontend/Home'
import Register from "./components/frontend/auth/Register";
import Login from "./components/frontend/auth/Login";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import AdminPrivateRoute from './AdminPrivateRoute'
import UserPrivateRoute from './UserPrivateRoute'
import AdministratorPrivateRoute from "./AdministratorPrivateRoute";



import axios from 'axios'
axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token')
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config
})

function App() {
  return (
    <div className="App">
      <Router>
    
        <Switch>
          
          <Route exact path="/" component={Home} title="Home" />
          <Route path="/login" >
            {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Login />}
          </Route>
          <Route path="/register" >
            {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Register />}
          </Route>
          <AdminPrivateRoute path="/admin" name="Admin" />
          <UserPrivateRoute path="/user" name="User" />
          <AdministratorPrivateRoute path="/administrator" name="administrator"></AdministratorPrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
