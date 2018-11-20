/*
* @Author: WangYaNing
* @Date:   2018-11-8
* @Last Modified by:   WangYaNing
* @Last Modified time: 2018-11-8
*/
import React from 'react';
import busi from 'service/busi/busi-service.jsx'
import { Form, Select, Input, Cascader, Row, Button  } from 'antd';
import { operId, parseList } from 'utils'
import styles from '../../style/addbusi.less'

const FormItem = Form.Item;
const Option   = Select.Option;
const _busi    = new busi()


const idCardRule = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
const idNumber   = /^1[345678]\d{9}$/

class from_busi extends React.Component{
    constructor(props){
        super(props);
        this.state={
            companyGroup:[],
            projectGroup:[],
            domicilePlug:[],
            insured:[]
        }
    }

    componentDidMount(){
        this.FromList()
    }
    /** @event 获取户籍地以及公司 */
    async FromList(){
        let { data : { code, result: companyGroup } } = await _busi.getCompanyList({ 
            companyName: "北京",
            operId
        })
        let { data :  { code: AreaCode,  result: domicilePlug}} = await _busi.AreaTreeList()

        if( code == 0 ){
            this.setState({
                companyGroup
            })
        }
        if( AreaCode == 0 ){
            let val = []
            parseList( domicilePlug, val )
            this.setState({
                domicilePlug:val
            })
        }

    }
    /** @event 公司change */
    async companyChange( companyId ){
        this.props.form.setFieldsValue({
            projectId:null
        });

        let { companyGroup } = this.state
        
        let  val = companyGroup.filter( ( item, val ) => item.id == companyId)
        
        if( val.length > 0 ){
            this.setState({
                insured: [ val[0].provinceCode, val[0].cityCode ]
            })
        }

        let { data : { code, result } } = await _busi.getProjectsList({ 
            companyId,
            operId
        })
        if( code == 0 ){
            this.setState({
                projectGroup: result
            })
        }
    }
    
    /** @event 表单校验 */
    validateToNext( rule, value, callback ){
        switch( rule.field ){
            case 'idCard':
                if( value && !idCardRule.test(value)  )  callback('请填写正确身份证号')
            break;
            case 'mobile':
                if( value && !idNumber.test(value)   )  callback('请填写正确手机号')
            break;
        }
        callback()
    }
    /** @event 表单提交 */
    handleSubmit(){
        this.props.form.validateFields(
            (err , val ) => {
                if (!err) {
                    this.props.onValuesChange( val, this.state.insured )
                }
            },
        );
    }
    
    render(){
        let { companyGroup, projectGroup, domicilePlug } = this.state
        const { getFieldDecorator } = this.props.form;
        return (
            <Form>
                <FormItem
                    label="公司:"
                    {...formItemLayout}
                >
                    {getFieldDecorator('companyId', {
                        rules: [
                            {
                                required: true, message: '请选择公司！',
                            }
                        ],
                        
                    })(
                        <Select
                            onChange={ this.companyChange.bind(this) }
                        >
                            {
                                companyGroup.map( (item) => <Option  key={item.id} value={item.id}>{item.companyName}</Option> )
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    label="项目:"
                    {...formItemLayout}
                >
                    {getFieldDecorator('projectId', {
                        rules: [
                            {
                                required: true, message: '请选择项目！',
                            }
                        ],
                    })(
                        <Select  
                        >
                            {
                                projectGroup.map( (item) => <Option  key={item.projectId} value={item.projectId}>{item.projectName}</Option> )
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    label="身份证:"
                    {...formItemLayout}
                >
                    {getFieldDecorator('idCard', {
                        rules: [
                            {
                                required: true, message: '请填写身份证号！',
                            },
                            {
                                validator: this.validateToNext.bind(this),
                            }
                        ],
                    })(
                        <Input 
                        />
                    )}
                </FormItem>
                <FormItem
                    label="姓名:"
                    {...formItemLayout}
                >
                    {getFieldDecorator('username', {
                        rules: [
                            {
                                required: true, message: '请填写姓名！',
                            }
                        ],
                    })(
                        <Input 
                        />
                    )}
                </FormItem>
                <FormItem
                    label="手机号:"
                    {...formItemLayout}
                >
                    {getFieldDecorator('mobile', {
                        rules: [
                            {
                                required: true, message: '请填写手机号！',
                            },
                            {
                                validator: this.validateToNext.bind(this),
                            }
                        ],
                    })(
                        <Input 
                        />
                    )}
                </FormItem>
                <FormItem
                    label="户籍地:"
                    {...formItemLayout}
                >
                    {getFieldDecorator('domicile', {
                        rules: [
                            {
                                required: true, message: '请填写户籍地！',
                            }
                        ],
                    })(
                        <Cascader 
                            options={domicilePlug}  
                        />
                    )}
                </FormItem>
                <FormItem
                    label="性质:"
                    {...formItemLayout}
                >
                    {getFieldDecorator('nature', {
                        rules: [
                            {
                                required: true, message: '请选择户籍性质！',
                            }
                        ],
                        
                    })(
                        <Select
                        >
                            <Option  key={1} value={1}>城镇</Option>
                            <Option  key={2} value={2}>农村</Option>
                        </Select>
                    )}
                </FormItem>
                <Row>
                    <Button type="primary" style={{width: '100%'}} onClick={this.handleSubmit.bind(this)}>
                        生成申报
                    </Button>
                </Row>
            </Form>
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

const fromBusi = Form.create({
    // onValuesChange : ( props, changedValues, allValues ) => {

    //     let checkout = true;
    //     Object.keys( allValues ).forEach( (item) =>{
    //         if( !allValues[item] ) checkout = false
    //     })

    //     if( checkout ) {
    //         console.log( props )
    //         props.form.validateFields(
    //             (err , val ) => {
    //                 if (!err) {
    //                     console.log( val )
    //                 }
    //             },
    //         );
    //     }

    // }
})(from_busi);
export default fromBusi;