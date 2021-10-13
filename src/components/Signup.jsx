import React, { Component } from 'react';

class Signup extends Component{
	constructor(props){
		super(props);
		this.state = [];

	}

	componentdidMount(){

	}

	render(){

		return (<form method='POST' action='/signup'>
			<input name="firstName" type="text" placeholder="First Name"></input>
			<input name="lastName" type="text" placeholder="Last Name"></input>
    <input name="userName" type="text" placeholder="Username"></input>
    <input name="password" type="password"></input>
    <input type='submit' value='Create User'></input>
  	</form>);
	}

}


export default Signup;