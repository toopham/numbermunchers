import React, {Component} from "react";
import GameContainer from "./components/GameContainer";
import Signup from "./components/Signup";
import Login from "./components/Login";
import axios from "axios";
import "./stylesheets/style.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from './actions/actions';

//mapState
const mapStateToProps = (state) => ({
	firstName: state.game.firstName,
	lastName: state.game.lastName,
	userName: state.game.userName,
	level: state.game.level,
	score: state.game.score,
});

//mapDispatch
const mapDispatchToProps = (dispatch) => ({
	updateUser: (user) => {
		dispatch(actions.updateUserActionCreator(user));
	},
	updateScoreBoard: (users) => {
		dispatch(actions.updateScoreBoardActionCreator(users));
	}
});


class App extends Component {

	constructor(props){
		super(props);

	}

	componentDidMount(){
		axios.get('/api').then(res => res.data)
			.then(res => {
				this.props.updateUser(res);
			})
			.catch(err => console.log('ERROR ACCESSING GET API ', err));
		
		axios.get('/api/scores')
			.then(res => res.data)
			.then(data => this.props.updateScoreBoard(data))
			.catch(err => console.log('ERROR GETTING SCORES: ', err));
	}






	render(){
		axios.get('/api').then(res => res.data)
			.then(res => {
				this.props.updateUser(res);
			})
			.catch(err => console.log('ERROR ACCESSING GET API ', err));
			
		let links = (<ul>
			<Link to="play"><li>Play As Guest</li></Link>
			<Link to="/"><li>Login</li></Link>
			<Link to="signup"><li>Signup</li></Link>
		</ul>);

		if(this.props.firstName!='Guest'){
			links = (<ul>
				<Link to="play"><li>Play</li></Link>
				<a href='/api/logout'><li>Logout</li></a>
			</ul>);
		}

		return (
			<Router>
				<div className='container'>
					<nav>
						<ul className='title'>Number Munchers</ul>
						{links}
					</nav>

					{/* A <Switch> looks through its children <Route>s and
							renders the first one that matches the current URL. */}
					<Routes>
						<Route path="play" element={<GameContainer />} />
						<Route path="signup" element={	<Signup updateUser={this.props.updateUser} />} />
						<Route path="/" element={	<Login user={this.props} />} />
					</Routes>
				</div>
			</Router>
		);
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(App);