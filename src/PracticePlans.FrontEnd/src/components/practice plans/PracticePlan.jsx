import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const PracticePlan = ({ practicePlan }) => {
    return (
        <div>
            <h1>Benjamin&apos;s Piano Practice Plan</h1>
            <h3>
                <small className='text-muted'>
                    {moment(practicePlan.startDate).format('ddd, MMM D')}
                    &nbsp;through&nbsp;
                    {moment(practicePlan.startDate).add(6, 'days').format('ddd, MMM D')}
                </small>
            </h3>
            <div className='card'>
                <div className='card-body' dangerouslySetInnerHTML={practicePlan}></div>
            </div>
        </div>
    );
};

PracticePlan.propTypes = {
    practicePlan: PropTypes.object.isRequired
};

export default PracticePlan;
