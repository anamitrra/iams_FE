import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
 
function Viewcategory () {

    

        const [loading, setLoading] = useState(true);
        const [categorylist, setCategorylist] = useState([]);
        

        useEffect(()=>{
        axios.get(`api/categories`).then(res=>{

            if(res.status === 200)
            {
                setCategorylist(res.data.categories)
            }
            
            setLoading(false);

        });
    },[]);



    let Viewcategory_HTMLTABLE ;
    if(loading)
    {
        return <h4> Loading Category...... </h4>
    }

    else{
        Viewcategory_HTMLTABLE =[

        categorylist.map((item)=>
        {

            return(
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td> {item.name}</td>  
                    <td>{item.remarks}</td>
                    <td>
                        <Link to={`edit-category/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>

                    <td>
                        <Link to={`delete-category/${item.id}`} className="btn btn-danger btn-sm">Delete</Link>
                    </td>
                </tr>
            )
        })]
    }

    let datatable={

        
        columns: [

            {
                label: 'Id',
                field: 'id',
                sort: 'asc',
                width: 100
              },
            {
              label: 'Name',
              field: 'name',
              sort: 'asc',
              width: 150
            },
            {
              label: 'Remarks',
              field: 'remarks',
              sort: 'asc',
              width: 270
            },
           
            
          ],
          rows: [
//             categorylist.map((item)=>{
                
//             return(
//                 <tr key={item.id}>
//                     <td>{item.id}</td>
//                     <td> {item.name}</td>  
//                     <td>{item.remarks}</td>
//                     </tr>
// ))

//             },

          
            {
              id: '61',
              name: 'Tiger Nixon',
              remarks: 'System Architects',
            
            },
            {
                id: '62',
              name: 'Garrett Winters',
              remarks: 'Accountant',
            },
            
         
  
        ]}


//     // /////////////////////////////////////////////////////////////////

   return (




       <div className="container px-4">

          
           
        <div className="card mt-4">
            <div className="=card-header">
                <h4> Category List
                <Link to ="/admin/category" className="btn btn-primary btn-sm float-end">Add Category</Link>
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
        <th>Name</th>
        <th>Remarks</th>
        <th>Edit</th>
        <th>Delete</th>
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
export default Viewcategory;