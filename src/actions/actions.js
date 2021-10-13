import * as types from '../constants/actionTypes';

export const moveLeftActionCreator = () => ({
	type: types.MOVE_LEFT,
	payload: 'muncher'
});

export const moveRightActionCreator = () => ({
	type: types.MOVE_RIGHT,
	payload: 'muncher'
});

export const moveUpActionCreator = () => ({
	type: types.MOVE_UP,
	payload: 'muncher'
});

export const moveDownActionCreator = () => ({
	type: types.MOVE_DOWN,
	payload: 'muncher'
});

export const eatNumActionCreator = () => ({
	type: types.EAT_NUM,
	payload: 'eat'
});

export const updateGameActionCreator = (level) => ({
	type: types.UPDATE_GAME,
	payload: level
});

