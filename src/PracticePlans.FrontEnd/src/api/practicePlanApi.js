import * as api from './apiCommon';

class PracticePlanApi {

    static getAllPracticePlans() {
        return fetch(api.PRACTICE_PLANS_ENDPOINT)
            .then(response => response.json().then(body => ({ response, body })));
    }

    static savePracticePlan(practicePlan) {
        return fetch(api.PRACTICE_PLANS_ENDPOINT, {
                method: 'POST',
                // mode: 'cors'
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(practicePlan)
            })
            .then(response => response.json().then(savedPracticePlan => ({ response, savedPracticePlan })));
    }
}

export default PracticePlanApi;
