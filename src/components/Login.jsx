import React from 'react';
import { Link } from 'react-router-dom';

const Login = (props) =>{
		let page = <fieldset id='login'><legend>Welcome, {props.user.firstName}. Login to play.</legend><div>
							<form method='POST' action='/login'>
								<div><input name="userName" type="text" placeholder="Username"></input></div>
								<div><input name="password" type="password" placeholder="Password"></input></div>
								<div><input type='submit' value='LOGIN'></input></div>
							</form>
						</div> Don't have an acount? 
						<Link to='/signup'><button >Sign Up Here</button></Link>
						</fieldset>;

		if(props.user.userName !== 'Guest'){
			page = <fieldset id='welcome'><legend>Welcome, {props.user.firstName}.</legend>
						<p>username: {props.user.userName} </p>
						<p>Level: {props.user.level} </p>
						<p>Score: {props.user.score} </p>

						<Link to='/play'><button >Click to Play</button></Link>
						</fieldset>
		}


		return <div>{page}</div>;
}


export default Login;