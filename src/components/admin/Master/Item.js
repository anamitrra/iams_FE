import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import React from "react";
import axios from "axios";
import swal from "sweetalert"; 
import { BsFillTrashFill,BsSave2Fill } from "react-icons/bs";

function Item()
{
    const history = useHistory;
    const [categorylist, setCategorylist] = useState([]);
    const [categoryid, setCategoryid] = useState([]);
    const [subcategorylist, setSubategorylist] = useState([]);
    const [assetlist, setAssetlist] = useState([]); 
    const [itemInput, setItem ] = useState({
        subcatid:'',
        asset_id:'',
        itemscode:'',
        name:'',
        approverate:'',
        initalStock:'',
        remarks:'',
        error_list:[""],
    }); 

    const handleInput =(event)=>{
        event.persist(); 
        setItem({...itemInput,[event.target.name]:event.target.value});
    } 
  
    useEffect(()=>{
        const getCategory= async ()=>{
            axios.get(`api/categories`).then(res=>{
                if(res.data.status ===200){
                    setCategorylist(res.data.categories);
                } 
            });
          }
          getCategory(); 
    },[]);

    const handlecategory=(event)=>{
        const getcategoryid= event.target.value;
        setCategoryid(getcategoryid);
        event.preventDefault();
      }
    
      useEffect( ()=>{ 
          if(categoryid.length>0)
          {
                const getSubCategory= async ()=>{
                    axios.get(`api/subcatlist/${categoryid}`).then(res=>{
                        if(res.data.status ===200){
                            setSubategorylist(res.data.subcategories);
                        }
            
                    }); 
            }
            getSubCategory();
          }
            
    
      },[categoryid]); 
     
     useEffect(()=>{
         axios.get(`api/assettypes-list/`).then(res=>{
             if(res.data.status ===200){
                 setAssetlist(res.data.assettypes);
             } 
         });
     },[]);

    
    const submitItem=(event)=>{

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
                subcatid:itemInput.subcategory_id,
                assettype:itemInput.asset_id,
                itemcode:itemInput.itemscode,
                name:itemInput.name,
                remarks:itemInput.remarks,
                approverate:itemInput.approverate,
                quantity:"0", 
            }
            console.log(itemInput);  
        
            axios.post(`api/saveitem`,data).then(res=>{
    
                if(res.data.status === 200)
                {
                    
                    swal('Success',res.data.message,'success');
                    history.push(`/admin/view-items`)   
                    setItem({
                        subcategory_id:'',
                        assettype:'',
                        itemscode:'',
                        name:'',
                        approverate:'',
                        initalStock:'',
                        remarks:'',
                            })
    
                }
    
                else if(res.data.status ===409){
                    swal('Error', res.data.message, "warning");
                }
                else if(res.data.status ===400){
                    setItem({...itemInput, error_list:res.data.errors})
                }
            })
        }
    });

   
    }

    const clear = ()=>{
        setItem({
            category_id:'',
            subcatid:'',
            asset_id:'',
            itemscode:'',
            name:'',
            approverate:'',
            initalStock:'',
            remarks:'',
            error_list:[""],
            
        })
    }
 
    return (
        <>
    

        
            
            <nav aria-label=" ">
            
            <ol className="breadcrumb p-3">
            <li className="breadcrumb-item"><Link  to="/admin/dashboard"> Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Items</li>
            
            </ol>
           
        </nav>
            
     

        <div className="container-fluid ">
            <div className="row">
                <div className="col-md-8">
                    <div className="card shadow mb-4">                                                     
                        <div className="card-body"> 
                            <ul className="nav nav-tabs" role="tablist">
                                <li className="nav-item">
                                <Link to ="/admin/item" className="nav-link active"  data-toggle="tab"   role="tab" aria-controls="home">Add</Link>
                                </li>
                                <li className="nav-item">
                                <Link  to="/admin/view-items" data-toggle="tab" className="nav-link" role="tab" aria-controls="profile">View</Link>
                                </li>
                            </ul>
                            
                              
                            <form onSubmit={submitItem} encType="multipart/form-data" className="row g-3">
                                               
                                                   
                                                      

                                                        <div className="col-md-3">
                                                        <label className="form=label font-weight-bold">Category:</label><span className="text-danger font-weight-bold">*</span>  
                                                        
                                                        <select name="category_id" onChange={(e)=>handlecategory(e)} value={itemInput.category_id}   className="form-select" >
                                                                <option >select Category</option>
                                                                {
                                                                    categorylist.map((item)=>{
                                                                        return(
                                                                        <option value={item.id} key={item.id} required>{item.name}</option>
                                                                        )
                                                                    })
                                                                }    
                                                            </select>
                                                           
                                                        </div> 


                                                        <div className="col-md-3">
                                                            <label className="control-label font-weight-bold">Sub-Category:</label><span className="text-danger font-weight-bold">*</span> 

                                                        

                                                        <select name="subcategory_id" onChange={handleInput} value={itemInput.subcategory_id}   className="form-select">
                                                       
                                                            <option>select Subcategory</option>
                                                            {
                                                                subcategorylist.map((items)=>{
                                                                    return(
                                                                    <option value={items.id} key={items.id}>{items.name}</option>
                                                                    )
                                                                })
                                                            } 
                                                            </select>
                                                            </div>

                                                            <div className="col-md-3"> 
                                                            <label className="control-label font-weight-bold">Asset Type:</label><span className="text-danger font-weight-bold">*</span> 
                                                            <div><span className="text-danger">{itemInput.error_list.assettype}</span></div>
                                                            <select name="asset_id" onChange={handleInput} value={itemInput.asset_id}   className="form-select">   
                                                            <option>select Asset</option>
                                                            {
                                                                assetlist.map((items)=>{
                                                                    return(
                                                                    <option value={items.id} key={items.id}>{items.name}</option>
                                                                    )
                                                                })
                                                            }   
                                                        </select>
                                                        </div> 

                                                        <div className="col-md-4">  
                                                            <label className="control-label font-weight-bold"> Item Code :</label><span className="text-danger font-weight-bold">*</span> 
                                                            <div><span className="text-danger">{itemInput.error_list.itemcode}</span></div>
                                                        <input type ="text" name="itemscode" className="form-control mb-2"   value={itemInput.itemscode}  onChange={handleInput} required /> 
                                                        </div>

                                   
                                                        <div className="col-md-4">   
                                                            <label className="control-label font-weight-bold">Item Name: </label><span className="text-danger font-weight-bold">*</span> 
                                                            <div><span className="text-danger">{itemInput.error_list.name}</span></div>
                                                            <input type ="text" name="name" className="form-control mb-2"  value={itemInput.name}     onChange={handleInput} required />
                                                        </div> 
                                                    
                                                
                                               
                                                  
                                                        <div className="col-md-2">   
                                                            <label className="control-label font-weight-bold">Approve Rate: </label><span className="text-danger font-weight-bold">*</span> 
                                                            <div><span className="text-danger">{itemInput.error_list.approverate}</span></div>
                                                        <input type ="text" name="approverate" className="form-control mb-2"  value={itemInput.approverate} onChange={handleInput}  required/> 
                                                        </div> 

                                                        
                                                        {/* <div className="col-3">   
                                                            <label className="control-label font-weight-bold">Inital Stock: </label><span className="text-danger font-weight-bold">*</span> 
                                                            <div><span className="text-danger">{itemInput.error_list.assettype}</span></div>
                                                        <input type ="text" name="initalStock" className="form-control mb-2"  value={itemInput.initalStock} onChange={handleInput}  required/> 
                                                        </div>  */}
                                                 
                                             
                                                            
                                                
                                                        <div className="col-md-10">   
                                                            <label className="control-label font-weight-bold">Description: </label><span className="text-danger font-weight-bold">*</span> 
                                                       
                                                       
                                                             <textarea type ="text" name="remarks" className="form-control mb-2"  rows="5"   value={itemInput.remarks}  onChange={handleInput} required/> 
                                                        </div> 

                                                        <div className="row"> 
                                                        <div className="col-md-12">
                                                        <button type="submit" className="btn btn-primary "> <BsSave2Fill/> Save</button>
                                                        <button onClick={(clear)} className="btn btn-danger ml-4"> <BsFillTrashFill/> Clear</button>
                                                        </div> </div>

                               
                                             
                               </form>
                            
                       
                    </div>
                </div>
            </div>
        </div> 
        
          </div>
        </>
    );
                        
                        }
export default Item;