import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { Spinner } from "react-bootstrap";
import { Link } from 'react-router-dom';

const AddDomain = () => {
    const name = localStorage.getItem('auth_name')
    const [loading, setloading] = useState(false);
    const [domainName, setDomainName] = useState("")
    const [searchBtn, setBtn] = useState(true);
    const [btnClass, setBtnClass] = useState('btn btn-md btn-dark');
    const [searchInput, setSearch] = useState("")
    const [alert, setAlert] = useState("")
    const [isavailable, setIsavailable] = useState(false);
    useEffect(() => { 
        setloading(false);
        setBtn(true)
        setBtnClass('btn btn-md btn-dark')
    }, []);
    const searchType = (e) => {
        setSearch(e.target.value)
        if (e.target.value.length >= 3) {
            setBtn(false)
            setBtnClass('btn btn-md btn-primary')
            setAlert("")
        }
        else if (e.target.value.length < 1) {
            setBtn(true)
            setBtnClass('btn btn-md btn-dark')
            setAlert("This field is required!")
        }
        else {
            setBtn(true)
            setBtnClass('btn btn-md btn-dark')
            setAlert("Name should be at least 3 characters long!")
        }
    }
    const search = () => {

        setloading(true);
        const data = {
            name: searchInput,
        }
        axios.get('api/searchdomain', data).then(resp => {
            if (resp.data.status === 200) {
                setIsavailable(true)
                setDomainName(data.name + ".cvinfo.online")
            }
            else {
                setIsavailable(false)
                setAlert(resp.data.message)
            }
            setloading(false);
        })

    }
    return (
        <>
            <Helmet>
                <title>IAMS | {name} | Add Domain</title>
            </Helmet>
            <h1>Add Domain</h1>

            <form>
                <div className="form-group row mb-3">
                    <div className="col-md-6">
                        <div className="input-group">
                            <input className="form-control" type="text" value={searchInput} onChange={(e) => searchType(e)} placeholder="Enter your Desired Domain name" aria-label="Enter your Desired Domain name" aria-describedby="btnNavbarSearch" />
                            {
                                    loading ?
                                        <Link  id="btnNavbarSearch" className="btn btn-md btn-primary" to="#"  >
                                            <Spinner animation="border" size="sm" /> Searching...
                                        </Link>

                                        :
                          
                            <button className={btnClass} onClick={search} disabled={searchBtn} id="btnNavbarSearch" type="button"> <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon> Search</button>
                        }
                        </div>
                        <div className="text-danger mt-2">{alert}</div>

                    </div>
                </div>
                {
                    isavailable ?
                        <div className="row mb-3">
                            <div className="col-md-4">
                                {domainName}
                            </div>
                            <div className="col-md-3">
                               
                                <button type="button" className="btn btn-sm btn-warning"><FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon> Add</button>
                            
                            </div>
                        </div>
                        :
                        ""
                }


            </form>
        </>
    );
}
export default AddDomain