import React, {Component} from "react";
import GameContainer from "./components/GameContainer";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Cookies from 'js-cookie';
import './stylesheets/style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from './actions/actions';

//mapState
const mapStateToProps = (state) => ({
	firstName: state.game.firstName,
	lastName: state.game.lastName,
	level: state.game.level,
	score: state.game.score,
});

//mapDispatch
const mapDispatchToProps = (dispatch) => ({
	updateUser: (user) => {
		dispatch(actions.updateUserActionCreator(user));
	},

});


class App extends Component {

	constructor(props){
		super(props);

	}

	componentDidMount(){
		const cookie = Cookies.get('muncher');
		
		fetch('/api').then(res => res.json())
			.then(res => this.props.updateUser(res))
			.catch(err => console.log('ERROR ACCESSING GET API ', err));
	}



	render(){
		let links = (<ul>
			<Link to="/play"><li>Play As Guest</li></Link>
			<Link to="/"><li>Login</li></Link>
			<Link to="/signup"><li>Signup</li></Link>
		</ul>);

		if(this.props.firstName!='Guest'){
			links = (<ul>
				<Link to="/play"><li>Play</li></Link>
				<a href='/logout'><li>Logout</li></a>
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
					<Switch>
						<Route path="/play">
							<GameContainer />
						</Route>
						<Route path="/signup">
							<Signup />
						</Route>
						<Route path="/">
							<Login />
						</Route>
					</Switch>
				</div>
			</Router>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);