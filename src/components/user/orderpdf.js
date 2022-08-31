/* eslint-disable no-restricted-globals */
import React,{useState,useEffect,useRef} from "react";
import { Link,useHistory } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';
import { useReactToPrint  } from "react-to-print";
import { Button } from "react-bootstrap";
import "../../assets/admin/css/print_bill.css";

const Orderpdf=(props)=>{

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

    useEffect(()=>
    {
      handlePrint();
    },[]);
    return(

        <> 
        
        
        <Link to ="/user/approved-order" className=" btn btn-primary btn-sm float-end">Back</Link>

        


        <button onClick={handlePrint} className="print__button">  Print </button> 
        
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
                    <td width="">{items.quantity}</td> 
                 
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

  </>

    )


}

export default Orderpdf;