
import React,{useState,useEffect} from "react";
import { Link,useHistory } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';

function ItemEdit(props) {
  const history =useHistory();
  const [loading, setLoading] = useState(true);
  const [itemInput, setitem ] = useState({});
  const [itemList, setItemlist] = useState([]);
  const[assetlist, setAssetlist] = useState([]);


  useEffect(()=>{

      const id= props.match.params.id; 
  
      axios.get(`api/edit-item/${id}`).then(res=>{ 
          if(res.data.status ===200){
              setitem(res.data.item);
          }   
          setLoading(false);
      });
  },[]);  

  const handleInput =(event)=>{
      event.persist();
      setitem({...itemInput,[event.target.name]:event.target.value});
  }

  console.log(itemInput.name);
 
  useEffect(()=>{

    const id= props.match.params.id; 
    axios.get(`api/edit-item/${id}`).then(res=>{
        if(res.data.status ===200){
          setItemlist(res.data.item);
        } 
    });
},[]);


useEffect(()=>{
  axios.get(`api/assettypes-list/`).then(res=>{
      if(res.data.status ===200){
          setAssetlist(res.data.assettypes);
      } 
  });
},[]);
  




  const submit=(event)=>{

      const id= props.match.params.id; 
      event.preventDefault(); 
      const data ={
          itemcode:itemInput.itemcode,
          name:itemInput.name,
          remarks:itemInput.remarks,
          approverate:itemInput.approverate,
          assettype:itemInput.assettype,
      } 
      axios.put(`api/update-item/${id}`,data).then(res=>{ 
          swal("Success",res.data.message,"success");
      })
  }



  return (
      <>
          <nav aria-label="breadcrumb ">
          <ol className="breadcrumb p-2">
          <li className="breadcrumb-item"><Link  to="/admin/dashboard"  >Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Items</li>
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
                              <Link  to="/admin/view-items" data-toggle="tab" className="nav-link" role="tab" aria-controls="profile">View</Link>
                              </li> 
                          </ul>
                          <div className="tab-content">
                              <div className="tab-pane active" id="home" role="tabpanel">
                                  <div className="row">
                                      <div className="col-md-12 mt-2"> 

                                          <form onSubmit={submit} encType="multipart/form-data" className="form-horizontal bucket-form">

                                           <div className="form-group"> 

                                          
                                                    <div className="row">
                                                        <div className="col-md-3">
                                                            <label className="control-label">Asset Type:</label><span className="text-danger">*</span> 
                                                        </div>
                                                        <div className="col-md-12"> 
                                                            <select name="assettype" onChange={handleInput} value={itemInput.assettype}   className="form-control">   
                                                            
                                                            {
                                                                assetlist.map((items)=>{
                                                                    return(
                                                                    <option  value={items.id} key={items.id}>  {items.name}  </option>
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
                                                            <label className="control-label"> Item Code :</label><span className="text-danger">*</span> 
                                                        </div>
                                                        <div className="col-md-12"> 
                                                        <input type ="text" name="itemcode" className="form-control mb-2"   value={itemInput.itemcode}  onChange={handleInput} required /> 
                                                        </div>
                                                    </div> 
                                                </div>
                                                <div className="form-group"> 
                                                    <div className="row">
                                                        <div className="col-md-6">   
                                                            <label className="control-label">Item Name: </label><span className="text-danger">*</span> 
                                                        </div>
                                                        <div className="col-md-12"> 
                                                            <input type ="text" name="name" className="form-control mb-2"       value={itemInput.name}     onChange={handleInput} required />
                                                        </div> 
                                                    </div> 
                                                </div> 
                                                <div className="form-group"> 
                                                    <div className="row">
                                                        <div className="col-md-6">   
                                                            <label className="control-label">Approve Rate: </label><span className="text-danger">*</span> 
                                                        </div>
                                                        <div className="col-md-12"> 
                                                        <input type ="text" name="approverate" className="form-control mb-2"  value={itemInput.approverate} onChange={handleInput}  required/> 
                                                        </div> 
                                                    </div> 
                                                </div>
                                                <div className="form-group"> 
                                                    <div className="row">
                                                        <div className="col-md-6">   
                                                            <label className="control-label">Description: </label><span className="text-danger">*</span> 
                                                        </div>
                                                        <div className="col-md-12"> 
                                                             <textarea type ="text" name="remarks" className="form-control mb-2"  rows="5"   value={itemInput.remarks}  onChange={handleInput} required/> 
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
                          {/* <div className="tab-content">
                              <div className="tab-pane active" id="home" role="tabpanel">
                                  <div className="row">
                                      <div className="col-md-12 mt-2">  
                                          <table className="table">
                                              <thead className="table-dark">
                                                  <tr>
                                                      <th>ID</th>
                                                      <th>Item-Name</th> 
                                                      <th>Item-code</th> 
                                                      <th>Sub-Category</th>
                                                      <th>Category</th> 
                                                      <th>Remarks</th>
                                                      <th>Approve-Rate</th> 
                                                      <th>Action</th> 
                                                  </tr>
                                              </thead>
                                              <tbody>
                                              {itemList.map((item, index)=>{
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
                                    <Link to={`edit-item/${item.id}`} className="btn btn-success btn-sm">Edit</Link> 
                                    </td>
                                    </tr>
                                )
                            })}
                                                  
                                              </tbody>
                                          </table>    
                                      </div>
                                  </div>
                              </div>
                          </div> */}
                      </div>
                  </div>
              </div>
          </div>
      </div>  
      </>
  );
}

export default ItemEdit