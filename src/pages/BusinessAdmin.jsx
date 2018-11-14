import React from 'react';
import { Provider, connect } from 'react-redux'; 
import { withRouter } from 'react-router'
import { Button } from 'antd';
class BusinessAdmin extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div >
                <h1>业务管理</h1>
                <h2> 路由获取 ： {this.props.match.params.num}</h2>
                <Button onClick={this.props.add_size}>redux 相加</Button>
            </div>
        )
    }
}

//映射Redux state到组件的属性  
function mapStateToProps(state) {
}  
//映射Redux actions到组件的属性  
function mapDispatchToProps(dispatch){
}  

//连接组件  
// Bar = 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BusinessAdmin) )

