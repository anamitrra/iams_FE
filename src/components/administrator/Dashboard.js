import "../../assets/admin/css/sb-admin-2.css" ;
import "../../assets/admin/css/sb-admin-2.min.css" ;
import "../../assets/admin/css/admin.css" ;
import React,{useState,useEffect} from "react";
import { Link,useHistory } from "react-router-dom";
import axios, { Axios } from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDot, faTachometerAlt, faArrowAltCircleRight ,faNotesMedical } from '@fortawesome/free-solid-svg-icons'
import {BsZoomIn } from "react-icons/bs";
import { Helmet } from 'react-helmet';





const AdminDashboard=()=>
{

  const [loading, setLoading] = useState(true);
  const [categorylist, setCategorylist] = useState();
  const [itemCount, setItemCount] = useState([]);
  const [apprOrderCount, setapprOrderCount] = useState([]);
  const[ pendingOrder, setPendingOrder] = useState([]);
  const[ completedOrder, setcompletedOrder] = useState([]);
  const[ approvedorders, setapprovedorders] = useState([]);
  
  
  useEffect(()=>{
  axios.get(`api/get-all-users`).then(res=>{

      if(res.status === 200)
      {
          setCategorylist(res.data.users)
      }
      
      setLoading(false);

  });

},[]);



useEffect(()=>{
  itemcount();
  approvedOrderCount();
  PendingOrder();
  totaluser();
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

const totaluser= async () => {
  const { data } = await axios.get(`api/totaluser`);
  setcompletedOrder(data);
};



const approvedordersList= async () => {
  const { data } = await axios.get(`api/branchlist`);
  setapprovedorders(data.branches);
};

let sl =0;
let approveorderTable ;
if(loading)
{
    return <h4> Loading...... </h4>
}

else{
  approveorderTable =[
   
      approvedorders.slice(0,4).reverse().map((items)=>
    {
        
        return(
            
            <tr key={items.orderno}>
             
                <td>{sl=sl+1}</td>
                <td>{items.branchname}</td>
                <td>
                        <Link to={`/administrator/BranchMasterView`} className="btn btn-success btn-sm"><BsZoomIn/></Link>
                    </td>
               
            </tr>
        )
    })]
}




let Usl =0;
let Viewcategory_HTMLTABLE ;
if(loading)
{
  return <h4> Loading...... </h4>
}

else{
  Viewcategory_HTMLTABLE =[

  categorylist.slice(0,4).reverse().map((item)=>
  {

      return(
        <tr key={item.id}>
        <td>{Usl=Usl+1}</td>
        <td> {item.name}</td>   
        <td> {item.email}</td>   
        <td> {item.mobile}</td>   
        <td> {item.designationName}</td>   
        <td> {item.branch}</td>   
        <td> {item.roleName}</td>   
        <td>
                      <Link to={`/administrator/UserView`} className="btn btn-success btn-sm" ><BsZoomIn/></Link>
                  </td>
             
          </tr>
      )
  })]
}


const name = localStorage.getItem('auth_name')



 return(
<>



  <div className="container-fluid">
<h4 className="mt-3">Hi, {name}</h4>

  <main>
      <div className="container-fluid px-5">
          <h1 className="mt-4">Dashboard</h1>
          <br></br>
          <div className="row">
              <div className="col-lg-4 col-6">
                  <div className="card admingrad1 text-white mb-4">
                      <div className="card-body"><h3>{itemCount.itemcount}</h3><p>Total Items</p> </div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                          <Link className="small text-white stretched-link" to={`/administrator/AllItemAdmin`}>View Details</Link>
                          <div className="large text-white"><FontAwesomeIcon icon={faArrowAltCircleRight} ></FontAwesomeIcon></div>
                      </div>
                  </div>
              </div>

              <div className="col-xl-4 col-md-6">
                  <div className="card admingrad2 text-white mb-4">
                      <div className="card-body"><h3>{apprOrderCount.approved_total_order}</h3><p>Total Branch</p> </div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                      <Link className="small text-white stretched-link" to={`/administrator/BranchMasterView`}>View Details</Link>
                          <div className=" text-white"><FontAwesomeIcon icon={faArrowAltCircleRight} ></FontAwesomeIcon></div>
                      </div>
                  </div>
              </div>
           
              <div className="col-xl-4 col-md-6">
                  <div className="card admingrad4 text-white mb-4">
                      <div className="card-body"><h3>{completedOrder.total_user_count}</h3><p>Total Users</p></div>
                      <div className="card-footer d-flex align-items-center justify-content-between"> 
                      <Link className="small text-white stretched-link" to={`/administrator/UserView`}>Go</Link>
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
                       Users :
                      </div>
                      <div className="card-body">
                       <table class="table table-striped">
                          <thead className="table-dark">
                              <tr>
                                  <th>ID</th>
                                  <th>Branch name</th>
                                  <th> Email</th>
                                  <th>Phone</th>
                                  <th>Designation</th>
                                  <th>Branch</th>
                                  <th>Role</th>
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
                         Branch :
                      </div>
                      <div className="card-body">
                      <table class="table table-striped">
                          <thead className="table-dark">
                              <tr>
                                  <th>ID</th>
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
  
</>
 )
  
}
export default AdminDashboard