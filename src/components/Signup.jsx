import React from 'react';

const Signup = () => {
	return <div className='signup'><h3>SIGN UP TO PLAY!</h3><div>
		<form method='POST' action='/signup'>
			<div><input name="firstName" type="text" placeholder="First Name"></input></div>
			<div><input name="lastName" type="text" placeholder="Last Name"></input></div>
			<div><input name="userName" type="text" placeholder="Username"></input></div>
			<div><input name="password" type="password" placeholder="Password"></input></div>
			<div><input type='submit' value='Sign Up'></input></div>
		</form>
		</div></div>;

}


export default Signup;