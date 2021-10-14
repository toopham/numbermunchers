import React, { Component } from 'react';


const Box = (props) => {
	let color = 'green';
	if(props.name) color = 'white';

	return <div className="gamebox" style={{color: color}}>{props.name}</div>
};


export default Box;