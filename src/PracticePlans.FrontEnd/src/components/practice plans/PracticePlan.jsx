import React from 'react';
import PropTypes from 'prop-types';

const PracticePlan = ({ practicePlan }) => {
    return (
        <div>
            <h1>Benjamin&apos;s Piano Practice Plan</h1>
            <h3><small className='text-muted'>{practicePlan.startDateString} - {practicePlan.startDateString}</small></h3>
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
