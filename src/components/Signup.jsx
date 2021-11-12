import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signup = (props) => {

	const initialState = {
		firstName: '',
		lastName: '',
		userName: '',
		password: '',
	};

	const [status, setStatus] = useState('signup');
	const [state, setState] = useState(initialState);
	const [color, setColor] = useState('black-border');
	const [message, setMessage] = useState('');

	const createAccount = (e)=> {
		axios.post('/signup', state)
			.then(res => res.config.data)
			.then((user)=> {
				props.updateUser(user);
				setStatus('success');
			})
			.catch((err) => console.log('Error creating user: ', err));
	};

	const updateChange = (e) => {
		const newState = {...state};
		newState[e.target.name] = e.target.value;
		setState(newState);
	};

	const checkPassword = (e) =>{
		if(e.target.value != state.password){
			setColor('red-border');
			setMessage('Password does not match.');
		}
		else{
			setColor('black-border');
			setMessage('');
		}
	};

	let body = '';

	if(status === 'signup'){
		body = <form >
		<div><input name="firstName" type="text" placeholder="First Name" onChange={updateChange}></input></div>
		<div><input name="lastName" type="text" placeholder="Last Name" onChange={updateChange}></input></div>
		<div><input name="userName" type="text" placeholder="Username" onChange={updateChange}></input></div>
		<div><input name="password" type="password" placeholder="Password" onChange={updateChange}></input></div>
		<div><input name="password2" type="password" className={color} placeholder="Confirm Password" onChange={checkPassword}></input></div>
		<div>{message}</div>
		<div><Link to='/' ><input type='submit' value='Sign Up' onClick={createAccount}></input></Link></div>
	</form>;
	}
	if(status === 'success'){
		body = <div>You've successfully signed up. Now log in to play!
		<Link to='/' ><button value='Click here to log in'>Click Here To Log In</button></Link></div>;
	}

	return <fieldset id='signup'>
	<legend>SIGN UP TO PLAY</legend><div>
		{body}
		</div></fieldset>;

}


export default Signup;