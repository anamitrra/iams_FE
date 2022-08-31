import React,{useState,useEffect,useRef} from "react";
import { Link,useHistory } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';
import { Modal, Button, Badge } from 'react-bootstrap';
import { useReactToPrint  } from "react-to-print";

function StockView(props) {
   
    const history =useHistory();
    const [loading, setLoading] = useState(true);
    const [catInput, setCategory] =useState([]);
    const [orderDetails, setOrderDetails] =useState([]);

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
 
        axios.get(`/api/getStockToUpdate/${ids}`).then(res=>{

            if(res.data.status===200){
                setCategory(res.data.stockmasters);
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
       
    })

    useEffect(()=>{

        const ids= props.match.params.id; 
        axios.get(`api/check-stock-submit/${ids}`)
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
    
       const id= props.match.params.id; 


       const submitOrder =()=> {
        axios.put(`api/updateOrderMaster/${id}`).then(res=>{
            
            if(res.data.status===200){
                swal("Success", res.data.message, "success");
            }
        });
       }
    let getid = (id)=>{
        let orderid = id;
console.log(orderid+"tabledd");
    }

 let stockdetails = [
    
    catInput.map((items,index)=> {
                               let status;
                               let button;
        if (items.status=="2") {
            status = <Badge className="col-md-10" bg="danger">Pending</Badge> ;
            button =  <Link to={`Editstockdata/${items.id}`} className="btn btn-success btn-sm">Entry/Edit</Link> 
            
        }
        else if (items.status == "1"){
            status = <> <Badge bg="success">Completed</Badge></>
        }
    
         return(
               

<tr key={items.id}>
<td  >{++index}</td>  
<td  > {items.itemname}</td>  
<td  > {items.description}</td>  
<td  > {items.quantity_in}</td> 
<td  > {items.supply_on}</td> 
<td  > {items.supplierrate}</td> 
<td  > {items.cgst}</td> 
<td  > {items.sgst}</td> 
<td  > {items.billno}</td> 
<td  > {items.billdate}</td> 
<td  > {status} </td> 
<td> {button}  </td>       
</tr>
)
}) 
 ]

    


    return(


<>  <nav aria-label="breadcrumb ">
      <ol className="breadcrumb p-2">
      <li className="breadcrumb-item"><Link  to="/admin/dashboard"  >Home</Link></li>
      <li className="breadcrumb-item"><Link  to="/admin/stockentry" >Orders</Link></li>
      <li className="breadcrumb-item active" aria-current="page">Stock Entry</li>
      </ol>
  </nav>
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
        <h2>Pending Stock Entry</h2>
        <Link to ="/admin/stockentry" className=" btn btn-primary btn-sm float-end">Back</Link>
        
      
        <div className="card-body">

            </div>
            <table className="table">

            <thead className="table-green">
                        <tr>
            
                            <th>Order Id</th> 
                            <th>Date</th> 
                            <th>Branch Name</th>  
                            <th>Remarks</th> 
                           
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
                                      
                                    </tr>
                                )
                            })}
                           
                           
                        </tbody>

                </table>

    
        </div>
               
            
       

        <div className="card-body">
                    <table className="table">
                        <thead className="table-dark">
                        <tr>
                        <th>SL No</th>  
                            <th>Item Name</th> 
                            <th>Description</th>
                            <th>Quantity-In</th> 
                            <th>Supply-On</th>
                            <th>Supply-Rate</th>
                            <th>CGST</th>
                            <th>SGST</th>
                            <th>Bill-No.</th>
                            <th>Bill-Date</th>
                            <th>Status</th>
                            <th>Action</th>
                            
                        </tr>
                        </thead>
                        <tbody>
                            
                            {stockdetails}

                            
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

export default StockView