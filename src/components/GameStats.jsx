import React, { Component } from 'react';


const GameStats = (props) =>{

	const gameOn = 'Eat all numbers multiple of '+(props.level+1);
	const gameOver = 'GAME OVER! Try again?';
	const gameWon = 'You Won! Awesome Job!';

	const resetButton = <button onClick={()=>props.resetGame()}>Reset Game</button>;
	const playAgainButton =  <button onClick={()=>props.resetGame()}>Play Again</button>;
	const nextButton = <button onClick={()=>props.updateGame(props.level+1)}>Next Level</button>

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

	return <div className="gamestats">
		<div className='statinfo'>User: {props.userName}</div>
		<div className='statinfo'>Score: {props.score}</div>
		<div className='statinfo'>Current level: {props.level}</div>
		<div className='statinfo'><div style={{margin: '0 5px 0px 5px'}}> lives: </div><div className="liveBar" style={{width: props.lives*50+'px'}}>{props.lives}</div></div> 
		<div className="gameinfo">{message}</div>
		<div className="gameinfo">{options}</div>
		</div>;
};


export default GameStats;