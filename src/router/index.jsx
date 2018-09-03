
import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';
import Bundle from '../bundle/';
import Layout from "layout/";

import BarContainer from 'bundle-loader?lazy&name=app-[Bar]!../Component/Bar';
import FooContainer from 'bundle-loader?lazy&name=app-[Foo]!../Component/Foo';
import LoginContainer from 'bundle-loader?lazy&name=app-[Login]!../Component/Login';
import AppContainer from 'bundle-loader?lazy&name=app-[App]!../Component/App';

const Bar = () => (
    <Bundle load={BarContainer}>
        {(Bar) => <Bar />}
    </Bundle>
)
const Foo = () => (
    <Bundle load={FooContainer}>
        {(Foo) => <Foo />}
    </Bundle>
)
const App = () => (
    <Bundle load={AppContainer}>
        {(App) => <App />}
    </Bundle>
)
const Login = () => (
    <Bundle load={LoginContainer}>
        {(Login) => <Login />}
    </Bundle>
)


const LayoutRouter = (
    <Layout >
        <Switch>
            <Route path='/foo/:number' component={Foo} />
            <Route path='/bar/:num' component={Bar} />
            <Route path='/' exact component={App}/>  
        </Switch>
    </Layout>
)
export {
    LayoutRouter,
    Login
}