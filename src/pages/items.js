import React, {Component} from 'react';

import {Link} from 'react-router-dom';
import axios from 'axios';

class Items extends Component
{
    state={
        name: '',
        Remarks: '',
        approveRate: '',
    
    }

    handleInput=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    saveItems = async(e)=>{
        e.preventDefault();
        const res= await axios.post('http://localhost:8000/api/........', this.state);

        if(res.data.status===200){
            console.log(res.data.message);
            this.setState({
                name: '',
                Remarks: '',
                approveRate: '',
            

            });
        }
    }
    render(){
        return(
        
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>
                                <h4>Add Items
                                    <Link to={'/categories'} className="btn btn-primary btn-sm float-end">Add Categories</Link>
                                </h4>
                            </div>
                            <div className='card-body'>

                                <form onSubmit={this.saveItems}>
                                <div className="form-group mb-3">
                                    <label>name</label>
                                    <input type ="text" name="name" onChange={this.handleInput} value={this.state.name} className="form-control"/>
                                </div>

                                <div className="form-group mb-3">
                                    <label>Remarks</label>
                                    <input type ="text" name="Remarks" onChange={this.handleInput} value={this.state.course} className="form-control"/>
                                </div>

                                <div className="form-group mb-3">
                                    <label>Approve Rate </label>
                                    <input type ="text" name="approveRate" onChange={this.handleInput} value={this.state.email} className="form-control"/>
                                </div>

                            

                                <div className="form-group mb-3">
                                   <button type="submit" className='btn btn-primary'> Save</button>
                                </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          
        );
    }
}

export default Items;