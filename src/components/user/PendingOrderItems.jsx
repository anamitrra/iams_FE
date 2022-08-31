/* eslint-disable no-restricted-globals */
import React,{useState,useEffect} from "react";
import { Link,useHistory,Redirect  } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faW } from '@fortawesome/free-solid-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {faUserEdit, faSave, faCoffee,   } from '@fortawesome/free-solid-svg-icons';

function PendingOrderItems(props) {
    const history =useHistory();
    const [loading, setLoading] = useState(true);
    const [catInput, setCategory] =useState([]);
    const [orderDetails, setOrderDetails] =useState([]);
    const [qty, setqty] = useState([]);



    


    useEffect(()=>{

    const ids= props.match.params.id; 
 
        axios.get(`/api/getOrderItems/${ids}`).then(res=>{

            if(res.data.status===200){
                setCategory(res.data.orderitems);
            }

            else if(res.data.status===404)
            {
                swal("Error",res.data.message,"error");     
            }
            setLoading(false);
        });

},[props.match.params.id, history]);




useEffect(()=>{

    const ids= props.match.params.id; 
 
        axios.get(`/api/getOrderItems/${ids}`).then(res=>{

            if(res.data.status===200){
                setqty(res.data.orderitems);
            }

            else if(res.data.status===404)
            {
                swal("Error",res.data.message,"error");     
            }
            setLoading(false);
        });

},[props.match.params.id, history]);


///////////////////////////////////////////////////////////////////////////


    useEffect(()=>{

        const ids= props.match.params.id; 
     
            axios.get(`api/orderById/${ids}`).then(res=>{
    
                if(res.data.status===200){
                    setOrderDetails(res.data.ordermaster);
                }
    
                else if(res.data.status===404)
                {
                    swal("Error",res.data.message,"error");     
                }
                setLoading(false);
            });
    
    },[props.match.params.id, history]);
    




    

////////////////////////////////////////////////////





  return (
    <>
    <nav aria-label="breadcrumb ">
    <ol className="breadcrumb p-2">
    <li className="breadcrumb-item"><Link  to="/user/dashboard"  >Home</Link></li>
    <li className="breadcrumb-item"><Link  to="/user/PendingOrders"  >View Pending Orders</Link></li>
    <li className="breadcrumb-item active" aria-current="page">Ordered Items</li>
    </ol>
</nav>

    <div className="container px-2">
        
    <div className="card-header">
        <h4 className="text-center"> Ordered Items
        <Link to ="/user/PendingOrders" className=" btn btn-danger btn-sm float-end">Back</Link>
        </h4>
    </div>
    <div className="card-body">
    {orderDetails.map((item)=>{
    return(<>
    
    <ul class="col-3">
    
<li class="list-group-item">order ID: {item.orderno}</li>
<li class="list-group-item">Branch Name: {item.branchname}</li>
<li class="list-group-item">Remarks: {item.remarks}</li>
<li class="list-group-item">Date: {item.actualdate}</li>
</ul>


</>
 )
})}

</div>

    <div className="card-body">
                <table className="table">
                    <thead className="table-dark">
                    <tr>
                    <th>SL No</th>  
                        <th>Category</th> 
                        <th>Sub-Category</th> 
                        <th>Item</th>  
                        <th>Description</th> 
                        <th>Quantity</th>
                    </tr>
                    </thead>
                    <tbody>

                         {catInput.map((items,index)=> {
                             return(

         
                  <tr key={items.id}>
                 <td  >{++index}</td>  
                <td > {items.subcatname}</td>  
                <td > {items.catname}</td>  
                <td > {items.itemname}</td>  
                <td >{items.description}</td> 
                <td >{items.finalquanity}</td> 
       
                </tr>
)
    })}

                        
                    </tbody>
                </table> 
           </div>
           <div>
           
           </div>
    
</div>







</>
  )
}

export default PendingOrderItems