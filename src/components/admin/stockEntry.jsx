import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch} from '@fortawesome/free-solid-svg-icons';


export default function StockEntry() {
  const [loading, setLoading] = useState(true);
  const [categorylist, setCategorylist] = useState();
  const [searchTerm, setSearchTerm] = useState(''); 
  

  useEffect(()=>{
  axios.get(`api/getfinalOrders`).then(res=>{

      if(res.status === 200)
      {
          setCategorylist(res.data.ordermaster)
      }
      
      setLoading(false);

  });
},[]);




let Viewcategory_HTMLTABLE ;
if(loading)
{
  return <h4> Loading...... </h4>
}

else{
  Viewcategory_HTMLTABLE =[

    categorylist.filter((items)=>
    {
        if(searchTerm==""){
            return items
        }
        else if(items.orderno.toLowerCase().includes(searchTerm.toLowerCase())){
            return items.orderno
        }
        else if(items.orderdate.toLowerCase().includes(searchTerm.toLowerCase())){
            return items.orderdate
        }
        else if(items.branchname.toLowerCase().includes(searchTerm.toLowerCase())){
            return items.branchname
        }
    }).reverse().map((items)=>
  {

      return(
          <tr key={items.orderno}>
              <td>{items.orderno}</td>
              <td>{items.orderdate}</td>
              <td>{items.branchname}</td>
              <td>
                      <Link to={`StockView/${items.id}`} className="btn btn-success btn-sm">View</Link>
                  </td>
             
          </tr>
      )
  })]
}

let status1,status2;


if(!categorylist.length){
    status1 = [
        <div className=" text-danger text-center">NO RECORD FOUND</div>
      ]
            
}

/////////////////////////////////////////////////////////////////////////

return (
  <>
    <nav aria-label="breadcrumb ">
      <ol className="breadcrumb p-2">
      <li className="breadcrumb-item"><Link  to="/admin/dashboard"  >Home</Link></li>
      <li className="breadcrumb-item active" aria-current="page">Stock Entry</li>
      </ol>
  </nav>

 <div className="container px-4">

    
     
  <div className="card mt-4">
      <div className="card-header">
          <h4 className="text-center"> Order By Branch (Pending Stock Entry) 
              {status1}
          </h4>
      </div>
      <div class="input-group flex-nowrap mt-4">
  <span class="input-group-text" id="addon-wrapping"><FontAwesomeIcon icon={faSearch}/></span>
  <input type="search" class="form-control form-control-lg " placeholder="Type your keywords here..."  onChange={event=>{setSearchTerm(event.target.value)}}></input>
</div>


      <div className="card-body">
      <table class="table table-striped">
<thead className="table-dark">
<tr>
  <th>ID</th>
  <th>Date</th>
  <th>Branch Name</th>
  <th>View</th>
</tr>
</thead>
<tbody>
{Viewcategory_HTMLTABLE}
</tbody>
</table>

      </div>

  </div>


 </div>
 </>
)
}
