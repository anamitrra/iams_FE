import React,{useState,useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios'; 
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


function DesignationView() {
  const history =useHistory();
  const [loading, setLoading] = useState(true);
  const [categorylist, setCategorylist] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 

  useEffect(()=>{
  axios.get(`api/getdesignations`).then(res=>{ 
      if(res.status === 200)
      {
          setCategorylist(res.data.designations)
      } 
      setLoading(false);

  });
},[]); 


const DeleteCat=(id)=>{
      


  swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })

    .then((willDelete) => {
      if (willDelete) {

      axios.put(`api/delete-branch/${id}`).then(res=>{
          
          if(res.data.status===200){
              swal("Success", res.data.message, "success");
              axios.get(`api/branchlist`).then(res=>{ 
                  if(res.status === 200)
                  {
                      setCategorylist(res.data.branches)
                  } 
                  setLoading(false);
      
              });
              swal("Success", res.data.message, "success");
          }
      });
  }
});
}





let Viewcategory_HTMLTABLE ;
let sl=0;
Viewcategory_HTMLTABLE =[ 
categorylist.filter((item)=>{
  if(searchTerm==""){
      return item
  }
  else if(item.name.toLowerCase().includes(searchTerm.toLowerCase())){
      return item.name
  }

}).reverse().map((item)=>
{
  if(loading)
  {
      return (
      <tr>
          <td colspan="5">
              Loading...
          </td>
      </tr>
      )
  } 
  else{ 
  return(
          <tr key={item.id}>
              <td>{sl=sl+1}</td>
              <td> {item.designame}</td>   
     

             
          </tr>
      ) 
  }  
})]
  return (
    <>
    <nav aria-label="breadcrumb ">
        <ol className="breadcrumb p-2">
        <li className="breadcrumb-item"><Link  to="/administrator/dashboard"  >Home</Link></li>
        <li className="breadcrumb-item active" aria-current="page">Branch</li>
        </ol>
    </nav>
    <div className="container-fluid ">
        <div className="row">
            <div className="col-md-6 mb-4">
                <div className="card shadow mb-4">                                                     
                    <div className="card-body"> 
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                            <Link to ="/administrator/BranchMaster" className="nav-link"  data-toggle="tab"   role="tab" aria-controls="home">Add</Link>
                            </li>
                            <li className="nav-item">
                            <Link  to="/administrator/BranchMasterView" data-toggle="tab" className="nav-link active" role="tab" aria-controls="profile">View</Link>
                        
                            </li>
                        
                        </ul>
                        <div className="tab-content">


<div class="input-group flex-nowrap mt-4">
  <span class="input-group-text" id="addon-wrapping"><FontAwesomeIcon icon={faSearch}/></span>
  <input type="search" class="form-control form-control-lg " placeholder="Type your keywords here..."  onChange={event=>{setSearchTerm(event.target.value)}}></input>
</div>

                            <div className="tab-pane active" id="home" role="tabpanel">
                                <div className="row">
                                    <div className=" mt-2">  
                                        <table className="table">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th>Sl. No.</th>
                                                    <th>Name</th> 
                                          
                                                  
                                                  
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Viewcategory_HTMLTABLE}
                                            </tbody>
                                        </table>     
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

export default DesignationView