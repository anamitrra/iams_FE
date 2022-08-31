import React,{useState,useEffect,useRef} from "react";
import { Link,useHistory } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';
import { Modal, Button, Badge } from 'react-bootstrap';
import { useReactToPrint  } from "react-to-print";


function ReceivedStock(props) {
    const history =useHistory();
    const [loading, setLoading] = useState(true);
    const [catInput, setCategory] =useState([]);
    const [orderDetails, setOrderDetails] =useState([]);
    const [total, setTotal] =useState([]);


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
 
        axios.get(`/api/stockEntriesById/${ids}`).then(res=>{

            if(res.data.status===200){
                setCategory(res.data.stockentries);
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
 
        axios.get(`/api/stockEntriesById/${ids}`).then(res=>{

            if(res.data.status===200){
                setTotal(res.data.grandtotal);
            }

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


 let stockdetails = [
    
    catInput.map((items,index)=> {
                                
                               let status;
                               let button;
                               
        if (items.status=="2") {
            status = <Badge className="col-md-9" bg="danger">Pending</Badge> ;
         
            
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
</tr>
)
}) 
 ]

    
    return(
        <div className="container px-4">
            <Link to ="/admin/ViewFinalStock" className=" btn btn-primary btn-sm float-end">Back</Link>
            <div className="card mt-4">
                
                <div className="card-header" ref={componentRef}>
        <h2>Stocks:</h2>
        
        
      
        <div className="card-body" >

        
            <table className="table">

            <thead className="table-green">
                        <tr>
            
                            <th>Order Id</th> 
                            <th>Date</th> 
                            <th>Branch Name</th>  
                            <th>Remarks</th> 
                            <th>Total Amount</th> 
                           
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
                                    <td>{total}</td>   
                                      
                                    </tr>
                                )
                            })}
                           
                           
                        </tbody>

                </table>

    
      
               
            
       

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
    </div>
    <button onClick={handlePrint} className="btn btn-primary float-end mt-3">  Print </button> 
  </div>

    )
}

export default ReceivedStock


