import React, { Component } from 'react';


const GameStats = (props) =>{

	const gameOn = 'Eat all numbers multiple of '+(props.level+1);
	const gameOver = 'GAME OVER! Try again?';
	const gameWon = 'You Won! Awesome Job!';

	const resetButton = <button onClick={()=>props.resetGame(props.level)}>Reset Game</button>;
	const playAgainButton =  <button onClick={()=>props.resetGame(props.level)}>Play Again</button>;
	const nextButton = <button onClick={()=>props.resetGame(props.level+1)}>Next Level</button>

	let message = gameOver;
	let options = playAgainButton;

	if(props.status===1){
		message = gameOn;
		options = resetButton;
	}
	else if(props.status==2){
		message = gameWon;
		options = nextButton
	}

	return (<div className="gamestats">
		<div>lives: {props.lives}</div> 
		<div>level: {props.level}</div>
		<div className="gameinfo">{message}</div>
		{options}
		</div>);
};


export default GameStats;