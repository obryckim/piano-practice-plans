import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

const PracticePlanListRow = ({ practicePlan }) => {
    return (
        <tr>
            <td>
                <Link to={'/admin/practicePlan/' + practicePlan.startDateString}>
                    [edit]
                </Link>
            </td>
            <td>
                <Link to={'/practicePlans/' + practicePlan.startDateString}>
                    {moment(practicePlan.startDate).format('YYYY/MM/DD')}
                </Link>
            </td>
            <td>{practicePlan.details}</td>
        </tr>
    );
};

PracticePlanListRow.propTypes = {
    practicePlan: PropTypes.object.isRequired
};

export default PracticePlanListRow;
