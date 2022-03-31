import React, {Component} from 'react';

import {Link} from 'react-router-dom';
import axios from 'axios';

class Categories extends Component
{
    state={
        name: '',
        email: '',
        phone: '',
    }

    handleInput=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    saveCategories = async(e)=>{
        e.preventDefault();
        const res= await axios.post('http://localhost:8000/api/......', this.state);

        if(res.data.status===200){
            console.log(res.data.message);
            this.setState({
                name: '',
                email: '',
                phone: '',

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
                                <h4>Add Categories
                                    <Link to={'/'} className="btn btn-primary btn-sm float-end">Back</Link>
                                </h4>
                            </div>
                            <div className='card-body'>

                                <form onSubmit={this.saveCategories}>
                                <div className="form-group mb-3">
                                    <label>Name</label>
                                    <input type ="text" name="name" onChange={this.handleInput} value={this.state.name} className="form-control"/>
                                </div>

                                <div className="form-group mb-3">
                                    <label></label>
                                    <input type ="text" name="" onChange={this.handleInput} value={this.state.course} className="form-control"/>
                                </div>

                                <div className="form-group mb-3">
                                    <label></label>
                                    <input type ="text" name="" onChange={this.handleInput} value={this.state.email} className="form-control"/>
                                </div>

                                <div className="form-group mb-3">
                                    <label></label>
                                    <input type ="text" name="" onChange={this.handleInput} value={this.state.phone} className="form-control"/>
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

export default Categories;