import React, { Component } from 'react';
import {SIZE} from '../constants/actionTypes.js';

const Muncher = (props) => {
	const leftPos = String(props.left*SIZE) + 'px';
	const topPos = String(props.top*SIZE) + 'px';

	return <div className="muncher" style={{left: leftPos, top: topPos}}>
			MUNCHER</div>;

};
	

export default Muncher;