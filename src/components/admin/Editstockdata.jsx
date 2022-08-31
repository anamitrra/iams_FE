import React,{useState,useEffect} from "react";
import { Link,useHistory } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';

function Editstockdata(props) {
  const history = useHistory();
  const [stockInput, setStock ] = useState({});

  const handleInput =(event)=>{
    event.persist();
    setStock({...stockInput,[event.target.name]:event.target.value});
}

const submit=(event)=>{


  const id= props.match.params.id; 
  event.preventDefault(); 

  swal({
    title: "Are you sure?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })

  .then((willDelete) => {
    if (willDelete) {
        const data ={
            cgst:stockInput.cgst,
            sgst:stockInput.sgst,
            billno:stockInput.billno,
            billdate:stockInput.billdate,
            supplierrate:stockInput.supplierrate,
            supply_on:stockInput.supplyon,
      
        } 
        axios.put(`api/Stock-entry-final/${id}`,data).then(res=>{ 
            swal("Success",res.data.message,"success");
            history.goBack();
        })

    }
});


 
}

const id= props.match.params.id; 
let breadcrumb = [
    <nav aria-label="breadcrumb ">
      <ol className="breadcrumb p-2">
      <li className="breadcrumb-item"><Link  to="/admin/dashboard"  >Home</Link></li>
      <li className="breadcrumb-item"><Link  to="/admin/stockentry" >Orders</Link></li>
      <li className="breadcrumb-item"><Link  to={`/admin/StockView/${id}`} >Stock List</Link></li>
      <li className="breadcrumb-item active" aria-current="page">Billing-Details</li>
      </ol>
  </nav>
]



  return (
    <>
{breadcrumb}



      <div className="container-fluid ">
          <div className="row">
              <div className="col-md-6 mb-4">
                  <div className="card shadow mb-4">                                                     
                      <div className="card-body"> 
                          <div className="tab-content">
                              <div className="tab-pane active" id="home" role="tabpanel">
                                  <div className="row">
                                      <div className="col-md-12 mt-2"> 

                                          <form onSubmit={submit} encType="multipart/form-data" className="form-horizontal bucket-form">

                                         

                                          <div className="form-group"> 
                                                    <div className="row">
                                                        <div className="col-md-6">  
                                                            <label className="control-label"> Supply On :</label><span className="text-danger">*</span> 
                                                        </div>
                                                        <div className="col-md-12"> 
                                                        <input type ="date" name="supplyon" className="form-control mb-2"   value={stockInput.supplyon}  onChange={handleInput} required /> 
                                                        </div>
                                                    </div> 
                                                </div>
                                                <div className="form-group"> 
                                                    <div className="row">
                                                        <div className="col-md-6">   
                                                            <label className="control-label">Supplier Rate: </label><span className="text-danger">*</span> 
                                                        </div>
                                                        <div className="col-md-12"> 
                                                            <input type ="text" name="supplierrate" className="form-control mb-2"       value={stockInput.supplierrate}     onChange={handleInput} required />
                                                        </div> 
                                                    </div> 
                                                </div> 
                                                <div className="form-group"> 
                                                    <div className="row">
                                                        <div className="col-md-6">   
                                                            <label className="control-label">CGST: </label><span className="text-danger">*</span> 
                                                        </div>
                                                        <div className="col-md-12"> 
                                                        <input type ="text" name="cgst" className="form-control mb-2"  value={stockInput.cgst} onChange={handleInput}  required/> 
                                                        </div> 
                                                    </div> 
                                                </div>
                                                <div className="form-group"> 
                                                    <div className="row">
                                                        <div className="col-md-6">   
                                                            <label className="control-label">SGST: </label><span className="text-danger">*</span> 
                                                        </div>
                                                        <div className="col-md-12"> 
                                                        <input type ="text" name="sgst" className="form-control mb-2"  value={stockInput.sgst} onChange={handleInput}  required/> 
                                                        </div> 
                                                    </div> 
                                                </div>
                                                <div className="form-group"> 
                                                    <div className="row">
                                                        <div className="col-md-6">   
                                                            <label className="control-label">Bill-No: </label><span className="text-danger">*</span> 
                                                        </div>
                                                        <div className="col-md-12"> 
                                                        <input type ="text" name="billno" className="form-control mb-2"  value={stockInput.billno} onChange={handleInput}  required/> 
                                                        </div> 
                                                    </div> 
                                                </div>
                                                <div className="form-group"> 
                                                    <div className="row">
                                                        <div className="col-md-6">   
                                                            <label className="control-label">Bill-Date: </label><span className="text-danger">*</span> 
                                                        </div>
                                                        <div className="col-md-12"> 
                                                        <input type ="date" name="billdate" className="form-control mb-2"  value={stockInput.billdate} onChange={handleInput}  required/> 
                                                        </div> 
                                                    </div> 
                                                </div>
                                                <div className="form-group"> 
                                                    <div className="row">
                                                      <div className="col-md-12">
                                                          <button type="submit" className="btn btn-info mt-2"> Save</button>
                                                      </div>
                                                  </div> 
                                              </div>  
                                          </form>  
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>  

    </>
  )
}

export default Editstockdata