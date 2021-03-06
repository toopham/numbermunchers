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
	userName: 'Guest', 
	level: 1,
	lives: 3,
	score: 0,
	status: 1,
	userID: '',
	muncherPos: [0,0],
	muncherImg: 'url("assets/num-muncher.png")',
	numGens: [{color: 'red', Pos: [7,7], active: true, value: ''},
						{color: 'blue', Pos: [7,7], active: false, value: ''},
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
	const newGens = state.numGens.map(obj => Object.assign({},obj));
	
	const updateGens = () =>{
		let muncherStatus = muncherSRC[0];
		newGens.forEach(num=>{
			if(newPos[0]===num.Pos[0] && newPos[1]===num.Pos[1] && num.active === true){
				if(newGrid[newPos[0]][newPos[1]]%mult===0 && newGrid[newPos[0]][newPos[1]]!=''){
					num.active = false;
					muncherStatus = muncherSRC[1]; //Ate the numBoss at a multiple of mult
					num.value = newGrid[newPos[0]][newPos[1]];
				}
				else{
					lives-=1;
					muncherStatus = muncherSRC[2]; //Ate numBoss at the wrong multiple
					num.active = false;
				}
				newGrid[newPos[0]][newPos[1]] = '';
			}
		});

		return muncherStatus;
	};


	const muncherSRC = ['url("assets/num-muncher.png")', 'url("assets/num-muncher-happy.png")', 'url("assets/num-muncher-sick.png")'];
	switch (action.type){
		case types.MOVE_LEFT:
			if(status!=1) return {...state};
			if(state.muncherPos[1]>0){
				newPos[1]-=1;
			}

			muncherStatus = updateGens();

			if(lives===0) status=0;

			return {
				...state,
				lives: lives,
				status: status,
				gridState: newGrid,
				muncherPos: newPos,
				numGens: newGens,
				muncherImg: muncherStatus,
			};
		case types.MOVE_RIGHT:
			if(status!=1) return {...state};
			if(state.muncherPos[1]<7){
				newPos[1]+=1;
			}

			muncherStatus = updateGens();

			if(lives===0) status=0;

			return {
				...state,
				lives: lives,
				status: status,
				gridState: newGrid,
				muncherPos: newPos,
				numGens: newGens,
				muncherImg: muncherStatus,
			};
		case types.MOVE_UP:
			if(status!=1) return {...state};
			if(state.muncherPos[0]>0){
				newPos[0]-=1;
			}

			muncherStatus = updateGens();

			if(lives===0) status=0;

			return {
				...state,
				lives: lives,
				status: status,
				gridState: newGrid,
				muncherPos: newPos,
				numGens: newGens,
				muncherImg: muncherStatus,
			};
		case types.MOVE_DOWN:
			if(status!=1) return {...state};
			if(state.muncherPos[0]<7){
				newPos[0]+=1;
			}

			muncherStatus = updateGens();

			if(lives===0) status=0;

			return {
				...state,
				lives: lives,
				status: status,
				gridState: newGrid,
				muncherPos: newPos,
				numGens: newGens,
				muncherImg: muncherStatus,
			};
		case types.EAT_NUM:
			if(status!=1) return {...state};
			const top = state.muncherPos[0];
			const left = state.muncherPos[1];

			const num = newGrid[top][left];
			newGrid[top][left]='';
			
			//check if num ate is a correct multiple 
			if(num%mult===0){

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
					muncherImg: muncherSRC[1],
				}
			}
			else{
				lives = state.lives-1;
				if(lives===0) status=0;
				return {
					...state,
					lives: lives,
					gridState: newGrid,
					status: status,
					muncherImg: muncherSRC[2],
				}
			}
		case types.UPDATE_GAME: //Reset game or move game to next level
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

			//reset numBoss position
			newGens.forEach(num=> {
				num.Pos = [7,7];
				if(num.color === 'red') num.active = true;
				if(num.color === 'blue' && level > 4) num.active = true;
				if(num.color === 'orange' && level > 8) num.active = true;
			});

			return {
				...state,
				gridState: newGrid,
				level: level,
				lives: lives,
				score: score,
				muncherPos: [0,0],
				status: 1,
				numGens: newGens,
				muncherImg: muncherSRC[0],
			}
		case types.UPDATE_USER:

			
			return {
				...state,
				firstName: action.payload.firstName,
				lastName: action.payload.lastName,
				userName: action.payload.userName,
				userID: action.payload._id,
				level: action.payload.currentLevel,
				score: action.payload.score,
			}
		case types.MOVE_NUM:
			let muncherStatus =state.muncherImg;
			let nonActive = true; //Set to be 1 
			newGens.forEach(num=> {
				if(num.active){
					nonActive = false; // If there is an active numBoss then turn off trigger;
					//create vector to Muncher and move each numBoss towards Muncher
					const x = state.muncherPos[1] - num.Pos[1];
					const y = state.muncherPos[0] - num.Pos[0];
					
					let numPosx = num.Pos[1];
					let numPosy = num.Pos[0];
					
					if(Math.abs(y) > Math.abs(x)){
						//move UP
						if(y<0) numPosy-=1;
						//move DOWN
						if(y>0) numPosy+=1;

						
					}
					else{
						//move LEFT
						if(x<0) numPosx-=1;
						//move RIGHT
						if(x>0) numPosx+=1;
					}

					const top = state.muncherPos[0];
					const left = state.muncherPos[1];

					if(top === numPosy && left === numPosx){
						if(newGrid[top][left]%mult===0 && newGrid[newPos[0]][newPos[1]]!=''){
							//If the square the Muncher is in is a multiple of mult then don't move in
							//The numBoss is smart to not move into the same square as muncher.
							return {...state};
						} 
						else{
							newGrid[top][left]='';
							lives -=1;
							if(lives===0) status=0;
							muncherStatus = muncherSRC[2];
							num.active = false;
						}
					}

					num.Pos[1]=numPosx;
					num.Pos[0]=numPosy;
				}
			});

			if(nonActive){
				newGens[1].active = true;
				newGens[1].Pos = [7,7];
			} 
		
			return {
				...state,
				lives: lives,
				status: status,
				numGens: newGens,
				gridState: newGrid,
				muncherImg: muncherStatus,
			};
		case types.SCORE_BOARD:
			const users = action.payload;
			const scoreboard = [];
			users.sort((a,b) => b.score - a.score);

			users.forEach(user => {
				scoreboard.push({...user});
			});

			return {
				...state,
				scoreboard: scoreboard,
			}
		case types.CHECK_STATE:
			newGens.forEach(num=>{
				if(newPos[0]===num.Pos[0] && newPos[1]===num.Pos[1]){
					if(newGrid[newPos[0]][newPos[1]]%mult===0){
						num.active = false;
					}
					else{
						lives-=1;
					}
					newGrid[newPos[0]][newPos[1]] = '';
				}
			});

			if(lives <= 0) status=0;
			
			return {
				...state,
				lives: lives,
				status: status,
				gridState: newGrid,
			}
		default: {
			return state;
		}
		
	}

}

export default gameReducer;