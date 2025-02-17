import React from 'react';
const Input = (name,value,label,onChange) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{ label}</label>
            <input name={name} value={value} onChange={onChange}
                id={ name} type="text" className="form-control" />
        </div>
     );
}
 
export default Input;