import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";
import swal from "sweetalert";

import { BsFillTrashFill,BsSave2Fill } from "react-icons/bs";


function Category()

{

    const[catInputs,setCat] = useState({
        catName:'',
        error_list:[],
    });
    

    const handleInput = (event)=>{
      event.persist();
        setCat({...catInputs,[event.target.name]:event.target.value})
    }
      



    const submitCat = (event) =>{
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
                    name:catInputs.name,
                }
        
        
                axios.post(`api/savecat`, data).then(res =>{
                    if(res.data.status === 200)
                    {
                        swal('Success',res.data.message,"Success");
        
                        setCat({
                            name:'',
                            error_list: '',
                
                        })
                      
                    }
        
                    else if(res.data.status === 400)
                    {
                        setCat({...catInputs, error_list:res.data.errors})
                        swal('Error',catInputs.error_list.name,'error')
                      
                    }
        
                    else if(res.data.status === 409)
                    {
                        swal('Error',res.data.message,'error')
                    }
        
                   
                });
            }
        });
  
            
        
    } 

    const clear = ()=>{
        setCat({
            name:'',
            error_list: '',

        })
    }



    return (
        <>  
        <nav aria-label="breadcrumb ">
            <ol className="breadcrumb p-2">
            <li className="breadcrumb-item"><Link  to="/admin/dashboard"  >Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Categories</li>
            </ol>
        </nav>
        <div className="container-fluid ">
            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="card shadow mb-4">                                                     
                        <div className="card-body"> 
                            <ul className="nav nav-tabs" role="tablist">
                                <li className="nav-item">
                                <Link to ="/admin/category" className="nav-link active"  data-toggle="tab"   role="tab" aria-controls="home">Add</Link>
                                </li>
                                <li className="nav-item">
                                <Link  to="/admin/view-category" data-toggle="tab" className="nav-link" role="tab" aria-controls="profile">View</Link>
                              
                                </li>
                            
                            </ul>
                            <div className="tab-content">
                                <div className="tab-pane active" id="home" role="tabpanel">
                                    <div className="row">
                                        <div className="col-md-12 mt-2"> 
                                        
                                                    <form onSubmit={(submitCat)} id="CAT_Form" className="form-horizontal bucket-form">
                                                        <div className="form-group"> 
                                                            <div className="row">
                                                            <div className="col-md-4">
                                                            <label className="control-label">Category Name :</label><span className="text-danger">*</span>
                                                          <div>
                                                          <span className="text-danger">{catInputs.error_list.name}</span>
                                                          </div>
                                                            </div>
                                                                <div className="col-md-12">
                                                                    <input  placeholder='Category Name'  type ="text" name="name" value={catInputs.name} onChange={handleInput}  className="form-control mb-2" 
                                     
                                                                    />
                                                                 
                                                                </div>    
                                                            </div>   
                                                        </div> 
                                                        <div className="form-group"> 
                                                            <div className="row">
                                                                <div className="col-md-12"> 
                                                                   <button type="button" onClick={(submitCat)} className="btn btn-sm btn-success ">  <BsSave2Fill/> Save</button> 
                                                                    <button type="button" onClick={(clear)} className="btn btn-sm btn-danger ml-3 "> <BsFillTrashFill/> Clear</button> 
                                                                   
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
    );
}
export default Category