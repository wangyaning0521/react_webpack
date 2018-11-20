/*
* @Author: WangYaNing
* @Date:   2018-01-23 22:18:41
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-23 22:26:09
*/
import React from 'react';
import { Card,Row ,Col, Icon } from 'antd';
import styles from '../../style/billDetails.less'




class billClassify extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let {
            createTime,
            description,
            id,
            insuranceCode,
            isFree,
            isP,
            mainType,
            name,
            price,
            reportId,
            type
        } = this.props

        return (
            <Row className={styles.row}>
                <Col span={2}>
                    <p className={styles.name}>{name} : </p>
                </Col>
                <Col span={20}>
                    {
                        careful( description, price, name )
                    }
                </Col>
                <Col span={2}>
                    {
                        butGroup(type)
                    }
                </Col>
            </Row>
        );
    }
}


const careful = ( description, price, name ) => {
    if( description )  return (<p className={styles.description}><Icon type="arrow-right" />{`${description} = ${price}`}</p>)
    else return  (<p className={styles.description}><Icon type="arrow-right" />{`${name}费用 = ${price}`}</p>)
}

const butGroup = ( type ) =>{
    let Group;
    switch ( type ){
        case 1 :
        case 2 :
            Group = 
                <p className={styles.btn}>
                    <span>申报记录</span>
                    <span>在缴记录</span>
                </p>
        break;
        case 6 :
            Group = 
                <p className={styles.btn}>
                    <span>明细</span>
                    <span>调差补录</span>
                </p>
        break;
        case 9 :
            Group = 
                <p className={styles.btn}>
                    <span>明细</span>
                </p>
        break;
        default :
            Group = <p className={styles.btn}></p>
        
    } 
    return Group
    
}

export default billClassify;