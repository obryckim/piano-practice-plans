import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput.jsx';
import TextAreaInput from '../common/TextAreaInput.jsx';

const PracticePlanForm = ({ practicePlan, onSave, onChange, saving, errors }) => {
    return (
        <div className='container'>
            <form noValidate>
                <h1>Manage Practice Plan</h1>
                <TextInput
                    name='startDate'
                    label='Practice Plan Start Date'
                    placeholder='Enter the date this practice plan starts...'
                    value={practicePlan.startDate}
                    onChange={onChange}
                    error={errors.startDate} />
                <TextAreaInput
                    name='details'
                    label='Practice Plan Details'
                    placeholder='Enter the details of the practice plan... (markdown supported)'
                    value={practicePlan.details}
                    rows='20'
                    onChange={onChange}
                    error={errors.details} />
                <input
                    type='submit'
                    disabled={saving}
                    value={saving ? 'Saving...' : 'Save'}
                    className='btn btn-primary'
                    onClick={onSave} />
            </form>
        </div>
    );
};

PracticePlanForm.propTypes = {
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    saving: PropTypes.bool,
    errors: PropTypes.object,
    practicePlan: PropTypes.object.isRequired
};

export default PracticePlanForm;
