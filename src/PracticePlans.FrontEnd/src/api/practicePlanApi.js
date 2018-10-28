import * as api from './apiCommon';

class PracticePlanApi {

    static getAllPracticePlans() {
        return fetch(api.PRACTICE_PLANS_ENDPOINT)
            .then(response => response.json().then(body => ({ response, body })));
    }
}

export default PracticePlanApi;
