import React from 'react';
import {  connect } from 'react-redux'; 
import { withRouter } from 'react-router'
import { Form, Input, DatePicker, Col, TimePicker, Select, Cascader, InputNumber, Row, Button } from 'antd';
import mockList from  '../mock/accountAdmin'
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const FormItem = Form.Item;
const Option = Select.Option;

import '../style/AccountAdmin.less'

const formItemLayout = {
    labelCol: { span: 6,   },
    wrapperCol: { span: 18,  },
};

class AccountAdmin extends React.Component{
    constructor(props) {

        super(props)

        this.state = {
            keyWorld:'这是默认属性',
            busi:1,
            area:[],
            RangePicker:[]
        }

    }

    /**
     *  @event 清空
     */

    handleReset () {
        this.setState({
            keyWorld : '',
            busi:'',
            area:[],
            RangePicker:[]
        })
    }

    /**
     *  @event 通用表单
     */

    inputChange  ( val, option ) {
       
        let name, value;

        if ( Array.prototype.isPrototypeOf( val ) ) {
            name  = 'area'
            value =  val
        }
        else{
            name  = option ? option.ref : val.target.name
            value = option ? val        : val.target.value
        }

        this.setState({
            [name] : value
        })
    }

    pickerChange( val, value){
        this.setState({
            RangePicker : val
        })
    }
    /**
     *  @event 搜索
     */
    search(){
        console.log( this.state )
    }
	render() {  
        return (
            <div className='AccountAdmin'>
                <Form >
                    <Row>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout} 
                                label="关键字"
                            >
                                <Input 
                                    ref='keyWorld'
                                    name='keyWorld' 
                                    defaultValue={this.state.keyWorld}
                                    value={this.state.keyWorld}
                                    onChange={this.inputChange.bind(this)}
                                />
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="业务选择"
                            >
                                <Select
                                    name='busi'
                                    value={this.state.busi} 
                                    defaultValue={this.state.busi}
                                    onChange={this.inputChange.bind(this)}
                                >
                                    {
                                        mockList.Option.map( (item) => {
                                           return (
                                                <Option ref='busi' key={item.value} value={item.value}>{item.label}</Option>
                                           )
                                       }) 
                                    }
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="地区"
                            >
                                <Cascader  
                                    options={mockList.Cascader}  
                                    placeholder="Please select"
                                    value={this.state.area}
                                    onChange={this.inputChange.bind(this)}
                                />
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="日期选择"
                            >
                                <RangePicker
                                    value={this.state.RangePicker}
                                    onChange={this.pickerChange.bind(this)}
                                />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6} offset={4}>
                            <Button type="primary" onClick={this.search.bind(this)}>搜索</Button>
                        </Col>
                        <Col span={6} offset={4}>
                            <Button onClick={this.handleReset.bind(this)}>清空</Button>
                        </Col>
                    </Row>
                </Form>
                
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
AccountAdmin = withRouter(AccountAdmin)




export default AccountAdmin
