import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "./App.css";
import Home from './blog_app/Home';
import Logins from './blog_app/components/containers/Login';
import Signups from './blog_app/components/containers/Signup';
import { Provider } from 'react-redux';
import store from './store';
import Layout from './blog_app/components/hocs/base/Layout';
import Blog from './blog_app/components/Blog';
import Category from './blog_app/components/Category';
import BlogDetail from './blog_app/components/BlogDetail';
import NotFound from './blog_app/components/hocs/base/Layout';
import Create from './blog_app/components/admin/Create';
import SignUp from './blog_app/components/registers/register';
import SignIn from './blog_app/components/registers/login';
import LogOut from './blog_app/components/registers/logout';

import { reset_post_status } from './blog_app/components/actions/post';


const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/blog' component={Blog} />
                    <Route exact path='/category/:id' component={Category} />
                    <Route exact path='/blog/:id' component={BlogDetail} />

                    <Route exact path='/register/signup' component={SignUp} />
                    <Route exact path='/register/signin' component={SignIn} />

                    <Route exact path='/admin/create' component={Create} />
                    <Route exact path='/login' component={Logins} />
                    <Route exact path='/signup' component={Signups} />
                    <Route exact path='/register/logout' component={LogOut} />
                    <Route exact path='/logout' component={LogOut} />
                    <Route component={NotFound} />
                    {/*<Route exact path='/reset-password' component={ResetPassword} />
                    <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
                    <Route exact path='/activate/:uid/:token' component={Activate} />*/}
                </Switch>
            </Layout>
        </Router>
    </Provider>
);

export default App;