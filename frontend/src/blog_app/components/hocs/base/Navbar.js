import React, { Fragment, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = ({ logout, isAuthenticated }) => {
    const [redirect, setRedirect] = useState(false);
    
    const logout_user = () => {
        logout();
        setRedirect(true);
    };

    const guestLinks = () => (
        <Fragment>
            <li className='nav-item'>
                <Link className='nav-link' to='/register/signin'>ログイン</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/register/signup'>ユーザー登録</Link>
            </li>
        </Fragment>
    );
    
    const authLinks = () => (
        <Fragment>
        <ul className="navbar-nav">
            <li className='nav-item'>
                <Link className='nav-link' to='/admin/create'>新規作成</Link>
            </li>
        </ul>
        <ul className="navbar-nav">
            <li className='nav-item'>
                <Link className='nav-link' to='/register/logout' onClick={logout_user}>logout</Link>
            </li>
        </ul>
    </Fragment>
    );
    return (
        <Fragment>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <Link className='navbar-brand' to='/'>Blog</Link>
                <button 
                    className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNav'
                    aria-controls='navbarNav' aria-expanded='false'  aria-label='Toggle navigation' >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav'>
                        <li className='nav-item active'>
                            <Link className='nav-link' to='/'>トップ<span className='sr-only'>(current)</span></Link>
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