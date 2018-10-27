import React from 'react';
import PropTypes from 'prop-types';

const PracticePlanList = ({ practicePlans }) => {
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Start Date</th>
                </tr>
            </thead>
            <tbody>
                {practicePlans.map(practicePlan => <tr key={practicePlan.startDate}><td>{practicePlan.startDate}</td></tr>)}
            </tbody>
        </table>
    );
};

PracticePlanList.propTypes = {
    practicePlans: PropTypes.array.isRequired
};

export default PracticePlanList;
