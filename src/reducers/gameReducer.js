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
	level: 1,
	lives: 3,
	status: 1,
	muncherPos: [0,0],
	numGuards: {red: {color: 'red', Pos: [7,7], active: false}},
}

const gameReducer = (state = initialState, action) => {
	let newPos = [...state.muncherPos];
	let status = state.status;
	let mult = state.level+1;
	let level = state.level;
	const newGrid = state.gridState.map(el => [...el]);
	
	switch (action.type){
		case types.MOVE_LEFT:
			if(status===0) return {...state};
			if(state.muncherPos[1]>0){
				newPos[1]-=1;
				console.log(newPos);
			}

			return {
				...state,
				muncherPos: newPos,
			};
		case types.MOVE_RIGHT:
			if(status===0) return {...state};
			if(state.muncherPos[1]<7){
				newPos[1]+=1;
				console.log(newPos);
			}

			return {
				...state,
				muncherPos: newPos,
			};
		case types.MOVE_UP:
			if(status===0) return {...state};
			if(state.muncherPos[0]>0){
				newPos[0]-=1;
				console.log(newPos);
			}

			return {
				...state,
				muncherPos: newPos,
			};
		case types.MOVE_DOWN:
			if(status===0) return {...state};
			if(state.muncherPos[0]<7){
				newPos[0]+=1;
				console.log(newPos);
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
					status: status,
				}
			}
			else{
				const lives = state.lives-1;
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
			}


			for(let i = 0; i < 8; i++){
				for(let j = 0; j< 8; j++){
					// console.log('AT row i = ', i);
					// console.log('AT col j = ', j);
					// console.log('INJECTING NUM ', newGrid[i][j]);
					newGrid[i][j] = Math.floor(Math.random()*40)*(mult+Math.floor(Math.random()*3));
				}
			}

			//Inject in 10 numbers that are correct multiples
			for(let k = 0; k < 10;k++){
				let i = Math.floor(Math.random()*8);
				let j = Math.floor(Math.random()*8);
				newGrid[i][j] = Math.floor(Math.random()*40)*(mult);
				// console.log("INJECTING NUMBER ", newGrid[i][j]);
			}

			return {
				...state,
				gridState: newGrid,
				level: level,
				status: 1,
			}
		default: {
			return state;
		}
		
	}

}

export default gameReducer;