import React from 'react';
import { Link } from 'react-router-dom';

const Login = () =>{
		return <div className='signup'><h3>LOGIN TO PLAY</h3><div>
			<form method='POST' action='/login'>
				<div><input name="userName" type="text" placeholder="Username"></input></div>
				<div><input name="password" type="password" placeholder="Password"></input></div>
				<div><input type='submit' value='LOGIN'></input></div>
  		</form>
		</div>
		<Link to='/signup'><button >Sign Up Here</button></Link>
		</div>;
}


export default Login;