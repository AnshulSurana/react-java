import React from 'react';


const Select = (props) => {
	return(<div className="form-group col-lg-offset-4">
			<label htmlFor={props.name}> {props.title} </label>
		    <select
			  id = {props.name}
		      name={props.name}
		      value={props.value}
		      onChange={props.handleChange}
			  Style="width:50%"
		      className="form-control">
		      <option value="" disabled>{props.placeholder}</option>
		      {props.options.map(option => {
		        return (
		          <option
		            key={option.split(",")[1]}
		            value={option}
		            label={option.split(",")[0]}>{option.split(",")[0]}</option>
		        );
		      })}
			  
		    </select>
  </div>)
}

export default Select;