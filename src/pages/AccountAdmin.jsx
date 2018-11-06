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
            keyWorld:'这是默认属性'
        }

        this.handleReset = () =>{
            this.props.form.resetFields();
        }
        this.inputChange = ( val ) =>{
            this.setState({
                [val.target.name] : val.target.value
            })
        }
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
                                <Input name='keyWorld' defaultValue={this.state.keyWorld} onChange={this.inputChange}/>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="业务选择"
                            >
                                <Select defaultValue={1}>
                                    {
                                        mockList.Option.map( (item) => {
                                           return (
                                                <Option key={item.value} value={item.value}>{item.label}</Option>
                                           )
                                       }) 
                                    }
                                    
                                    {/* <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="Yiminghe">yiminghe</Option> */}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="地区"
                            >
                                <Cascader  options={mockList.Cascader}  placeholder="Please select" />
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="日期选择"
                            >
                                <RangePicker/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6} offset={4}>
                            <Button type="primary">搜索</Button>
                        </Col>
                        <Col span={6} offset={4}>
                            <Button onClick={this.handleReset}>清空</Button>
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
AccountAdmin = withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountAdmin)) 




export default AccountAdmin
