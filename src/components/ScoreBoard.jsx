import React from 'react';
import UserScore from './UserScore';

const ScoreBoard = (props) => {

	const scores = [<div className="userscore">
	<div className="score-header">USERNAME</div>
	<div className="score-header">SCORE</div>
	</div>];

	props.scoreboard.forEach(user =>{
		scores.push(<UserScore userName={user.userName} firstName={user.firstName} score={user.score} />)
	});

	return (<fieldset id='scoreboard'>
		<legend>Score Leaders</legend>
		{scores}
		</fieldset>);
};

export default ScoreBoard;