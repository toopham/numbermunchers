import React, { Component } from 'react';
import Box from './Box';
import Muncher from'./Muncher';
import NumGen from './NumGen';

const Game = (props) =>{

	const boxArray = [];

	for(let i = 0; i < 8; i++){
		for(let j = 0; j < 8; j++){
			boxArray.push(<Box key={(i+1)*(j+1)} row={i} col={j} name={props.gridState[i][j]}/>);
		}		
	}

	const numGens = [];
	props.numGens.forEach(num => {
		if(num.active){
			numGens.push(<NumGen color={num.color} Pos={num.Pos} />);
		}
	});

	return (<div className="gamegrid">
			{boxArray}
			<Muncher top={props.muncherPos[0]} left={props.muncherPos[1]} />
			{numGens}
			</div>);
};


export default Game;