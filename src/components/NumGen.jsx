import React, { Component } from 'react';
import {SIZE} from '../constants/actionTypes.js';

const NumGen = (props) => {
	const leftPos = String(props.Pos[1]*SIZE) + 'px';
	const topPos = String(props.Pos[0]*SIZE) + 'px';

	return <div className="numGen" style={{left: leftPos, top: topPos}}>
		numBOSS</div>;

};
	

export default NumGen;