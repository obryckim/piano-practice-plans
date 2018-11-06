import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = () => {
    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <Link to='/' className='navbar-brand'>
                <FontAwesomeIcon icon='music' />&nbsp;Benjamin&apos;s Piano Practice Plan
            </Link>
            <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNav'>
                <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarNav'>
                <div className='navbar-nav'>
                    <NavLink className='nav-item nav-link' activeClassName='active' exact to='/'>Home</NavLink>
                    <NavLink className='nav-item nav-link' activeClassName='active' to='/PracticePlans'>Practice Plans</NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
