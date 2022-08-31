import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch} from '@fortawesome/free-solid-svg-icons';
import {BsFillArrowRightCircleFill } from "react-icons/bs";


function PendingOrders() {
 
    const [loading, setLoading] = useState(true);
    const [categorylist, setCategorylist] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); 
    

    useEffect(()=>{
    axios.get(`api/get-unapprovedorder-branchwise`).then(res=>{

        if(res.status === 200)
        {
            setCategorylist(res.data.ordermaster)
        }
        
        setLoading(false);

    });
},[]);




let Viewcategory_HTMLTABLE ;

    Viewcategory_HTMLTABLE =[

    categorylist.filter((items)=>
    {
        if(searchTerm==""){
            return items
        }
        else if(items.orderno.toLowerCase().includes(searchTerm.toLowerCase())){
            return items.orderno
        }
        else if(items.orderdate.toLowerCase().includes(searchTerm.toLowerCase())){
            return items.orderdate
        }
        else if(items.branchname.toLowerCase().includes(searchTerm.toLowerCase())){
            return items.branchname
        }
    }).reverse().map((items)=>
    {
        if(loading)
        {
            return (
            <tr>
                <td colspan="5">
                    Loading...
                </td>
            </tr>
            )
        }
        else{

        return(
            <tr key={items.orderno}>
                <td>{items.orderno}</td>
                <td>{items.orderdate}</td>
                <td>{items.branchname}</td>
                <td>
                        <Link to={`PendingOrderItems/${items.id}`} className="btn btn-success btn-sm">View <BsFillArrowRightCircleFill/></Link>
                    </td>
               
            </tr>
         ) 
        }
    })]


/////////////////////////////////////////////////////////////////////////

return (
    <>
      <nav aria-label="breadcrumb ">
        <ol className="breadcrumb p-2">
        <li className="breadcrumb-item"><Link  to="/admin/dashboard"  >Home</Link></li>
        <li className="breadcrumb-item active" aria-current="page">View Pending Orders</li>
        </ol>
    </nav>

   <div className="container px-4">

      
       
    <div className="card mt-4">
        <div className="card-header">
            <h4 className="text-center"> Pending Orders
    
            </h4>
        </div>
        <div class="input-group flex-nowrap mt-4">
  <span class="input-group-text" id="addon-wrapping"><FontAwesomeIcon icon={faSearch}/></span>
  <input type="search" class="form-control form-control-lg " placeholder="Type your keywords here..."  onChange={event=>{setSearchTerm(event.target.value)}}></input>
</div>

        <div className="card-body">
        <table class="table table-striped">
<thead className="table-dark">
<tr>
    <th>ID</th>
    <th>Date</th>
    <th>Branch Name</th>
    <th>View</th>
</tr>
</thead>
<tbody>
{Viewcategory_HTMLTABLE}
</tbody>
</table>

        </div>

    </div>
  

   </div>
   </>
);
    

}

export default PendingOrders