import * as types from './actionTypes';
//import courseApi from '../api/mockCourseApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

function fetchPracticePlans() {
    return function (dispatch) {
        dispatch(beginAjaxCall());

        // TODO:: create/use practicePlansApi class

        return fetch('http://localhost:5000/api/PracticePlans/')
            .then(response => response.json().then(body => ({ response, body })))
            .then(({ response, body }) => {
                if (!response.ok) {
                  dispatch(ajaxCallError());
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

function shouldFetchPracticePlans(state) {
    const practicePlans = state.practicePlans;

    if (!practicePlans) {
        return true;
    } else if (!practicePlans.length) {
        return true;
    }

    return false;
}

export function loadPracticePlansSuccess(practicePlans) {
    return {
        type: types.LOAD_PRACTICEPLANS_SUCCESS,
        practicePlans
    };
}

export function fetchPracticePlansIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchPracticePlans(getState())) {
            return dispatch(fetchPracticePlans());
        }
    };
}
