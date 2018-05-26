
import React                 from 'react';
import ReactDOM              from 'react-dom';
import { createStore }       from 'redux';  
import { Provider, connect } from 'react-redux'; 
import reducer               from 'store/store.js';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom';

import 'font-awesome/css/font-awesome.min.css';
import './style.less';

//引入组件
import Bar    from "Component/Bar.jsx";
import Foo    from "Component/Foo.jsx";
import App    from "Component/App.jsx";
import Login  from "Component/login.jsx";
import Layout from "layout/index.jsx";
//创建store
let store = createStore(reducer);  
class RouterComponent extends React.Component{
    render(){
        let  LayoutRouter = (
            <Layout >
                <Switch>
                    <Route path='/foo/:number' component={Foo} />
                    <Route path='/bar/:num' component={Bar} />
                    <Route path='/' exact component={App}/>  
                </Switch>
            </Layout>
        );
        return (
            <Router>
                <Provider store={store}> 
                    <Switch>
                        <Route path='/login' component={Login} />
                        <Route path="/" render={ props => LayoutRouter} />
                    </Switch>
                </Provider>
            </Router>
        )
    }
}
//渲染组件      
ReactDOM.render(
    <RouterComponent />,
	document.getElementById('app')  
)  