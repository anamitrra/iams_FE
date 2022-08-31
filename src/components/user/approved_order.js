import React,{useState,useEffect} from "react";
import { Link,useHistory } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';

export default function ApprovedOrder(props) {

    const [loading, setLoading] = useState(true);
    const [categorylist, setCategorylist] = useState();
    

    useEffect(()=>{
    axios.get(`api/get-approvedorder-branchwise`).then(res=>{

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

    categorylist.map((items)=>
    {

        return(
            <tr key={items.orderno}>
                <td>{items.orderno}</td>
                <td>{items.orderdate}</td>
                <td>{items.branchname}</td>
                <td>
                        <Link to={`Viewfinalorder/${items.id}`} className="btn btn-success btn-sm">View</Link>
                    </td>

                   
               
            </tr>
        )
    })]
}



/////////////////////////////////////////////////////////////////////////

return (

   <div className="container px-4">

      
       
    <div className="card mt-4">
        <div className="=card-header">
            <h4> Approved Orders
            <nav class="navbar navbar-light bg-light">

<input class="form-control form-inline mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>


</nav>
            </h4>
        </div>

        <div className="card-body">
        <table class="table">
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
);







}
