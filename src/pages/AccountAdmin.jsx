

import React from 'react';
import { connect } from 'react-redux'; 
import { withRouter } from 'react-router'
import fetch from 'Axios'
import { Table, Button, Popconfirm  } from 'antd';
import PageTitle    from '../component/page-title/index.jsx'
import BillModal    from '../Modal/billModal.jsx'
import style from '../style/BillAdmin.less'
/**
 * 表格表头
 */

class AccountAdmin extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            data : [],
            BillShow:false,
            columns : [
                { title: '姓名',   dataIndex: 'name',    align:'center',  },
                { title: '性别',   dataIndex: 'sex',     align:'center',  },
                { title: '年龄',   dataIndex: 'age',     align:'center',  },
                { title: '地址',   dataIndex: 'site',    align:'center',  },
                { title: '居住地', dataIndex: 'address', align:'center',  },
                {
                    title: '操作',
                    key: 'operation',
                    width: 100,
                    render: (text, record, index) => {
                        return (
                            <Popconfirm 
                                title="是否将这条信息删除" 
                                onConfirm={ this.handleDelete.bind(this, text, record, index )} 
                                okText="确定" 
                                cancelText="取消"
                            >
                                <a href="javascript:;" >删除</a>
                            </Popconfirm>
                        )
                    }
                },
            ]
        }
    }
    
    // 删除
    handleDelete(text, record, index){
        this.props.DELETE_USER(index)
    }
    // 打开弹框
    addUser(){
        this.setState({
            BillShow : !this.state.BillShow
        })        
    }

    // 子穿父
    handleFrom( layer ){
        setTimeout( () =>{
            this.setState({
                BillShow: layer
            })
        },500)
    }

    render(){
        return(
            <div className='BillAdmin'>

                <PageTitle title='添加人员信息' />

                <div className='button-Warp'>
                    <Button type="primary" onClick={this.addUser.bind(this)}>添加人员信息</Button>
                </div>

                <PageTitle title='人员列表' />

                <Table   size='small' rowKey={(record, index) => `complete${record.name}${index}`} columns={this.state.columns}  dataSource={this.props.userInfoList}  />
                
                {
                    this.state.BillShow && <BillModal BillShow={this.state.BillShow} handleFrom={this.handleFrom.bind(this)}/>
                }
            </div>
        )
    }
}

const mapStateToProps =  (state ) =>{
    return  { userInfoList: state.usersAction.userInfoList } 
}
const mapDispatchToProps = ( dispatch ) =>{
    return{  
        DELETE_USER : ( index ) => dispatch({
            type      : 'DELETE_USER',
            index,
        }),

	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountAdmin))
