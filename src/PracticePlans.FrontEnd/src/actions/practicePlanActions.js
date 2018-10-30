import * as types from './actionTypes';
import practicePlanApi from '../api/practicePlanApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

export function loadPracticePlansSuccess(practicePlans) {
    return {
        type: types.LOAD_PRACTICEPLANS_SUCCESS,
        practicePlans
    };
}

export function createPracticePlanSuccess(practicePlan) {
	return { type: types.CREATE_PRACTICEPLAN_SUCCESS, practicePlan };
}

export function updatePracticePlanSuccess(practicePlan) {
	return { type: types.UPDATE_PRACTICEPLAN_SUCCESS, practicePlan };
}

export function loadPracticePlans() {
    return dispatch => {
        dispatch(beginAjaxCall());

        return practicePlanApi.getAllPracticePlans()
            .then(({ response, body }) => {
                if (!response.ok) {
                    dispatch(ajaxCallError());
                    throw (response.statusText);
                } else {
                    dispatch(loadPracticePlansSuccess(body));
                }
            })
            .catch(error => {
                dispatch(ajaxCallError());
                throw (error);
            });
    };
}

export function savePracticePlan(practicePlan) {
    return dispatch => {
        dispatch(beginAjaxCall());

        return practicePlanApi.savePracticePlan(practicePlan)
            .then(({response, savedPracticePlan}) => {
                if (!response.ok) {
                    dispatch(ajaxCallError());
                    throw (response.statusText);
                } else {
                    practicePlan.startDate ?
                        dispatch(updatePracticePlanSuccess(savedPracticePlan)) :
                        dispatch(createPracticePlanSuccess(savedPracticePlan));
                }
            })
            .catch(error => {
                dispatch(ajaxCallError());
                throw (error);
            });
    };
}
