import * as types from './actionTypes';
import practicePlanApi from '../api/practicePlanApi';
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

        return practicePlanApi.getAllPracticePlans()
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
