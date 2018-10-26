import React from 'react';
import { withRouter } from 'react-router'
class Foo extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <h1>foo组件</h1>
                <h2>路由获取 {this.props.match.params.number}</h2>
            </div>
        )
    }
}
export default withRouter(Foo)