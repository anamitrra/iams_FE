import "../../assets/admin/css/sb-admin-2.css" ;
import "../../assets/admin/css/sb-admin-2.min.css" ;
import "../../assets/admin/css/admin.css" ;
import React,{useState,useEffect} from "react";
import { Link,useHistory } from "react-router-dom";
import axios, { Axios } from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDot, faTachometerAlt, faArrowAltCircleRight ,faNotesMedical } from '@fortawesome/free-solid-svg-icons'

import { FaBeer } from "react-icons/fa";
import { FcRight } from "react-icons/fc";



const Dashboard=()=>
{

    const [loading, setLoading] = useState(true);
    const [categorylist, setCategorylist] = useState();
    const [itemCount, setItemCount] = useState([]);
    const [apprOrderCount, setapprOrderCount] = useState([]);
    const[ pendingOrder, setPendingOrder] = useState([]);
    const[ completedOrder, setcompletedOrder] = useState([]);
    const[ approvedorders, setapprovedorders] = useState([]);
    
    
    useEffect(()=>{
    axios.get(`api/getOrder`).then(res=>{

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
    const { data } = await axios.get(`api/approvedordertot`);
    setapprOrderCount(data);
  };

  const PendingOrder= async () => {
    const { data } = await axios.get(`api/unapprovedordertot`);
    setPendingOrder(data);
  };

  const Processedorder= async () => {
    const { data } = await axios.get(`api/completedovedordertot`);
    setcompletedOrder(data);
  };
  
  const approvedordersList= async () => {
    const { data } = await axios.get(`api/approvedorders`);
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
                          <Link to={`Vieworder/${items.id}`} className="btn btn-success btn-sm">View</Link>
                      </td>
                 
              </tr>
          )
      })]
  }
  



let status1,status2;


if(!categorylist.length){
    status1 = [
        <div className=" text-danger">NO RECORD FOUND</div>
      ]
            
}

if(!approvedorders.length){
    status1 = [
        <div className=" text-danger">NO RECORD FOUND</div>
      ]
            
}
  


let Viewcategory_HTMLTABLE ;
if(loading)
{
    return <h4> Loading...... </h4>
}

else{
    Viewcategory_HTMLTABLE =[

    categorylist.slice(0,4).reverse().map((items)=>
    {

        return(
            <tr key={items.orderno}>
                <td>{items.orderno}</td>
                <td>{items.orderdate}</td>
                <td>{items.branchname}</td>
                <td>
                        <Link to={`Vieworder/${items.id}`} className="btn btn-success btn-sm">View</Link>
                    </td>
               
            </tr>
        )
    })]
}

const name = localStorage.getItem('auth_name')

    return (
        <div className="container-fluid">
<h4 className="mt-3">Hi, {name}</h4>

                <main>
                    <div className="container-fluid px-5">
                        <h1 className="mt-4">Dashboard</h1>
                        <br></br>
                        <div className="row">
                            <div className="col-lg-3 col-6">
                                <div className="card admingrad1 text-white mb-4">
                                    <div className="card-body"><h3>{itemCount.itemcount}</h3><p>Total Items</p> </div>
                                    <div className="card-footer d-flex align-items-center justify-content-between">
                                        <Link className="small text-white stretched-link" to={`/admin/view-items`}>View Details</Link>
                                        <div className="large text-white"><FontAwesomeIcon icon={faArrowAltCircleRight} ></FontAwesomeIcon></div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-md-6">
                                <div className="card admingrad2 text-white mb-4">
                                    <div className="card-body"><h3>{apprOrderCount.approved_total_order}</h3><p>Total Approved Order</p> </div>
                                    <div className="card-footer d-flex align-items-center justify-content-between">
                                    <Link className="small text-white stretched-link" to={`/admin/approvedorder`}>View Details</Link>
                                        <div className=" text-white"><FontAwesomeIcon icon={faArrowAltCircleRight} ></FontAwesomeIcon></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card admingrad3 text-white mb-4">
                                    <div className="card-body"><h3>{pendingOrder.unapprovedcount}</h3> <p>Total Pending Order</p></div>
                                    <div className="card-footer d-flex align-items-center justify-content-between">
                                    <Link className="small text-white stretched-link" to={`/admin/viewReq`}>View Details</Link>
                                        <div className=" text-white"><FontAwesomeIcon icon={faArrowAltCircleRight} ></FontAwesomeIcon></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card admingrad4 text-white mb-4">
                                    <div className="card-body"><h3>{completedOrder.total_completed_order}</h3> <p>Total Processed Order</p></div>
                                    <div className="card-footer d-flex align-items-center justify-content-between">
                                    <Link className="small text-white stretched-link" to={`/admin/ViewFinalStock`}>View Details</Link>
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
                                       Pending Orders {status1}
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

                                            </tbody>
                                            </table>
                                                        </div>
                                </div>
                            </div>
                            <div className="col-xl-6">
                                <div className="card mb-4">
                                    <div className="card-header">
                                        <i className="fas fa-chart-bar me-1"></i>
                                        Approved Orders (Pending Stock Entry) {status2}
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

                                            </tbody>
                                            </table>
                                    </div>
                                </div>
                            </div>
                        </div>



                       
                    </div>
                </main>
            

</div>

    );
}
export default Dashboard