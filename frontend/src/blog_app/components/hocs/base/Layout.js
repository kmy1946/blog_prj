import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../../actions/auth';
import Footer from './Footer';

const Layout = ({ checkAuthenticated, load_user, children }) => {//load_user, 
    useEffect(() => {
        checkAuthenticated();
        load_user();
    }, []);

    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

export default connect(null, { checkAuthenticated, load_user })(Layout);