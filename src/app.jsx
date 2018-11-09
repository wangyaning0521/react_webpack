
import React                 from 'react';
import ReactDOM              from 'react-dom';
import { createStore }       from 'redux';  
import { Provider } from 'react-redux'; 
import reducer               from './store';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import 'font-awesome/css/font-awesome.min.css';
import './style.less';



import {LayoutRouter,Login} from './router'

//创建store
let store = createStore(reducer);  
class RouterComponent extends React.Component{

    render(){
        return (
            <Router>
                <Provider store={store}> 
                    <Switch>
                        <Route path='/login' component={Login} />
                        <Route path="/" render={ () => LayoutRouter} />
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