import React, { Component } from 'react';
import Game from './Game';
import GameStats from './GameStats';
import ScoreBoard from './ScoreBoard';
import Rules from './Rules';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';


//mapState
const mapStateToProps = (state) => ({
	gridState: state.game.gridState,
	firstName: state.game.firstName,
	lastName: state.game.lastName,
	userName: state.game.userName,
	level: state.game.level,
	lives: state.game.lives,
	score: state.game.score,
	status: state.game.status,
	muncherPos: state.game.muncherPos,
	muncherImg: state.game.muncherImg,
	numGens: state.game.numGens,
	scoreboard: state.game.scoreboard,
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
	resetGame: () => {
		dispatch(actions.updateGameActionCreator());
	},
	moveNum: () => {
		dispatch(actions.moveNumActionCreator());
	},
	checkState: () => {
		dispatch(actions.checkStateBoardActionCreator());
	}
});


class GameContainer extends Component{
	constructor(props){
		super(props);
		this.gameRef = React.createRef();

		//Is numGen moving?
		this.genMoving = false;
	}

	genMover(){
		this.props.moveNum();
		this.gameRef.current.focus();
		//Once this function is called we set it to true.
		this.genMoving = true;

		const speed = 6000 - 5000*(1/(1+Math.exp(0-this.props.level)));

		if(this.props.status===1) setTimeout(this.genMover.bind(this), speed);
		else{
			this.genMoving = false;
		}
	}

	componentDidMount(){
		this.props.resetGame();
		this.gameRef.current.focus();

		//If numGEn is not moving then make it move.
		if(this.genMoving === false) this.genMover();

	}

	componentDidUpdate(){
		this.gameRef.current.focus();

		//if numGen is not moving then make it move.
		if(this.genMoving === false) this.genMover();
	}

	handleKey = e => {


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
	}

	render(){
		return (<div className="play"><ScoreBoard scoreboard={this.props.scoreboard} /><div className="gamecontainer" ref={this.gameRef} tabIndex="0" onKeyDown={this.handleKey}>
		<GameStats lives={this.props.lives} level={this.props.level} score={this.props.score} userName={this.props.userName} status={this.props.status} updateGame={this.props.updateGame} resetGame={this.props.resetGame} />
		<Game muncherPos={this.props.muncherPos} numGens={this.props.numGens} gridState={this.props.gridState} status={this.props.status} numGuards={this.props.numGuards} muncherImg={this.props.muncherImg}/>
		</div> <Rules /></div>);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
