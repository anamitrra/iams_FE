import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";
import swal from "sweetalert";

function DesignationCreate() {

  const [subcategoryInput, setSubcategory ] = useState({

      category_id:'',
      name:'',
      remarks:'',
      error_list:[],
  });

  const handleInput =(event)=>{
      event.persist();
          setSubcategory({...subcategoryInput,[event.target.name]:event.target.value});
    
      
  }


  const submitSubcategory=(event)=>{
      event.preventDefault();

 
const data ={
  
  designame:subcategoryInput.name,
 
}
         
      
      
      axios.post(`api/createdesignation`,data).then(res=>{
          if(res.data.status === 200)
          {
              swal('Success',res.data.message,'success');
            setSubcategory({
              
                name:'',
            

            })
          }
          else if(res.data.status ===409){
             
          }
      })
  }

  return (
    <> 
    <nav aria-label="breadcrumb ">
        <ol className="breadcrumb p-2">
        <li className="breadcrumb-item"><Link  to="/administrator/dashboard"  >Home</Link></li>
        <li className="breadcrumb-item active" aria-current="page">Designation</li>
        </ol>
    </nav>
    <div className="container-fluid ">
        <div className="row">
            <div className="col-md-6 mb-4">
                <div className="card shadow mb-4">                                                     
                    <div className="card-body"> 
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                            <a href="#"  className="nav-link active"  data-toggle="tab"   role="tab" aria-controls="home">Add</a>
                            </li>
                            <li className="nav-item">
                            <Link  to="/administrator/DesignationView" data-toggle="tab" className="nav-link" role="tab" aria-controls="profile">View</Link>
                          
                            </li>
                        
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane active" id="home" role="tabpanel">
                                <div className="row">
                                    <div className="col-md-12 mt-2"> 
                                        <form onSubmit={submitSubcategory} encType="multipart/form-data"> 
                                            <div className="form-group"> 
                                                <div className="row">
                                                    <div className="col-md-6">  
                                                        <label className="control-label">Designation:</label><span className="text-danger">*</span> 
                                                    </div>
                                                    <div className="col-md-12"> 
                                                        <input type ="text" name="name"  value={subcategoryInput.name} onChange={handleInput} className="form-control" required/>
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className="form-group"> 
                                                <div className="row">
                                                 
                                                    <div className="col-md-12 mt-3">
                                                        <button type="submit" className="btn btn-success "> Save</button>
                                                        <button type="clear" className="btn btn- btn-danger ml-2"> Clear</button>
                                                    </div>
                                                    <div className="col-md-12">
                                                        
                                                     
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

export default DesignationCreate