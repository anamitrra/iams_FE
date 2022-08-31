import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import React from "react";
import axios from "axios";
import swal from "sweetalert";


export default function UserCreate() {
    const history = useHistory();
  const [role, setRole] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [branch, setBranch] = useState([]);

  const [userInput, setuserInput ] = useState({
      username:'',
      email:'',
      mobile:'',
      password:'',
      designame:'',
      branch:'',
      role:'',
      error_list:[],
  });



  const handleInput =(event)=>{
    event.persist();
        setuserInput({...userInput,[event.target.name]:event.target.value});
  }



  useEffect(()=>{
    axios.get(`api/getroles`).then(res=>{
        if(res.data.status ===200){
            setRole(res.data.rloes);
        }

    });
},[]);


useEffect(()=>{
  axios.get(`api/getdesignations`).then(res=>{
      if(res.data.status ===200){
        setDesignation(res.data.designations);
      }

  });
},[]);

useEffect(()=>{
  axios.get(`api/branchlist`).then(res=>{
      if(res.data.status ===200){
        setBranch(res.data.branches);
      }

  });
},[]);


const submit= (event) =>{
  event.preventDefault();
        
  const data ={
      name:userInput.username,
      email:userInput.email,
      mobile:userInput.mobile,
      role:userInput.role,
      designation:userInput.designame,
      password:userInput.password,
      branchid:userInput.branch,
  }


  axios.post(`api/createuser`, data).then(res =>{
      if(res.data.status === 200)
      {

          swal('Success',res.data.message,"success");
          history.push(`/administrator/UserView`)

      }

      else if(res.data.status === 400)
      {
          setuserInput({...userInput, error_list:res.data.errors})  
      }
  });
      

} 

  return (
    <> 
    <nav aria-label="breadcrumb ">
        <ol className="breadcrumb p-2">
        <li className="breadcrumb-item"><Link  to="/administrator/dashboard"  >Home</Link></li>
        <li className="breadcrumb-item active" aria-current="page">Users</li>
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
                            <Link  to="/administrator/UserView" data-toggle="tab" className="nav-link" role="tab" aria-controls="profile">View</Link>
                          
                            </li>
                        
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane active" id="home" role="tabpanel">
                                <div className="row">
                                    <div className="col-md-12 mt-2"> 
                                        <form onSubmit={submit} encType="multipart/form-data"> 
                                            <div className="form-group"> 
                                                <div className="row">

                                                <div className="col-md-5">
                                                        <label className="form=label font-weight-bold">Branch:</label><span className="text-danger font-weight-bold">*</span>  
                                                        
                                                        <select name="branch"  value={userInput.branch} onChange={handleInput}  className="form-select" >
                                                                <option >select Branch</option>
                                                                {
                                                                    branch.map((item)=>{
                                                                        return(
                                                                        <option value={item.id} key={item.id} required>{item.branchname}</option>
                                                                        )
                                                                    })
                                                                }    
                                                            </select>
                                                           
                                                        </div> 

                                                        <div className="col-md-5">
                                                        <label className="form=label font-weight-bold">Designation:</label><span className="text-danger font-weight-bold">*</span>  
                                                        
                                                        <select name="designame"  value={userInput.designame} onChange={handleInput}   className="form-select" >
                                                                <option >select Designation</option>
                                                                {
                                                                    designation.map((item)=>{
                                                                        return(
                                                                        <option value={item.id} key={item.id} required>{item.designame}</option>
                                                                        )
                                                                    })
                                                                }    
                                                            </select>
                                                           
                                                        </div> 

                                                        <div className="col-md-5">
                                                        <label className="form=label font-weight-bold">Role:</label><span className="text-danger font-weight-bold">*</span>  
                                                        
                                                        <select name="role"  value={userInput.role}  onChange={handleInput}  className="form-select" >
                                                                <option >select Role</option>
                                                                {
                                                                    role.map((item)=>{
                                                                        return(
                                                                        <option value={item.id} key={item.id} required>{item.rolename}</option>
                                                                        )
                                                                    })
                                                                }    
                                                            </select>
                                                           
                                                        </div> 

                                                    <div className="col-md-6 mt-3">  
                                                        <label className="control-label">User Name:</label><span className="text-danger">*</span> 
                                                        <input type ="text" name="username"  value={userInput.username} onChange={handleInput} className="form-control" required/>
                                                    </div>

                                                    <div className="col-md-6 mt-3">  
                                                        <label className="control-label">Email:</label><span className="text-danger">*</span> 
                                                        <input type ="text" name="email"  value={userInput.email} onChange={handleInput} className="form-control" required/>
                                                    </div>

                                                    <div className="col-md-6 mt-3">  
                                                        <label className="control-label">Phone No:</label><span className="text-danger">*</span> 
                                                        <input type ="text" name="mobile"  value={userInput.mobile} onChange={handleInput} className="form-control" required/>
                                                    </div>

                                                    <div className="col-md-6 mt-3">  
                                                        <label className="control-label">Password:</label><span className="text-danger">*</span> 
                                                        <input type ="password" name="password"  value={userInput.password} onChange={handleInput} className="form-control" required/>
                                                    </div>
                                                    
                                                </div> 
                                            </div>
                                            <div className="form-group"> 
                                                <div className="row">
                                                 
                                                    <div className="col-md-12 mt-3">
                                                        <button type="submit" onClick={submit} className="btn btn-info "> Save</button>
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
