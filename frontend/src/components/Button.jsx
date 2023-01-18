import React from 'react';


const Button = (props) => {
	return(
	<button 
		id={props.id}
		style= {props.style} 
		className = {props.type}
		onClick= {props.action} > 
		{props.title} 
	</button>)
}


export default Button;