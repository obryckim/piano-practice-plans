import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function practicePlanReducer(state = initialState.practicePlans, action) {
    switch (action.type) {
        case types.LOAD_PRACTICEPLANS_SUCCESS:
            // whatever was returned will replace what was in the state
            return action.practicePlans;

        case types.CREATE_PRACTICEPLAN_SUCCESS:
            return [...state, Object.assign({}, action.practicePlan)];

        case types.UPDATE_PRACTICEPLAN_SUCCESS:
            return [
                // all practicePlans except the one being updated
                ...state.filter(pp => pp.startDate !== action.practicePlan.startDate),
                // add the one being updated
                Object.assign({}, action.practicePlan)
            ];

        default:
            return state;
    }
}
