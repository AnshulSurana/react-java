import React from 'react';


const Select = (props) => {
	return(
		    <select
		      id = {props.name}
		      name={props.name}
		      value={props.value}
		      onChange={props.handleChange}
			  Style="width:10%;display: inline;"
		      className="form-control">
		      <option value="" disabled>{props.placeholder}</option>
		      {props.options.map(option => {
		        return (
		          <option
		            key={option}
		            value={option}
		            label={option}>{option}</option>
		        );
		      })}			  
		    </select>
 )
}

export default Select;