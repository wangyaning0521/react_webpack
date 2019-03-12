/*
* @Author: WangYaNing
* @Date:   2018-11-8
* @Last Modified by:   WangYaNing
* @Last Modified time: 2018-11-8
*/
import React from 'react';
import { Form, Select, Input, Cascader, Row, Button, Tag, Col, DatePicker,Collapse      } from 'antd';
import styles from '../../style/addbusi.less'
import Item from 'antd/lib/list/Item';

const Option   = Select.Option;
const { MonthPicker } = DatePicker;
const FormItem = Form.Item;
const Panel = Collapse.Panel;

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
            <div className={`${styles.infoWarper} infoWarper`}>
                <Tag color="#00b0b0">
                    { type == 1 ? '社保' : '公积金' }
                </Tag>
                <Row>
                    <Col span={5}>
                        <FormItem 
                                {...formItemLayout}
                                label={`参保方式`}
                            >
                            <Select>
                                <Option value={2}>调入</Option>
                                <Option value={1}>新参</Option>
                        </Select>
                        </FormItem>
                    </Col>
                    <Col span={5}>
                        <FormItem 
                            {...formItemLayout}
                            label={`参保地`}
                        >
                            <Cascader />
                        </FormItem>
                    </Col>
                    <Col span={5}>
                        <FormItem
                            {...formItemLayout} 
                            label={`政策包`}
                        >
                            <Select>
                                <Option value={2}>调入</Option>
                                <Option value={1}>新参</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={5}>
                        <FormItem
                            {...formItemLayout} 
                            label={`供应商`}
                        >
                            <Select>
                                <Option value={2}>调入</Option>
                                <Option value={1}>新参</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={4}>
                        <FormItem
                            {...formItemLayout} 
                            label={`起缴月`}
                        >
                            <MonthPicker />
                        </FormItem>
                    </Col>
                    
                </Row>
                <Row>
                    <Col span={5}>
                        <FormItem
                            {...formItemLayout} 
                            label={`基数`}
                        >
                            <Input />
                        </FormItem>
                    </Col>
                    <Col span={5}>
                        <FormItem
                            {...formItemLayout} 
                            label={`申报月`}
                        >
                            <Select>
                                <Option value={2}>调入</Option>
                                <Option value={1}>新参</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Collapse accordion>
                        {
                            res.insuranceList.mainInsurance.map( (item,index) =>{
                                let {insuranceName} = item
                                return (
                                    <Panel header={insuranceName} key={index}>
                                        <p>{insuranceName}</p>
                                    </Panel>
                                )
                            })
                        }
                        {
                            res.insuranceList.additionalInsurance.map( (item,index) =>{
                                let {insuranceName} = item
                                return (
                                    <Panel header={insuranceName} key={index}>
                                        <p>{insuranceName}</p>
                                    </Panel>
                                )
                            })
                        }
                    </Collapse>
                </Row>
            </div>
        );
    }
}

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

export default AppltInfo;