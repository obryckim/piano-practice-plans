﻿import React from 'react';
import PropTypes from 'prop-types';
import PracticePlanListRow from './PracticePlanListRow.jsx';

// This is just a presentational component
// ES6 Stateless Functional Component
const PracticePlanList = ({ practicePlans }) => {
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Start Date</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
                {practicePlans.map(pp => <PracticePlanListRow key={pp.startDate} practicePlan={pp} />)}
            </tbody>
        </table>
    );
};

PracticePlanList.propTypes = {
    practicePlans: PropTypes.array.isRequired
};

export default PracticePlanList;
