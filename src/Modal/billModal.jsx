/*
* @Author: WangYaNing
* @Date:   2018-11-8
* @Last Modified by:   WangYaNing
* @Last Modified time: 2018-11-8
*/
import React from 'react';
import axios from 'Axios'
import bill from 'service/bill/bill-service.jsx'
import { connect } from 'react-redux'; 
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Modal, Radio, InputNumber   } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const RadioGroup = Radio.Group;

const _bill        = new bill();

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
};

let  plugList = []

class BillFrom extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible:this.props.BillShow,
            plugList: []
        }
    }

    componentDidMount(){
        this.getPlugList()
    }
    // 地区接口
    getPlugList(){
        _bill.getPlugList().then( ( res ) =>{
            let { code, message, result } = res.data
            if( code == 0 ){
                this.setState({
                    plugList: result
                })
            }
        })
    }
    // 表单校验
    validateToNext( rule, value, callback ){
        switch( rule.field ){
            case 'name':
                if( value && value.length > 7  )  callback('姓名长度有点小问题奥！')
            break;
            case 'address':
                if( value && value.length < 7   )  callback('居住地长度有点小问题奥！')
            break;
        }
        callback()
    }
    // 表单提交
    handleSubmit() {
        this.props.form.validateFields(
            (err , val ) => {
                if (!err) {
                    this.setState({
                        visible: false
                    })
                    this.props.handleFrom( false )
                    this.props.ADD_USER( val )
                }
            },
        );
    }
    // 表单取消
    handleCancel(){
        this.setState({
            visible: false
        })
        this.props.handleFrom( false )
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            
            <Modal
                title="添加人员信息"
                visible={this.state.visible}
                onOk={this.handleSubmit.bind(this)}
                onCancel={this.handleCancel.bind(this)}
            >
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="姓名"
                    >
                        {getFieldDecorator('name', {
                            rules: [ 
                                {
                                    required: true, message: '请填写姓名！',
                                },
                                {
                                    validator: this.validateToNext.bind(this),
                                }
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="性别"
                    >
                        {
                            getFieldDecorator('sex', {
                                rules: [
                                    {
                                        required: true, message: '请填写性别！',
                                    }, 
                                    {
                                        validator: this.validateToNext.bind(this),
                                    }
                                ],
                            })(
                                <RadioGroup>
                                    <Radio value='男'>男</Radio>
                                    <Radio value='女'>女</Radio>
                                </RadioGroup>
                            )
                        }

                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="年龄"
                    >
                        {
                            getFieldDecorator('age', {
                                rules: [
                                    {
                                        required: true, message: '请填写年龄！',
                                    }, 
                                    {
                                        validator: this.validateToNext.bind(this),
                                    }
                                ],
                            })(
                                <InputNumber min={1}  />
                            )
                        }

                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="地址"
                    >
                        {
                            getFieldDecorator('site', {
                                rules: [
                                    {
                                        required: true, message: '请填写地址！',
                                    }, 
                                    {
                                        validator: this.validateToNext.bind(this),
                                    }
                                ],
                            })(
                                <Cascader options={this.state.plugList}  />
                            )
                        }

                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="居住地"
                    >
                        {
                            getFieldDecorator('address', {
                                rules: [
                                    {
                                        required: true, message: '请填写居住地！',
                                    }, 
                                    {
                                        validator: this.validateToNext.bind(this),
                                    }
                                ],
                            })(
                                <Input  />
                            )
                        }

                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

const mapStateToProps =  (state ) =>{
    return  { userInfoList: state.usersAction.userInfoList } 
}
const mapDispatchToProps = ( dispatch ) =>{
    return{  

        ADD_USER : ( val ) => dispatch({
            type      : 'ADD_USER',
            userInfo  : val
        }),

	}
}

const BillModal = Form.create()(BillFrom);
export default connect(mapStateToProps, mapDispatchToProps)(BillModal);