import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";
import swal from "sweetalert";
import { BsFillTrashFill,BsSave2Fill } from "react-icons/bs";

// api/savesub
function Subcategory()
{

    const [categorylist, setCategorylist] = useState([]);
    const [subcategoryInput, setSubcategory ] = useState({

        category_id:'',
        name:'',
        remarks:'',
        error_list:[],
    });

    const handleInput =(event)=>{
        event.persist();
            setSubcategory({...subcategoryInput,[event.target.name]:event.target.value,});  
        
    }

    useEffect(()=>{
        axios.get(`api/categories`).then(res=>{
            if(res.data.status ===200){
                setCategorylist(res.data.categories);
            }

        });
    },[]);

    

    const submitSubcategory=(event)=>{
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
                    catid:subcategoryInput.category_id,
                    name:subcategoryInput.name,
                    remarks:subcategoryInput.remarks,
                }
                           
                        
                        
                        axios.post(`api/savesub`,data).then(res=>{
                            if(res.data.status === 200)
                            {
                                swal('Success',res.data.message,'success');
                              setSubcategory({
                                category_id:'',
                                name:'',
                                remarks:'',
                                error_list:'',
                              })
                            }
                            else if(res.data.status ===400){
                                setSubcategory({...subcategoryInput, error_list:res.data.errors})
                            }
                        })
                
            }
        });
   

    }


    const clear = ()=>{
        setSubcategory({
            category_id:'',
            name:'',
            error_list: '',
            remarks:'',

        })
    }


    return (
        <> 
        <nav aria-label="breadcrumb ">
            <ol className="breadcrumb p-2">
            <li className="breadcrumb-item"><Link  to="/admin/dashboard"  >Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Sub-Categories</li>
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
                                <Link  to="/admin/viewSub" data-toggle="tab" className="nav-link" role="tab" aria-controls="profile">View</Link>
                              
                                </li>
                            
                            </ul>
                            <div className="tab-content">
                                <div className="tab-pane active" id="home" role="tabpanel">
                                    <div className="row">
                                        <div className="col-md-12 mt-2"> 
                                            <form onSubmit={submitSubcategory} encType="multipart/form-data"> 
                                                <div className="form-group"> 
                                                    <div className="row">
                                                        <div className="col-md-3">
                                                            <label className="control-label">Category:</label><span className="text-danger">*</span> 
                                                        </div>
                                                        <div className="col-md-12"> 
                                                            <select name="category_id" onChange={handleInput} value={subcategoryInput.category_id}   className="form-control">
                                                                <option>select Category</option>
                                                                {
                                                                    categorylist.map((item)=>{
                                                                        return(
                                                                        <option value={item.id} key={item.id}>{item.name}</option>
                                                                        )
                                                                    })
                                                                }    
                                                            </select>
                                                        </div> 
                                                    </div>
                                                </div>
                                                <div className="form-group"> 
                                                    <div className="row">
                                                        <div className="col-md-6">  
                                                            <label className="control-label">Sub-Category Name:</label><span className="text-danger">*</span> 
                                                        </div>
                                                        <div className="col-md-12"> 
                                                        <span className="text-danger">{subcategoryInput.error_list.name}</span>
                                                            <input type ="text" name="name"  value={subcategoryInput.name} onChange={handleInput} className="form-control" required/>
                                                        </div>
                                                    </div> 
                                                </div>
                                                <div className="form-group"> 
                                                    <div className="row">
                                                        <div className="col-md-6">   
                                                            <label className="control-label">Remarks:</label> 
                                                        </div>
                                                        <div className="col-md-12"> 
                                                            <input type ="text" name="remarks" value={subcategoryInput.remarks} onChange={handleInput} className="form-control"/> 
                                                        </div>
                                                        <div className="col-md-12 mt-3">
                                                            <button type="submit" className="btn btn-success "><BsSave2Fill/> Save</button>
                                                            <button type="clear" onClick={clear} className="btn btn- btn-danger ml-2"><BsFillTrashFill/>Clear</button>
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
    );
}
export default Subcategory