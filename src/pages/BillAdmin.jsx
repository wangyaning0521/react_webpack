import React from 'react';
import { withRouter } from 'react-router'
import fetch from 'Axios'
import { Table, Button  } from 'antd';
import PageTitle    from '../component/page-title/index.jsx'
import BillModal    from '../Modal/billModal.jsx'
import '../style/BillAdmin.less'
/**
 * 表格表头
 */
const columns = [
    { title: '姓名',   dataIndex: 'name',    align:'center' },
    { title: '性别',   dataIndex: 'sex',     align:'center' },
    { title: '年龄',   dataIndex: 'age',     align:'center' },
    { title: '地址',   dataIndex: 'site',    align:'center' },
    { title: '居住地', dataIndex: 'address', align:'center' },
    {
      title: '操作',
      key: 'operation',
      width: 100,
      render: () => <a href="javascript:;">删除</a>,
    },
];
class BillAdmin extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data : [],
            BillShow:false,
        }
    }
    componentDidMount() {
        
        
    }

    // 打开弹框
    addUser(){
        this.setState({
            BillShow : !this.state.BillShow
        })        
    }

    // 子穿父
    handleFrom( layer, val ){
        setTimeout( () =>{
            this.setState({
                BillShow: layer
            })
        },500)
        if( val ){
            this.setState({
                data : [...this.state.data, val]
            })
        }
       
    }

    render(){
        return(
            <div className='BillAdmin'>

                <PageTitle title='添加人员信息' />

                <div className='button-Warp'>
                    <Button type="primary" onClick={this.addUser.bind(this)}>添加人员信息</Button>
                </div>

                <PageTitle title='人员列表' />

                <Table  size='small' columns={columns} dataSource={this.state.data}  />
                
                {
                    this.state.BillShow && <BillModal BillShow={this.state.BillShow} handleFrom={this.handleFrom.bind(this)}/>
                }
            </div>
        )
    }
}
export default withRouter(BillAdmin)