import React, { Component } from 'react';
import {SIZE} from '../constants/actionTypes.js';

const NumGen = (props) => {
	const leftPos = String(props.Pos[1]*SIZE) + 'px';
	const topPos = String(props.Pos[0]*SIZE) + 'px';

	return <div className="numGen" style={{left: leftPos, top: topPos, backgroundImage: `url('assets/num-boss.png')`, backgroundSize: '80px'}}></div>;

};
	

export default NumGen;