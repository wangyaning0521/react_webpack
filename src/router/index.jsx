
import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';
import Bundle from '../bundle/';
import Layout from "layout/";

import BusinessAdminContainer from 'bundle-loader?lazy&name=app-[Bar]!../pages/BusinessAdmin';
import BillAdminContainer from 'bundle-loader?lazy&name=app-[billAdmin]!../pages/BillAdmin';
import LoginContainer from 'bundle-loader?lazy&name=app-[Login]!../pages/Login';
import AppContainer from 'bundle-loader?lazy&name=app-[App]!../pages/App';
import AccountAdminContainer from 'bundle-loader?lazy&name=app-[App]!../pages/AccountAdmin';

const BusinessAdmin = () => (<Bundle load={BusinessAdminContainer}>{(BusinessAdmin) => <BusinessAdmin />}</Bundle>)
const BillAdmin = () => (<Bundle load={BillAdminContainer}>{(BillAdmin) => <BillAdmin />}</Bundle>)
const App = () => (<Bundle load={AppContainer}>{(App) => <App />}</Bundle>)
const Login = () => (<Bundle load={LoginContainer}>{(Login) => <Login />}</Bundle>)
const AccountAdmin = () => (<Bundle load={AccountAdminContainer}>{(AccountAdmin) => <AccountAdmin />}</Bundle>)

const LayoutRouter = (
    <Layout >
        <Switch>
            <Route path='/billAdmin/:number' component={BillAdmin} />
            <Route path='/BusinessAdmin/:num' component={BusinessAdmin} />
            <Route path='/AccountAdmin' component={AccountAdmin} />
            <Route path='/' exact component={App}/>  
        </Switch>
    </Layout>
)
export {
    LayoutRouter,
    Login
}