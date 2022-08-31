/* eslint-disable no-restricted-globals */
import React,{useState,useEffect} from "react";
import { Link,useHistory } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';
import { BsFillTrashFill,BsFillPencilFill } from "react-icons/bs";



function EditCategory(props){

    const history =useHistory();
    const [loading, setLoading] = useState(true);
    const [catInput, setCategory] =useState([]);
    // const [error, setError]=useState([]);

    useEffect(()=>{

    const category_id= props.match.params.id; 
    
        axios.get(`/api/edit-category/${category_id}`).then(res=>{

            if(res.data.status===200){
                setCategory(res.data.category);
            }

            else if(res.data.status===404)
            {
                swal("Error",res.data.massage,"error");
                
                

            }
            setLoading(false);

        });
},[props.match.params.id, history]);



    const handleInput =(event) =>{
        event.persist();
        setCategory({...catInput, [event.target.name]: event.target.value});
    }
    
    
    const updateCategory = (event)=>{
        event.preventDefault();

        const category_id=props.match.params.id;
        const data =catInput;
        axios.put(`api/update-category/${category_id}`,data).then(res=>{

            if(res.data.status===200){
                swal("Success",res.data.message,"success");

            }

        });
    }  







    return(
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
                                <a   className="nav-link active"  data-toggle="tab"   role="tab" aria-controls="home">Edit</a>
                                </li>
                                <li className="nav-item">
                                <Link  to="/admin/view-category" data-toggle="tab" className="nav-link" role="tab" aria-controls="profile">View</Link>
                            
                                </li>
                            
                            </ul>
                            <div className="tab-content">
                                <div className="tab-pane active" id="home" role="tabpanel">
                                    <div className="row">
                                        <div className="col-md-12 mt-2"> 
                                        
                                                    <form  onSubmit={updateCategory} id="CAT_Form" className="form-horizontal bucket-form">
                                                        <div className="form-group"> 
                                                            <div className="row">
                                                            <div className="col-md-3">
                                                            <label className="control-label">Category Name :</label><span className="text-danger">*</span>
                                                            </div>
                                                                <div className="col-md-12">
                                                                <input type ="text" name="name" className="form-control mb-2"  value={catInput.name} onChange={handleInput}    />

                                                                </div>    
                                                            </div>   
                                                        </div> 
                                                        <div className="form-group"> 
                                                            <div className="row">
                                                                <div className="col-md-12"> 
                                                                    <button type="submit"  className="btn btn-primary btn-sm"><BsFillPencilFill/> Update</button> 
                                                                    <Link  to="/admin/view-category" className="btn btn-sm btn-danger ml-2"  >Cancel</Link>
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

export default EditCategory;