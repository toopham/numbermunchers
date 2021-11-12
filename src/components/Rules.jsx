import React from 'react';

const Rules = (props) =>{

	const rules = ['As a number Muncher, your objective is to eat all numbers multiple of the given number.', 
								'You lose a live for eating a number that is not a correct multiple.', 
								'The numBoss is a very juicy number that you cannot resist to eat if you ever land on the same square as he is in.',
								'But if you eat the numBoss+another number where the sum of the two numbers become a correct multiple, then you will be okay!'];

	const goals = [];
	for(let i = 0; i< rules.length; i++){
		goals.push(<p>{i+1} ) {rules[i]}</p>);
	}

	return (<fieldset id='rules'>
	<legend>Objective</legend>
	{goals}
	</fieldset>);
};

export default Rules;