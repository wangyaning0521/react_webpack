import React from 'react';
import { Provider, connect } from 'react-redux'; 
import { Button } from 'antd';
import { withRouter } from 'react-router'
//定义组件  
class App extends React.Component{
    constructor(props) {
        super(props)
    } 
	render() {  
        const {size,add_size} = this.props;  
        return (  
            <div>
                <h1>{size}</h1>
                <Button type="primary" onClick={add_size}>click me</Button>
            </div>  
        );  
	}  
}

//映射Redux state到组件的属性  
function mapStateToProps(state) {
	return { size: state.size}  
}  
//映射Redux actions到组件的属性  
function mapDispatchToProps(dispatch){  
	return{  
        add_size:()=>dispatch({
            type:'ADD_SIZE',
            size:10
        }),
	}  
}  
//连接组件  
App = withRouter(connect(mapStateToProps, mapDispatchToProps)(App)) 

export default App
