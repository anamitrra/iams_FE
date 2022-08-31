import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';



 function ViewItem() {

    const [loading, setLoading] = useState(true);
    const [itemList, setItemlist] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); 
    

    useEffect(()=>{
        axios.get(`api/viewitems`).then(res=>{

            if(res.status === 200)
            {
                setItemlist(res.data.items)
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
              
            axios.put(`api/delete-item/${id}`).then(res=>{
                
                if(res.data.status===200){
                    swal("Success", res.data.message, "success");
                    axios.get(`api/viewitems/`).then(res=>{ 
                        if(res.data.status ===200){
                            setItemlist(res.data.items);
                        }   
                        setLoading(false);
                    });

                    swal("Success", res.data.message, "success");

                }
            });
            } 
          });



        

    }

    
return(
    <>
    <nav aria-label="breadcrumb ">
          <ol className="breadcrumb p-2">
          <li className="breadcrumb-item"><Link  to="/admin/dashboard"  >Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Items</li>
          </ol>
      </nav>
      <div className="container-fluid ">
          <div>
              <div className="col-md-9 mb-4">
                  <div className="card shadow mb-4">                                                     
                      <div className="card-body"> 
                          <ul className="nav nav-tabs" role="tablist">
                              <li className="nav-item">
                              <Link to ="/admin/item" className="nav-link"  data-toggle="tab"   role="tab" aria-controls="home">Add</Link>
                              </li>
                              <li className="nav-item">
                              <Link data-toggle="tab" className="nav-link active" role="tab" aria-controls="profile">View</Link>
                          
                              </li>
                          
                          </ul>


                          <div className="tab-content">
                          <div class="input-group flex-nowrap mt-4">
  <span class="input-group-text" id="addon-wrapping"><FontAwesomeIcon icon={faSearch}/></span>
  <input type="search" class="form-control form-control-lg " placeholder="Type your keywords here..."  onChange={event=>{setSearchTerm(event.target.value)}}></input>
</div>
                              <div className="tab-pane active" id="home" role="tabpanel">
                                  <div className="row">
                                      <div className="col-md-13 mt-3">  
                                          <table className="table table-bordered">
                                              <thead className="table-dark">
                                                  <tr>
                                                      <th>ID</th>
                                                      <th>Item-Name</th> 
                                                      <th>Item-code</th> 
                                                      <th>Sub-Category</th>
                                                      <th>Category</th> 
                                                      <th>Remarks</th>
                                                      <th>Approve-Rate</th>    
                                                      <th>Edit</th> 
                                                      <th>Delete</th> 
                                                     
                                                  </tr>
                                              </thead>
                                              <tbody>


                                              {itemList.filter((item)=>{
        if(searchTerm==""){
            return item
        }
        else if(item.name.toLowerCase().includes(searchTerm.toLowerCase())){
            return item.name
        }
        else if(item.itemcode.toLowerCase().includes(searchTerm.toLowerCase())){
            return item.itemcode
        }
        else if(item.subcatname.toLowerCase().includes(searchTerm.toLowerCase())){
            return item.subcatname
        }
        else if(item.catname.toLowerCase().includes(searchTerm.toLowerCase())){
            return item.catname
        }
     
    })
                                              
                                              
                                              
    .reverse().map((item, index)=>{
                                return(
                                    <tr>
                                    <td>{++index}</td>
                                    <td>{item.name}</td>
                                    <td>{item.itemcode}</td>
                                    <td>{item.subcatname}</td>
                                    <td>{item.catname}</td>
                                    <td>{item.remarks}</td>
                                    <td>{item.approverate}</td>
                              
                                    
                                    <td>
                                    <Link to={`edit-item/${item.id}`} className="btn btn-success btn-sm"><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></Link> 
                                    </td>
                                    <td>
                                    <button type = "button" onClick={()=>DeleteCat(item.id)} className="btn btn-danger btn-sm ml-2"> <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> </button>
                                    </td>
                                    
                                 
                                   
                                  
                                    </tr>
                                )
                            })}
                                                  
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
);


}
 export default ViewItem;