/* eslint-disable no-restricted-globals */
import React,{useState,useEffect,useRef} from "react";
import { Link,useHistory } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';
import { Modal, Button } from 'react-bootstrap';
import { useReactToPrint  } from "react-to-print";




function ViewfinalorderAdmin(props){

    const history =useHistory();
    const [loading, setLoading] = useState(true);
    const [catInput, setCategory] =useState([]);
    const [orderDetails, setOrderDetails] =useState([]);
    const [printInfo, setprintinfo] = useState([]);

    // /////////////////////Modal Control//////////////////////

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    /////////////////////////////////////////////////////////
    


    const componentRef = useRef();
    const handlePrint = useReactToPrint ({
        content: () => componentRef.current,
      });


    useEffect(()=>{

    const ids= props.match.params.id; 
 
        axios.get(`api/getOrderItems/${ids}`).then(res=>{

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
    
    
///////////////////////////////////////////////////////////////////////////


const handleInput =(event)=>{
    event.persist();
        setprintinfo({...printInfo,[event.target.name]:event.target.value});
    
}



const submitPrintinfo=(event)=>{
    event.preventDefault();


const data ={
catid:printInfo.category_id,
name:printInfo.name,
remarks:printInfo.remarks,
}
       
    
    
    axios.post(`api/savesub`,data).then(res=>{
        if(res.data.status === 200)
        {
            swal('Success',res.data.message,"Success");
          setprintinfo({
            category_id:'',
            name:'',
            remarks:'',

          })
        }
    })
}


///////////////////////////////////////////////////////////////////////////

// useEffect(()=>{

//     const ids= props.match.params.id; 
 
//         axios.put(`/api/OrderMaster-edit-final/${ids}`).then(res=>{

//             if(res.data.status===200){
//                 setprintinfo(res.data.orderitems);
//             }

//             else if(res.data.status===404)
//             {
//                 swal("Error",res.data.message,"error");     
//             }
//             setLoading(false);
//         });

// },[props.match.params.id, history]);

    
///////////////////////////////////////////////////////////////////////////
    
       const handleDecrement = (item_id)=> {

        setCategory(catInput=>
            catInput.map((item)=>
            item_id===item.id ? {...item, finalquanity: item.finalquanity - (item.finalquanity > 1 ? 1:0) }:item
            )
        );
        updateFinalQty(item_id,"dec");
       }

       const handleIncrement = (item_id)=> {

        setCategory(catInput=>
            catInput.map((item)=>
            item_id===item.id ? {...item, finalquanity: item.finalquanity + 1 }:item
            )
       
            );
            updateFinalQty(item_id,"inc");
       }

        
       function updateFinalQty(item_id,scope){
        axios.put(`api/updateOrderItem/${item_id}/${scope}`).then(res=>{

            if(res.data.status===200){
                swal("Success", res.data.message, "success");
            }

        });
       }
       const id= props.match.params.id; 


       const submitOrder =()=> {
        axios.put(`api/updateOrderMaster/${id}`).then(res=>{
            
            if(res.data.status===200){
                swal("Success", res.data.message, "success");
            }
        });
       }
    


    return(
        <>  <nav aria-label="breadcrumb ">
        <ol className="breadcrumb p-2">
        <li className="breadcrumb-item"><Link  to="/admin/dashboard"  >Home</Link></li>
        <li className="breadcrumb-item"><Link  to="/admin/approvedorder"  >View Approved Orders</Link></li>
        <li className="breadcrumb-item active" aria-current="page">Ordered Items</li>
        
        </ol>
    </nav>
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
        <h2>View Order</h2>

        <Link to ="/admin/approvedorder" className="btn btn-danger float-end">Back</Link>
      
        <div className="form-group"> 
                                                            <div className="row">
                                                                <div className="col-md-12"> 
                                                                  
                                                                <Link to ={`/admin/orderpdf/${id}`} className="btn btn-primary float-end">Generate Bill</Link>
                                                                   
                                                                </div>    
                                                            </div>  
                                                        </div>
        
      <div className="row">
    
      

            <div className="col-lg-4 col-6">
            
            <div className="card-body">
        {orderDetails.map((item)=>{
        return(<>
        
        <ul >
        <li className="text-center">Order Details</li>    
  <li class="list-group-item">Order ID: {item.orderno}</li>
  <li class="list-group-item">Branch Name: {item.branchname}</li>
  <li class="list-group-item">Remarks: {item.remarks}</li>
  <li class="list-group-item">Date: {item.actualdate}</li>
</ul>


</>
     )
    })}

</div>
</div>

<div className="col-xl-3 col-md-8">
        {orderDetails.map((item)=>{
        return(<>
        
        <ul class="mt-3">

    <li className="text-center">Billing Details:</li>  
  <li class="list-group-item">Order No: {item.actual_orderno}</li>
  <li class="list-group-item">Billing Date: {item.actual_orderdate}</li>
  <li class="list-group-item">Supplier Name: {item.supplier}</li>
  <li class="list-group-item">Signed By: {item.signed_by}</li>
</ul>


</>
     )
    })}

</div>
</div>
</div>



            {/* <table className="table">

            <thead className="table-green">
                        <tr>
            
                            <th>Order Id</th> 
                            <th>Date</th> 
                            <th>Branch Name</th>  
                            <th>Remarks</th> 
                            <th>Action</th> 
                        </tr>
                        </thead>

                        <tbody>
                            {orderDetails.map((item)=>{
                                return(
                                    <tr>
                                    <td>{item.orderno}</td>
                                    <td>{item.orderdate}</td>
                                    <td>{item.branchname}</td>
                                    <td>{item.remarks}</td>
                                    <td>
                        <Link to={`/admin/orderpdf/${item.id}`} className="btn btn-success btn-sm">Print</Link>
                    </td>
                                    </tr>
                                )
                            })}
                           
                           
                        </tbody>

                </table> */}

    
       
               
            
       

        <div className="card-body">
                    <table class="table table-striped">
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
                    <td  > {items.catname}</td>  
                    <td  > {items.subcatname}</td>  
                    <td  > {items.itemname}</td>  
                    <td >{items.description}</td> 
                    <td width="">{items.finalquanity}</td> 
                 
                    </tr>
)
        })}

                            
                        </tbody>
                    </table> 
               </div>
               <div>
               
               </div>
    </div>



  </div>
  </>
    )


}

export default ViewfinalorderAdmin;