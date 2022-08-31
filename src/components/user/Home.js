import { Helmet } from 'react-helmet';
import "../../assets/admin/css/sb-admin-2.css" ;
import "../../assets/admin/css/sb-admin-2.min.css" ;
import "../../assets/admin/css/admin.css" ;
import React,{useState,useEffect} from "react";
import { Link,useHistory } from "react-router-dom";
import axios, { Axios } from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDot, faTachometerAlt, faArrowAltCircleRight ,faNotesMedical } from '@fortawesome/free-solid-svg-icons'
const Home = () => {
    const [loading, setLoading] = useState(true);
    const [categorylist, setCategorylist] = useState();
    const [itemCount, setItemCount] = useState([]);
    const [apprOrderCount, setapprOrderCount] = useState([]);
    const[ pendingOrder, setPendingOrder] = useState([]);
    const[ completedOrder, setcompletedOrder] = useState([]);
    const[ approvedorders, setapprovedorders] = useState([]);
    
    
    useEffect(()=>{
    axios.get(`api/get-unapprovedorder-branchwise`).then(res=>{

        if(res.status === 200)
        {
            setCategorylist(res.data.ordermaster)
        }
        
        setLoading(false);

    });

},[]);



useEffect(()=>{
    itemcount();
    approvedOrderCount();
    PendingOrder();
    Processedorder();
    approvedordersList();
    // initialstock();
},[]);


const itemcount = async () => {
    const { data } = await axios.get(`api/itemcount`);
    setItemCount(data);
  };


  const approvedOrderCount= async () => {
    const { data } = await axios.get(`api/get-approvedordercount-branchwise`);
    setapprOrderCount(data);
  };

  const PendingOrder= async () => {
    const { data } = await axios.get(`api/get-unapprovedordercount-branchwise`);
    setPendingOrder(data);
  };

  const Processedorder= async () => {
    const { data } = await axios.get(`api/completedovedordertot`);
    setcompletedOrder(data);
  };
  
  const approvedordersList= async () => {
    const { data } = await axios.get(`api/get-approvedorder-branchwise`);
    setapprovedorders(data.ordermaster);
  };
  

  let approveorderTable ;
  if(loading)
  {
      return <h4> Loading...... </h4>
  }
  
  else{
    approveorderTable =[
  
        approvedorders.slice(0,5).reverse().map((items)=>
      {
  
          return(
              <tr key={items.orderno}>
                  <td>{items.orderno}</td>
                  <td>{items.orderdate}</td>
                  <td>{items.branchname}</td>
                  <td>
                          <Link to={`Viewfinalorder/${items.id}`} className="btn btn-success btn-sm">View</Link>
                      </td>
                 
              </tr>
          )
      })]
  }
  




let Viewcategory_HTMLTABLE ;
let records

if(loading)
{
    return <h4> Loading...... </h4>
}

else{
    Viewcategory_HTMLTABLE =[

    categorylist.slice(0,5).reverse().map((items)=>
    {   
        if(categorylist.id===0){
             records = [<td>No records</td>]
        }
       


        if(items){
        return(
            <tr key={items.orderno}>
                <td>{items.orderno}</td>
                <td>{items.orderdate}</td>
                <td>{items.branchname}</td>
                <td>
                        <Link to={`PendingOrderItems/${items.id}`} className="btn btn-success btn-sm">View</Link>
                    </td>
               
            </tr>
        )}
     
    })]
}

    const name = localStorage.getItem('auth_name')
    return (
        <>
            <Helmet>
                <title>IAMS | {name} </title>
            </Helmet>
            <h4>Hi, {name}</h4>

            <div className="container-fluid">


<main>
    <div className="container-fluid px-5">
        <h1 className="mt-4">Dashboard</h1>
        <br></br>
        <div className="row">
            <div className="col-lg-3 col-6">
                <div className="card admingrad1 text-white mb-4">
                    <div className="card-body"><h3>{itemCount.itemcount}</h3><p>Total Items</p> </div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                        <Link className="small text-white stretched-link" to={`/user/Allitems`}>View Details</Link>
                        <div className="large text-white"><FontAwesomeIcon icon={faArrowAltCircleRight} ></FontAwesomeIcon></div>
                    </div>
                </div>
            </div>

            <div className="col-xl-3 col-md-6">
                <div className="card admingrad2 text-white mb-4">
                    <div className="card-body"><h3>{apprOrderCount.approved_order_count}</h3><p>Total Approved Order</p> </div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                    <Link className="small text-white stretched-link" to={`/user/approved-order`}>View Details</Link>
                        <div className=" text-white"><FontAwesomeIcon icon={faArrowAltCircleRight} ></FontAwesomeIcon></div>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-md-6">
                <div className="card admingrad3 text-white mb-4">
                    <div className="card-body"><h3>{pendingOrder.upcoming_order_count}</h3> <p>Total Pending Order</p></div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                    <Link className="small text-white stretched-link" to={`/user/PendingOrders`}>View Details</Link>
                        <div className=" text-white"><FontAwesomeIcon icon={faArrowAltCircleRight} ></FontAwesomeIcon></div>
                    </div>
                </div>
            </div>
            
            <div className="col-xl-3 col-md-6">
                <div className="card admingrad4 text-white mb-4">
                    <div className="card-body"><h3>{completedOrder.total_completed_order}</h3> <p>Total Processed Order</p></div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                    <Link className="small text-white stretched-link" to={`/user/ReceivedOrders`}>View Details</Link>
                        <div className=" text-white"><FontAwesomeIcon icon={faArrowAltCircleRight} ></FontAwesomeIcon></div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-xl-6">
                <div className="card mb-4">
                    <div className="card-header">
                        <i className="fas fa-chart-area me-1"></i>
                       Pending Orders
                    </div>
                    <div className="card-body">
                     <table class="table table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Branch Name</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>                   
                        { Viewcategory_HTMLTABLE}
                        {records}
                            </tbody>
                            </table>
                                        </div>
                </div>
            </div>
            <div className="col-xl-6">
                <div className="card mb-4">
                    <div className="card-header">
                        <i className="fas fa-chart-bar me-1"></i>
                        Approved Orders (Pending Stock Entry)
                    </div>
                    <div className="card-body">
                    <table class="table table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Branch Name</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>                   
                            {approveorderTable}
                            {records}

                            </tbody>
                            </table>
                    </div>
                </div>
            </div>
        </div>



    </div>
</main>


</div>
      
        </>
    );
}
export default Home