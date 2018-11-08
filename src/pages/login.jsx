import React from 'react';
import { withRouter } from 'react-router'

import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Modal, Radio, InputNumber   } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const RadioGroup = Radio.Group;

import  '../style/login.less'
//定义组件  
class Login extends React.Component{
    constructor(props) {
        super(props)
    } 
	render() {
        const { getFieldDecorator } = this.props.form;
        return (  
            <div className='form'>
                <div className='logo'>
                    {/* <img alt="logo" src={config.logo} />
                    <span>{config.name}</span> */}
                </div>
                <form>
                    <FormItem hasFeedback>
                        {getFieldDecorator('username', {
                        rules: [
                        {
                            required: true,
                        },
                        ],
                    })(<Input  placeholder="Username" />)}
                    </FormItem>
                    <FormItem hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                        {
                            required: true,
                        },
                        ],
                    })(<Input type="password"  placeholder="Password" />)}
                    </FormItem>
                    <Row>
                    {/* <Button type="primary" onClick={handleOk} loading={loading.effects.login}>
                        Sign in
                    </Button> */}
                    <p>
                        <span>Username：guest</span>
                        <span>Password：guest</span>
                    </p>
                    </Row>

                </form>
            </div>  
        );  
	}  
}

const LoginPage = Form.create()(Login);
export default withRouter(LoginPage)
