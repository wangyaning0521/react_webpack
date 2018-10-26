import React from 'react';
import { Provider, connect } from 'react-redux'; 
import { Button } from 'antd';
import { withRouter } from 'react-router'
//定义组件  
class AccountAdmin extends React.Component{
    constructor(props) {
        super(props)
    } 
	render() {  
        const {size,add_size} = this.props;  
        return (  
            <div>
                <h1>这是账号管理</h1>
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
AccountAdmin = withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountAdmin)) 

export default AccountAdmin
