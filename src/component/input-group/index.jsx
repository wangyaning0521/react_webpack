/*
* @Author: WangYaNing
* @Date:   2018-01-23 22:18:41
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-23 22:26:09
*/
import React from 'react';
import { Form, Input, DatePicker, Col, TimePicker, Select, Cascader, InputNumber, Row, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;


const formItemLayout = {
    labelCol: { span: 6,   },
    wrapperCol: { span: 18,  },
};

class inputGroup extends React.Component{
    constructor(props){
        super(props);
        this.state = this.props
    }
    inputChange( val, value  ){

        let { name, type } = this.state

        this.setState({
            value: value ? val : val.target.value
        })

        if( type === 'input' && val.target.value !== '') {
            this.props.onChange({
                [ name ] : val.target.value
            })
        }
        else if( type === 'select' && val !== -1 ){
            this.props.onChange({
                [ name ] : val 
            })
        }
        else if( ( type === 'cascader' || type === 'RangePicker' ) && Array.isArray(val) ){
            let obj = {}
            name.forEach( ( item, index ) =>{
                obj[ item ] =   type === 'cascader' ?  val[index]    ?  val[index]  : null
                                                    :  value[index]  ?  value[index]  : null
                        
                this.props.onChange(obj)
            })
        }
        else{
            this.props.onChange(this.state.name)
        }

    }
    clearInput(){
        this.setState({
            value : ''
        })
    }
    componentWillReceiveProps(nextProps){
        Object.keys(nextProps).forEach( ( val ) =>{
            if( val !== 'value' ){
                this.setState({
                    [ val ]: nextProps[val]
                })
            }
        })
    }
    render(){

        let { value, placeholder, data, type, title } = this.state
     

        return (
            <FormItem
                {...formItemLayout} 
                label={ title }
            >
                {/** @event 文本框 */}
                {
                    type == 'input' 
                        && 
                    <Input 
                        defaultValue={ value }
                        value={ value }
                        placeholder = { placeholder } 
                        onChange={ this.inputChange.bind(this) }
                    />
                }
                {/** @event 下拉框 */}
                {
                    type == 'select' 
                        && 
                    <Select
                        value={value} 
                        placeholder = { placeholder } 
                        onChange={this.inputChange.bind(this)}
                    >
                        {
                            data.map( (item) => {
                               return (
                                    <Option  key={item.value} value={item.value}>{item.label}</Option>
                               )
                           }) 
                        }
                    </Select>
                }
                {/** @event 级联选择 */}
                {
                    type == 'cascader' 
                        && 
                    <Cascader 
                        options={data} 
                        onChange={this.inputChange.bind(this)} 
                        placeholder={placeholder}
                        value={value}
                    />
                }
                {/** @event 双向时间框 */}
                {
                    type == 'RangePicker' 
                        && 
                    <RangePicker
                        placeholder= {placeholder}
                        value = {value}
                        onChange={this.inputChange.bind(this)} 
                    />
                }
                
            </FormItem>
        );
    }
}

export default inputGroup;