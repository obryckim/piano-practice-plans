import * as types from './actionTypes';
import practicePlanApi from '../api/practicePlanApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

export function loadPracticePlanSuccess(practicePlan) {
    return {
        type: types.LOAD_PRACTICEPLAN_SUCCESS,
        practicePlan
    };
}

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

export function loadPracticePlanIfNeeded(practicePlanId) {
    return (dispatch, getState) => {

        if (shouldfetchPracticePlan(getState(), practicePlanId)) {
            return dispatch(fetchPracticePlans(practicePlanId));
        } else {
            return Promise.resolve();
        }
    };
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

function shouldfetchPracticePlan(state, practicePlanId) {
    const practicePlans = state.practicePlans;
    const practicePlan = practicePlans.filter(practicePlan => practicePlan.startDateString === practicePlanId);

    return practicePlan.length ? false : true;
}

function fetchPracticePlans(practicePlanId) {
    return dispatch => {
        dispatch(beginAjaxCall());

        return practicePlanApi.getPracticePlan(practicePlanId)
            .then(({ response, body }) => {
                if (!response.ok) {
                    dispatch(ajaxCallError());
                    throw (response.statusText);
                } else {
                    dispatch(loadPracticePlanSuccess(body));
                }
            })
            .catch(error => {
                dispatch(ajaxCallError());
                throw (error);
            });
    };
}
