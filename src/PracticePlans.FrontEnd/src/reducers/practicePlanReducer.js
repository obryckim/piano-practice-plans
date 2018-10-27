import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function practicePlanReducer(state = initialState.practicePlans, action) {
	switch (action.type) {
		case types.LOAD_PRACTICEPLANS_SUCCESS:
			// whatever was returned will replace what was in the state
			return action.practicePlans;

		default:
			return state;
	}
}
