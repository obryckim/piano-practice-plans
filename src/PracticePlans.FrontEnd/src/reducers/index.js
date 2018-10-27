import { combineReducers } from 'redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import practicePlans from './practicePlanReducer';

const rootReducer = combineReducers({
    ajaxCallsInProgress,
    practicePlans
});

export default rootReducer;
