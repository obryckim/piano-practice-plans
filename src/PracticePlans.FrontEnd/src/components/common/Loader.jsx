import React from 'react';
import LoaderSpinner from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className='container text-center pt-4'>
            <LoaderSpinner type='Bars' color='#00BFFF' height='80' width='100'/>
            LOADING
        </div>
    );
};

export default Loader;
