import React          from 'react';
import { connect }    from 'react-redux'; 
import { withRouter } from 'react-router'
import { fromJS }     from 'immutable'
import { labelValue, local, operId } from 'utils'

import { Form, Input, DatePicker, Col, TimePicker, Select, Cascader, InputNumber, Row, Button, Table } from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;

import '../style/AccountAdmin.less'
import mockList from  '../mock/accountAdmin'
import InputGroup from '../component/input-group/index.jsx'
import bill from 'service/bill/bill-service.jsx'

const _bill = new bill()

class BillAdmin extends React.Component{
    constructor(props) {

        super(props)
        const self = this
        this.state = {
            sendMsg:{},
            inputGroup:[
                {
                    name  : 'keyWord',
                    title : '关键字',
                    type : 'input' ,
                    value: '',
                    placeholder:'账单号、联系人、联系电话'
                },
                {   name : 'customId', 
                    title : '归属客服' , 
                    type : 'select' ,  
                    data:[] , 
                    placeholder:'请选择客服',
                },
                {   name : ['province','city'], 
                    title : '所在地' , 
                    type : 'cascader' ,  
                    data:[] , 
                    placeholder:'请选择所在地',
                },
                {   name : ['buildTimeBegin','buildTimeEnd'], 
                    title : '生成日' , 
                    type : 'RangePicker',  
                    placeholder:['生成日开始','生成日结束'],
                },
                {   name : 'busiType', 
                    title : '业务类型' , 
                    type : 'select' ,  
                    data:[] , 
                    placeholder:'请选择业务类型',
                },
                {   name : 'status', 
                    title : '账单状态' , 
                    type : 'select' ,  
                    data:[] , 
                    placeholder:'请选择账单状态',
                },
            ],
            columns : [
                {
                    title: '账单号', dataIndex: 'id',
                },
                {
                    title: '单位客户', dataIndex: 'companyName',
                },
                {
                    title: '项目',  dataIndex: 'projectName',
                },
                {
                    title: '所在地',    dataIndex: 'region',
                },
                {
                    title: '收款单位',  dataIndex: 'sysCompany',
                },
                {
                    title: '账单月',    dataIndex: 'billDate',
                },
                {
                    title: '账单总额',  dataIndex: 'billSum',
                },
                {
                    title: '待回款总额',    dataIndex: 'billWait',
                },
                {
                    title: '已回款总额',    dataIndex: 'billPaid',
                },
                {
                    title: '垫资',  dataIndex: 'billPad',
                },
                {
                    title: '状态',  dataIndex: 'statusDesc',
                },
                {
                    title: '操作',  dataIndex: 'operation',   width: 100,
                    render(text,record, index){
                        return (
                            <div>
                                <Button onClick={self.lookDetails.bind(self, record.id)}>查看</Button>
                            </div>
                        )
                    }
                },
            ],
            data:[],
            pagination:{
                total:0,
                current: 0,
                pageSize:0,
                showSizeChanger : true,
                onChange : ( page, pageSize ) =>{
                    this.TablePlug( operId, page, pageSize)
                },
                onShowSizeChange : ( current, size ) =>{
                    this.TablePlug( operId, current, size)
                }
            },
            rowSelection : {
                onChange: (selectedRowKeys, selectedRows) => {
                    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                },
                getCheckboxProps: record => ({
                    disabled: record.name === 'Disabled User', // Column configuration not to be checked
                    name: record.name,
                }),
              }
        }

    }
    componentDidMount() {
        this.InputPlug()
        this.TablePlug( operId )
    }
    lookDetails( val ){
        if( val ) this.props.history.push(`/BillDetails/${val}`) 
    }
    async InputPlug(){
        
        // 归属客服
        let { data : { code, result } } =  await  _bill.getAfter()
        // 所在地
        let { data : { code : cityCode, result: cityResult }} = await _bill.cityPlug()
        // 业务类型
        let { data : { code : busiCode, result: busiResult }} = await _bill.busiTypePlug()
        // 账单状态
        let { code: statusCode, result: statusResult } = _bill.statusPlug()
        let inputGroup = this.state.inputGroup

        inputGroup.forEach( (item) =>{
            if( item.name == 'customId' && code == 0 ){
                item.data  = labelValue(result,'name','id')
            }
            if( item.title == '所在地' && cityCode == 0 ){
                item.data  = cityResult
            }
            if( item.name == 'busiType' && busiCode == 0 ){
                item.data = labelValue(busiResult,'name','code')
            }
            if( item.name == 'status' && statusCode == 0 ){
                item.data = statusResult
            }
        })

        this.setState({
            inputGroup: fromJS(Object.assign( inputGroup )).toJS()
        })

    }
    /**
     * @event 搜索
     */
    TablePlug(operId, pageNum = 1 , pageSize = 10){
        let { pagination, sendMsg } = this.state
        _bill.TablePlug({
            operId,
            pageNum,
            pageSize,
            ...sendMsg
        }).then( ( response ) =>{
            let { code, result, pageMessage } = response.data
            if( code === 0 ){
                this.setState({
                    data : result,
                    pagination : { 
                        ...pagination,
                        total:pageMessage.total,
                        current: pageMessage.pageNum,
                        pageSize:pageMessage.pageSize,
                    }
                })
            }
        } )
    }
    /**
     *  @event 清空
     */
    handleReset () {
        this.setState({
            sendMsg : {}
        })
        Object.keys(this.refs).forEach( ( val ) =>{
            if( val.indexOf('-input') ){
                this.refs[val].clearInput()
            }
        })
    }
    /**
     * @event 组件返回
     */
    inputChange( val ){
        let sendMsg = fromJS(this.state.sendMsg).toJS()
        /**
         * @event 赋值
         */
        if( val instanceof Object ){
            this.setState({
                sendMsg : fromJS(Object.assign( sendMsg , val )).toJS()
            })
        }
        /**
         * @event 删除
         */
        else{
            delete sendMsg[val]
            this.setState({
                sendMsg
            })
        }
    }
	render() {
        let { inputGroup, columns, data, rowSelection, pagination } = this.state
        return (
            <div className='AccountAdmin'>
                <Form >
                    <Row>
                        <Col span={20}>
                            <Row>
                                {
                                    inputGroup.map( (item, index) =>{
                                        return (
                                            <Col span={6} key={index}>
                                                <InputGroup ref={`${item.name}-input`} {...item} onChange={this.inputChange.bind(this)}/>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </Col>
                        <Col span={3} offset={1} className='AccountAdmin-Search'>
                            <Button type="primary"  onClick={this.TablePlug.bind(this,operId,pagination.current,pagination.pageSize)}>搜索</Button>
                            <Button   onClick={this.handleReset.bind(this)}>清空</Button>
                        </Col>
                    </Row>
                </Form>
                <Table 
                    pagination={pagination}
                    rowKey={record => record.id } 
                    locale = {local} 
                    rowSelection={rowSelection} 
                    columns={columns} 
                    dataSource={data}
                />
            </div>
        );  
	}  
}
export default withRouter(BillAdmin)