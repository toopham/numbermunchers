import { updateUserActionCreator } from '../actions/actions';
import * as types from '../constants/actionTypes';


const initialState = {
	gridState: [['-','-','-','-','-','-','-','-'],
	['-','-','-','-','-','-','-','-'],
	['-','-','-','-','-','-','-','-'],
	['-','-','-','-','-','-','-','-'],
	['-','-','-','-','-','-','-','-'],
	['-','-','-','-','-','-','-','-'],
	['-','-','-','-','-','-','-','-'],
	['-','-','-','-','-','-','-','-']],
	firstName: 'Guest',
	lastName: 'Player', 
	level: 1,
	lives: 3,
	score: 0,
	status: 1,
	userID: '',
	muncherPos: [0,0],
	numGens: [{color: 'red', Pos: [7,7], active: true},
						{color: 'blue', Pos: [7,7], active: false},
						{color: 'orange', Pos: [7,7], active: false}],
	scoreboard: [{}],
}


const saveUser =(level, score) =>{
	fetch('/api', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json',},
		body: JSON.stringify({level: level, score: score})
	})
	.then(res => res.json())
	.then(data => console.log('UPDATE user DB successfully :', data))
	.catch(err => console.log('Error updating user: ',err));
}

const gameReducer = (state = initialState, action) => {
	let newPos = [...state.muncherPos];
	let status = state.status;
	let mult = state.level+1;
	let level = state.level;
	let lives = state.lives;
	let score = state.score;
	const newGrid = state.gridState.map(el => [...el]);
	
	switch (action.type){
		case types.MOVE_LEFT:
			if(status===0) return {...state};
			if(state.muncherPos[1]>0){
				newPos[1]-=1;
			}

			return {
				...state,
				muncherPos: newPos,
			};
		case types.MOVE_RIGHT:
			if(status===0) return {...state};
			if(state.muncherPos[1]<7){
				newPos[1]+=1;
			}

			return {
				...state,
				muncherPos: newPos,
			};
		case types.MOVE_UP:
			if(status===0) return {...state};
			if(state.muncherPos[0]>0){
				newPos[0]-=1;
			}

			return {
				...state,
				muncherPos: newPos,
			};
		case types.MOVE_DOWN:
			if(status===0) return {...state};
			if(state.muncherPos[0]<7){
				newPos[0]+=1;
			}

			return {
				...state,
				muncherPos: newPos,
			};
		case types.EAT_NUM:
			if(status===0) return {...state};
			const top = state.muncherPos[0];
			const left = state.muncherPos[1];

			const num = newGrid[top][left];
			
			//check if num ate is a correct multiple 
			if(num%(state.level+1)===0){
				newGrid[top][left]='';

				//if you eat a 0 then increase lives by 1
				if(num===0) lives+=1;

				//assume game is over
				status = 2;

				//check if game is really over
				for(let i = 0; i < 8; i++){
					for(let j = 0; j< 8; j++){
						//if we find a number that is still a multiple then set game = 1
						if(typeof newGrid[i][j]==='number' && newGrid[i][j]%mult===0){
							status = 1;
						}
					}
				}

				return {
					...state,
					gridState: newGrid,
					lives: lives,
					status: status,
				}
			}
			else{
				lives = state.lives-1;
				if(lives===0) status=0;
				return {
					...state,
					lives: lives,
					status: status,
				}
			}
		case types.UPDATE_GAME:
			if(action.payload){
				mult = action.payload+1;
				level = action.payload;
				//scoring algorithm
				score = score + lives*10*mult;

				saveUser(level,score);
			}

			lives = 3;
			if(level > 5) lives = 4;
			if(level > 10) lives = 5;

			for(let i = 0; i < 8; i++){
				for(let j = 0; j< 8; j++){
					// console.log('AT row i = ', i);
					// console.log('AT col j = ', j);
					// console.log('INJECTING NUM ', newGrid[i][j]);
					newGrid[i][j] = Math.floor(Math.random()*20)*(mult+Math.floor(Math.random()*3));
					if(newGrid[i][j]%mult === 0) newGrid[i][j]+=1;
				}
			}

			//Inject in at most 20 numbers that are correct multiples
			for(let k = 0; k < 20;k++){
				let i = Math.floor(Math.random()*8);
				let j = Math.floor(Math.random()*8);
				newGrid[i][j] = Math.floor(Math.random()*40)*(mult);
				// console.log("INJECTING NUMBER ", newGrid[i][j]);
			}



			return {
				...state,
				gridState: newGrid,
				level: level,
				lives: lives,
				score: score,
				status: 1,
			}
		case types.UPDATE_USER:
			level = action.payload.currentLevel;
			score = action.payload.score;
			
			return {
				...state,
				firstName: action.payload.firstName,
				lastName: action.payload.lastName,
				userID: action.payload._id.toString(),
				level: level,
				score: score,
			}
		case types.MOVE_NUM:
			const newGens = state.numGens.map(obj => Object.assign({},obj));
			newGens.forEach(num=> {
				if(num.active){
					//create vector to Muncher
					const x = state.muncherPos[1] - num.Pos[1];
					const y = state.muncherPos[0] - num.Pos[0];
					
					if(Math.abs(y) > Math.abs(x)){
						//move UP
						if(y<0) num.Pos[0]-=1;
						//move DOWN
						if(y>0) num.Pos[0]+=1;

					}
					else{
						//move LEFT
						if(x<0) num.Pos[1]-=1;
						//move RIGHT
						if(x>0) num.Pos[1]+=1;
					}
				}
			});

			return {
				...state,
				numGens: newGens,
			};
		case types.SCORE_BOARD:
			const users = action.payload;
			const scoreboard = [];

			users.forEach(user => {
				scoreboard.push({...user});
			});

			return {
				...state,
				scoreboard: scoreboard,
			}
		default: {
			return state;
		}
		
	}

}

export default gameReducer;