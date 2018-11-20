import React from 'react';
import { withRouter } from 'react-router'
import { Button } from 'antd';


import AddBusi from 'Component/busi/add-busi.jsx'
class BusinessAdmin extends React.Component{
    constructor(props){
        super(props)
        this.state={
            addShow : false
        }
    }

    handleCancel(){
        setTimeout( () =>{
            this.setState({
                addShow: false
            })
        },500)
    }

    AddUser(){
        this.setState({
            addShow: true
        })
    }

    render(){
        let { addShow } = this.state
        return(
            <div >
                <Button onClick={ this.AddUser.bind(this) }>单增</Button>
                {
                    addShow &&  <AddBusi addShow={addShow} handleCancel = { this.handleCancel.bind(this) }></AddBusi>
                }
            </div>
        )
    }
}

export default withRouter(BusinessAdmin)

