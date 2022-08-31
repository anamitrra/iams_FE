import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";
import swal from "sweetalert"; 

function ItemTest()
{
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
        remarks:'',
        error_list:[],
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

    const data ={
            subcatid:itemInput.subcategory_id,
            assettype:itemInput.asset_id,
            itemcode:itemInput.itemscode,
            name:itemInput.name,
            remarks:itemInput.remarks,
            approverate:itemInput.approverate, 
        }
        console.log(itemInput);  
        debugger;
        axios.post(`api/saveitem`,data).then(res=>{

            if(res.data.status === 200)
            {
                swal('Success',res.data.message,"Success");

                setItem({
                    subcategory_id:'',
                    assettype:'',
                    itemscode:'',
                    name:'',
                    approverate:'',
                    remarks:'',
                        })
                
            }

            else if(res.data.status ===409){
                swal('Error', res.data.message,"warning");
            }
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
                                <Link to ="/admin/item" className="nav-link active"  data-toggle="tab"   role="tab" aria-controls="home">Add</Link>
                                </li>
                                <li className="nav-item">
                                <Link  to="/admin/view-items" data-toggle="tab" className="nav-link" role="tab" aria-controls="profile">View</Link>
                                </li>
                            
                            </ul>
                            <div className="tab-content">
                                <div className="tab-pane active" id="home" role="tabpanel">
                                    <div className="row">
                                        <div className="col-md-12 mt-2">  
                                            <form onSubmit={submitItem} encType="multipart/form-data" className="form-horizontal bucket-form">
                                                <div className="form-group"> 
                                                    <div className="row">
                                                        <div className="col-md-3">
                                                            <label className="control-label">Category:</label><span className="text-danger">*</span> 
                                                        </div>
                                                        <div className="col-md-12"> 
                                                        <select name="category_id" onChange={(e)=>handlecategory(e)} value={itemInput.category_id}   className="form-control">
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
                                                        <div className="col-md-3">
                                                            <label className="control-label">Sub-Category:</label><span className="text-danger">*</span> 
                                                        </div>
                                                        <div className="col-md-12"> 
                                                        <select name="subcategory_id" onChange={handleInput} value={itemInput.subcategory_id}   className="form-control">
                                                       
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
                                                    </div>
                                                </div>
                                                <div className="form-group"> 
                                                    <div className="row">
                                                        <div className="col-md-3">
                                                            <label className="control-label">Asset Type:</label><span className="text-danger">*</span> 
                                                        </div>
                                                        <div className="col-md-12"> 
                                                            <select name="asset_id" onChange={handleInput} value={itemInput.asset_id}   className="form-control">   
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
                                                    </div>
                                                </div>
                                                <div className="form-group"> 
                                                    <div className="row">
                                                        <div className="col-md-6">  
                                                            <label className="control-label"> Item Code :</label><span className="text-danger">*</span> 
                                                        </div>
                                                        <div className="col-md-12"> 
                                                        <input type ="text" name="itemscode" className="form-control mb-2"   value={itemInput.itemscode}  onChange={handleInput} required /> 
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
                        </div>
                    </div>
                </div>
            </div>
        </div>   
        </>
    );
                        
                        }
export default ItemTest;