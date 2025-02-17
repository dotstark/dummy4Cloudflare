import React, { Component } from 'react';
import Joi from 'joi-browser';
class Form extends Component {
      state = {
        data: {},
        errors : {}
    };

     handleSubmit = (e) => {
        //const username = this.username.current.value;
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;
        
        this.doSubmit();
    }

    validate = () => {
        const errors = {};
        const options = { abortEarly: false };
        const { error} = Joi.validate(this.state.data, this.schema, options);

        if (!error) return null;
        for (let item of error.details)
            errors[item.path[0]] = item.message;
        return errors;
    }
    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = {[name]:this.schema[name]};
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    }

    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({data,errors});
    };
    renderButton(label) {
        return( <div><button disabled={this.validate()} className="btn btn-primary">{ label}</button></div>
        )
    };
}
 
export default Form;