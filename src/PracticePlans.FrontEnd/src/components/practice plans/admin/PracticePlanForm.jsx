import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../common/TextInput.jsx';
import TextAreaInput from '../../common/TextAreaInput.jsx';

const PracticePlanForm = ({ practicePlan, markdownPreview, onSave, onCancel, onChange, onMarkdownUpdate, saving, errors }) => {
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
                <div className='row'>
                    <div className='col-md-6'>
                        <TextAreaInput
                            name='details'
                            label='Practice Plan Details'
                            placeholder='Enter the details of the practice plan... (markdown supported)'
                            value={practicePlan.details}
                            rows='20'
                            onChange={(event) => { onChange(event); onMarkdownUpdate(event);}}
                            error={errors.details} />
                    </div>
                    <div className='col-md-6'>
                        <div dangerouslySetInnerHTML={markdownPreview}></div>
                    </div>
                </div>
                <input
                    type='submit'
                    disabled={saving}
                    value={saving ? 'Saving...' : 'Save'}
                    className='btn btn-primary'
                    onClick={onSave} />&ensp;
                <input
                    type='submit'
                    disabled={saving}
                    value='Cancel'
                    className='btn btn-default'
                    onClick={onCancel} />
            </form>
        </div>
    );
};

PracticePlanForm.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onMarkdownUpdate: PropTypes.func.isRequired,
    saving: PropTypes.bool,
    errors: PropTypes.object,
    practicePlan: PropTypes.object.isRequired,
    markdownPreview: PropTypes.object.isRequired
};

export default PracticePlanForm;
