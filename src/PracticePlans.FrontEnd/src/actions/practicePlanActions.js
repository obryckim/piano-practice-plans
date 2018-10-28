import * as types from './actionTypes';
//import courseApi from '../api/mockCourseApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

export function loadPracticePlansSuccess(practicePlans) {
    return {
        type: types.LOAD_PRACTICEPLANS_SUCCESS,
        practicePlans
    };
}

export function loadPracticePlans() {
    return dispatch => {
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
