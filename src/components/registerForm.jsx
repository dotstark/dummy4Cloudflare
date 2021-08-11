import React, { Component } from 'react';
import Form from './common/form';
import Joi from 'joi-browser';

class RegisterForm extends Form {
    state = {
        data: { username: '', password: '',name:"" },
        errors : {}
    }

    schema = {
        username: Joi.string().required().email().label("Username"),
        password: Joi.string().required().min(5).label("Password"),
        name:Joi.string().required().label("Name")
    }

    doSubmit = () => {
    console.log("Submitted");
    };
    
    render() {
         const { data, errors } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
            
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input name="username" value={data.value} onChange={ this.handleChange} id="username" type="text" className="form-control" />
                </div>
                {errors.username && <div className="alert alert-danger">{ errors.username}</div>}
                
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input name="password" value={data.value} onChange={ this.handleChange} id="password" type="text" className="form-control" />
                </div>
                {errors.password && <div className="alert alert-danger">{errors.password}</div>}
                
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input name="name" value={data.value} onChange={ this.handleChange} id="name" type="text" className="form-control" />
                </div>
                {errors.name && <div className="alert alert-danger">{errors.name}</div>}
                
                {this.renderButton("Register")}
            </form>
        );
    }

}
 
export default RegisterForm;