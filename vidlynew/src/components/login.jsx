import React, { Component } from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
class LoginForm extends Form {
    state = {
        data: { username: '', password: '' },
        errors : {}
    };
    
    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password")
    }

    doSubmit() {
        console.log('Submitted');
    }

    render() {
        const { data, errors } = this.state;
       
        return (<div>
            <h1>Login</h1>
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
                {errors.password && <div className="alert alert-danger">{ errors.password}</div>}
                {this.renderButton("Login")}
            </form>
        </div> );
    }
}
 
export default LoginForm;