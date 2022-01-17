import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { Button } from '@material-ui/core';

const Navbar = ({ logout, isAuthenticated }) => {
    const [redirect, setRedirect] = useState(false);

    const logout_user = () => {
        logout();
        setRedirect(true);
    };

    const guestLinks = () => (
        <Fragment>
            <li className='nav-item'>
                <Link className='nav-link' to='/register/signin'>Login</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/register/signup'>Sign Up</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/blog'>blog</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/register/logout'>logout</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/register/signin'>Guest Page</Link>
            </li>
        </Fragment>
    );

    const authLinks = () => (
        <Fragment>
        <ul className="navbar-nav">
            <li className='nav-item'>
                <Link className='nav-link' to='/blog'>Blog</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/admin/create'>Create</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/admin/create'>User Page !!!!!!</Link>
            </li>
        </ul>
        <ul className="navbar-nav">
            {/*
            <li className='nav-item'>
                <a className='nav-link' href='#!' onClick={logout_user}>Logout</a>
            </li>
            */}
            <li className='nav-item'>
                <Link className='nav-link' to='/register/logout'>logout</Link>
            </li>
        </ul>
    </Fragment>
    );

    return (
        <Fragment>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <Link className='navbar-brand' to='/'>Blog</Link>
                <button 
                    className='navbar-toggler' 
                    type='button' 
                    data-toggle='collapse' 
                    data-target='#navbarNav' 
                    aria-controls='navbarNav' 
                    aria-expanded='false' 
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav'>
                        <li className='nav-item active'>
                            <Link className='nav-link' to='/'>Home <span className='sr-only'>(current)</span></Link>
                        </li>
                        {isAuthenticated ? authLinks() : guestLinks()}
                    </ul>
                </div>
            </nav>
            {redirect ? <Redirect to='/' /> : <Fragment></Fragment>}
        </Fragment>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);