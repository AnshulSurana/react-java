import React from 'react';


const Input = (props) => {
	return (  
  <div className="form-group col-lg-offset-4">
    <label htmlFor={props.name} className="form-label">{props.title}</label>
    <input
      Style="width:50%"
      className="form-control"
      id={props.name}
      name={props.name}
      type={props.inputType}
      value={props.value}
      onChange={props.handleChange}
      placeholder={props.placeholder} 
      {...props} />
  </div>
)
}

export default Input;