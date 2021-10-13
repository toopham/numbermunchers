import React, { Component } from 'react';
import Game from './Game';
import GameStats from './GameStats';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';


//mapState
const mapStateToProps = (state) => ({
	gridState: state.game.gridState,
	level: state.game.level,
	lives: state.game.lives,
	status: state.game.status,
	muncherPos: state.game.muncherPos,
	numGuards: state.game.numGuards,
});


//mapDispatch
const mapDispatchToProps = (dispatch) => ({
	moveLeft: (e) => {
		dispatch(actions.moveLeftActionCreator());
	},
	moveRight: (e) => {
		dispatch(actions.moveRightActionCreator());
	},
	moveUp: (e) => {
		dispatch(actions.moveUpActionCreator());
	},
	moveDown: (e) => {
		dispatch(actions.moveDownActionCreator());
	},
	eatNum: (e) => {
		dispatch(actions.eatNumActionCreator());
	},
	updateGame: (level) => {
		dispatch(actions.updateGameActionCreator(level));
	},
	resetGame: (level) => {
		dispatch(actions.updateGameActionCreator(level));
	}
});


class GameContainer extends Component{
	constructor(props){
		super(props);


	}

	componentDidMount(){
		this.props.updateGame(this.props.level);
	}

	handleKey = e => {
		
		console.log(e.keyCode);
		//If LEFT_ARROW IS PRESS
		if(e.keyCode === 37) this.props.moveLeft();
		//If UP_ARROW IS PRESS
		if(e.keyCode === 38) this.props.moveUp();
		//If RIGHT_ARROW IS PRESS
		if(e.keyCode === 39) this.props.moveRight();
		//If DOWN_ARROW IS PRESS
		if(e.keyCode === 40) this.props.moveDown();

		//IF SPACE_BAR IS PRESS
		if(e.keyCode === 32) this.props.eatNum();

		const i = this.props.muncherPos[0];
		const j = this.props.muncherPos[1];
		console.log('VALUE CURRENTLY AT = ', this.props.gridState[i][j]);
	}

	render(){
		return (<div className="gamecontainer" tabIndex="0" onKeyDown={this.handleKey}>
		<GameStats lives={this.props.lives} level={this.props.level} status={this.props.status}resetGame={this.props.resetGame} />
		<Game muncherPos={this.props.muncherPos} gridState={this.props.gridState} numGuards={this.props.numGuards}/>
		</div>);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
