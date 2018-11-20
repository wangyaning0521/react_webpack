/*
* @Author: WangYaNing
* @Date:   2018-11-8
* @Last Modified by:   WangYaNing
* @Last Modified time: 2018-11-8
*/
import React from 'react';
import { Form, Select, Input, Cascader, Row, Button, Tag, Col, DatePicker     } from 'antd';
import styles from '../../style/addbusi.less'

const Option   = Select.Option;
const { MonthPicker } = DatePicker;
const FormItem = Form.Item;


class AppltInfo extends React.Component{
    constructor(props){

        super(props);

        this.state={

        }
        console.log(this.props)
    }

    componentDidMount(){

    }
    
    render(){
        let { type, res } = this.props
        return (
            <div className={styles.infoWarper}>
                <Tag color="#00b0b0">
                    { type == 1 ? '社保' : '公积金' }
                </Tag>
                <Row>
                    <Col span={3}>
                        <Select>
                            <Option value={2}>调入</Option>
                            <Option value={1}>新参</Option>
                        </Select>
                    </Col>
                    <Col span={3}>
                        <FormItem 
                            label={`参保地`}
                        >
                            <Cascader />
                        </FormItem>
                    </Col>
                    <Col span={3}>
                        <FormItem 
                            label={`政策包`}
                        >
                            <Select>
                                <Option value={2}>调入</Option>
                                <Option value={1}>新参</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={3}>
                        <FormItem 
                            label={`供应商`}
                        >
                            <Select>
                                <Option value={2}>调入</Option>
                                <Option value={1}>新参</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={3}>
                        <FormItem 
                            label={`起缴月`}
                        >
                            <MonthPicker />
                        </FormItem>
                    </Col>
                    <Col span={3}>
                        <FormItem 
                            label={`申报月`}
                        >
                            <Select>
                                <Option value={2}>调入</Option>
                                <Option value={1}>新参</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={3}>
                        <FormItem 
                            label={`基数`}
                        >
                            <Input />
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default AppltInfo;