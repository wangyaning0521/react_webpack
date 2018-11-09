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
                <h2> redux获取 ： 
                    <ul>
                        {
                            this.props.userInfoList.map((item,val)=>{
                                return (
                                    <li key={val}>
                                        {item.asd}
                                    </li>
                                )
                            })
                        }
                        <li></li>
                    </ul>
                </h2>
                <Button onClick={this.props.add_size}>redux 相加</Button>
            </div>
        )
    }
}

//映射Redux state到组件的属性  
function mapStateToProps(state) {
	return { userInfoList: state.usersAction.userInfoList}  
}  
//映射Redux actions到组件的属性  
function mapDispatchToProps(dispatch){
	return{  
        add_size:()=>dispatch({
            type:'ADD_USER',
            userInfo:{
                asd:'11'
            }
        }),
	}  
}  

//连接组件  
// Bar = 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BusinessAdmin) )

