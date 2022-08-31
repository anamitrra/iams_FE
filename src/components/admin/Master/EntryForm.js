import React,{useState,useEffect} from "react";
import { Link,useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";



 
function EntryForm(){
    const history =useHistory();
    const [loading, setLoading] = useState(true);
    const [categorylist, setCategorylist] = useState([]);
    const [subcategorylist, setSubategorylist] = useState([]);
    const [itemlist, setItemlist] = useState([]);
    const [templist, setTemplist] = useState([]);
    const [orderInput, setOrder] = useState({
        remarks:'',
    });
    const [ipadr,setIP] = useState('');
    ///////////////////////////////////////////////////////////////
    const token = localStorage.getItem('auth_token');

    const[EntryfromInput, setEntryform]=useState({
        ip:ipadr,
        mac:token,
        category_id:'',
        subcategory_id:'',
        item_id:'',
        description:'',
        Quantity:'',
        asset_id: '',
    });


    const handleInput =(event)=>{
        event.persist();
       
            setEntryform({...EntryfromInput,[event.target.name]:event.target.value});
            setOrder({...orderInput,[event.target.name]:event.target.value})
    }


    ///////////////////////////////////get ip address//////////////////////////////////
  
    useEffect(()=>{
        axios.get(`api/clientip/`).then(res=>{
            if(res.data.status ===200){
                setIP(res.data.ip);
            }

        });
    },[]);
 

    ////////////////////////////////Get category data//////////////////////////////////
        useEffect(()=>{
        axios.get(`api/categories/`).then(res=>{
            if(res.data.status ===200){
                setCategorylist(res.data.categories);
            }

        });
    },[]);
        
   
    ////////////////////////////////Get subcategory data////////////////////////////////// 
    let cat=EntryfromInput.category_id;
  
    useEffect(()=>{
        axios.get(`api/subcatlist/${cat}`).then(res=>{
            if(res.data.status ===200){
                setSubategorylist(res.data.subcategories);

            }
            

        });
    },[cat]);


    /////////////////////////////////////Get item data////////////////////////////////// 
      let subcat=EntryfromInput.subcategory_id;
      

      
      useEffect(()=>{
          axios.get(`api/itemslist/${subcat}`).then(res=>{
              if(res.data.status ===200){
                  setItemlist(res.data.items);
              }
              else {
                itemlist = '';
            }
  
          });
      },[subcat]);


       ////////////////////////////////////Get temp data////////////////////////////////// 
   

    const submit=(event)=>{
        
        event.preventDefault();
        const data = {
            token : EntryfromInput.mac ,
            ipaddress: ipadr,
            itemid: EntryfromInput.item_id,
            description: EntryfromInput.description,
            quantity: EntryfromInput.Quantity,
            
        }
        
        axios.post(`api/order-save-temp`, data).then(res=>{

            if(res.data.status ===200){
                
                axios.get(`api/order-temp-list/${ipadr}/${token}`).then(res=>{
                    setTemplist(res.data.temporders);
                    ///Rest From////
                    setEntryform({
                    ip:ipadr,
                    mac:token,
                    category_id:'',
                    subcategory_id:'',
                    item_id:'',
                    description:'',
                    Quantity:'',})
    
            });
            }        
        })
    }

    

    useEffect(()=>{
        axios.get(`api/order-temp-list/${ipadr}/${token}`).then(res=>{

            if(res.status === 200)
            {
                
                setTemplist(res.data.temporders)

                
            }
        

        });
    },[ipadr,token]);

// ///////////////////////////////////////////////

    const itemdelete = (id) =>{

        swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })

          .then((willDelete) => {
            if (willDelete) {

            axios.delete(`api/delete-temp/${id}`).then(res=>{
                
                if(res.data.status===200){
                    swal("Success", res.data.temporders, "success");
                    axios.get(`api/order-temp-list/${ipadr}/${token}`).then(res=>{ 
                        if(res.status === 200)
                        {
                            setTemplist(res.data.temporders)
                        } 
                        setLoading(false);
            
                    });
                    swal("Success", res.data.message, "success");
                }
            });
        }
    });

    }



    let Viewcategory_HTMLTABLE; 

        Viewcategory_HTMLTABLE =[
          
        templist.map((items)=>
        {
            return(

              
                <tr key={items.id}>
                    <td> {items.orderdate}</td>  
                    <td>{items.itemname}</td>
                    <td>{items.description}</td>
                    <td>{items.quantity}</td>
                    <td>
                        <button onClick={()=>itemdelete(items.id)} className="btn btn-danger btn-sm">Delete</button>
                    </td> 
                </tr>
)
        })]



        const orders = (event)=>{
            event.preventDefault()
             swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })

          .then((willDelete) => {
            if (willDelete) {

          
            const data = {
                remarks : orderInput.remarks ,
            }
            

            axios.post(`api/create-order`, data).then(res=>{

                if(res.data.status === 200){
                    swal("Success", res.data.message, "success");
                    history.push(`/user/PendingOrders`)
                }
                else if(res.data.status === 500)
                {
                    swal("Error", "error");
                }
                 
            })
        }
    });
        }
    
                        let ordersubmit;
                        let saveasdraft;

                          if (templist.length) {
                            ordersubmit = [<form onSubmit={orders}><button type="submit"  className="btn btn-success btn-sm">Submit Order</button></form>]
                            saveasdraft = [<Link to={`edit-category/`} className="btn btn-success btn-sm">Save As Draft</Link>]
                           }                 
    return(

     
        <div className="container-fluid">
            <div className="row">
            <div className="col-md-4">
          <h2>Requisition Form:</h2> 

        <form onSubmit={submit}>
        <div className="card">
        <div className="card p-3">
        <div className="form-group mb-1">

      
                    <input type ="text" name="mac"  value={EntryfromInput.mac} onChange={handleInput} className="form-control" hidden/>
        <label>Select Category</label>
   
                      <select name="category_id" onChange={handleInput} value={EntryfromInput.category_id}   className="form-control">
                      <option>select Category</option>
                          {
                              categorylist.map((item)=>{
                                  return(
                                  <option value={item.id} key={item.id}>  {item.name}</option>
                                  )
                              })
                          }   
                      </select>  
                    
                      <label>Select Subcategory</label>
                  <select name="subcategory_id" onChange={handleInput} value={EntryfromInput.subcategory_id}   className="form-control">
                      <option>select Subcategory</option>
                          {
                              subcategorylist.map((items)=>{
                                  return(
                                  <option value={items.id} key={items.id}>{items.name}</option>
                                  )
                              })
                          }
                            
                      </select>

                      
                      <label>Select Item</label>
                  <select name="item_id" onChange={handleInput} value={EntryfromInput.item_id}   className="form-control" >
                      <option>select Item</option>
                          {
                              itemlist.map((itemss)=>{
                                  return(
                                  <option value={itemss.id} key={itemss.id}>{itemss.name}</option>
                                  )
                              })
                          }
                            
                      </select>




                    
                <label>Description</label>
                 <textarea name="description" className="form-control" rows="3" onChange={handleInput} value={EntryfromInput.description} required >

                 </textarea>
              

                 <div className="form-group col-md-2 mt-3">
                <label>Quantity</label>
                <input type="text" name="Quantity" className="form-control" onChange={handleInput} value={EntryfromInput.Quantity} required ></input>
                 </div>
                 <br></br><br></br>
                 <button type="submit" className="btn btn-success btn-sm"> Add</button>
                 <br></br><br></br>
                 
                
      
        </div>
        </div>
        </div>
   
        
  </form>
  </div>  

  <div className="col-md-8">
  
           <div className="card ">
               <div className="card-header">
                   <h4> Cart

                   </h4>
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead className="table-dark">
                        <tr>
                           
                            <th>Date</th>
                            <th>Item Name</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                            {Viewcategory_HTMLTABLE}
                        </tbody>
                    </table> 
               </div>

            

                <div className="col-md-6">
                <label>Remarks</label>
                 <textarea name="remarks" className="form-control" rows="3" onChange={handleInput} value={ orderInput.remarks} required >

                 </textarea>
                 <div className="form-group"> 
                                                            <div className="row mt-3">
                                                                <div className="col-md-12"> 
                                                                   <div >     {ordersubmit}</div> 
                                                                   
                                                                   
                                                                </div>    
                                                            </div>  
                                                        </div>
                 
                  
                
            
                 </div>
               
              
           </div>
          
          
          </div>
               </div>
               </div>
            
         

    )


};

export default EntryForm;