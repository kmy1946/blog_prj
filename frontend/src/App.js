import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "./App.css";
import Home from './containers/Home';
import Logins from './containers/Login';
import Signups from './containers/Signup';
import { Provider } from 'react-redux';
import store from './store';
import Layout from './hocs/Layout';
import Blog from './components/Blog';
import Category from './components/Category';
import BlogDetail from './components/BlogDetail';
import NotFound from './hocs/Errors/NotFound';
import Create from './components/admin/Create';
import SignUp from './containers/registers/register';
import SignIn from './containers/registers/login';
import LogOut from './containers/registers/logout';

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