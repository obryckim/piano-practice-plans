import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const PracticePlanListRow = ({ practicePlan }) => {
    return (
        <tr>
            <td>{moment(practicePlan.startDate).format('YYYY/MM/DD')}</td>
        </tr>
    );
};

PracticePlanListRow.propTypes = {
    practicePlan: PropTypes.object.isRequired
};

export default PracticePlanListRow;
