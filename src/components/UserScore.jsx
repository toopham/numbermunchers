import React from 'react';

const UserScore = (props)=>{

	return (<div className="userscore">
		<div className="score-col">{props.userName}</div>
		<div className="score-col">{props.score}</div>
		</div>);
};

export default UserScore;