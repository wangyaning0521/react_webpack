import React from 'react';
import { Provider, connect } from 'react-redux'; 
import { Button } from 'antd';
//定义组件  
class Login extends React.Component{
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

export default Login
