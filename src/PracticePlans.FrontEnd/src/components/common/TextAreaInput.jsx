﻿import React from 'react';
import PropTypes from 'prop-types';

const TextAreaInput = ({ name, label, rows, onChange, placeholder, value, error }) => {
    let wrapperClass = 'form-group';

    if (error && error.length > 0) {
        wrapperClass += ' ' + 'has-error';
    }

    return (
        <div className={wrapperClass}>
            <label htmlFor={name}>{label}</label>
            <div className='field'>
                <textarea
                    name={name}
                    className='form-control'
                    placeholder={placeholder}
                    rows={rows}
                    value={value}
                    onChange={onChange} />
                {error && <div className='alert alert-danger'>{error}</div>}
            </div>
        </div>
    );
};

TextAreaInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    rows: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string
};

export default TextAreaInput;
