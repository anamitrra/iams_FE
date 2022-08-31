import React,{useState,useEffect,useRef} from "react";
import { Link,useHistory } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';
import { useReactToPrint  } from "react-to-print";
import { Button } from "react-bootstrap";
import "../../../assets/admin/css/print_bill.css";

const OrderpdfAdmin=(props)=>{

    const history =useHistory();
    const [loading, setLoading] = useState(true);
    const [catInput, setCategory] =useState([]);
    const [orderDetails, setOrderDetails] =useState([]);
    

    const componentRef = useRef();
    const handlePrint = useReactToPrint ({
        content: () => componentRef.current,
      });

     

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
    
    let Supplier;

    Supplier=[
        orderDetails.map((item)=>{
            return(
                <p>{item.supplier}</p>
            )
                
            
        })
    ]

    let orderNo;

    orderNo=[
        orderDetails.map((item)=>{
            return(
                item.actual_orderno
            ) 
        })
    ]

    let date;

    date=[
        orderDetails.map((item)=>{
            return(
                item.actual_orderdate
            ) 
        })
    ]

    let signedby;

    signedby=[
        orderDetails.map((item)=>{
            if(item.signed_by==="DC")
            return(
                <>DEPUTY COMMISSIONER</>
            ) 
            else if(item.signed_by==="ADC"){
               return( 
               <>Addl DEPUTY COMMISSIONER</>
               )
            }
        })
    ]
    const ids= props.match.params.id; 
    let backbtn = [


    <div className="row">
    
 
    <div className="col-md-12 ">
        <Link to={`/admin/viewReq`} className="btn btn- btn-danger ml-2 float-end">Back</Link>
    </div>
</div> 



]

    let breadcrumb=[
        <nav aria-label="breadcrumb ">
        <ol className="breadcrumb p-2">
        <li className="breadcrumb-item"><Link  to="/admin/dashboard"  >Home</Link></li>
        <li className="breadcrumb-item"><Link  to="/admin/approvedorder"  >View Approved Orders</Link></li>
        <li className="breadcrumb-item"><Link  to={`/admin/Viewfinalorder/${ids}`}   >Ordered Items</Link></li>
        <li className="breadcrumb-item active" aria-current="page">Generate Bill</li>
        </ol>
    
    </nav>
    ]
   
    return(

        <> 
       {breadcrumb}
      
      
       <div className="container px-4" >

       {backbtn}

        <div className="container px-4" ref={componentRef}>


       



            <div  className="card mt-4">
                <div className="mains">
            <center>
        <div className="bodys">
          GOVERNMENT OF ASSAM OFFICE OF THE DEPUTY COMMISSIONER :::::::::::::::::::::::::::::::: GOLAGHAT
          (NAZARAT BRANCH)
        </div>
      </center>
      <div class="subheading">
        <p>No. {orderNo}</p>
        <p>Dated Golaghat the {date}</p>
      </div>

      <br />
      <div className="text">
        To, <br />
       {Supplier}
        <br />
        <p>
            &emsp; &emsp; You are hereby requested to supply the under mentioned articles as per
          approved rate / companies fixed price and submit bill in duplicate at
          D.C.'s Nazarat Branch, Golaghat for payment along with this indent.
        </p>
      </div>
      <div class="subheading">
        <p>List of items:</p>
     
      </div>



                <div className="card-header">
        
        
      <div>
               
            
       

        <div  className="card-body">
                    <table className="table">
                        <thead className="table">
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
               </div>
               <br/>
      <div className="signature">
        {signedby} <br />
             Golaghat
      </div>
               </div>
              
    </div>
    </div>
    
</div>
<button onClick={handlePrint} className="btn btn-primary float-end mt-3">  Print </button> 
</div>

  </>

    )

}

export default OrderpdfAdmin;