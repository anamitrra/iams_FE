import React,{useState,useEffect} from "react";
import { Link,useHistory } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';


function EditSubCategory(props)
{
    const history =useHistory();
    const [loading, setLoading] = useState(true);
    const [subcategoryInput, setSubcategory ] = useState({

        category_id:'',
        name:'',
        remarks:'',
        error_list:[],
    });


    useEffect(()=>{

        const id= props.match.params.id; 
    
        axios.get(`api/edit-subcategory/${id}`).then(res=>{ 
            if(res.data.status ===200){
                setSubcategory(res.data.subcategory);
            }   
            setLoading(false);
        });
    },[]);  

    const handleInput =(event)=>{
        event.persist();
        setSubcategory({...subcategoryInput,[event.target.name]:event.target.value});
    }



    

    const submitSubcategory=(event)=>{
        const id= props.match.params.id; 
        event.preventDefault(); 
        const data ={
            catid:subcategoryInput.category_id,
            name:subcategoryInput.name,
            remarks:subcategoryInput.remarks,
        } 
        axios.put(`api/update-subcategory/${id}`,data).then(res=>{ 
            swal("Success",res.data.message,"success");
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
                                <a   className="nav-link active"  data-toggle="tab"   role="tab" aria-controls="home">Edit</a>
                                </li>
                                <li className="nav-item">
                                <Link  to="/admin/viewSub" data-toggle="tab" className="nav-link" role="tab" aria-controls="profile">View</Link>
                                </li> 
                            </ul>
                            <div className="tab-content">
                                <div className="tab-pane active" id="home" role="tabpanel">
                                    <div className="row">
                                        <div className="col-md-12 mt-2">                                         
                                            <form onSubmit={submitSubcategory} encType="multipart/form-data" className="form-horizontal bucket-form">
                                                <div className="form-group"> 
                                                    <div className="row">
                                                        <div className="col-md-3">
                                                            <label className="control-label">Category:</label><span className="text-danger">*</span> 
                                                        </div>
                                                 
                                                    </div>
                                                </div>
                                                <div className="form-group"> 
                                                    <div className="row">
                                                        <div className="col-md-6">  
                                                            <label className="control-label">Sub-Category Name:</label><span className="text-danger">*</span> 
                                                        </div>
                                                        <div className="col-md-12"> 
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
    );
}

export default EditSubCategory;